import { OutfitHistoryPlanInterface } from '../../../entities/types/Outfit.types';
import { GarmentInterface } from '../../../entities/types/Garment.interface';

export class GetUserOutfitDetailsResponse {
    constructor(
        public readonly outfitUuid: string,
        public readonly outfitName: string,
        public readonly outfitGarments: {
            mainTop: GarmentInterface | null;
            subTop: GarmentInterface | null;
            bottom: GarmentInterface | null;
            shoes: GarmentInterface | null;
        },
        public readonly outfitHistoryPlans: OutfitHistoryPlanInterface[],
    ) {}
}
