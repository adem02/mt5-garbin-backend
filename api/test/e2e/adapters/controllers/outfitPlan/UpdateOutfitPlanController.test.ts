import { Application } from 'express';
import { GarmentEntity } from '../../../../../src/adapters/gateway/orm/entity/Garment.entity';
import { OutfitEntity } from '../../../../../src/adapters/gateway/orm/entity/Outfit.entity';
import { TestDbConfig } from '../../../../test-db.config';
import { container } from 'tsyringe';
import { ServerManager } from '../../../../../src/server_manager';
import AppDataSource from '../../../../../src/frameworks/db/data-source';
import request from 'supertest';
import { UpdateOutfitPlanInputDto } from '../../../../../src/adapters/controllers/outfitPlan/UpdateOutfitPlan/UpdateOutfitPlan.dto';
import { ApiErrorCode } from '../../../../../src/entities/error';
import { ResourceId } from '../../../../../src/utilities/ResourceId';
import { GarmentOrmMapper } from '../../../../../src/adapters/gateway/orm/mapper/GarmentOrm.mapper';
import { OutfitOrmMapper } from '../../../../../src/adapters/gateway/orm/mapper/OutfitOrm.mapper';
import { OutfitPlanEntity } from '../../../../../src/adapters/gateway/orm/entity/OutfitPlan.entity';
import { FakeOutfitFactory } from '../../../../faker/factory/FakeOutfit.factory';
import { OutfitPlanBuilder } from '../../../../faker/builder/OutfitPlan.builder';
import { OutfitPlanOrmMapper } from '../../../../../src/adapters/gateway/orm/mapper/OutfitPlanOrm.mapper';

describe('E2E: Update Outfit Plan Controller test', () => {
    let body: UpdateOutfitPlanInputDto;
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
            date: '2024-11-01',
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

    it('should throw error is user not authenticated', async () => {
        return await request(app)
            .put('/api/outfit-plans/uuid')
            .send(body)
            .expect(ApiErrorCode.Unauthorized);
    });

    it('should update outfit plan successfully', async () => {
        const plannedOutfit = ResourceId.generateUuid();
        const garmentOrmMapper = container.resolve(GarmentOrmMapper);
        const outfitOrmMapper = container.resolve(OutfitOrmMapper);
        const outfitPlanOrmMapper = container.resolve(OutfitPlanOrmMapper);
        const garmentOrmRepository = AppDataSource.getRepository<GarmentEntity>(GarmentEntity);
        const outfitOrmRepository = AppDataSource.getRepository<OutfitEntity>(OutfitEntity);
        const outfitPlanOrmRepository =
            AppDataSource.getRepository<OutfitPlanEntity>(OutfitPlanEntity);

        const outfit = FakeOutfitFactory.createWithMainTopAndShoes({
            name: 'plannedOutfit',
            userUuid: authUserUuid,
        })
            .withUuid(plannedOutfit)
            .build();

        const mainTop = outfit.mainTop!;
        const shoes = outfit.shoes!;

        await garmentOrmRepository.insert(await garmentOrmMapper.toOrmEntity(mainTop));
        await garmentOrmRepository.insert(await garmentOrmMapper.toOrmEntity(shoes));

        await outfitOrmRepository.insert(await outfitOrmMapper.toOrmEntity(outfit));

        const outfitPlanUuid = ResourceId.generateUuid();

        const outfitPlan = new OutfitPlanBuilder()
            .withUuid(outfitPlanUuid)
            .withOutfitUuid(plannedOutfit)
            .withUserUuid(authUserUuid)
            .build();

        await outfitPlanOrmRepository.insert(await outfitPlanOrmMapper.toOrmEntity(outfitPlan));

        const updatedBody = {
            name: 'updatedOutfitPlan',
            date: '2024-11-04',
            location: 'another location',
        };

        await request(app)
            .put(`/api/outfit-plans/${outfitPlanUuid}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedBody)
            .expect(204);

        const updatedOutfitPlan = await outfitPlanOrmRepository.findOneBy({ uuid: outfitPlanUuid });

        expect(updatedOutfitPlan).not.toBeNull();
        expect(updatedOutfitPlan!.name).toBe('updatedOutfitPlan');
        expect(updatedOutfitPlan!.uuid).toBe(outfitPlanUuid);
        expect(updatedOutfitPlan!.userUuid).toBe(authUserUuid);
        expect(updatedOutfitPlan!.location).toBe('another location');
    });
});
