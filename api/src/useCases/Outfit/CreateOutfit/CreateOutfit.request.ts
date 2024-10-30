export interface CreateOutfitRequest {
    name: string;
    mainTopGarmentUuid?: string;
    subTopGarmentUuid?: string;
    bottomGarmentUuid?: string;
    shoesGarmentUuid?: string;
    userUuid: string;
}
