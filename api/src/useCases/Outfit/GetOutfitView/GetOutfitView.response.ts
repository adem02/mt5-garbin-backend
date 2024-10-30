import { OutfitDetailGarmentsInterface } from '../../../entities/types/Outfit.types';
import { UserResponseInterface } from '../../../entities/types/User.types';

export class GetOutfitViewResponse {
    constructor(
        public readonly name: string,
        public readonly garments: OutfitDetailGarmentsInterface,
        public readonly creator: UserResponseInterface,
    ) {}
}
