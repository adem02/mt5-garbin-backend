import { GetUserOutfitsResponse } from '../../../../useCases/Outfit/GetUserOutfits/GetUserOutfits.response';

export class GetUserOutfitsOutputDto {
    readonly outfits: {
        uuid: string;
        name: string;
        garments: {
            mainTop?: { name: string; imageUrl: string };
            bottom?: { name: string; imageUrl: string };
            subTop?: { name: string; imageUrl: string };
            shoes?: { name: string; imageUrl: string };
        };
    }[];
    readonly totalItems: number;
    readonly itemsPerPage: number;
    readonly page: number;

    constructor(response: GetUserOutfitsResponse) {
        this.outfits = response.outfits;
        this.totalItems = response.totalItems;
        this.itemsPerPage = response.itemsPerPage;
        this.page = response.currentPage;
    }
}
