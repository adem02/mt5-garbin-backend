import { GetIncomingByOutfitUuidResponse } from '../../../../useCases/OutfitPlan/GetIncomingByOutfitUuid/GetIncomingByOutfitUuid.response';

export class GetIncomingByOutfitUuidOutputDto {
    readonly incomingPlans: {
        uuid: string;
        eventName: string;
        date: Date;
        location: string;
    }[];

    constructor(response: GetIncomingByOutfitUuidResponse) {
        this.incomingPlans = this.mapIncomingOutfitPlans(response);
    }

    private mapIncomingOutfitPlans(response: GetIncomingByOutfitUuidResponse): {
        uuid: string;
        eventName: string;
        date: Date;
        location: string;
    }[] {
        return response.data.map((incomingOutfitPlan) => {
            return {
                uuid: incomingOutfitPlan.uuid,
                eventName: incomingOutfitPlan.name,
                date: incomingOutfitPlan.date,
                location: incomingOutfitPlan.location,
            };
        });
    }
}
