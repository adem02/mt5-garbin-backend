import { GarmentCategoryLabelType } from '../../../entities/types/GarmentCategory.types';

export interface GetUserGarmentsByCategoryRequest {
    userUuid: string;
    itemsPerPage: number;
    page: number;
    category: GarmentCategoryLabelType;
}
