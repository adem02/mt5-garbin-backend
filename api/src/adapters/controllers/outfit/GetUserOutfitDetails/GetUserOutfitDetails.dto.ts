import { GetUserOutfitDetailsResponse } from '../../../../useCases/Outfit/GetUserOutfitDetails/GetUserOutfitDetails.response';
import { GarmentInterface } from '../../../../entities/types/Garment.interface';

export class GetUserOutfitDetailsOutputDto {
    readonly uuid: string;
    readonly name: string;
    readonly garments: {
        mainTop: GarmentInterface | null;
        subTop: GarmentInterface | null;
        bottom: GarmentInterface | null;
        shoes: GarmentInterface | null;
    };
    readonly history: {
        name: string;
        date: Date;
        location: string;
    }[];

    constructor(response: GetUserOutfitDetailsResponse) {
        this.uuid = response.outfitUuid;
        this.name = response.outfitName;
        this.garments = response.outfitGarments;
        this.history = response.outfitHistoryPlans;
    }
}
