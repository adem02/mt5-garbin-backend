import { GarmentInterface } from './types/Garment.interface';
import { ApiError, ApiErrorCode } from './error';
import {
    GarmentCategoryLabelType,
    GarmentSubCategoryByCategoryLabelType,
} from './types/GarmentCategory.types';
import { BottomSizeInterface } from './types/GarmentSize.types';

export class BottomGarment implements GarmentInterface {
    private constructor(
        public readonly uuid: string,
        public readonly userUuid: string,
        public readonly name: string,
        public readonly categoryLabel: GarmentCategoryLabelType,
        public readonly subCategoryLabel: GarmentSubCategoryByCategoryLabelType,
        public readonly imageUrl: string,
        public readonly createdAt: Date,
        public readonly colors?: string[] | null,
        public readonly size?: BottomSizeInterface | null,
        public readonly brand?: string | null,
        public readonly updatedAt?: Date | null,
    ) {}

    static create(params: GarmentInterface): BottomGarment {
        if (params.categoryLabel !== 'BOTTOM') {
            throw new ApiError(
                ApiErrorCode.BadRequest,
                'garment/invalid-category',
                'Category is not BOTTOM',
            );
        }

        return new BottomGarment(
            params.uuid,
            params.userUuid,
            params.name,
            params.categoryLabel,
            params.subCategoryLabel,
            params.imageUrl,
            params.createdAt,
            params.colors,
            params.size as BottomSizeInterface,
            params.brand,
            params.updatedAt,
        );
    }
}
