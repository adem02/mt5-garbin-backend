import { GarmentInterface } from './types/Garment.interface';

export class PaginatedGarments {
    constructor(
        public readonly garments: GarmentInterface[],
        public readonly totalItems: number,
    ) {}
}
