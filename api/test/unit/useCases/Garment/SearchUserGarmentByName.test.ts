import 'reflect-metadata';
import { SearchUserGarmentByName } from '../../../../src/useCases/Garment/SearchUserGarmentByName/SearchUserGarmentByName.useCase';
import { GarmentRepositoryInterface } from '../../../../src/useCases/gateway/GarmentRepository.interface';
import { SearchUserGarmentByNameRequest } from '../../../../src/useCases/Garment/SearchUserGarmentByName/SearchUserGarmentByName.request';
import { PaginatedGarments } from '../../../../src/entities/PaginatedGarments';
import { GarmentBuilder } from '../../../faker/builder/Garment.builder';

describe('Unit: Search Garment by Name use case', () => {
    let useCase: SearchUserGarmentByName;
    let garmentRepositoryMock: Partial<GarmentRepositoryInterface>;
    let request: SearchUserGarmentByNameRequest;
    const garmentBuilder: GarmentBuilder = new GarmentBuilder();

    beforeEach(() => {
        garmentRepositoryMock = {
            searchUserGarmentsByName: jest.fn(async () => {
                return new PaginatedGarments(
                    [
                        garmentBuilder.withName('my-first-garment').build(),
                        garmentBuilder.withName('my-second-garment').build(),
                        garmentBuilder.withName('my-third-garment').build(),
                    ],
                    3,
                );
            }),
        };

        request = {
            userUuid: 'user-uuid',
            name: 'garment',
            itemsPerPage: 10,
            page: 1,
        };

        useCase = new SearchUserGarmentByName(garmentRepositoryMock as GarmentRepositoryInterface);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should search garment by name successfully', async () => {
        const response = await useCase.execute(request);

        expect(garmentRepositoryMock.searchUserGarmentsByName).toHaveBeenCalledWith(
            request.userUuid,
            request.name,
            {
                itemsPerPage: request.itemsPerPage,
                page: request.page,
            },
        );
        response.garments.forEach((garment) => {
            expect(garment.name).toEqual(expect.stringContaining(request.name));
        });
        expect(response.totalItems).toEqual(3);
        expect(response.itemsPerPage).toEqual(10);
        expect(response.currentPage).toEqual(1);
    });
});
