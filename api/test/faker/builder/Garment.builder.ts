import {
    GarmentCategoryLabelType,
    GarmentSubCategoryByCategoryLabelType,
} from '../../../src/entities/types/GarmentCategory.types';
import { GarmentSizeInterface } from '../../../src/entities/types/GarmentSize.types';
import { GarmentInterface } from '../../../src/entities/types/Garment.interface';
import { GarmentFactory } from '../../../src/entities/factory/GarmentFactory';
import { ResourceId } from '../../../src/utilities/ResourceId';

export class GarmentBuilder {
    private uuid: string;
    private userUuid: string;
    private name: string;
    private categoryLabel: GarmentCategoryLabelType;
    private subCategoryLabel: GarmentSubCategoryByCategoryLabelType;
    private imageUrl: string;
    private createdAt: Date;
    private size: GarmentSizeInterface;
    private brand: string;
    private colors: string[];
    private updatedAt: Date;

    constructor() {
        this.uuid = ResourceId.generateUuid();
        this.userUuid = ResourceId.generateUuid();
        this.name = 'name';
        this.categoryLabel = 'MAIN_TOP';
        this.subCategoryLabel = 'Down_jacket';
        this.imageUrl = 'imageUrl';
        this.createdAt = new Date();
        this.size = { value: 'M' };
        this.brand = 'brand';
        this.colors = ['blue'];
        this.updatedAt = new Date();
    }

    withUuid(uuid: string): GarmentBuilder {
        this.uuid = uuid;
        return this;
    }

    withUserUuid(userUuid: string): GarmentBuilder {
        this.userUuid = userUuid;
        return this;
    }

    withName(name: string): GarmentBuilder {
        this.name = name;
        return this;
    }

    withCategoryLabel(categoryLabel: GarmentCategoryLabelType): GarmentBuilder {
        this.categoryLabel = categoryLabel;
        return this;
    }

    withSubCategoryLabel(subCategoryLabel: GarmentSubCategoryByCategoryLabelType): GarmentBuilder {
        this.subCategoryLabel = subCategoryLabel;
        return this;
    }

    withImageUrl(imageUrl: string): GarmentBuilder {
        this.imageUrl = imageUrl;
        return this;
    }

    withCreatedAt(createdAt: Date): GarmentBuilder {
        this.createdAt = createdAt;
        return this;
    }

    withSize(size: GarmentSizeInterface): GarmentBuilder {
        this.size = size;
        return this;
    }

    withBrand(brand: string): GarmentBuilder {
        this.brand = brand;
        return this;
    }

    withColors(colors: string[]): GarmentBuilder {
        this.colors = colors;
        return this;
    }

    withUpdatedAt(updatedAt: Date): GarmentBuilder {
        this.updatedAt = updatedAt;
        return this;
    }

    build(): GarmentInterface {
        return GarmentFactory.createGarmentFromCategory({
            uuid: this.uuid,
            userUuid: this.userUuid,
            name: this.name,
            categoryLabel: this.categoryLabel,
            subCategoryLabel: this.subCategoryLabel,
            imageUrl: this.imageUrl,
            createdAt: this.createdAt,
            size: this.size,
            brand: this.brand,
            colors: this.colors,
            updatedAt: this.updatedAt,
        });
    }
}
