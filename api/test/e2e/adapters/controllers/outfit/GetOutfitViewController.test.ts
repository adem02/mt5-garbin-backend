import 'reflect-metadata';
import request from 'supertest';
import { Application } from 'express';
import { Repository } from 'typeorm';
import { container } from 'tsyringe';
import { GarmentEntity } from '../../../../../src/adapters/gateway/orm/entity/Garment.entity';
import { OutfitEntity } from '../../../../../src/adapters/gateway/orm/entity/Outfit.entity';
import { TestDbConfig } from '../../../../test-db.config';
import { ServerManager } from '../../../../../src/server_manager';
import AppDataSource from '../../../../../src/frameworks/db/data-source';
import { ResourceId } from '../../../../../src/utilities/ResourceId';
import { GarmentOrmMapper } from '../../../../../src/adapters/gateway/orm/mapper/GarmentOrm.mapper';
import { OutfitOrmMapper } from '../../../../../src/adapters/gateway/orm/mapper/OutfitOrm.mapper';
import { FakeGarmentFactory } from '../../../../faker/factory/FakeGarment.factory';
import { FakeOutfitFactory } from '../../../../faker/factory/FakeOutfit.factory';
import { MainTopGarment } from '../../../../../src/entities/MainTopGarment';
import { Shoes } from '../../../../../src/entities/Shoes';
import { BottomGarment } from '../../../../../src/entities/BottomGarment';
import { SubTopGarment } from '../../../../../src/entities/SubTopGarment';
import { GetOutfitViewOutputDto } from '../../../../../src/adapters/controllers/outfit/GetOutfitView/GetOutfitView.dto';

describe('E2E: Get Outfit View controller test', () => {
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
        const subTopGarmentUuid = ResourceId.generateUuid();
        const bottomGarmentUuid = ResourceId.generateUuid();
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
            subCategoryLabel: 'Vest',
        })
            .withUuid(mainTopGarmentUuid)
            .build();
        const subTopGarment = FakeGarmentFactory.createSubTop({
            userUuid: authUserUuid,
            name: 'subTop',
            subCategoryLabel: 'Shirt',
        })
            .withUuid(subTopGarmentUuid)
            .build();
        const bottomGarment = FakeGarmentFactory.createBottom({
            userUuid: authUserUuid,
            name: 'bottom',
            subCategoryLabel: 'Jeans',
        })
            .withUuid(bottomGarmentUuid)
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
        await garmentOrmRepository.save(await garmentOrmMapper.toOrmEntity(subTopGarment));
        await garmentOrmRepository.save(await garmentOrmMapper.toOrmEntity(bottomGarment));

        const outfit = FakeOutfitFactory.createWithMainTopAndShoes({
            name: 'outfitToView',
            userUuid: authUserUuid,
        })
            .withUuid(outfitUuid)
            .withMainTop(mainTopGarment as MainTopGarment)
            .withSubTop(subTopGarment as SubTopGarment)
            .withBottom(bottomGarment as BottomGarment)
            .withShoes(shoesGarment as Shoes)
            .build();

        await outfitOrmRepository.save(await outfitOrmMapper.toOrmEntity(outfit));
    });

    afterAll(async () => {
        await TestDbConfig.Close();
    });

    it('should get outfit by uuid successfully', async () => {
        const response = await request(app)
            .get(`/api/outfits/${outfitUuid}/view`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining<GetOutfitViewOutputDto>({
                name: 'outfitToView',
                garments: expect.objectContaining({
                    mainTop: expect.objectContaining({ name: 'mainTop', imageUrl: 'imageUrl' }),
                    subTop: expect.objectContaining({ name: 'subTop', imageUrl: 'imageUrl' }),
                    bottom: expect.objectContaining({ name: 'bottom', imageUrl: 'imageUrl' }),
                    shoes: expect.objectContaining({ name: 'shoes', imageUrl: 'imageUrl' }),
                }),
                creator: expect.objectContaining({
                    username: 'testuser',
                }),
            }),
        );
    });
});
