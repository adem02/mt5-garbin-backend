import { inject, injectable } from 'tsyringe';
import { OutfitRepositoryToken, UserRepository } from '../../../utilities/constants';
import { OutfitRepositoryInterface } from '../../gateway/OutfitRepository.interface';
import { GetOutfitViewRequest } from './GetOutfitView.request';
import { GetOutfitViewResponse } from './GetOutfitView.response';
import { OutfitDetailGarmentsInterface } from '../../../entities/types/Outfit.types';
import { UserResponseInterface } from '../../../entities/types/User.types';
import { UserRepositoryInterface } from '../../gateway/UserRepository.interface';

@injectable()
export class GetOutfitView {
    constructor(
        @inject(OutfitRepositoryToken) private readonly outfitRepository: OutfitRepositoryInterface,
        @inject(UserRepository) private readonly userRepository: UserRepositoryInterface,
    ) {}

    async execute(request: GetOutfitViewRequest): Promise<GetOutfitViewResponse> {
        const outfit = await this.outfitRepository.getByUuid(request.uuid);
        const user = await this.userRepository.getByUuid(outfit.userUuid);

        const garments: OutfitDetailGarmentsInterface = {
            mainTop: outfit.mainTop
                ? { name: outfit.mainTop.name, imageUrl: outfit.mainTop.imageUrl }
                : undefined,
            bottom: outfit.bottom
                ? { name: outfit.bottom.name, imageUrl: outfit.bottom.imageUrl }
                : undefined,
            subTop: outfit.subTop
                ? { name: outfit.subTop.name, imageUrl: outfit.subTop.imageUrl }
                : undefined,
            shoes: outfit.shoes
                ? { name: outfit.shoes.name, imageUrl: outfit.shoes.imageUrl }
                : undefined,
        };

        const creator: UserResponseInterface = {
            username: user.username,
            firstname: user.firstname || undefined,
            lastname: user.lastname || undefined,
        };

        return new GetOutfitViewResponse(outfit.name, garments, creator);
    }
}
