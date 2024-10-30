import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';
import { GarmentSizeType } from '../../../../entities/types/GarmentSize.types';

export class UpdateGarmentInputDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    name?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    colors?: string[] | null;

    @IsOptional()
    size?: GarmentSizeType | null;

    @IsOptional()
    @IsString()
    brand?: string | null;
}
