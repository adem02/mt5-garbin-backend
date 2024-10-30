import { Application } from 'express';
import { TestDbConfig } from '../../../../test-db.config';
import { container } from 'tsyringe';
import { ServerManager } from '../../../../../src/server_manager';
import request from 'supertest';
import { UpdateUserPasswordInputDto } from '../../../../../src/adapters/controllers/user/UpdateUserPassword/UpdateUserPassword.dto';
import { UserRepository } from '../../../../../src/adapters/gateway/orm/repository/User.repository';
import { PasswordManager } from '../../../../../src/adapters/gateway/PasswordManager';
import { ApiErrorCode } from '../../../../../src/entities/error';

describe('E2E: Update User Password controller', () => {
    let body: UpdateUserPasswordInputDto;
    let app: Application;
    let token: string;

    beforeAll(async () => {
        await TestDbConfig.Reset();
        app = container.resolve(ServerManager).app;
    });

    beforeEach(async () => {
        await TestDbConfig.ClearDatabase();
        body = {
            password: 'newPassword',
        };

        const response = await request(app).post('/api/auth/register').send({
            username: 'testuser',
            email: 'testuser@gmail.com',
            password: 'oldPassword',
        });

        token = response.body.accessToken;
    });

    afterAll(async () => {
        await TestDbConfig.Close();
    });

    it('should update user password successfully', async () => {
        await request(app)
            .patch('/api/auth/change-password')
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(204);

        const userRepo = container.resolve(UserRepository);
        const passwordManager = container.resolve(PasswordManager);

        const user = await userRepo.findByEmail('testuser@gmail.com');
        expect(await passwordManager.compare(body.password, user!.password)).toBe(true);
        expect(await passwordManager.compare('oldPassword', user!.password)).toBe(false);

        await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@gmail.com',
                password: 'oldPassword',
            })
            .expect(ApiErrorCode.Unauthorized);

        await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@gmail.com',
                password: body.password,
            })
            .expect(200);
    });

    it('should throw error if valid password is not provided', async () => {
        await request(app)
            .patch('/api/auth/change-password')
            .set('Authorization', `Bearer ${token}`)
            .send({})
            .expect(ApiErrorCode.InternalBadRequest);

        await request(app)
            .patch('/api/auth/change-password')
            .set('Authorization', `Bearer ${token}`)
            .send({ password: '' })
            .expect(ApiErrorCode.BadRequest);
    });

    it('should throw error if user not authenticated', async () => {
        await request(app)
            .patch('/api/auth/change-password')
            .send(body)
            .expect(ApiErrorCode.Unauthorized);
    });
});
