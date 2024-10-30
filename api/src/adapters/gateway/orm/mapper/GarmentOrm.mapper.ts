import { GarmentInterface } from '../../../../entities/types/Garment.interface';
import { GarmentEntity } from '../entity/Garment.entity';
import { GarmentCategory } from '../entity/GarmentCategory.entity';
import { Repository } from 'typeorm';
import { GarmentSubCategory } from '../entity/GarmentSubCategory.entity';
import DataSource from '../../../../frameworks/db/data-source';
import {
    GarmentCategoryLabelType,
    GarmentSubCategoryByCategoryLabelType,
} from '../../../../entities/types/GarmentCategory.types';
import { ApiError, ApiErrorCode } from '../../../../entities/error';
import {
    capitalizeFirstLetter,
    transformSubCategoryName,
} from '../../../../utilities/strTransformer';
import { injectable } from 'tsyringe';

@injectable()
export class GarmentOrmMapper {
    private readonly garmentCategoryRepository: Repository<GarmentCategory>;
    private readonly garmentSubCategoryRepository: Repository<GarmentSubCategory>;

    constructor() {
        this.garmentCategoryRepository = DataSource.getRepository(GarmentCategory);
        this.garmentSubCategoryRepository = DataSource.getRepository(GarmentSubCategory);
    }

    async toOrmEntity(garment: GarmentInterface): Promise<GarmentEntity> {
        const garmentCategory = await this.garmentCategoryRepository.findOneBy({
            name: transformSubCategoryName(garment.categoryLabel),
        });

        if (garmentCategory === null) {
            throw new ApiError(
                ApiErrorCode.BadRequest,
                'garment/invalid-category',
                'Garment category label not found',
            );
        }

        const garmentSubCategory = await this.garmentSubCategoryRepository.findOneBy({
            name: transformSubCategoryName(garment.subCategoryLabel),
        });

        if (garmentSubCategory === null) {
            throw new ApiError(
                ApiErrorCode.BadRequest,
                'garment/invalid-sub-category',
                'Garment sub category label not found',
            );
        }

        return new GarmentEntity(
            garment.uuid,
            garment.name,
            garment.userUuid,
            garmentCategory,
            garmentSubCategory,
            garment.imageUrl,
            garment.createdAt,
            garment.size?.value,
            garment.brand,
            garment.colors,
            garment.updatedAt,
        );
    }

    async toDomainEntity(garmentEntity: GarmentEntity): Promise<GarmentInterface> {
        return {
            uuid: garmentEntity.uuid,
            userUuid: garmentEntity.userUuid,
            name: garmentEntity.name,
            categoryLabel: garmentEntity.category.name.toUpperCase() as GarmentCategoryLabelType,
            subCategoryLabel: capitalizeFirstLetter(
                garmentEntity.subCategory.name,
            ) as GarmentSubCategoryByCategoryLabelType,
            imageUrl: garmentEntity.imageUrl,
            createdAt: garmentEntity.createdAt,
            size: garmentEntity.size ? { value: garmentEntity.size } : null,
            brand: garmentEntity.brand,
            colors: garmentEntity.colors,
            updatedAt: garmentEntity.updatedAt,
        };
    }

    async toCollectionDomain(garmentOrmEntities: GarmentEntity[]): Promise<GarmentInterface[]> {
        return Promise.all(
            garmentOrmEntities.map(
                async (garmentEntity) => await this.toDomainEntity(garmentEntity),
            ),
        );
    }
}
