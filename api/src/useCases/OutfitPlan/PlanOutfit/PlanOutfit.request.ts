export interface PlanOutfitRequest {
    userUuid: string;
    outfitUuid: string;
    date: string;
    eventName: string;
    location: string;
    imageUrl?: string;
}
