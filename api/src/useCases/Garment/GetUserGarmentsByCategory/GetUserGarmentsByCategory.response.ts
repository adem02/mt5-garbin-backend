import { GarmentInterface } from '../../../entities/types/Garment.interface';

export class GetUserGarmentsByCategoryResponse {
    constructor(
        public readonly garments: GarmentInterface[],
        public readonly totalItems: number,
        public readonly itemsPerPage: number,
        public readonly currentPage: number,
    ) {}
}
