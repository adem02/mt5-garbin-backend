import { IncomingOutfitPlanInterface } from '../../../entities/types/Outfit.types';

export class GetIncomingByOutfitUuidResponse {
    constructor(public readonly data: IncomingOutfitPlanInterface[]) {}
}
