export interface UpdateOutfitRequest {
    uuid: string;
    userUuid: string;
    name?: string;
    mainTopGarmentUuid?: string;
    subTopGarmentUuid?: string;
    bottomGarmentUuid?: string;
    shoesGarmentUuid?: string;
}
