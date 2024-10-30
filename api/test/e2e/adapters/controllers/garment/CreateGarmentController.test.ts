import 'reflect-metadata';
import { CreateGarmentInputDto } from '../../../../../src/adapters/controllers/garment/CreateGarment/CreateGarment.dto';
import { Application } from 'express';
import { TestDbConfig } from '../../../../test-db.config';
import { container } from 'tsyringe';
import { ServerManager } from '../../../../../src/server_manager';
import request from 'supertest';
import * as path from 'node:path';
import { ApiErrorCode } from '../../../../../src/entities/error';
import { StorageStrategyInterface } from '../../../../../src/adapters/gateway/storage/StorageStrategy.interface';
import { StorageStrategyToken } from '../../../../../src/utilities/constants';
import { RemoveBgService } from '../../../../../src/adapters/services/RemoveBg.service';

const mockStorageManager: Partial<StorageStrategyInterface> = {
    upload: jest.fn().mockResolvedValue('https://mocked-url.com/image.jpg'),
};

const mockRemoveBgService = {
    removeBackground: jest.fn().mockResolvedValue(Buffer.from('image')),
};

describe('E2E: Create garment controller test', () => {
    let body: CreateGarmentInputDto;
    let app: Application;
    let token: string;

    beforeAll(async () => {
        await TestDbConfig.Reset();
        app = container.resolve(ServerManager).app;
    });

    beforeEach(async () => {
        await TestDbConfig.ClearDatabase();
        body = {
            name: 'newGarment',
            categoryLabel: 'MAIN_TOP',
            subCategoryLabel: 'Dress',
            size: 'XS',
            colors: ['red', 'blue', 'green'],
        };

        const response = await request(app).post('/api/auth/register').send({
            username: 'testuser',
            email: 'testuser@gmail.com',
            password: 'password',
        });

        token = response.body.accessToken;

        container.registerInstance(StorageStrategyToken, mockStorageManager);
        container.registerInstance(RemoveBgService, mockRemoveBgService);
    });

    afterAll(async () => {
        await TestDbConfig.Close();
    });

    it('should create garment with an image', async () => {
        const response = await request(app)
            .post('/api/garments')
            .set('Authorization', `Bearer ${token}`)
            .field('name', 'newGarment')
            .field('categoryLabel', 'MAIN_TOP')
            .field('subCategoryLabel', 'Dress')
            .field('size', 'XS')
            .field('colors', JSON.stringify(['red', 'blue', 'green']))
            .attach('image', path.join(__dirname, '../../../../resources/garment.jpeg'));

        expect(response.status).toBe(201);
        expect(response.body.name).toBe('newGarment');
        expect(response.body.categoryLabel).toBe('MAIN_TOP');
        expect(response.body.subCategoryLabel).toBe('Dress');
        expect(response.body.imageUrl).toBe('https://mocked-url.com/image.jpg');
        expect(response.body.size).toBe('XS');
        expect(response.body.colors).toStrictEqual(['red', 'blue', 'green']);
    });

    it('should throw exception if user not authenticated', async () => {
        return await request(app)
            .post('/api/garments')
            .send(body)
            .expect(ApiErrorCode.Unauthorized);
    });

    it('should throw exception if data is not valid', async () => {
        return await request(app)
            .post('/api/garments')
            .set('Authorization', `Bearer ${token}`)
            .field('name', 'newGarment')
            .field('categoryLabel', 'invalidCategory')
            .field('subCategoryLabel', 'Dress')
            .field('size', 'XS')
            .field('colors', JSON.stringify(['red', 'blue', 'green']))
            .attach('image', path.join(__dirname, '../../../../resources/garment.jpeg'))
            .expect(ApiErrorCode.BadRequest);
    });
});
