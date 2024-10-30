import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateOutfitInputDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsUUID('4')
    mainTopGarmentUuid?: string;

    @IsOptional()
    @IsUUID('4')
    subTopGarmentUuid?: string;

    @IsOptional()
    @IsUUID('4')
    bottomGarmentUuid?: string;

    @IsOptional()
    @IsUUID('4')
    shoesGarmentUuid?: string;
}
