import { Application } from 'express';
import { GarmentEntity } from '../../../../../src/adapters/gateway/orm/entity/Garment.entity';
import { OutfitEntity } from '../../../../../src/adapters/gateway/orm/entity/Outfit.entity';
import { TestDbConfig } from '../../../../test-db.config';
import { container } from 'tsyringe';
import { ServerManager } from '../../../../../src/server_manager';
import AppDataSource from '../../../../../src/frameworks/db/data-source';
import request from 'supertest';
import {
    PlanOutfitInputDto,
    PlanOutfitOutputDto,
} from '../../../../../src/adapters/controllers/outfitPlan/PlanOutfit/PlanOutfit.dto';
import { ResourceId } from '../../../../../src/utilities/ResourceId';
import { FakeOutfitFactory } from '../../../../faker/factory/FakeOutfit.factory';
import { GarmentOrmMapper } from '../../../../../src/adapters/gateway/orm/mapper/GarmentOrm.mapper';
import { OutfitOrmMapper } from '../../../../../src/adapters/gateway/orm/mapper/OutfitOrm.mapper';
import { OutfitPlanEntity } from '../../../../../src/adapters/gateway/orm/entity/OutfitPlan.entity';
import { ApiErrorCode } from '../../../../../src/entities/error';

describe('E2E: Plan Outfit Controller test', () => {
    let body: PlanOutfitInputDto;
    let app: Application;
    let token: string;
    let authUserUuid: string;

    beforeAll(async () => {
        await TestDbConfig.Reset();
        app = container.resolve(ServerManager).app;
    });

    beforeEach(async () => {
        await TestDbConfig.ClearDatabase();
        body = {
            name: 'newOutfitPlan',
            date: '11-01-2024',
            location: 'location',
        };

        const response = await request(app).post('/api/auth/register').send({
            username: 'testuser',
            email: 'testuser@gmail.com',
            password: 'password',
        });

        token = response.body.accessToken;
        authUserUuid = response.body.user.uuid;
    });

    afterAll(async () => {
        await TestDbConfig.Close();
    });

    it('should be tested', () => {
        expect(true).toBeTruthy();
    });

    it('should throw error is user not authenticated', async () => {
        return await request(app)
            .post('/api/outfit-plans/uuid')
            .send(body)
            .expect(ApiErrorCode.Unauthorized);
    });

    it('should should plan outfit successfully', async () => {
        const outfitToPlanUuid = ResourceId.generateUuid();
        const garmentOrmMapper = container.resolve(GarmentOrmMapper);
        const outfitOrmMapper = container.resolve(OutfitOrmMapper);
        const garmentOrmRepository = AppDataSource.getRepository<GarmentEntity>(GarmentEntity);
        const outfitOrmRepository = AppDataSource.getRepository<OutfitEntity>(OutfitEntity);
        const outfitPlanRepository =
            AppDataSource.getRepository<OutfitPlanEntity>(OutfitPlanEntity);

        const outfitToPlan = FakeOutfitFactory.createWithMainTopAndShoes({
            name: 'outfitToPlan',
            userUuid: authUserUuid,
        })
            .withUuid(outfitToPlanUuid)
            .build();

        const mainTop = outfitToPlan.mainTop!;
        const shoes = outfitToPlan.shoes!;

        await garmentOrmRepository.insert(await garmentOrmMapper.toOrmEntity(mainTop));
        await garmentOrmRepository.insert(await garmentOrmMapper.toOrmEntity(shoes));

        await outfitOrmRepository.insert(await outfitOrmMapper.toOrmEntity(outfitToPlan));

        const response = await request(app)
            .post(`/api/outfit-plans/${outfitToPlanUuid}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(201);

        const data: PlanOutfitOutputDto = response.body;
        expect(data).toBeDefined();

        const outfitPlanEntity = await outfitPlanRepository.findOne({
            where: { outfit: { uuid: outfitToPlanUuid } },
            relations: { outfit: true },
        });

        expect(outfitPlanEntity).toBeDefined();
        expect(outfitPlanEntity?.outfit.uuid).toEqual(outfitToPlanUuid);
        expect(data.uuid).toBe(outfitPlanEntity?.uuid);
        expect(data.name).toBe('newOutfitPlan');
    });
});
