import { UserOutfitResponseInterface } from '../../../entities/types/Outfit.types';

export class GetUserOutfitsResponse {
    constructor(
        public readonly outfits: UserOutfitResponseInterface[],
        public readonly totalItems: number,
        public readonly itemsPerPage: number,
        public readonly currentPage: number,
    ) {}
}
