import { Application } from 'express';
import { GarmentEntity } from '../../../../../src/adapters/gateway/orm/entity/Garment.entity';
import { Repository } from 'typeorm';
import { OutfitEntity } from '../../../../../src/adapters/gateway/orm/entity/Outfit.entity';
import { TestDbConfig } from '../../../../test-db.config';
import { container } from 'tsyringe';
import { ServerManager } from '../../../../../src/server_manager';
import AppDataSource from '../../../../../src/frameworks/db/data-source';
import { ResourceId } from '../../../../../src/utilities/ResourceId';
import { GarmentOrmMapper } from '../../../../../src/adapters/gateway/orm/mapper/GarmentOrm.mapper';
import request from 'supertest';
import { OutfitOrmMapper } from '../../../../../src/adapters/gateway/orm/mapper/OutfitOrm.mapper';
import { FakeGarmentFactory } from '../../../../faker/factory/FakeGarment.factory';
import { FakeOutfitFactory } from '../../../../faker/factory/FakeOutfit.factory';
import { MainTopGarment } from '../../../../../src/entities/MainTopGarment';
import { Shoes } from '../../../../../src/entities/Shoes';
import { ApiErrorCode } from '../../../../../src/entities/error';
import { UpdateOutfitInputDto } from '../../../../../src/adapters/controllers/outfit/UpdateOutfit/UpdateOutfit.dto';

describe('E2E: Update Outfit controller test', () => {
    const garmentOrmMapper = container.resolve(GarmentOrmMapper);
    const outfitOrmMapper = container.resolve(OutfitOrmMapper);
    let app: Application;
    let token: string;
    const garmentOrmRepository: Repository<GarmentEntity> =
        AppDataSource.getRepository(GarmentEntity);
    const outfitOrmRepository: Repository<OutfitEntity> = AppDataSource.getRepository(OutfitEntity);
    let authUserUuid: string;
    const outfitUuid = ResourceId.generateUuid();
    let body: UpdateOutfitInputDto;
    let mainTopGarmentUuid = ResourceId.generateUuid();
    let shoesGarmentUuid = ResourceId.generateUuid();
    let subTopGarmentUuid = undefined;
    let bottomGarmentUuid = undefined;

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
            name: 'outfitToUpdate',
            userUuid: authUserUuid,
        })
            .withUuid(outfitUuid)
            .withMainTop(mainTopGarment as MainTopGarment)
            .withShoes(shoesGarment as Shoes)
            .build();

        await outfitOrmRepository.save(await outfitOrmMapper.toOrmEntity(outfit));

        body = {
            mainTopGarmentUuid,
            shoesGarmentUuid,
        };
    });

    afterAll(async () => {
        await TestDbConfig.Close();
    });

    it('should throw validation error if any garment uuid is not valid type', async () => {
        body.mainTopGarmentUuid = 'mainTopGarmentUuid';
        await request(app)
            .put(`/api/outfits/${outfitUuid}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(ApiErrorCode.BadRequest);
    });

    it('should throw error if user not authenticated', async () => {
        await request(app)
            .put(`/api/outfits/${outfitUuid}`)
            .send(body)
            .expect(ApiErrorCode.Unauthorized);
    });

    it('should update outfit successfully', async () => {
        mainTopGarmentUuid = ResourceId.generateUuid();
        subTopGarmentUuid = ResourceId.generateUuid();
        bottomGarmentUuid = ResourceId.generateUuid();
        shoesGarmentUuid = ResourceId.generateUuid();

        const mainTopGarment = FakeGarmentFactory.createMainTop({
            name: 'mainTop',
            userUuid: authUserUuid,
            subCategoryLabel: 'Sweater',
        })
            .withUuid(mainTopGarmentUuid)
            .build();

        const subTopGarment = FakeGarmentFactory.createSubTop({
            name: 'subTop',
            userUuid: authUserUuid,
            subCategoryLabel: 'T-shirt',
        })
            .withUuid(subTopGarmentUuid)
            .build();

        const bottomGarment = FakeGarmentFactory.createBottom({
            name: 'bottom',
            userUuid: authUserUuid,
            subCategoryLabel: 'Jogging_pants',
        })
            .withUuid(bottomGarmentUuid)
            .build();

        const shoesGarment = FakeGarmentFactory.createShoes({
            name: 'shoes',
            userUuid: authUserUuid,
            subCategoryLabel: 'Sneakers',
        })
            .withUuid(shoesGarmentUuid)
            .build();

        body = {
            name: 'newUpdatedOutfit',
            mainTopGarmentUuid: mainTopGarmentUuid,
            shoesGarmentUuid: shoesGarmentUuid,
            subTopGarmentUuid: subTopGarmentUuid,
            bottomGarmentUuid: bottomGarmentUuid,
        };

        await garmentOrmRepository.insert(await garmentOrmMapper.toOrmEntity(mainTopGarment));
        await garmentOrmRepository.insert(await garmentOrmMapper.toOrmEntity(shoesGarment));
        await garmentOrmRepository.insert(await garmentOrmMapper.toOrmEntity(subTopGarment));
        await garmentOrmRepository.insert(await garmentOrmMapper.toOrmEntity(bottomGarment));

        await request(app)
            .put(`/api/outfits/${outfitUuid}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(204);

        const updatedOutfit = await outfitOrmRepository.findOne({
            where: { uuid: outfitUuid },
            relations: {
                mainTop: true,
                bottom: true,
                subTop: true,
                shoes: true,
            },
        });

        expect(updatedOutfit).not.toBeNull();
        expect(updatedOutfit!.uuid).toBe(outfitUuid);
        expect(updatedOutfit!.name).toBe('newUpdatedOutfit');
        expect(updatedOutfit!.mainTop).not.toBeNull();
        expect(updatedOutfit!.shoes).not.toBeNull();
        expect(updatedOutfit!.subTop).not.toBeNull();
        expect(updatedOutfit!.bottom).not.toBeNull();
        expect(updatedOutfit!.mainTop!.uuid).toBe(mainTopGarmentUuid);
        expect(updatedOutfit!.shoes!.uuid).toBe(shoesGarmentUuid);
        expect(updatedOutfit!.subTop!.uuid).toBe(subTopGarmentUuid);
        expect(updatedOutfit!.bottom!.uuid).toBe(bottomGarmentUuid);
    });
});
