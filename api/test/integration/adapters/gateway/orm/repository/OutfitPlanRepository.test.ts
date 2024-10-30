import { Repository } from 'typeorm';
import { OutfitEntity } from '../../../../../../src/adapters/gateway/orm/entity/Outfit.entity';
import { OutfitPlanEntity } from '../../../../../../src/adapters/gateway/orm/entity/OutfitPlan.entity';
import { OutfitPlanRepository } from '../../../../../../src/adapters/gateway/orm/repository/OutfitPlan.repository';
import { TestDbConfig } from '../../../../../test-db.config';
import { container } from 'tsyringe';
import AppDataSource from '../../../../../../src/frameworks/db/data-source';
import { ResourceId } from '../../../../../../src/utilities/ResourceId';
import { FakeGarmentFactory } from '../../../../../faker/factory/FakeGarment.factory';
import { FakeOutfitFactory } from '../../../../../faker/factory/FakeOutfit.factory';
import { MainTopGarment } from '../../../../../../src/entities/MainTopGarment';
import { Shoes } from '../../../../../../src/entities/Shoes';
import { GarmentEntity } from '../../../../../../src/adapters/gateway/orm/entity/Garment.entity';
import { GarmentOrmMapper } from '../../../../../../src/adapters/gateway/orm/mapper/GarmentOrm.mapper';
import { OutfitOrmMapper } from '../../../../../../src/adapters/gateway/orm/mapper/OutfitOrm.mapper';
import { OutfitPlanBuilder } from '../../../../../faker/builder/OutfitPlan.builder';
import { OutfitPlanOrmMapper } from '../../../../../../src/adapters/gateway/orm/mapper/OutfitPlanOrm.mapper';

describe('Integration: Outfit Plan Repository test', () => {
    let outfitPlanRepository: OutfitPlanRepository;
    let outfitPlanOrmRepository: Repository<OutfitPlanEntity>;
    let outfitOrmRepository: Repository<OutfitEntity>;
    let garmentOrmRepository: Repository<GarmentEntity>;
    let outfitUuid: string;

    beforeEach(async () => {
        await TestDbConfig.Reset();

        garmentOrmRepository = AppDataSource.getRepository(GarmentEntity);
        outfitPlanRepository = container.resolve(OutfitPlanRepository);
        outfitPlanOrmRepository = AppDataSource.getRepository(OutfitPlanEntity);
        outfitOrmRepository = AppDataSource.getRepository(OutfitEntity);
        const garmentOrmMapper = container.resolve(GarmentOrmMapper);
        const outfitOrmMapper = container.resolve(OutfitOrmMapper);

        const mainTopGarment = FakeGarmentFactory.createMainTop({
            userUuid: ResourceId.generateUuid(),
            name: 'mainTop',
            subCategoryLabel: 'Vest',
        })
            .withUuid(ResourceId.generateUuid())
            .build();
        const shoesGarment = FakeGarmentFactory.createShoes({
            userUuid: ResourceId.generateUuid(),
            name: 'shoes',
            subCategoryLabel: 'Sneakers',
        })
            .withUuid(ResourceId.generateUuid())
            .build();

        const garmentOrmEntities = [
            await garmentOrmMapper.toOrmEntity(mainTopGarment),
            await garmentOrmMapper.toOrmEntity(shoesGarment),
        ];
        await garmentOrmRepository.insert(garmentOrmEntities);

        outfitUuid = ResourceId.generateUuid();
        const outfit = FakeOutfitFactory.createWithMainTopAndShoes({
            name: 'outfit',
            userUuid: mainTopGarment.userUuid,
        })
            .withMainTop(mainTopGarment as MainTopGarment)
            .withShoes(shoesGarment as Shoes)
            .withUuid(outfitUuid)
            .build();

        await outfitOrmRepository.insert(await outfitOrmMapper.toOrmEntity(outfit));
    });

    afterEach(async () => {
        await TestDbConfig.ClearDatabase();
    });

    afterAll(async () => {
        await TestDbConfig.Close();
    });

    it('should create an outfit plan successfully', async () => {
        const outfitPlan = new OutfitPlanBuilder()
            .withOutfitUuid(outfitUuid)
            .withName('test-outfitPlan')
            .withLocation('test-location')
            .build();

        await outfitPlanRepository.create(outfitPlan);

        const outfitPlanEntity = await outfitPlanOrmRepository.findOne({
            where: {
                uuid: outfitPlan.uuid,
            },
            relations: {
                outfit: true,
            },
        });

        expect(outfitPlanEntity).not.toBeNull();
        expect(outfitPlanEntity!.uuid).toBe(outfitPlan.uuid);
        expect(outfitPlanEntity!.name).toBe('test-outfitPlan');
        expect(outfitPlanEntity!.location).toBe('test-location');
        expect(outfitPlanEntity!.outfit.uuid).toBe(outfitUuid);
    });

    it('should get outfit plan by uuid successfully', async () => {
        const outfitPlanOrmMapper = container.resolve(OutfitPlanOrmMapper);
        const outfitPlan = new OutfitPlanBuilder()
            .withOutfitUuid(outfitUuid)
            .withName('test-outfitPlan')
            .withLocation('test-location')
            .build();

        await outfitPlanOrmRepository.insert(await outfitPlanOrmMapper.toOrmEntity(outfitPlan));

        const result = await outfitPlanRepository.getByUuid(outfitPlan.uuid);

        expect(result.uuid).toBe(outfitPlan.uuid);
        expect(result.name).toBe('test-outfitPlan');
        expect(result.location).toBe('test-location');
    });

    it('should delete outfit plan by uuid successfully', async () => {
        const outfitPlan = new OutfitPlanBuilder()
            .withOutfitUuid(outfitUuid)
            .withName('test-outfitPlan')
            .withLocation('test-location')
            .build();

        await outfitPlanOrmRepository.insert(outfitPlan);

        await outfitPlanRepository.deleteByUuid(outfitPlan.uuid);

        const result = await outfitPlanOrmRepository.findOne({
            where: {
                uuid: outfitPlan.uuid,
            },
        });

        expect(result).toBeNull();
    });

    it('should find incoming outfit plans by outfit uuid successfully', async () => {
        const outfitPlanOrmMapper = container.resolve(OutfitPlanOrmMapper);
        const outfitPlan = new OutfitPlanBuilder()
            .withOutfitUuid(outfitUuid)
            .withName('outfit-for-two-days-later')
            .withLocation('test-location')
            .withDate(new Date(new Date().getTime() + 1000 * 60 * 60 * 48))
            .build();
        const outfitPlan2 = new OutfitPlanBuilder()
            .withOutfitUuid(outfitUuid)
            .withName('outfit-for-three-days-later')
            .withLocation('test-location2')
            .withDate(new Date(new Date().getTime() + 1000 * 60 * 60 * 72))
            .build();
        const passedOutfitPlan = new OutfitPlanBuilder()
            .withOutfitUuid(outfitUuid)
            .withName('outfit-for-yesterday')
            .withLocation('test-location3')
            .withDate(new Date(new Date().getTime() - 1000 * 60 * 60 * 24))
            .build();

        const outfitPlanEntities = [
            await outfitPlanOrmMapper.toOrmEntity(outfitPlan),
            await outfitPlanOrmMapper.toOrmEntity(outfitPlan2),
            await outfitPlanOrmMapper.toOrmEntity(passedOutfitPlan),
        ];
        await outfitPlanOrmRepository.insert(outfitPlanEntities);

        const result = await outfitPlanRepository.findIncomingByOutfitUuid(outfitUuid);

        expect(result.length).toBe(2);
    });

    it('should find outfit plan history by outfit uuid successfully', async () => {
        const outfitPlanOrmMapper = container.resolve(OutfitPlanOrmMapper);
        const outfitPlan = new OutfitPlanBuilder()
            .withOutfitUuid(outfitUuid)
            .withName('outfit-for-two-days-later')
            .withLocation('test-location')
            .withDate(new Date(new Date().getTime() + 1000 * 60 * 60 * 48))
            .build();
        const outfitPlan2 = new OutfitPlanBuilder()
            .withOutfitUuid(outfitUuid)
            .withName('outfit-for-three-days-later')
            .withLocation('test-location2')
            .withDate(new Date(new Date().getTime() + 1000 * 60 * 60 * 72))
            .build();
        const passedOutfitPlan = new OutfitPlanBuilder()
            .withOutfitUuid(outfitUuid)
            .withName('outfit-for-yesterday')
            .withLocation('test-location3')
            .withDate(new Date(new Date().getTime() - 1000 * 60 * 60 * 24))
            .build();

        const outfitPlanEntities = [
            await outfitPlanOrmMapper.toOrmEntity(outfitPlan),
            await outfitPlanOrmMapper.toOrmEntity(outfitPlan2),
            await outfitPlanOrmMapper.toOrmEntity(passedOutfitPlan),
        ];
        await outfitPlanOrmRepository.insert(outfitPlanEntities);

        const result = await outfitPlanRepository.findOutfitPlanHistoryByOutfitUuid(outfitUuid);

        expect(result.length).toBe(1);
    });

    it('should update an outfit plan successfully', async () => {
        const outfitPlanOrmMapper = container.resolve(OutfitPlanOrmMapper);
        const outfitPlanUuid = ResourceId.generateUuid();
        const outfitPlan = new OutfitPlanBuilder()
            .withUuid(outfitPlanUuid)
            .withOutfitUuid(outfitUuid)
            .withName('test-outfitPlan')
            .withLocation('test-location')
            .build();
        await outfitPlanOrmRepository.insert(await outfitPlanOrmMapper.toOrmEntity(outfitPlan));

        const updatedOutfitPlan = new OutfitPlanBuilder()
            .withUuid(outfitPlanUuid)
            .withOutfitUuid(outfitUuid)
            .withName('updated-outfitPlan')
            .withLocation('updated-location')
            .build();

        await outfitPlanRepository.update(updatedOutfitPlan);

        const result = await outfitPlanOrmRepository.findOne({
            where: {
                uuid: updatedOutfitPlan.uuid,
            },
        });

        expect(result!.name).toBe('updated-outfitPlan');
        expect(result!.location).toBe('updated-location');
    });

    //     getOutfitPlanHistoryCountByOutfitUuid
    it('should get outfit plan history count by outfit uuid successfully', async () => {
        const outfitPlanOrmMapper = container.resolve(OutfitPlanOrmMapper);
        const outfitPlan = new OutfitPlanBuilder()
            .withOutfitUuid(outfitUuid)
            .withName('outfit-for-two-days-later')
            .withLocation('test-location')
            .withDate(new Date(new Date().getTime() + 1000 * 60 * 60 * 48))
            .build();
        const outfitPlan2 = new OutfitPlanBuilder()
            .withOutfitUuid(outfitUuid)
            .withName('outfit-for-three-days-later')
            .withLocation('test-location2')
            .withDate(new Date(new Date().getTime() + 1000 * 60 * 60 * 72))
            .build();
        const passedOutfitPlan = new OutfitPlanBuilder()
            .withOutfitUuid(outfitUuid)
            .withName('outfit-for-yesterday')
            .withLocation('test-location3')
            .withDate(new Date(new Date().getTime() - 1000 * 60 * 60 * 24))
            .build();

        const outfitPlanEntities = [
            await outfitPlanOrmMapper.toOrmEntity(outfitPlan),
            await outfitPlanOrmMapper.toOrmEntity(outfitPlan2),
            await outfitPlanOrmMapper.toOrmEntity(passedOutfitPlan),
        ];
        await outfitPlanOrmRepository.insert(outfitPlanEntities);

        const result = await outfitPlanRepository.getOutfitPlanHistoryCountByOutfitUuid(outfitUuid);

        expect(result).toBe(1);
    });
});
