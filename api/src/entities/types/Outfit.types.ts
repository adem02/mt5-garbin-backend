import { GarmentInterface } from './Garment.interface';

export type OutfitValidationRule = () => void;

export interface OutfitDetailGarmentsInterface {
    mainTop?: Pick<GarmentInterface, 'name' | 'imageUrl'>;
    subTop?: Pick<GarmentInterface, 'name' | 'imageUrl'>;
    bottom?: Pick<GarmentInterface, 'name' | 'imageUrl'>;
    shoes?: Pick<GarmentInterface, 'name' | 'imageUrl'>;
}

export interface OutfitHistoryPlanInterface {
    name: string;
    date: Date;
    location: string;
}

export interface IncomingOutfitPlanInterface {
    uuid: string;
    name: string;
    date: Date;
    location: string;
}

export interface UserOutfitResponseInterface {
    uuid: string;
    name: string;
    garments: OutfitDetailGarmentsInterface;
}

export interface OutfitWithPlanHistoryCountInterface {
    uuid: string;
    userUuid: string;
    name: string;
    garments: OutfitDetailGarmentsInterface;
    planHistoryCount: number;
}
