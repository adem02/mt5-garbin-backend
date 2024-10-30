export class OutfitPlan {
    constructor(
        public readonly uuid: string,
        public readonly name: string,
        public readonly userUuid: string,
        public readonly outfitUuid: string,
        public readonly date: Date,
        public readonly createdAt: Date,
        public readonly location: string,
        public readonly updatedAt?: Date | null,
    ) {}
}
