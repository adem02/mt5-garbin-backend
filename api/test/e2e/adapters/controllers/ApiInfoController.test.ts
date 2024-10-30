import 'reflect-metadata';
import request = require('supertest');
import { container } from 'tsyringe';
import { ServerManager } from '../../../../src/server_manager';

describe('E2E: Get Api Info Controller', () => {
    it('should return api info', async () => {
        const response = await request(container.resolve(ServerManager).app).get('/api/info');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('version');
        expect(response.body).toHaveProperty('description');
    });
});
