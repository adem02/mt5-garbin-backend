import { Application } from 'express';
import { TestDbConfig } from '../../../../test-db.config';
import { container } from 'tsyringe';
import { ServerManager } from '../../../../../src/server_manager';
import request from 'supertest';
import { ApiErrorCode } from '../../../../../src/entities/error';
import { ResourceId } from '../../../../../src/utilities/ResourceId';
import { GarmentOrmMapper } from '../../../../../src/adapters/gateway/orm/mapper/GarmentOrm.mapper';
import { OutfitOrmMapper } from '../../../../../src/adapters/gateway/orm/mapper/OutfitOrm.mapper';
import { OutfitPlanOrmMapper } from '../../../../../src/adapters/gateway/orm/mapper/OutfitPlanOrm.mapper';
import AppDataSource from '../../../../../src/frameworks/db/data-source';
import { GarmentEntity } from '../../../../../src/adapters/gateway/orm/entity/Garment.entity';
import { OutfitEntity } from '../../../../../src/adapters/gateway/orm/entity/Outfit.entity';
import { OutfitPlanEntity } from '../../../../../src/adapters/gateway/orm/entity/OutfitPlan.entity';
import { FakeOutfitFactory } from '../../../../faker/factory/FakeOutfit.factory';
import { OutfitPlanBuilder } from '../../../../faker/builder/OutfitPlan.builder';

describe('E2E: Delete Outfit Plan By Uuid Controller test', () => {
    let app: Application;
    let token: string;
    let authUserUuid: string;

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
        authUserUuid = response.body.user.uuid;
    });

    afterAll(async () => {
        await TestDbConfig.Close();
    });

    it('should throw error if user is not authenticated', () => {
        return request(app).delete('/api/outfit-plans/uuid').expect(ApiErrorCode.Unauthorized);
    });

    // successfully
    it('should delete outfit plan successfully', async () => {
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

        await request(app)
            .delete(`/api/outfit-plans/${outfitPlanUuid}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204);

        const deletedOutfitPlan = await outfitPlanOrmRepository.findOneBy({ uuid: outfitPlanUuid });

        expect(deletedOutfitPlan).toBeNull();
    });
});
