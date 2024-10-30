import request from 'supertest';
import { Application } from 'express';
import { TestDbConfig } from '../../../../test-db.config';
import { container } from 'tsyringe';
import { ServerManager } from '../../../../../src/server_manager';

describe('E2E: Get User Garments by Category.', () => {
    let app: Application;
    let token: string;

    beforeAll(async () => {
        await TestDbConfig.Reset();
        app = container.resolve(ServerManager).app;
    });

    beforeEach(async () => {
        await TestDbConfig.ClearDatabase();

        const response = await request(app).post('/api/auth/register').send({
            username: 'testuser',
            email: 'testuser@gmail.com',
            password: 'password',
        });

        token = response.body.accessToken;
    });

    afterAll(async () => {
        await TestDbConfig.Close();
    });

    it('should get user garments by category', () => {
        return request(app)
            .get('/api/garments/MAIN_TOP')
            .set('Authorization', `Bearer ${token}`)
            .query({ page: 1, limit: 10 })
            .expect(200);
    });
});
