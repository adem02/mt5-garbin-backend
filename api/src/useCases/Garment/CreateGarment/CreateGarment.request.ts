import {
    GarmentCategoryLabelType,
    GarmentSubCategoryByCategoryLabelType,
} from '../../../entities/types/GarmentCategory.types';
import { GarmentSizeInterface } from '../../../entities/types/GarmentSize.types';

export interface CreateGarmentRequest {
    userUuid: string;
    name: string;
    categoryLabel: GarmentCategoryLabelType;
    subCategoryLabel: GarmentSubCategoryByCategoryLabelType;
    image: Buffer;
    imageFilePath: string;
    colors?: string[] | null;
    size?: GarmentSizeInterface | null;
    brand?: string | null;
}
