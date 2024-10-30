import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateOutfitPlanInputDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    readonly name?: string;

    @IsOptional()
    @IsString()
    readonly date?: string;

    @IsOptional()
    @IsString()
    @MinLength(2)
    readonly location?: string;
}
