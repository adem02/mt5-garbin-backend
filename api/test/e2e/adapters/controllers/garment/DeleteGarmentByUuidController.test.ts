import { Application } from 'express';
import { TestDbConfig } from '../../../../test-db.config';
import { container } from 'tsyringe';
import { ServerManager } from '../../../../../src/server_manager';
import request from 'supertest';
import { GarmentRepository } from '../../../../../src/adapters/gateway/orm/repository/Garment.repository';
import path from 'node:path';
import { StorageStrategyInterface } from '../../../../../src/adapters/gateway/storage/StorageStrategy.interface';
import { StorageStrategyToken } from '../../../../../src/utilities/constants';

const mockStorageManager: Partial<StorageStrategyInterface> = {
    upload: jest.fn().mockResolvedValue('https://mocked-url.com/image.jpg'),
};

const mockRemoveBgService = {
    removeBackground: jest.fn().mockResolvedValue(Buffer.from('image')),
};

describe('E2E: Delete Garment By Uuid Controller', () => {
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
        container.registerInstance('RemoveBgService', mockRemoveBgService);

        response = await request(app)
            .post('/api/garments')
            .set('Authorization', `Bearer ${authorizedToken}`)
            .field('name', 'newGarment')
            .field('categoryLabel', 'MAIN_TOP')
            .field('subCategoryLabel', 'Dress')
            .field('size', 'XS')
            .field('colors', JSON.stringify(['red', 'blue', 'green']))
            .attach('image', path.join(__dirname, '../../../../resources/garment.jpeg'));
    });

    afterAll(async () => {
        await TestDbConfig.Close();
    });

    it('should delete garment by uuid', async () => {
        const garmentEntityRepository = container.resolve(GarmentRepository);

        const garmentUuid = response.body.uuid;

        await request(app)
            .delete(`/api/garments/${garmentUuid}`)
            .set('Authorization', `Bearer ${authorizedToken}`)
            .expect(204);

        await expect(garmentEntityRepository.getByUuid(garmentUuid)).rejects.toThrow(
            'Garment not found',
        );
    });

    it('should throw error when trying to delete a garment that does not belong to the user', async () => {
        const user2 = await request(app).post('/api/auth/register').send({
            username: 'jonuser',
            email: 'jon@gmail.com',
            password: 'password',
        });

        const nonAuthorizedToken = user2.body.accessToken;

        await request(app)
            .delete(`/api/garments/${response.body.uuid}`)
            .set('Authorization', `Bearer ${nonAuthorizedToken}`)
            .expect(403);
    });
});
