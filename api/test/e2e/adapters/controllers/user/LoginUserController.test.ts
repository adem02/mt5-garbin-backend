import 'reflect-metadata';
import { Application } from 'express';
import { TestDbConfig } from '../../../../test-db.config';
import { container } from 'tsyringe';
import { ServerManager } from '../../../../../src/server_manager';
import { LoginUserInputDto } from '../../../../../src/adapters/controllers/user/LoginUser/LoginUser.dto';
import request from 'supertest';

describe('E2E: Login user controller', () => {
    let app: Application;

    beforeAll(async () => {
        await TestDbConfig.Reset();
        app = container.resolve(ServerManager).app;
    });

    beforeEach(async () => {
        await TestDbConfig.ClearDatabase();
    });

    afterAll(async () => {
        await TestDbConfig.Close();
    });

    it('should login user successfully', async () => {
        const body: LoginUserInputDto = { email: 'testuser@gmail.com', password: 'password' };
        await request(app)
            .post('/api/auth/register')
            .send({ username: 'testuser', email: 'testuser@gmail.com', password: 'password' });

        const response = await request(app).post('/api/auth/login').send(body);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('user');
    });
});
