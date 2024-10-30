import { IsOptional, IsString, MinLength } from 'class-validator';
import { CreateOutfitResponse } from '../../../../useCases/Outfit/CreateOutfit/CreateOutfit.response';

export class CreateOutfitInputDto {
    @IsString()
    @MinLength(3)
    name!: string;

    @IsOptional()
    @IsString()
    mainTopUuid?: string;

    @IsOptional()
    @IsString()
    subTopUuid?: string;

    @IsOptional()
    @IsString()
    bottomUuid?: string;

    @IsOptional()
    @IsString()
    shoesUuid?: string;
}

export class CreateOutfitOutputDto {
    readonly uuid: string;
    readonly name: string;
    readonly garments: {
        mainTop?: { name: string; imageUrl: string };
        subTop?: { name: string; imageUrl: string };
        bottom?: { name: string; imageUrl: string };
        shoes?: { name: string; imageUrl: string };
    };

    constructor(response: CreateOutfitResponse) {
        this.uuid = response.uuid;
        this.name = response.name;
        this.garments = response.garments;
    }
}
