export interface GarmentSizeInterface {
    value: GarmentSizeType;
}

export type TopGarmentSizeType = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type BottomGarmentSizeType = {
    waist: number;
    length: number;
};
export type ShoeGarmentSizeType = number;

export interface MainTopSizeInterface extends GarmentSizeInterface {
    value: TopGarmentSizeType;
}
export interface SubTopSizeInterface extends GarmentSizeInterface {
    value: TopGarmentSizeType;
}
export interface BottomSizeInterface extends GarmentSizeInterface {
    value: BottomGarmentSizeType;
}
export interface ShoesSizeInterface extends GarmentSizeInterface {
    value: ShoeGarmentSizeType;
}

export type GarmentSizeType = TopGarmentSizeType | BottomGarmentSizeType | ShoeGarmentSizeType;
