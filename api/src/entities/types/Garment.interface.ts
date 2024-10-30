import { GarmentSizeInterface } from './GarmentSize.types';
import {
    GarmentCategoryLabelType,
    GarmentSubCategoryByCategoryLabelType,
} from './GarmentCategory.types';

export interface GarmentInterface {
    uuid: string;
    userUuid: string;
    name: string;
    categoryLabel: GarmentCategoryLabelType;
    subCategoryLabel: GarmentSubCategoryByCategoryLabelType;
    imageUrl: string;
    createdAt: Date;
    colors?: string[] | null;
    size?: GarmentSizeInterface | null;
    brand?: string | null;
    updatedAt?: Date | null;
}
