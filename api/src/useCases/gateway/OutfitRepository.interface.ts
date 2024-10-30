import { Outfit } from '../../entities/Outfit';
import { PaginatedEntities } from '../../entities/PaginatedEntities';
import { UserOutfitResponseInterface } from '../../entities/types/Outfit.types';
import { PaginationFilters } from '../../entities/types/PaginationFilters';

export interface OutfitRepositoryInterface {
    create(outfit: Outfit): Promise<void>;
    getByUuid(uuid: string): Promise<Outfit>;
    update(outfit: Outfit): Promise<void>;
    deleteByUuid(uuid: string): Promise<void>;
    findByUserUuid(
        userUuid: string,
        filters: PaginationFilters,
    ): Promise<PaginatedEntities<UserOutfitResponseInterface>>;
}
