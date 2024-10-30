import { GarmentBuilder } from '../builder/Garment.builder';

type MainTopSubCategoryType =
    | 'Dress'
    | 'Jacket'
    | 'Coat'
    | 'Bomber'
    | 'Vest'
    | 'Sweater'
    | 'Sweatshirt'
    | 'Down_jacket';
type SubTopSubCategoryType =
    | 'Shirt'
    | 'T-shirt'
    | 'Polo'
    | 'Tank_top'
    | 'Short_sleeve_shirt'
    | 'Sport_top'
    | 'Sleeveless_top';
type BottomSubCategoryType =
    | 'Pants'
    | 'Skirt'
    | 'Shorts'
    | 'Leggings'
    | 'Jeans'
    | 'Bermuda_shorts'
    | 'Jogging_pants'
    | 'Overalls'
    | 'Cargo_pants';
type ShoesSubCategoryType =
    | 'Sneakers'
    | 'Sandals'
    | 'Boots'
    | 'Dress_shoes'
    | 'Loafers'
    | 'Espadrilles'
    | 'Flip-flops'
    | 'Ankle_boots'
    | 'Sports_shoes'
    | 'Hiking_shoes'
    | 'Flats';

export class FakeGarmentFactory {
    static createMainTop(params: {
        name: string;
        userUuid: string;
        subCategoryLabel: MainTopSubCategoryType;
    }): GarmentBuilder {
        return new GarmentBuilder()
            .withUserUuid(params.userUuid)
            .withName(params.name)
            .withCategoryLabel('MAIN_TOP')
            .withSubCategoryLabel(params.subCategoryLabel);
    }

    static createSubTop(params: {
        name: string;
        userUuid: string;
        subCategoryLabel: SubTopSubCategoryType;
    }): GarmentBuilder {
        return new GarmentBuilder()
            .withUserUuid(params.userUuid)
            .withName(params.name)
            .withCategoryLabel('SUB_TOP')
            .withSubCategoryLabel(params.subCategoryLabel);
    }

    static createBottom(params: {
        name: string;
        userUuid: string;
        subCategoryLabel: BottomSubCategoryType;
    }): GarmentBuilder {
        return new GarmentBuilder()
            .withUserUuid(params.userUuid)
            .withName(params.name)
            .withCategoryLabel('BOTTOM')
            .withSubCategoryLabel(params.subCategoryLabel);
    }

    static createShoes(params: {
        name: string;
        userUuid: string;
        subCategoryLabel: ShoesSubCategoryType;
    }): GarmentBuilder {
        return new GarmentBuilder()
            .withUserUuid(params.userUuid)
            .withName(params.name)
            .withCategoryLabel('SHOES')
            .withSubCategoryLabel(params.subCategoryLabel);
    }
}
