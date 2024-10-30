export class PlanOutfitResponse {
    constructor(
        public readonly uuid: string,
        public readonly name: string,
        public readonly outfitUuid: any,
        public readonly date: Date,
        public readonly location: string,
    ) {}
}
