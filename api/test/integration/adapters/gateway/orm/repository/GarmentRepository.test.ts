import 'reflect-metadata';
import { GarmentRepository } from '../../../../../../src/adapters/gateway/orm/repository/Garment.repository';
import { ResourceId } from '../../../../../../src/utilities/ResourceId';
import { TestDbConfig } from '../../../../../test-db.config';
import { container } from 'tsyringe';
import { GarmentBuilder } from '../../../../../faker/builder/Garment.builder';
import { Repository } from 'typeorm';
import { GarmentEntity } from '../../../../../../src/adapters/gateway/orm/entity/Garment.entity';
import AppDataSource from '../../../../../../src/frameworks/db/data-source';

describe('Integration: Garment repository test', () => {
    let garmentRepo: GarmentRepository;
    let garmentBuilder: GarmentBuilder;
    const garmentUuid = ResourceId.generateUuid();
    let ormRepository: Repository<GarmentEntity>;

    beforeEach(async () => {
        await TestDbConfig.Reset();

        garmentRepo = container.resolve(GarmentRepository);
        garmentBuilder = new GarmentBuilder();
        ormRepository = AppDataSource.getRepository(GarmentEntity);
    });

    afterEach(async () => {
        await TestDbConfig.ClearDatabase();
    });

    afterAll(async () => {
        await TestDbConfig.Close();
    });

    it('should create a garment successfully', async () => {
        const newGarment = garmentBuilder.withUuid(garmentUuid).withName('newGarment').build();

        await garmentRepo.create(newGarment);

        const garmentEntity = await ormRepository.findOneBy({
            uuid: garmentUuid,
        });

        expect(garmentEntity).not.toBeNull();
        expect(garmentEntity!.uuid).toBe(garmentUuid);
        expect(garmentEntity!.name).toBe('newGarment');
    });

    it('should find garments by user uuid successfully', async () => {
        const firstGarmentUuid = ResourceId.generateUuid();
        const firstGarment = garmentBuilder
            .withUuid(firstGarmentUuid)
            .withName('firstGarment')
            .withCreatedAt(new Date('2024-10-01T01:53:00.000Z'))
            .build();
        await garmentRepo.create(firstGarment);

        const secondGarmentUuid = ResourceId.generateUuid();
        const secondGarment = garmentBuilder
            .withUuid(secondGarmentUuid)
            .withName('secondGarment')
            .withCreatedAt(new Date('2024-10-01T01:54:00.000Z'))
            .build();
        await garmentRepo.create(secondGarment);

        const paginatedGarments = await garmentRepo.findGarmentsByUserUuid(firstGarment.userUuid);

        expect(paginatedGarments.garments).toHaveLength(2);
        expect(paginatedGarments.garments[0].uuid).toBe(secondGarmentUuid);
        expect(paginatedGarments.garments[1].uuid).toBe(firstGarmentUuid);
        expect(paginatedGarments.garments[0].name).toBe('secondGarment');
        expect(paginatedGarments.garments[1].name).toBe('firstGarment');
    });

    it('should find garments by user uuid and category successfully', async () => {
        const firstGarmentUuid = ResourceId.generateUuid();
        const secondGarmentUuid = ResourceId.generateUuid();
        const firstGarment = garmentBuilder
            .withUuid(firstGarmentUuid)
            .withCategoryLabel('MAIN_TOP')
            .withName('firstGarment')
            .build();
        const secondGarment = garmentBuilder
            .withUuid(secondGarmentUuid)
            .withCategoryLabel('SUB_TOP')
            .withSubCategoryLabel('Shirt')
            .withName('secondGarment')
            .build();

        await garmentRepo.create(firstGarment);
        await garmentRepo.create(secondGarment);

        const paginatedGarments = await garmentRepo.findGarmentsByUserUuidAndCategory(
            firstGarment.userUuid,
            'MAIN_TOP',
        );

        expect(paginatedGarments.garments).toHaveLength(1);
        expect(paginatedGarments.garments[0].uuid).toBe(firstGarmentUuid);
        expect(paginatedGarments.garments[0].name).toBe('firstGarment');
    });

    it('should update a garment successfully', async () => {
        const garmentUuid = ResourceId.generateUuid();
        const garment = garmentBuilder.withUuid(garmentUuid).withName('garment').build();
        await garmentRepo.create(garment);

        const updatedGarment = garmentBuilder
            .withUuid(garmentUuid)
            .withName('updatedGarment')
            .build();

        expect(garment.name).toBe('garment');

        await garmentRepo.update(updatedGarment);

        const garmentEntity = await ormRepository.findOneBy({
            uuid: garmentUuid,
        });

        expect(garmentEntity).not.toBeNull();
        expect(garmentEntity!.uuid).toBe(garmentUuid);
        expect(garmentEntity!.name).toBe('updatedGarment');
    });

    it('should delete a garment successfully', async () => {
        const garmentUuid = ResourceId.generateUuid();
        const garment = garmentBuilder.withUuid(garmentUuid).withName('garment').build();
        await garmentRepo.create(garment);

        const garmentEntity = await ormRepository.findOneBy({
            uuid: garmentUuid,
        });

        expect(garmentEntity).not.toBeNull();

        await garmentRepo.delete(garmentUuid);

        const deletedGarmentEntity = await ormRepository.findOneBy({
            uuid: garmentUuid,
        });

        expect(deletedGarmentEntity).toBeNull();
    });

    it('should throw if getByUuid is called and garment not found', () => {
        expect(garmentRepo.getByUuid('garment-uuid')).rejects.toThrow('Garment not found');
    });

    it('should search user garments by name successfully', async () => {
        const userUuid = ResourceId.generateUuid();

        const garments = [
            garmentBuilder
                .withUuid(ResourceId.generateUuid())
                .withUserUuid(userUuid)
                .withName('AdidasVestSummer')
                .build(), // matches search term
            garmentBuilder
                .withUuid(ResourceId.generateUuid())
                .withUserUuid(userUuid)
                .withName('Dresssummer')
                .build(), // matches search term
            garmentBuilder
                .withUuid(ResourceId.generateUuid())
                .withUserUuid(userUuid)
                .withName('AdidasVestSpring')
                .build(),
            garmentBuilder
                .withUuid(ResourceId.generateUuid())
                .withUserUuid(userUuid)
                .withName('AdidasVestSutumn')
                .build(),
            garmentBuilder
                .withUuid(ResourceId.generateUuid())
                .withUserUuid(userUuid)
                .withName('NikeSummer')
                .build(), // matches search term
            garmentBuilder
                .withUuid(ResourceId.generateUuid())
                .withUserUuid(userUuid)
                .withName('DFDwinter')
                .build(),
            garmentBuilder
                .withUuid(ResourceId.generateUuid())
                .withUserUuid(userUuid)
                .withName('dsdsspring')
                .build(),
            garmentBuilder
                .withUuid(ResourceId.generateUuid())
                .withUserUuid(userUuid)
                .withName('MyNewautumn')
                .build(),
            garmentBuilder
                .withUuid(ResourceId.generateUuid())
                .withUserUuid(userUuid)
                .withName('BodysuMmer')
                .build(), // matches search term
            garmentBuilder
                .withUuid(ResourceId.generateUuid())
                .withUserUuid(userUuid)
                .withName('FullHitSummer')
                .build(), // matches search term
        ];

        for (const garment of garments) {
            await garmentRepo.create(garment);
        }

        const searchTerm = 'summer';

        const paginatedGarments = await garmentRepo.searchUserGarmentsByName(userUuid, searchTerm, {
            itemsPerPage: 3,
            page: 1,
        });

        console.log(paginatedGarments.garments);

        expect(paginatedGarments.garments).toHaveLength(3);
        paginatedGarments.garments.forEach((garment) => {
            expect(garment.name.toLowerCase()).toEqual(
                expect.stringContaining(searchTerm.toLowerCase()),
            );
        });
        expect(paginatedGarments.totalItems).toBe(5);
    });
});
