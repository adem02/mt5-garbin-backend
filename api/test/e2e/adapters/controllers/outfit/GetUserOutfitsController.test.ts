import { ApiErrorCode } from '../../../../../src/entities/error';
import { Application } from 'express';
import { Repository } from 'typeorm';
import { GarmentEntity } from '../../../../../src/adapters/gateway/orm/entity/Garment.entity';
import { OutfitEntity } from '../../../../../src/adapters/gateway/orm/entity/Outfit.entity';
import AppDataSource from '../../../../../src/frameworks/db/data-source';
import { ResourceId } from '../../../../../src/utilities/ResourceId';
import { container } from 'tsyringe';
import { GarmentOrmMapper } from '../../../../../src/adapters/gateway/orm/mapper/GarmentOrm.mapper';
import { OutfitOrmMapper } from '../../../../../src/adapters/gateway/orm/mapper/OutfitOrm.mapper';
import { FakeGarmentFactory } from '../../../../faker/factory/FakeGarment.factory';
import { FakeOutfitFactory } from '../../../../faker/factory/FakeOutfit.factory';
import { MainTopGarment } from '../../../../../src/entities/MainTopGarment';
import { Shoes } from '../../../../../src/entities/Shoes';
import { TestDbConfig } from '../../../../test-db.config';
import request from 'supertest';
import { ServerManager } from '../../../../../src/server_manager';

describe('E2E: Get User Outfits controller test', () => {
    let app: Application;
    let token: string;
    let garmentOrmRepository: Repository<GarmentEntity>;
    let outfitOrmRepository: Repository<OutfitEntity>;
    let authUserUuid: string;

    beforeAll(async () => {
        await TestDbConfig.Reset();
        app = container.resolve(ServerManager).app;
    });

    beforeEach(async () => {
        garmentOrmRepository = AppDataSource.getRepository(GarmentEntity);
        outfitOrmRepository = AppDataSource.getRepository(OutfitEntity);
        const mainTopGarmentUuid = ResourceId.generateUuid();
        const shoesGarmentUuid = ResourceId.generateUuid();
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
            name: 'mondayOutfit',
            userUuid: authUserUuid,
        })
            .withUuid(ResourceId.generateUuid())
            .withMainTop(mainTopGarment as MainTopGarment)
            .withShoes(shoesGarment as Shoes)
            .build();

        await outfitOrmRepository.save(await outfitOrmMapper.toOrmEntity(outfit));

        const outfit2 = FakeOutfitFactory.createWithMainTopAndShoes({
            name: 'tuesdayOutfit',
            userUuid: authUserUuid,
        })
            .withUuid(ResourceId.generateUuid())
            .withMainTop(mainTopGarment as MainTopGarment)
            .withShoes(shoesGarment as Shoes)
            .build();

        await outfitOrmRepository.save(await outfitOrmMapper.toOrmEntity(outfit2));

        const outfit3 = FakeOutfitFactory.createWithMainTopAndShoes({
            name: 'wednesdayOutfit',
            userUuid: authUserUuid,
        })
            .withUuid(ResourceId.generateUuid())
            .withMainTop(mainTopGarment as MainTopGarment)
            .withShoes(shoesGarment as Shoes)
            .build();

        await outfitOrmRepository.save(await outfitOrmMapper.toOrmEntity(outfit3));

        const outfit4 = FakeOutfitFactory.createWithMainTopAndShoes({
            name: 'thursdayOutfit',
            userUuid: authUserUuid,
        })
            .withUuid(ResourceId.generateUuid())
            .withMainTop(mainTopGarment as MainTopGarment)
            .withShoes(shoesGarment as Shoes)
            .build();

        await outfitOrmRepository.save(await outfitOrmMapper.toOrmEntity(outfit4));

        const outfit5 = FakeOutfitFactory.createWithMainTopAndShoes({
            name: 'fridayOutfit',
            userUuid: authUserUuid,
        })
            .withUuid(ResourceId.generateUuid())
            .withMainTop(mainTopGarment as MainTopGarment)
            .withShoes(shoesGarment as Shoes)
            .build();

        await outfitOrmRepository.save(await outfitOrmMapper.toOrmEntity(outfit5));
    });

    afterAll(async () => {
        await TestDbConfig.Close();
    });

    it('should throw error if user is not authenticated', async () => {
        await request(app).get('/api/outfits').expect(ApiErrorCode.Unauthorized);
    });

    it('should get user outfits successfully', async () => {
        const response = await request(app)
            .get('/api/outfits')
            .set('Authorization', `Bearer ${token}`)
            .query({ page: 1, limit: 5 })
            .expect(200);

        expect(response.body.totalItems).toBe(5);
        expect(response.body.itemsPerPage).toBe(5);
        expect(response.body.page).toBe(1);
        expect(response.body.outfits).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: 'mondayOutfit' }),
                expect.objectContaining({ name: 'tuesdayOutfit' }),
                expect.objectContaining({ name: 'wednesdayOutfit' }),
                expect.objectContaining({ name: 'thursdayOutfit' }),
                expect.objectContaining({ name: 'fridayOutfit' }),
            ]),
        );
    });
});
