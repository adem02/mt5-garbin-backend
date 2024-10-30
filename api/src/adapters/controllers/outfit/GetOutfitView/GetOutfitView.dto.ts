import { GetOutfitViewResponse } from '../../../../useCases/Outfit/GetOutfitView/GetOutfitView.response';

export class GetOutfitViewOutputDto {
    readonly name: string;
    readonly garments: {
        mainTop?: { name: string; imageUrl: string };
        bottom?: { name: string; imageUrl: string };
        subTop?: { name: string; imageUrl: string };
        shoes?: { name: string; imageUrl: string };
    };
    readonly creator: {
        username: string;
        firstname?: string;
        lastname?: string;
    };

    constructor(response: GetOutfitViewResponse) {
        this.name = response.name;
        this.garments = response.garments;
        this.creator = response.creator;
    }
}
