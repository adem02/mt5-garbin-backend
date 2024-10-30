import { IsString, MinLength } from 'class-validator';
import { PlanOutfitResponse } from '../../../../useCases/OutfitPlan/PlanOutfit/PlanOutfit.response';

export class PlanOutfitInputDto {
    @IsString()
    readonly date!: string;

    @IsString()
    @MinLength(2)
    readonly location!: string;

    @IsString()
    @MinLength(3)
    readonly name!: string;
}

export class PlanOutfitOutputDto {
    readonly uuid: string;
    readonly name: string;
    readonly outfitUuid: string;
    readonly date: Date;
    readonly location: string;

    constructor(response: PlanOutfitResponse) {
        this.uuid = response.uuid;
        this.name = response.name;
        this.outfitUuid = response.outfitUuid;
        this.date = response.date;
        this.location = response.location;
    }
}
