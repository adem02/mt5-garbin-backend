import 'reflect-metadata';
import { GarmentRepositoryInterface } from '../../../../src/useCases/gateway/GarmentRepository.interface';
import { GetUserGarmentsByCategory } from '../../../../src/useCases/Garment/GetUserGarmentsByCategory/GetUserGarmentsByCategory.useCase';
import { GarmentBuilder } from '../../../faker/builder/Garment.builder';
import { PaginatedGarments } from '../../../../src/entities/PaginatedGarments';

describe('Unit: Get User Garment By Category', () => {
    let garmentRepositoryMock: Partial<GarmentRepositoryInterface>;
    let useCase: GetUserGarmentsByCategory;
    let garmentBuilder: GarmentBuilder;

    beforeEach(() => {
        garmentRepositoryMock = {
            findGarmentsByUserUuidAndCategory: jest.fn(async (..._args) => {
                return new PaginatedGarments(
                    [
                        garmentBuilder.withCategoryLabel('MAIN_TOP').build(),
                        garmentBuilder.withCategoryLabel('MAIN_TOP').build(),
                    ],
                    2,
                );
            }),
        };

        garmentBuilder = new GarmentBuilder();

        useCase = new GetUserGarmentsByCategory(
            garmentRepositoryMock as GarmentRepositoryInterface,
        );
    });

    it('should return garments by category successfully', async () => {
        const response = await useCase.execute({
            userUuid: 'user-uuid',
            category: 'MAIN_TOP',
            itemsPerPage: 10,
            page: 1,
        });

        expect(garmentRepositoryMock.findGarmentsByUserUuidAndCategory).toHaveBeenCalledWith(
            'user-uuid',
            'MAIN_TOP',
            {
                itemsPerPage: 10,
                page: 1,
            },
        );
        expect(response.totalItems).toEqual(2);
        expect(response.itemsPerPage).toEqual(10);
        expect(response.currentPage).toEqual(1);
    });
});
