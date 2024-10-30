import { Outfit } from '../../../entities/Outfit';
import {
    OutfitDetailGarmentsInterface,
    UserOutfitResponseInterface,
} from '../../../entities/types/Outfit.types';

export class CreateOutfitResponse implements UserOutfitResponseInterface {
    readonly uuid: string;
    readonly name: string;
    readonly garments: OutfitDetailGarmentsInterface;

    constructor(response: Outfit) {
        this.uuid = response.uuid;
        this.name = response.name;
        this.garments = {
            mainTop: response.mainTop
                ? {
                      name: response.mainTop.name,
                      imageUrl: response.mainTop.imageUrl,
                  }
                : undefined,
            subTop: response.subTop
                ? {
                      name: response.subTop.name,
                      imageUrl: response.subTop.imageUrl,
                  }
                : undefined,
            bottom: response.bottom
                ? {
                      name: response.bottom.name,
                      imageUrl: response.bottom.imageUrl,
                  }
                : undefined,
            shoes: response.shoes
                ? {
                      name: response.shoes.name,
                      imageUrl: response.shoes.imageUrl,
                  }
                : undefined,
        };
    }
}
