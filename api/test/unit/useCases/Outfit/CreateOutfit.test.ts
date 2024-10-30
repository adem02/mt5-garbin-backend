import 'reflect-metadata';
import { CreateOutfit } from '../../../../src/useCases/Outfit/CreateOutfit/CreateOutfit.useCase';
import { OutfitRepositoryInterface } from '../../../../src/useCases/gateway/OutfitRepository.interface';
import { GarmentRepositoryInterface } from '../../../../src/useCases/gateway/GarmentRepository.interface';
import { CreateOutfitRequest } from '../../../../src/useCases/Outfit/CreateOutfit/CreateOutfit.request';
import { GarmentInterface } from '../../../../src/entities/types/Garment.interface';
import { GarmentBuilder } from '../../../faker/builder/Garment.builder';
import { Outfit } from '../../../../src/entities/Outfit';
import { ApiError, ApiErrorCode } from '../../../../src/entities/error';
import { FakeGarmentFactory } from '../../../faker/factory/FakeGarment.factory';
import { CreateOutfitResponse } from '../../../../src/useCases/Outfit/CreateOutfit/CreateOutfit.response';

describe('Unit: Create Outfit use case', () => {
    let useCase: CreateOutfit;
    let outfitRepositoryMock: Partial<OutfitRepositoryInterface>;
    let garmentRepositoryMock: GarmentRepositoryInterface;
    let request: CreateOutfitRequest;
    const garmentBuilder: GarmentBuilder = new GarmentBuilder();
    const mainTopGarment: GarmentInterface = garmentBuilder
        .withName('mainTopGarment')
        .withUuid('mainTopGarmentUuid')
        .build();
    const subTopGarment: GarmentInterface = FakeGarmentFactory.createSubTop({
        name: 'subTopGarment',
        userUuid: 'userUuid',
        subCategoryLabel: 'T-shirt',
    })
        .withUuid('subTopGarmentUuid')
        .build();
    const bottomGarment: GarmentInterface = FakeGarmentFactory.createBottom({
        name: 'bottomGarment',
        userUuid: 'userUuid',
        subCategoryLabel: 'Jeans',
    })
        .withUuid('bottomGarmentUuid')
        .build();
    const shoesGarment: GarmentInterface = FakeGarmentFactory.createShoes({
        name: 'shoesGarment',
        userUuid: 'userUuid',
        subCategoryLabel: 'Sneakers',
    })
        .withUuid('shoesGarmentUuid')
        .build();

    beforeEach(() => {
        outfitRepositoryMock = {
            create: jest.fn(),
        };

        garmentRepositoryMock = {
            getByUuid: jest.fn(async (uuid: string) => {
                if (uuid === 'mainTopGarmentUuid') return mainTopGarment;
                if (uuid === 'subTopGarmentUuid') return subTopGarment;
                if (uuid === 'bottomGarmentUuid') return bottomGarment;
                if (uuid === 'shoesGarmentUuid') return shoesGarment;
                throw new ApiError(ApiErrorCode.NotFound, 'garment/not-found', 'Garment not found');
            }),
        } as unknown as GarmentRepositoryInterface;

        request = {
            name: 'newOutfit',
            userUuid: 'userUuid',
            mainTopGarmentUuid: 'mainTopGarmentUuid',
            subTopGarmentUuid: 'subTopGarmentUuid',
            bottomGarmentUuid: 'bottomGarmentUuid',
            shoesGarmentUuid: 'shoesGarmentUuid',
        };

        useCase = new CreateOutfit(
            outfitRepositoryMock as OutfitRepositoryInterface,
            garmentRepositoryMock as GarmentRepositoryInterface,
        );
    });

    it('should create an outfit successfully', async () => {
        const response = await useCase.execute(request);

        await expect(garmentRepositoryMock.getByUuid('mainTopGarmentUuid')).resolves.toBe(
            mainTopGarment,
        );
        await expect(garmentRepositoryMock.getByUuid('subTopGarmentUuid')).resolves.toBe(
            subTopGarment,
        );
        await expect(garmentRepositoryMock.getByUuid('bottomGarmentUuid')).resolves.toBe(
            bottomGarment,
        );
        await expect(garmentRepositoryMock.getByUuid('shoesGarmentUuid')).resolves.toBe(
            shoesGarment,
        );

        expect(outfitRepositoryMock.create).toHaveBeenCalledWith(
            expect.objectContaining({
                name: 'newOutfit',
                userUuid: 'userUuid',
                createdAt: expect.any(Date),
                mainTop: mainTopGarment,
                subTop: subTopGarment,
                bottom: bottomGarment,
                shoes: shoesGarment,
            }),
        );
        expect(response).toBeInstanceOf(CreateOutfitResponse);
        expect(response).toEqual(
            expect.objectContaining({
                uuid: expect.any(String),
                name: 'newOutfit',
                garments: {
                    mainTop: {
                        name: 'mainTopGarment',
                        imageUrl: expect.any(String),
                    },
                    subTop: {
                        name: 'subTopGarment',
                        imageUrl: expect.any(String),
                    },
                    bottom: {
                        name: 'bottomGarment',
                        imageUrl: expect.any(String),
                    },
                    shoes: {
                        name: 'shoesGarment',
                        imageUrl: expect.any(String),
                    },
                },
            }),
        );
    });

    it('should throw exception if garment not found', async () => {
        request.mainTopGarmentUuid = 'invalidUuid';

        await expect(useCase.execute(request)).rejects.toThrowError('Garment not found');
    });

    it('should throw exception if outfit does not have at least one garment', async () => {
        request.mainTopGarmentUuid = undefined;
        request.subTopGarmentUuid = undefined;
        request.bottomGarmentUuid = undefined;
        request.shoesGarmentUuid = undefined;

        await expect(useCase.execute(request)).rejects.toThrowError(
            'At least one garment must be provided',
        );
    });

    it('should throw exception if outfit has top and not bottom', async () => {
        request.bottomGarmentUuid = undefined;

        await expect(useCase.execute(request)).rejects.toThrowError(
            'Top and bottom must be provided together',
        );
    });

    it('should throw exception if outfit has bottom and not top', async () => {
        request.subTopGarmentUuid = undefined;

        await expect(useCase.execute(request)).rejects.toThrowError(
            'Top and bottom must be provided together',
        );
    });

    it('should throw exception if outfit has no shoes', async () => {
        request.shoesGarmentUuid = undefined;

        await expect(useCase.execute(request)).rejects.toThrowError('Shoes must be provided');
    });

    it('should create outfit successfully with just main top and shoes', async () => {
        request.subTopGarmentUuid = undefined;
        request.bottomGarmentUuid = undefined;

        await useCase.execute(request);

        await expect(garmentRepositoryMock.getByUuid('mainTopGarmentUuid')).resolves.toBe(
            mainTopGarment,
        );
        await expect(garmentRepositoryMock.getByUuid('shoesGarmentUuid')).resolves.toBe(
            shoesGarment,
        );

        expect(outfitRepositoryMock.create).toHaveBeenCalledWith(expect.any(Outfit));
    });

    it('should create outfit successfully without the main top', async () => {
        request.mainTopGarmentUuid = undefined;

        await useCase.execute(request);

        await expect(garmentRepositoryMock.getByUuid('bottomGarmentUuid')).resolves.toBe(
            bottomGarment,
        );
        await expect(garmentRepositoryMock.getByUuid('shoesGarmentUuid')).resolves.toBe(
            shoesGarment,
        );
        await expect(garmentRepositoryMock.getByUuid('subTopGarmentUuid')).resolves.toBe(
            subTopGarment,
        );

        expect(outfitRepositoryMock.create).toHaveBeenCalledWith(
            expect.objectContaining({
                name: 'newOutfit',
                userUuid: 'userUuid',
                createdAt: expect.any(Date),
                mainTop: null,
                subTop: subTopGarment,
                bottom: bottomGarment,
                shoes: shoesGarment,
            }),
        );
    });
});
