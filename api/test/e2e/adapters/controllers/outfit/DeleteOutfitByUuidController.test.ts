import { Application } from 'express';
import { Repository } from 'typeorm';
import { GarmentEntity } from '../../../../../src/adapters/gateway/orm/entity/Garment.entity';
import { OutfitEntity } from '../../../../../src/adapters/gateway/orm/entity/Outfit.entity';
import { TestDbConfig } from '../../../../test-db.config';
import { container } from 'tsyringe';
import { ServerManager } from '../../../../../src/server_manager';
import AppDataSource from '../../../../../src/frameworks/db/data-source';
import request from 'supertest';
import { FakeGarmentFactory } from '../../../../faker/factory/FakeGarment.factory';
import { GarmentOrmMapper } from '../../../../../src/adapters/gateway/orm/mapper/GarmentOrm.mapper';
import { OutfitOrmMapper } from '../../../../../src/adapters/gateway/orm/mapper/OutfitOrm.mapper';
import { FakeOutfitFactory } from '../../../../faker/factory/FakeOutfit.factory';
import { ResourceId } from '../../../../../src/utilities/ResourceId';
import { MainTopGarment } from '../../../../../src/entities/MainTopGarment';
import { Shoes } from '../../../../../src/entities/Shoes';
import { ApiErrorCode } from '../../../../../src/entities/error';

describe('E2E: Delete Outfit By Uuid controller test', () => {
    let app: Application;
    let token: string;
    let garmentOrmRepository: Repository<GarmentEntity>;
    let outfitOrmRepository: Repository<OutfitEntity>;
    let authUserUuid: string;
    let outfitUuid: string;

    beforeAll(async () => {
        await TestDbConfig.Reset();
        app = container.resolve(ServerManager).app;
    });

    beforeEach(async () => {
        garmentOrmRepository = AppDataSource.getRepository(GarmentEntity);
        outfitOrmRepository = AppDataSource.getRepository(OutfitEntity);
        const mainTopGarmentUuid = ResourceId.generateUuid();
        const shoesGarmentUuid = ResourceId.generateUuid();
        outfitUuid = ResourceId.generateUuid();
        const garmentOrmMapper = container.resolve(GarmentOrmMapper);
        const outfitOrmMapper = container.resolve(OutfitOrmMapper);

        await TestDbConfig.ClearDatabase();

        const response = await request(app).post('/api/auth/register').send({
            username: 'testuser',
            email: 'testuser@gmail.com',
            password: 'password',
        });

        token = response.body.accessToken;
        authUserUuid = response.body.user.uuid;

        const mainTopGarment = FakeGarmentFactory.createMainTop({
            userUuid: authUserUuid,
            name: 'mainTop',
            subCategoryLabel: 'Dress',
        })
            .withUuid(mainTopGarmentUuid)
            .build();

        const shoesGarment = FakeGarmentFactory.createShoes({
            userUuid: authUserUuid,
            name: 'shoes',
            subCategoryLabel: 'Dress_shoes',
        })
            .withUuid(shoesGarmentUuid)
            .build();

        await garmentOrmRepository.save(await garmentOrmMapper.toOrmEntity(mainTopGarment));
        await garmentOrmRepository.save(await garmentOrmMapper.toOrmEntity(shoesGarment));

        const outfit = FakeOutfitFactory.createWithMainTopAndShoes({
            name: 'outfitToDelete',
            userUuid: authUserUuid,
        })
            .withUuid(outfitUuid)
            .withMainTop(mainTopGarment as MainTopGarment)
            .withShoes(shoesGarment as Shoes)
            .build();

        await outfitOrmRepository.save(await outfitOrmMapper.toOrmEntity(outfit));
    });

    afterAll(async () => {
        await TestDbConfig.Close();
    });

    it('should delete outfit by uuid successfully', async () => {
        await request(app)
            .delete(`/api/outfits/${outfitUuid}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204);

        const deletedOutfit = await outfitOrmRepository.findOneBy({ uuid: outfitUuid });

        expect(deletedOutfit).toBeNull();
    });

    it('should throw error when trying to delete an outfit that does not belong to the user', async () => {
        const user2 = await request(app).post('/api/auth/register').send({
            username: 'jonuser',
            email: 'jon@gmail.com',
            password: 'password',
        });

        const nonAuthorizedToken = user2.body.accessToken;

        await request(app)
            .delete(`/api/outfits/${outfitUuid}`)
            .set('Authorization', `Bearer ${nonAuthorizedToken}`)
            .expect(ApiErrorCode.Unauthorized);
    });
});
