import { GarmentInterface } from '../../../src/entities/types/Garment.interface';
import { ResourceId } from '../../../src/utilities/ResourceId';
import { MainTopGarment } from '../../../src/entities/MainTopGarment';
import { SubTopGarment } from '../../../src/entities/SubTopGarment';
import { BottomGarment } from '../../../src/entities/BottomGarment';
import { Shoes } from '../../../src/entities/Shoes';
import { Outfit } from '../../../src/entities/Outfit';
import { GarmentBuilder } from './Garment.builder';

export class OutfitBuilder {
    private uuid: string;
    private name: string;
    private userUuid: string;
    private readonly createdAt: Date;
    private mainTop: GarmentInterface | null;
    private subTop: GarmentInterface | null;
    private bottom: GarmentInterface | null;
    private shoes: GarmentInterface | null;
    private updatedAt?: Date | null;

    constructor() {
        this.uuid = ResourceId.generateUuid();
        this.name = 'new outfit';
        this.userUuid = 'userUuid';
        this.createdAt = new Date();
        this.mainTop = new GarmentBuilder().withSubCategoryLabel('Dress').build();
        this.subTop = null;
        this.bottom = null;
        this.shoes = new GarmentBuilder()
            .withCategoryLabel('SHOES')
            .withSubCategoryLabel('Ankle_boots')
            .build();
        this.updatedAt = null;
    }

    withUuid(uuid: string): OutfitBuilder {
        this.uuid = uuid;
        return this;
    }

    withUserUuid(userUuid: string): OutfitBuilder {
        this.userUuid = userUuid;
        return this;
    }

    withName(name: string): OutfitBuilder {
        this.name = name;
        return this;
    }

    withMainTop(mainTopGarmentUuid: MainTopGarment | null): OutfitBuilder {
        this.mainTop = mainTopGarmentUuid;
        return this;
    }

    withSubTop(subTopGarmentUuid: SubTopGarment | null): OutfitBuilder {
        this.subTop = subTopGarmentUuid;
        return this;
    }

    withBottom(bottomGarmentUuid: BottomGarment | null): OutfitBuilder {
        this.bottom = bottomGarmentUuid;
        return this;
    }

    withShoes(shoesGarmentUuid: Shoes): OutfitBuilder {
        this.shoes = shoesGarmentUuid;
        return this;
    }

    withUpdatedAt(updatedAt: Date): OutfitBuilder {
        this.updatedAt = updatedAt;
        return this;
    }

    build(): Outfit {
        return new Outfit(
            this.uuid,
            this.name,
            this.userUuid,
            this.createdAt,
            this.mainTop,
            this.subTop,
            this.bottom,
            this.shoes,
            this.updatedAt,
        );
    }
}
