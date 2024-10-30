import { GarmentInterface } from '../types/Garment.interface';
import { MainTopGarment } from '../MainTopGarment';
import { Shoes } from '../Shoes';
import { BottomGarment } from '../BottomGarment';
import { SubTopGarment } from '../SubTopGarment';
import { ApiError, ApiErrorCode } from '../error';
import { GarmentSubCategoryMappedByCategoryLabel } from '../../utilities/constants/garmentSubCategory.constants';

export class GarmentFactory {
    static createGarmentFromCategory(params: GarmentInterface): GarmentInterface {
        if (
            !GarmentSubCategoryMappedByCategoryLabel[params.categoryLabel]?.includes(
                params.subCategoryLabel as never,
            )
        ) {
            throw new ApiError(
                ApiErrorCode.BadRequest,
                'garment/invalid-sub-category',
                'Sub category is not valid for ' + params.categoryLabel,
            );
        }

        switch (params.categoryLabel) {
            case 'MAIN_TOP':
                return MainTopGarment.create(params);
            case 'SUB_TOP':
                return SubTopGarment.create(params);
            case 'BOTTOM':
                return BottomGarment.create(params);
            case 'SHOES':
                return Shoes.create(params);
            default:
                throw new ApiError(
                    ApiErrorCode.BadRequest,
                    'garment/invalid-category',
                    'Unknown garment category',
                );
        }
    }
}
