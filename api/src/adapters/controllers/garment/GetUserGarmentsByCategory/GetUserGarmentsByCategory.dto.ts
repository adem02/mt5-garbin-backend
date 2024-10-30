import { GarmentInterface } from '../../../../entities/types/Garment.interface';
import { GetUserGarmentsByCategoryResponse } from '../../../../useCases/Garment/GetUserGarmentsByCategory/GetUserGarmentsByCategory.response';

export class GetUserGarmentsByCategoryOutputDto {
    garments: GarmentInterface[];
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;

    constructor(response: GetUserGarmentsByCategoryResponse) {
        this.garments = response.garments;
        this.totalItems = response.totalItems;
        this.itemsPerPage = response.itemsPerPage;
        this.currentPage = response.currentPage;
    }
}
