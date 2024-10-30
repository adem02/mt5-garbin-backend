import { OutfitRepository } from '../../../../../../src/adapters/gateway/orm/repository/Outfit.repository';
import { Repository } from 'typeorm';
import { OutfitEntity } from '../../../../../../src/adapters/gateway/orm/entity/Outfit.entity';
import AppDataSource from '../../../../../../src/frameworks/db/data-source';
import { container } from 'tsyringe';
import { TestDbConfig } from '../../../../../test-db.config';
import { FakeOutfitFactory } from '../../../../../faker/factory/FakeOutfit.factory';
import { ResourceId } from '../../../../../../src/utilities/ResourceId';
import { OutfitOrmMapper } from '../../../../../../src/adapters/gateway/orm/mapper/OutfitOrm.mapper';
import { GarmentOrmMapper } from '../../../../../../src/adapters/gateway/orm/mapper/GarmentOrm.mapper';
import { GarmentEntity } from '../../../../../../src/adapters/gateway/orm/entity/Garment.entity';

describe('Integration: Outfit Repository test', () => {
    let outfitRepo: OutfitRepository;
    let outfitOrmRepository: Repository<OutfitEntity>;
    let garmentOrmRepository: Repository<GarmentEntity>;

    beforeEach(async () => {
        await TestDbConfig.Reset();

        outfitRepo = container.resolve(OutfitRepository);
        outfitOrmRepository = AppDataSource.getRepository(OutfitEntity);
        garmentOrmRepository = AppDataSource.getRepository(GarmentEntity);
    });

    afterEach(async () => {
        await TestDbConfig.ClearDatabase();
    });

    afterAll(async () => {
        await TestDbConfig.Close();
    });

    it('should create an outfit successfully', async () => {
        const newOutfit = FakeOutfitFactory.createWithMainTopAndShoes({
            name: 'newOutfit',
            userUuid: ResourceId.generateUuid(),
        }).build();

        const outfitUuid = newOutfit.uuid;

        await outfitRepo.create(newOutfit);

        const outfitEntity = await outfitOrmRepository.findOneBy({
            uuid: outfitUuid,
        });

        expect(outfitEntity).not.toBeNull();
        expect(outfitEntity!.uuid).toBe(outfitUuid);
        expect(outfitEntity!.name).toBe('newOutfit');
    });

    it('should get outfit by uuid successfully', async () => {
        const outfitUuid = ResourceId.generateUuid();
        const garmentOrmMapper = container.resolve(GarmentOrmMapper);
        const outfitOrmMapper = container.resolve(OutfitOrmMapper);
        const outfit = FakeOutfitFactory.createWithMainTopAndShoes({
            name: 'newOutfit',
            userUuid: ResourceId.generateUuid(),
        })
            .withUuid(outfitUuid)
            .build();

        // Save mainTop and shoes to db before saving outfit
        await garmentOrmRepository.insert(await garmentOrmMapper.toOrmEntity(outfit.mainTop!));
        await garmentOrmRepository.insert(await garmentOrmMapper.toOrmEntity(outfit.shoes!));

        // Save outfit to db
        await outfitOrmRepository.insert(await outfitOrmMapper.toOrmEntity(outfit));

        const result = await outfitRepo.getByUuid(outfitUuid);
        expect(result.uuid).toBe(outfitUuid);
        expect(result.name).toBe('newOutfit');
    });

    it('should update an outfit successfully', async () => {
        const outfitUuid = ResourceId.generateUuid();
        const garmentOrmMapper = container.resolve(GarmentOrmMapper);
        const outfitOrmMapper = container.resolve(OutfitOrmMapper);
        const outfit = FakeOutfitFactory.createWithMainTopAndShoes({
            name: 'newOutfit',
            userUuid: ResourceId.generateUuid(),
        })
            .withUuid(outfitUuid)
            .build();

        // Save mainTop and shoes to db before saving outfit
        await garmentOrmRepository.insert(await garmentOrmMapper.toOrmEntity(outfit.mainTop!));
        await garmentOrmRepository.insert(await garmentOrmMapper.toOrmEntity(outfit.shoes!));

        // Save outfit to db
        await outfitOrmRepository.insert(await outfitOrmMapper.toOrmEntity(outfit));

        const updatedOutfit = FakeOutfitFactory.createWithMainTopAndShoes({
            name: 'updatedOutfit',
            userUuid: ResourceId.generateUuid(),
        })
            .withUuid(outfitUuid)
            .build();
        await outfitRepo.update(updatedOutfit);

        const outfitEntity = await outfitOrmRepository.findOneBy({
            uuid: outfitUuid,
        });

        expect(outfitEntity).not.toBeNull();
        expect(outfitEntity!.uuid).toBe(outfitUuid);
        expect(outfitEntity!.name).toBe('updatedOutfit');
    });

    it('should delete one by uuid successfully', async () => {
        const outfitUuid = ResourceId.generateUuid();
        const garmentOrmMapper = container.resolve(GarmentOrmMapper);
        const outfitOrmMapper = container.resolve(OutfitOrmMapper);
        const outfit = FakeOutfitFactory.createWithMainTopAndShoes({
            name: 'newOutfit',
            userUuid: ResourceId.generateUuid(),
        })
            .withUuid(outfitUuid)
            .build();

        // Save mainTop and shoes to db before saving outfit
        await garmentOrmRepository.insert(await garmentOrmMapper.toOrmEntity(outfit.mainTop!));
        await garmentOrmRepository.insert(await garmentOrmMapper.toOrmEntity(outfit.shoes!));

        // Save outfit to db
        await outfitOrmRepository.insert(await outfitOrmMapper.toOrmEntity(outfit));

        await outfitRepo.deleteByUuid(outfitUuid);

        const deletedOutfit = await outfitOrmRepository.findOneBy({
            uuid: outfitUuid,
        });

        expect(deletedOutfit).toBeNull();
    });

    it('should get user outfits successfully', async () => {
        const userUuid = ResourceId.generateUuid();
        const firstOutfitUuid = ResourceId.generateUuid();
        const secondOutfitUuid = ResourceId.generateUuid();
        const thirdOutfitUuid = ResourceId.generateUuid();
        const garmentOrmMapper = container.resolve(GarmentOrmMapper);
        const outfitOrmMapper = container.resolve(OutfitOrmMapper);

        const firstOutfit = FakeOutfitFactory.createWithMainTopAndShoes({
            name: 'firstOutfit',
            userUuid,
        })
            .withUuid(firstOutfitUuid)
            .build();
        const secondOutfit = FakeOutfitFactory.createWithMainTopAndShoes({
            name: 'secondOutfit',
            userUuid,
        })
            .withUuid(secondOutfitUuid)
            .build();
        const thirdOutfit = FakeOutfitFactory.createWithMainTopAndShoes({
            name: 'thirdOutfit',
            userUuid,
        })
            .withUuid(thirdOutfitUuid)
            .build();

        await garmentOrmRepository.insert(await garmentOrmMapper.toOrmEntity(firstOutfit.mainTop!));
        await garmentOrmRepository.insert(await garmentOrmMapper.toOrmEntity(firstOutfit.shoes!));

        await garmentOrmRepository.insert(
            await garmentOrmMapper.toOrmEntity(secondOutfit.mainTop!),
        );
        await garmentOrmRepository.insert(await garmentOrmMapper.toOrmEntity(secondOutfit.shoes!));

        await garmentOrmRepository.insert(await garmentOrmMapper.toOrmEntity(thirdOutfit.mainTop!));
        await garmentOrmRepository.insert(await garmentOrmMapper.toOrmEntity(thirdOutfit.shoes!));

        await outfitOrmRepository.insert(await outfitOrmMapper.toOrmEntity(firstOutfit));
        await outfitOrmRepository.insert(await outfitOrmMapper.toOrmEntity(secondOutfit));
        await outfitOrmRepository.insert(await outfitOrmMapper.toOrmEntity(thirdOutfit));

        const result = await outfitRepo.findByUserUuid(userUuid, { itemsPerPage: 10, page: 1 });

        expect(result.totalItems).toBe(3);
        expect(result.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    uuid: firstOutfitUuid,
                    name: 'firstOutfit',
                    garments: {
                        mainTop: { name: 'name', imageUrl: 'imageUrl' },
                        shoes: { name: 'name', imageUrl: 'imageUrl' },
                        bottom: undefined,
                        subTop: undefined,
                    },
                }),
                expect.objectContaining({
                    uuid: secondOutfitUuid,
                    name: 'secondOutfit',
                    garments: {
                        mainTop: { name: 'name', imageUrl: 'imageUrl' },
                        shoes: { name: 'name', imageUrl: 'imageUrl' },
                        bottom: undefined,
                        subTop: undefined,
                    },
                }),
                expect.objectContaining({
                    uuid: thirdOutfitUuid,
                    name: 'thirdOutfit',
                    garments: {
                        mainTop: { name: 'name', imageUrl: 'imageUrl' },
                        shoes: { name: 'name', imageUrl: 'imageUrl' },
                        bottom: undefined,
                        subTop: undefined,
                    },
                }),
            ]),
        );
    });
});
