import { Application } from 'express';
import { TestDbConfig } from '../../../../test-db.config';
import { container } from 'tsyringe';
import { ServerManager } from '../../../../../src/server_manager';
import request from 'supertest';
import { UpdateGarmentInputDto } from '../../../../../src/adapters/controllers/garment/UpdateGarment/UpdateGarment.dto';
import { GarmentRepository } from '../../../../../src/adapters/gateway/orm/repository/Garment.repository';
import { ApiErrorCode } from '../../../../../src/entities/error';
import path from 'node:path';
import { StorageStrategyInterface } from '../../../../../src/adapters/gateway/storage/StorageStrategy.interface';
import { StorageStrategyToken } from '../../../../../src/utilities/constants';

const mockStorageManager: Partial<StorageStrategyInterface> = {
    upload: jest.fn().mockResolvedValue('https://mocked-url.com/image.jpg'),
};

describe('E2E: Update garment controller', () => {
    let app: Application;
    let authorizedToken: string;
    let response: request.Response;

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

        authorizedToken = authUser.body.accessToken;

        container.registerInstance(StorageStrategyToken, mockStorageManager);

        response = await request(app)
            .post('/api/garments')
            .set('Authorization', `Bearer ${authorizedToken}`)
            .field('name', 'newGarment')
            .field('categoryLabel', 'MAIN_TOP')
            .field('subCategoryLabel', 'Dress')
            .field('size', 'XS')
            .field('colors', JSON.stringify(['red', 'blue', 'green'])) // Stringify the array
            .attach('image', path.join(__dirname, '../../../../resources/garment.jpeg')); // Chemin vers l'image test
    });

    afterAll(async () => {
        await TestDbConfig.Close();
    });

    it('should update garment', async () => {
        const garmentEntityRepository = container.resolve(GarmentRepository);

        const garmentUuid = response.body.uuid;

        await request(app)
            .put(`/api/garments/${response.body.uuid}`)
            .set('Authorization', `Bearer ${authorizedToken}`)
            .send({
                name: 'newName',
                brand: 'newBrand',
                size: 'M',
                colors: ['blue', 'green'],
            } as UpdateGarmentInputDto)
            .expect(204);

        const garmentEntity = await garmentEntityRepository.getByUuid(garmentUuid);

        expect(garmentEntity).not.toBeNull();
        expect(garmentEntity.name).toBe('newName');
        expect(garmentEntity.brand).toBe('newBrand');
        expect(garmentEntity.size?.value).toBe('M');
        expect(garmentEntity.colors).toEqual(['blue', 'green']);
    });

    it('should throw error when trying to update a garment that does not belong to the user', async () => {
        const nonAuthUser = await request(app).post('/api/auth/register').send({
            username: 'jonuser',
            email: 'jon@gmail.com',
            password: 'password',
        });

        const nonAuthorizedToken = nonAuthUser.body.accessToken;

        await request(app)
            .put(`/api/garments/${response.body.uuid}`)
            .set('Authorization', `Bearer ${nonAuthorizedToken}`)
            .send({
                name: 'newName',
                brand: 'newBrand',
                size: 'M',
                colors: ['blue', 'green'],
            } as UpdateGarmentInputDto)
            .expect(ApiErrorCode.Unauthorized);
    });

    it('should return 404 when trying to update a garment that does not exist', async () => {
        await request(app)
            .put('/api/garments/invalid-uuid')
            .set('Authorization', `Bearer ${authorizedToken}`)
            .send({
                name: 'newName',
                brand: 'newBrand',
                size: 'M',
                colors: ['blue', 'green'],
            } as UpdateGarmentInputDto)
            .expect(ApiErrorCode.NotFound);
    });
});
