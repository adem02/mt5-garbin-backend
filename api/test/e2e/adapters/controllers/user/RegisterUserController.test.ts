import 'reflect-metadata';
import { container } from 'tsyringe';
import { TestDbConfig } from '../../../../test-db.config';
import { RegisterUserInputDto } from '../../../../../src/adapters/controllers/user/RegisterUser/RegisterUser.dto';
import { ServerManager } from '../../../../../src/server_manager';
import { Application } from 'express';
import request from 'supertest';

describe('E2E: Register user controller', () => {
    let body: RegisterUserInputDto;
    let app: Application;

    beforeAll(async () => {
        await TestDbConfig.Reset();
        app = container.resolve(ServerManager).app;
    });

    beforeEach(async () => {
        await TestDbConfig.ClearDatabase();
        body = { username: 'testuser', email: 'testuser@email.com', password: 'password' };
    });

    afterAll(async () => {
        await TestDbConfig.Close();
    });

    it('should register a user successfully', async () => {
        const response = await request(app).post('/api/auth/register').send(body);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user');
        expect(response.body).toHaveProperty('accessToken');
    });

    it('should throw error if data is not valid', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ ...body, email: 'invalid-email' });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('failed to validate request');
    });
});
