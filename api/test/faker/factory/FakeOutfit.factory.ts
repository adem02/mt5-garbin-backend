import { OutfitBuilder } from '../builder/Outfit.builder';
import { GarmentBuilder } from '../builder/Garment.builder';
import { SubTopGarment } from '../../../src/entities/SubTopGarment';
import { BottomGarment } from '../../../src/entities/BottomGarment';
import { Shoes } from '../../../src/entities/Shoes';
import { MainTopGarment } from '../../../src/entities/MainTopGarment';

export class FakeOutfitFactory {
    static createWithMainTopAndShoes(params: { name: string; userUuid: string }): OutfitBuilder {
        return new OutfitBuilder().withUserUuid(params.userUuid).withName(params.name);
    }

    static createWithTopAndBottomAndShoes(params: { uuid: string; name: string }): OutfitBuilder {
        const subTop = new GarmentBuilder()
            .withCategoryLabel('SUB_TOP')
            .withSubCategoryLabel('T-shirt')
            .build() as SubTopGarment;

        const bottom = new GarmentBuilder()
            .withCategoryLabel('BOTTOM')
            .withSubCategoryLabel('Jeans')
            .build() as BottomGarment;

        const shoes = new GarmentBuilder()
            .withCategoryLabel('SHOES')
            .withSubCategoryLabel('Sneakers')
            .build() as Shoes;

        return new OutfitBuilder()
            .withUuid(params.uuid)
            .withName(params.name)
            .withMainTop(null)
            .withSubTop(subTop)
            .withBottom(bottom)
            .withShoes(shoes);
    }

    static createWithAllGarments(params: { name: string; userUuid: string }): OutfitBuilder {
        const mainTop = new GarmentBuilder()
            .withCategoryLabel('MAIN_TOP')
            .withSubCategoryLabel('Dress')
            .build() as MainTopGarment;

        const subTop = new GarmentBuilder()
            .withCategoryLabel('SUB_TOP')
            .withSubCategoryLabel('T-shirt')
            .build() as SubTopGarment;

        const bottom = new GarmentBuilder()
            .withCategoryLabel('BOTTOM')
            .withSubCategoryLabel('Jeans')
            .build() as BottomGarment;

        const shoes = new GarmentBuilder()
            .withCategoryLabel('SHOES')
            .withSubCategoryLabel('Ankle_boots')
            .build() as Shoes;

        return new OutfitBuilder()
            .withUserUuid(params.userUuid)
            .withName(params.name)
            .withMainTop(mainTop)
            .withSubTop(subTop)
            .withBottom(bottom)
            .withShoes(shoes);
    }
}
