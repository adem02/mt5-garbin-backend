import { Application } from 'express';
import { TestDbConfig } from '../../../../test-db.config';
import { container } from 'tsyringe';
import { ServerManager } from '../../../../../src/server_manager';
import request from 'supertest';
import path from 'node:path';
import { GarmentInterface } from '../../../../../src/entities/types/Garment.interface';
import { ApiErrorCode } from '../../../../../src/entities/error';
import { StorageStrategyInterface } from '../../../../../src/adapters/gateway/storage/StorageStrategy.interface';
import { StorageStrategyToken } from '../../../../../src/utilities/constants';

const mockStorageManager: Partial<StorageStrategyInterface> = {
    upload: jest.fn().mockResolvedValue('https://mocked-url.com/image.jpg'),
};

const mockRemoveBgService = {
    removeBackground: jest.fn().mockResolvedValue(Buffer.from('image')),
};

describe('E2E: Search User Garments by Name controller', () => {
    let app: Application;
    let token: string;

    beforeAll(async () => {
        await TestDbConfig.Reset();
        app = container.resolve(ServerManager).app;
    });

    beforeEach(async () => {
        await TestDbConfig.ClearDatabase();

        const authUser = await request(app).post('/api/auth/register').send({
            username: 'testuser',
            email: 'testuser@gmail.com',
            password: 'password',
        });

        token = authUser.body.accessToken;

        container.registerInstance(StorageStrategyToken, mockStorageManager);
        container.registerInstance('RemoveBgService', mockRemoveBgService);
    });

    afterAll(async () => {
        await TestDbConfig.Close();
    });

    it('should search user garments by name successfully', async () => {
        for (const name of [
            'AdidasVestSummer',
            'Dresssummer',
            'NikeSummer',
            'dsdsspring',
            'MyNewautumn',
            'BodysuMmer',
            'FullHitSummer',
        ]) {
            await request(app)
                .post('/api/garments')
                .set('Authorization', `Bearer ${token}`)
                .field('name', name)
                .field('categoryLabel', 'MAIN_TOP')
                .field('subCategoryLabel', 'Dress')
                .field('size', 'XS')
                .field('colors', JSON.stringify(['red', 'blue', 'green']))
                .attach('image', path.join(__dirname, '../../../../resources/garment.jpeg'));
        }

        const response = await request(app)
            .get('/api/garments/search')
            .set('Authorization', `Bearer ${token}`)
            .query({ name: 'summer', page: 1, limit: 3 });

        expect(response.status).toBe(200);

        expect(response.body.itemsPerPage).toBe(3);
        expect(response.body.currentPage).toBe(1);
        expect(response.body.totalItems).toBe(5);
        response.body.garments.forEach((garment: GarmentInterface) => {
            expect(garment.name.toLowerCase()).toEqual(expect.stringContaining('summer'));
        });
        expect(response.body).toHaveProperty('itemsPerPage');
        expect(response.body).toHaveProperty('currentPage');
        expect(response.body).toHaveProperty('totalItems');
        expect(response.body).toHaveProperty('garments');
    });

    it('should throw error when user is not authenticated', async () => {
        return request(app)
            .get('/api/garments/search')
            .query({ name: 'summer', page: 1, limit: 3 })
            .expect(ApiErrorCode.Unauthorized);
    });

    it('should throw error if page number is not correct', () => {
        return request(app)
            .get('/api/garments/search')
            .set('Authorization', `Bearer ${token}`)
            .query({ name: 'summer', page: 0, limit: 3 })
            .expect(ApiErrorCode.BadRequest);
    });

    it('should throw error if limit is not correct', () => {
        return request(app)
            .get('/api/garments/search')
            .set('Authorization', `Bearer ${token}`)
            .query({ name: 'summer', page: 1, limit: 0 })
            .expect(ApiErrorCode.BadRequest);
    });
});
