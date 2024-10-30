import { GarmentSizeInterface } from '../../../entities/types/GarmentSize.types';

export interface UpdateGarmentRequest {
    uuid: string;
    userUuid: string;
    name?: string;
    colors?: string[] | null;
    size?: GarmentSizeInterface | null;
    brand?: string | null;
}
