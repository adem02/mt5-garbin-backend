import request from 'supertest';
import { TestDbConfig } from '../../../../test-db.config';
import { ServerManager } from '../../../../../src/server_manager';
import { container } from 'tsyringe';
import { Application } from 'express';
import { CreateOutfitInputDto } from '../../../../../src/adapters/controllers/outfit/CreateOutfit/CreateOutfit.dto';
import { ResourceId } from '../../../../../src/utilities/ResourceId';
import { GarmentOrmMapper } from '../../../../../src/adapters/gateway/orm/mapper/GarmentOrm.mapper';
import { GarmentEntity } from '../../../../../src/adapters/gateway/orm/entity/Garment.entity';
import { Repository } from 'typeorm';
import AppDataSource from '../../../../../src/frameworks/db/data-source';
import { OutfitEntity } from '../../../../../src/adapters/gateway/orm/entity/Outfit.entity';
import { FakeGarmentFactory } from '../../../../faker/factory/FakeGarment.factory';
import { ApiErrorCode } from '../../../../../src/entities/error';

describe('E2E: Create Outfit controller test', () => {
    let body: CreateOutfitInputDto;
    let app: Application;
    let token: string;
    let garmentOrmRepository: Repository<GarmentEntity>;
    let outfitOrmRepository: Repository<OutfitEntity>;

    beforeAll(async () => {
        await TestDbConfig.Reset();
        app = container.resolve(ServerManager).app;
    });

    beforeEach(async () => {
        garmentOrmRepository = AppDataSource.getRepository(GarmentEntity);
        outfitOrmRepository = AppDataSource.getRepository(OutfitEntity);
        await TestDbConfig.ClearDatabase();
        body = {
            name: 'newOutfit',
            mainTopUuid: 'mainTopUuid',
            shoesUuid: 'shoesUuid',
        };

        const response = await request(app).post('/api/auth/register').send({
            username: 'testuser',
            email: 'testuser@gmail.com',
            password: 'password',
        });

        token = response.body.accessToken;
    });

    afterAll(async () => {
        await TestDbConfig.Close();
    });

    it('should throw error if garment not found with any requested uuid of garment', async () => {
        await request(app)
            .post('/api/outfits')
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(ApiErrorCode.NotFound);
    });

    it('should throw error if user not authenticated', async () => {
        return await request(app).post('/api/outfits').send(body).expect(ApiErrorCode.Unauthorized);
    });

    it('should create outfit successfully', async () => {
        const garmentOrmMapper = container.resolve(GarmentOrmMapper);
        const mainTopGarmentUuid = ResourceId.generateUuid();
        const shoesGarmentUuid = ResourceId.generateUuid();

        const mainTopGarment = FakeGarmentFactory.createMainTop({
            name: 'mainTop',
            userUuid: ResourceId.generateUuid(),
            subCategoryLabel: 'Dress',
        })
            .withUuid(mainTopGarmentUuid)
            .build();
        const shoesGarment = FakeGarmentFactory.createShoes({
            name: 'shoes',
            userUuid: ResourceId.generateUuid(),
            subCategoryLabel: 'Ankle_boots',
        })
            .withUuid(shoesGarmentUuid)
            .build();

        await garmentOrmRepository.insert(await garmentOrmMapper.toOrmEntity(mainTopGarment));
        await garmentOrmRepository.insert(await garmentOrmMapper.toOrmEntity(shoesGarment));

        const response = await request(app)
            .post('/api/outfits')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'newCreatedOutfit',
                mainTopUuid: mainTopGarmentUuid,
                shoesUuid: shoesGarmentUuid,
            });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe('newCreatedOutfit');

        const createdOutfitUuid = response.body.uuid;

        const createdOutfitEntity = await outfitOrmRepository.findOne({
            where: { uuid: createdOutfitUuid },
            relations: { mainTop: true, shoes: true, subTop: true, bottom: true },
        });

        expect(createdOutfitEntity).not.toBeNull();
        expect(createdOutfitEntity!.uuid).toBe(createdOutfitUuid);
        expect(createdOutfitEntity!.mainTop).not.toBeNull();
        expect(createdOutfitEntity!.shoes).not.toBeNull();
        expect(createdOutfitEntity!.subTop).toBeNull();
        expect(createdOutfitEntity!.bottom).toBeNull();
        expect(createdOutfitEntity!.mainTop!.uuid).toBe(mainTopGarmentUuid);
        expect(createdOutfitEntity!.shoes!.uuid).toBe(shoesGarmentUuid);
    });
});
