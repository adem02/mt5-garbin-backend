import 'reflect-metadata';
import { GarmentRepositoryInterface } from '../../../../src/useCases/gateway/GarmentRepository.interface';
import { GetUserGarmentsRequest } from '../../../../src/useCases/Garment/GetUserGarments/GetUserGarments.request';
import { GetUserGarments } from '../../../../src/useCases/Garment/GetUserGarments/GetUserGarments.useCase';
import { PaginatedGarments } from '../../../../src/entities/PaginatedGarments';
import { GarmentBuilder } from '../../../faker/builder/Garment.builder';

describe('Unit: Get User Garments use case', () => {
    let getUserGarments: GetUserGarments;
    let garmentRepository: Partial<GarmentRepositoryInterface>;
    let request: GetUserGarmentsRequest;

    beforeEach(() => {
        garmentRepository = {
            findGarmentsByUserUuid: jest.fn(async () => {
                return new PaginatedGarments(
                    [
                        new GarmentBuilder()
                            .withCategoryLabel('MAIN_TOP')
                            .withSubCategoryLabel('Sweatshirt')
                            .build(),
                        new GarmentBuilder()
                            .withCategoryLabel('MAIN_TOP')
                            .withSubCategoryLabel('Dress')
                            .build(),
                        new GarmentBuilder()
                            .withCategoryLabel('SUB_TOP')
                            .withSubCategoryLabel('Tank_top')
                            .build(),
                        new GarmentBuilder()
                            .withCategoryLabel('SUB_TOP')
                            .withSubCategoryLabel('Polo')
                            .build(),
                    ],
                    4,
                );
            }),
        };

        request = {
            userUuid: 'user-uuid',
            itemsPerPage: 10,
            page: 1,
        };
        getUserGarments = new GetUserGarments(garmentRepository as GarmentRepositoryInterface);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a list of garments', async () => {
        const response = await getUserGarments.execute(request);

        expect(garmentRepository.findGarmentsByUserUuid).toHaveBeenCalledWith(request.userUuid, {
            itemsPerPage: request.itemsPerPage,
            page: request.page,
        });
        expect(response.totalItems).toEqual(4);
        expect(response.itemsPerPage).toEqual(10);
        expect(response.currentPage).toEqual(1);
    });
});
