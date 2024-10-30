import 'reflect-metadata';
import { GarmentRepositoryInterface } from '../../../../src/useCases/gateway/GarmentRepository.interface';
import { UpdateGarmentRequest } from '../../../../src/useCases/Garment/UpdateGarment/UpdateGarment.request';
import { GarmentBuilder } from '../../../faker/builder/Garment.builder';
import { UpdateGarment } from '../../../../src/useCases/Garment/UpdateGarment/UpdateGarment.useCase';
import { GarmentInterface } from '../../../../src/entities/types/Garment.interface';
import { ResourceId } from '../../../../src/utilities/ResourceId';

describe('Unit: Update Garment use case', () => {
    let useCase: UpdateGarment;
    let garmentRepositoryMock: Partial<GarmentRepositoryInterface>;
    let request: UpdateGarmentRequest;
    const garmentBuilder: GarmentBuilder = new GarmentBuilder();

    beforeEach(() => {
        garmentRepositoryMock = {
            update: jest.fn(async (_updatedGarment: GarmentInterface) => {}),
            getByUuid: jest.fn(async (_uuid: string) => {
                return garmentBuilder
                    .withUserUuid('user-uuid')
                    .withCategoryLabel('MAIN_TOP')
                    .withSubCategoryLabel('Sweatshirt')
                    .build();
            }),
        };

        request = {
            userUuid: 'user-uuid',
            uuid: 'garment-uuid',
            name: 'Sweatshirt',
            size: {
                value: 'M',
            },
            colors: ['Blue'],
            brand: 'Nike',
        };

        useCase = new UpdateGarment(garmentRepositoryMock as GarmentRepositoryInterface);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update a garment', async () => {
        await useCase.execute(request);

        expect(garmentRepositoryMock.getByUuid).toHaveBeenCalledWith(request.uuid);
        expect(garmentRepositoryMock.update).toHaveBeenCalledWith({
            uuid: request.uuid,
            userUuid: request.userUuid,
            name: request.name,
            brand: request.brand,
            size: request.size,
            categoryLabel: 'MAIN_TOP',
            subCategoryLabel: 'Sweatshirt',
            imageUrl: 'imageUrl',
            colors: request.colors,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });

    it('should throw an error if the user is not authorized to update the garment', async () => {
        request.userUuid = ResourceId.generateUuid();

        await expect(useCase.execute(request)).rejects.toThrow(
            'Unauthorized to update this garment',
        );
    });
});
