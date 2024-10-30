import { GarmentRepositoryInterface } from '../../gateway/GarmentRepository.interface';
import { GarmentFactory } from '../../../entities/factory/GarmentFactory';
import { CreateGarmentRequest } from './CreateGarment.request';
import { ResourceId } from '../../../utilities/ResourceId';
import { inject, injectable } from 'tsyringe';
import { GarmentRepositoryToken, StorageManagerToken } from '../../../utilities/constants';
import { GarmentInterface } from '../../../entities/types/Garment.interface';
import { StorageManagerInterface } from '../../gateway/StorageManager.interface';
import { ApiError, ApiErrorCode } from '../../../entities/error';

@injectable()
export class CreateGarment {
    constructor(
        @inject(GarmentRepositoryToken)
        private readonly garmentRepository: GarmentRepositoryInterface,
        @inject(StorageManagerToken)
        private readonly storageManager: StorageManagerInterface,
    ) {}

    async execute(request: CreateGarmentRequest): Promise<GarmentInterface> {
        let imageUrl: string;

        try {
            imageUrl = await this.storageManager.upload(request.image, request.imageFilePath);
        } catch (error) {
            throw new ApiError(
                ApiErrorCode.InternalError,
                'image/upload-failed',
                'Failed to upload image',
                error,
            );
        }

        const garment = GarmentFactory.createGarmentFromCategory({
            uuid: ResourceId.generateUuid(),
            userUuid: request.userUuid,
            name: request.name,
            categoryLabel: request.categoryLabel,
            subCategoryLabel: request.subCategoryLabel,
            imageUrl: imageUrl,
            colors: request.colors,
            size: request.size,
            brand: request.brand,
            createdAt: new Date(),
        });

        await this.garmentRepository.create(garment);

        return garment;
    }
}
