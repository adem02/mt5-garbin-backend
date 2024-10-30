import { GarmentInterface } from '../../entities/types/Garment.interface';
import { PaginatedGarments } from '../../entities/PaginatedGarments';
import { PaginationFilters } from '../../entities/types/PaginationFilters';
import { GarmentCategoryLabelType } from '../../entities/types/GarmentCategory.types';

export interface GarmentRepositoryInterface {
    create(garment: GarmentInterface): Promise<void>;
    findGarmentsByUserUuid(uuid: string, filters: PaginationFilters): Promise<PaginatedGarments>;
    findGarmentsByUserUuidAndCategory(
        uuid: string,
        category: GarmentCategoryLabelType,
        filters: PaginationFilters,
    ): Promise<PaginatedGarments>;
    getByUuid(uuid: string): Promise<GarmentInterface>;
    update(garment: GarmentInterface): Promise<void>;
    delete(uuid: string): Promise<void>;
    searchUserGarmentsByName(
        userUuid: string,
        searchTerm: string,
        filters: PaginationFilters,
    ): Promise<PaginatedGarments>;
}
