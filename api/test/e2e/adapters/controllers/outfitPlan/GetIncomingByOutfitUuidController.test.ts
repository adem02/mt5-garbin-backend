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
import { GetIncomingByOutfitUuidOutputDto } from '../../../../../src/adapters/controllers/outfitPlan/GetIncomingByOutfitUuid/GetIncomingByOutfitUuid.dto';

describe('E2E: Get Incoming By Outfit Uuid Controller test', () => {
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

    it('should throw error if user is not authenticated', async () => {
        return await request(app)
            .get('/api/outfit-plans/uuid/incoming')
            .expect(ApiErrorCode.Unauthorized);
    });

    it('should get incoming outfit plan successfully', async () => {
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

        const outfitPlanInThreeDays = new OutfitPlanBuilder()
            .withUuid(outfitPlanUuid)
            .withName('outfitPlanInThreeDays')
            .withOutfitUuid(plannedOutfit)
            .withDate(new Date(new Date().setDate(new Date().getDate() + 3)))
            .withUserUuid(authUserUuid)
            .build();

        const outfitPlanForTomorrow = new OutfitPlanBuilder()
            .withUuid(ResourceId.generateUuid())
            .withName('outfitPlanForTomorrow')
            .withOutfitUuid(plannedOutfit)
            .withUserUuid(authUserUuid)
            .withDate(new Date(new Date().setDate(new Date().getDate() + 1)))
            .build();

        await outfitPlanOrmRepository.insert(
            await outfitPlanOrmMapper.toOrmEntity(outfitPlanForTomorrow),
        );
        await outfitPlanOrmRepository.insert(
            await outfitPlanOrmMapper.toOrmEntity(outfitPlanInThreeDays),
        );

        const response = await request(app)
            .get(`/api/outfit-plans/${plannedOutfit}/incoming`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        const data: GetIncomingByOutfitUuidOutputDto = response.body;

        expect(data.incomingPlans).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    uuid: outfitPlanForTomorrow.uuid,
                    eventName: outfitPlanForTomorrow.name,
                    location: outfitPlanForTomorrow.location,
                }),
                expect.objectContaining({
                    uuid: outfitPlanInThreeDays.uuid,
                    eventName: outfitPlanInThreeDays.name,
                    location: outfitPlanInThreeDays.location,
                }),
            ]),
        );
    });
});
