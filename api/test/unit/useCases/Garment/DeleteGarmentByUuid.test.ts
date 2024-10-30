import 'reflect-metadata';
import { DeleteGarmentByUuid } from '../../../../src/useCases/Garment/DeleteGarmentByUuid/DeleteGarmentByUuid.useCase';
import { GarmentBuilder } from '../../../faker/builder/Garment.builder';
import { GarmentRepositoryInterface } from '../../../../src/useCases/gateway/GarmentRepository.interface';

describe('Unit: Delete Garment By Uuid', () => {
    let garmentRepositoryMock: Partial<GarmentRepositoryInterface>;
    let useCase: DeleteGarmentByUuid;
    let garmentBuilder: GarmentBuilder = new GarmentBuilder();

    beforeEach(() => {
        garmentRepositoryMock = {
            delete: jest.fn(async (_uuid: string) => {}),
            getByUuid: jest.fn(async (_uuid: string) => {
                return garmentBuilder
                    .withUuid('garment-uuid')
                    .withUserUuid('user-uuid')
                    .withCategoryLabel('MAIN_TOP')
                    .withSubCategoryLabel('Sweatshirt')
                    .build();
            }),
        };

        garmentBuilder = new GarmentBuilder();

        useCase = new DeleteGarmentByUuid(garmentRepositoryMock as GarmentRepositoryInterface);
    });

    it('should delete a garment by uuid successfully', async () => {
        await useCase.execute({
            userUuid: 'user-uuid',
            uuid: 'garment-uuid',
        });

        expect(garmentRepositoryMock.getByUuid).toHaveBeenCalledWith('garment-uuid');
        expect(garmentRepositoryMock.delete).toHaveBeenCalledWith('garment-uuid');
    });

    it('should throw an error when trying to delete a garment that does not belong to the user', async () => {
        await expect(
            useCase.execute({
                userUuid: 'another-user-uuid',
                uuid: 'garment-uuid',
            }),
        ).rejects.toThrow('Unauthorized to delete this garment');
    });
});
