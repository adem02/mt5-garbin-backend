import { GarmentSizeType } from '../../../../entities/types/GarmentSize.types';
import { IsArray, IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import { GarmentSubCategoryMappedByCategoryLabel } from '../../../../utilities/constants/garmentSubCategory.constants';
import { GarmentInterface } from '../../../../entities/types/Garment.interface';

export class CreateGarmentInputDto {
    @IsString()
    @MinLength(3)
    name!: string;

    @IsString()
    @IsIn(Object.keys(GarmentSubCategoryMappedByCategoryLabel), {
        message: 'Invalid garment category',
    })
    categoryLabel!: string;

    @IsString()
    subCategoryLabel!: string;

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

export class CreateGarmentOutputDto {
    uuid: string;
    userUuid: string;
    name: string;
    categoryLabel: string;
    subCategoryLabel: string;
    imageUrl: string;
    colors?: string[] | null;
    size?: GarmentSizeType | null;
    brand?: string | null;
    createdAt: Date;
    updatedAt?: Date | null;

    constructor(response: GarmentInterface) {
        this.uuid = response.uuid;
        this.userUuid = response.userUuid;
        this.name = response.name;
        this.categoryLabel = response.categoryLabel;
        this.subCategoryLabel = response.subCategoryLabel;
        this.imageUrl = response.imageUrl;
        this.colors = response.colors;
        this.size = response.size?.value;
        this.brand = response.brand;
        this.createdAt = response.createdAt;
        this.updatedAt = response.updatedAt;
    }
}
