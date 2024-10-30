import { GarmentInterface } from '../../../../entities/types/Garment.interface';
import { GetUserGarmentsResponse } from '../../../../useCases/Garment/GetUserGarments/GetUserGarments.response';

export class GetUserGarmentsOutputDto {
    readonly garments: GarmentInterface[];
    readonly totalItems: number;
    readonly itemsPerPage: number;
    readonly currentPage: number;

    constructor(response: GetUserGarmentsResponse) {
        this.garments = response.garments;
        this.totalItems = response.totalItems;
        this.itemsPerPage = response.itemsPerPage;
        this.currentPage = response.currentPage;
    }
}
