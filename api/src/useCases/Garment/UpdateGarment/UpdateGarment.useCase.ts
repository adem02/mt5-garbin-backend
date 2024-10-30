import { inject, injectable } from 'tsyringe';
import { GarmentRepositoryToken } from '../../../utilities/constants';
import { GarmentRepositoryInterface } from '../../gateway/GarmentRepository.interface';
import { UpdateGarmentRequest } from './UpdateGarment.request';
import { GarmentFactory } from '../../../entities/factory/GarmentFactory';
import { ApiError, ApiErrorCode } from '../../../entities/error';

@injectable()
export class UpdateGarment {
    constructor(
        @inject(GarmentRepositoryToken)
        private readonly garmentRepository: GarmentRepositoryInterface,
    ) {}

    async execute(request: UpdateGarmentRequest): Promise<void> {
        const garmentToUpdate = await this.garmentRepository.getByUuid(request.uuid);

        if (garmentToUpdate.userUuid !== request.userUuid) {
            throw new ApiError(
                ApiErrorCode.Unauthorized,
                'garment/unauthorized-action',
                'Unauthorized to update this garment',
            );
        }

        const updatedGarment = GarmentFactory.createGarmentFromCategory({
            uuid: request.uuid,
            userUuid: garmentToUpdate.userUuid,
            name: request.name || garmentToUpdate.name,
            categoryLabel: garmentToUpdate.categoryLabel,
            subCategoryLabel: garmentToUpdate.subCategoryLabel,
            brand: request.brand || garmentToUpdate.brand,
            size: request.size || garmentToUpdate.size,
            imageUrl: garmentToUpdate.imageUrl,
            colors: request.colors || garmentToUpdate.colors,
            createdAt: garmentToUpdate.createdAt,
            updatedAt: new Date(),
        });

        await this.garmentRepository.update(updatedGarment);
    }
}
