import 'reflect-metadata';
import { UpdateOutfit } from '../../../../src/useCases/Outfit/UpdateOutfit/UpdateOutfit.useCase';
import { OutfitRepositoryInterface } from '../../../../src/useCases/gateway/OutfitRepository.interface';
import { GarmentRepositoryInterface } from '../../../../src/useCases/gateway/GarmentRepository.interface';
import { UpdateOutfitRequest } from '../../../../src/useCases/Outfit/UpdateOutfit/UpdateOutfit.request';
import { OutfitBuilder } from '../../../faker/builder/Outfit.builder';
import { GarmentBuilder } from '../../../faker/builder/Garment.builder';
import { MainTopGarment } from '../../../../src/entities/MainTopGarment';
import { ApiError, ApiErrorCode } from '../../../../src/entities/error';
import { SubTopGarment } from '../../../../src/entities/SubTopGarment';
import { BottomGarment } from '../../../../src/entities/BottomGarment';
import { Shoes } from '../../../../src/entities/Shoes';
import { Outfit } from '../../../../src/entities/Outfit';
import { FakeGarmentFactory } from '../../../faker/factory/FakeGarment.factory';

describe('Unit: Update Outfit use case', () => {
    let useCase: UpdateOutfit;
    let outfitRepositoryMock: Partial<OutfitRepositoryInterface>;
    let garmentRepositoryMock: Partial<GarmentRepositoryInterface>;
    let request: UpdateOutfitRequest;
    const outfitBuilder: OutfitBuilder = new OutfitBuilder();

    beforeEach(() => {
        outfitRepositoryMock = {
            getByUuid: jest.fn(async () => {
                return outfitBuilder.withUuid('outfitUuid').build();
            }),
            update: jest.fn(),
        };
        garmentRepositoryMock = {
            getByUuid: jest.fn(),
        };

        request = {
            userUuid: 'userUuid',
            uuid: 'outfitUuid',
            mainTopGarmentUuid: 'mainTopGarmentUuid',
            subTopGarmentUuid: 'subTopGarmentUuid',
            bottomGarmentUuid: 'bottomGarmentUuid',
            shoesGarmentUuid: 'shoesGarmentUuid',
        };

        useCase = new UpdateOutfit(
            outfitRepositoryMock as OutfitRepositoryInterface,
            garmentRepositoryMock as GarmentRepositoryInterface,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should throw error if outfit does not belong to user', async () => {
        request.userUuid = 'anotherUserUuid';

        await expect(useCase.execute(request)).rejects.toThrow('Outfit does not belong to user');
    });

    it('should throw error if main top garment does not belong to user', async () => {
        const topMainGarment = new GarmentBuilder()
            .withUuid('mainTopGarmentUuid')
            .withUserUuid('anotherUserUuid')
            .build();
        garmentRepositoryMock.getByUuid = jest.fn(async () => {
            if (request.mainTopGarmentUuid === 'mainTopGarmentUuid') {
                return topMainGarment;
            }
            throw new ApiError(ApiErrorCode.NotFound, 'garment/not-found', 'Garment not found');
        });

        await expect(useCase.execute(request)).rejects.toThrow('Garment does not belong to user');
    });

    it('should update outfit successfully', async () => {
        const mainTopGarment = FakeGarmentFactory.createMainTop({
            name: 'mainTopGarment',
            userUuid: 'userUuid',
            subCategoryLabel: 'Down_jacket',
        })
            .withUuid('mainTopGarmentUuid')
            .build();
        const subTopGarment = FakeGarmentFactory.createSubTop({
            name: 'subTopGarment',
            userUuid: 'userUuid',
            subCategoryLabel: 'T-shirt',
        })
            .withUuid('subTopGarmentUuid')
            .build();
        const bottomGarment = FakeGarmentFactory.createBottom({
            name: 'bottomGarment',
            userUuid: 'userUuid',
            subCategoryLabel: 'Jeans',
        })
            .withUuid('bottomGarmentUuid')
            .build();
        const shoesGarment = FakeGarmentFactory.createShoes({
            name: 'shoesGarment',
            userUuid: 'userUuid',
            subCategoryLabel: 'Sneakers',
        })
            .withUuid('shoesGarmentUuid')
            .build();

        garmentRepositoryMock.getByUuid = jest.fn(async (uuid: string) => {
            if (uuid === 'mainTopGarmentUuid') {
                return mainTopGarment;
            }
            if (uuid === 'subTopGarmentUuid') {
                return subTopGarment;
            }
            if (uuid === 'bottomGarmentUuid') {
                return bottomGarment;
            }
            if (uuid === 'shoesGarmentUuid') {
                return shoesGarment;
            }
            throw new ApiError(ApiErrorCode.NotFound, 'garment/not-found', 'Garment not found');
        });

        await useCase.execute(request);

        expect(outfitRepositoryMock.getByUuid).toHaveBeenCalledWith(request.uuid);
        expect(garmentRepositoryMock.getByUuid).toHaveBeenCalledTimes(4);
        await expect(garmentRepositoryMock.getByUuid(request.mainTopGarmentUuid!)).resolves.toBe(
            mainTopGarment,
        );
        await expect(garmentRepositoryMock.getByUuid(request.subTopGarmentUuid!)).resolves.toBe(
            subTopGarment,
        );
        await expect(garmentRepositoryMock.getByUuid(request.bottomGarmentUuid!)).resolves.toBe(
            bottomGarment,
        );
        await expect(garmentRepositoryMock.getByUuid(request.shoesGarmentUuid!)).resolves.toBe(
            shoesGarment,
        );

        const outfit = outfitBuilder
            .withMainTop(mainTopGarment as MainTopGarment)
            .withSubTop(subTopGarment as SubTopGarment)
            .withBottom(bottomGarment as BottomGarment)
            .withShoes(shoesGarment as Shoes)
            .build();

        expect(outfitRepositoryMock.update).toHaveBeenCalledWith(
            expect.objectContaining<Partial<Outfit>>({
                uuid: request.uuid,
                userUuid: request.userUuid,
                name: outfit.name,
                mainTop: outfit.mainTop,
                subTop: outfit.subTop,
                bottom: outfit.bottom,
                shoes: outfit.shoes,
                createdAt: outfit.createdAt,
            }),
        );
    });
});
