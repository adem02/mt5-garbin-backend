import { SearchUserGarmentByNameResponse } from '../../../../useCases/Garment/SearchUserGarmentByName/SearchUserGarmentByName.response';
import { GarmentInterface } from '../../../../entities/types/Garment.interface';

export class SearchUserGarmentsByNameOutputDto {
    readonly garments: GarmentInterface[];
    readonly totalItems: number;
    readonly itemsPerPage: number;
    readonly currentPage: number;

    constructor(response: SearchUserGarmentByNameResponse) {
        this.garments = response.garments;
        this.totalItems = response.totalItems;
        this.itemsPerPage = response.itemsPerPage;
        this.currentPage = response.currentPage;
    }
}
