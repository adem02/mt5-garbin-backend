import { inject, injectable } from 'tsyringe';
import { OutfitRepositoryToken } from '../../../utilities/constants';
import { OutfitRepositoryInterface } from '../../gateway/OutfitRepository.interface';
import { GetUserOutfitsRequest } from './GetUserOutfits.request';
import { GetUserOutfitsResponse } from './GetUserOutfits.response';

@injectable()
export class GetUserOutfits {
    constructor(
        @inject(OutfitRepositoryToken) private readonly outfitRepository: OutfitRepositoryInterface,
    ) {}

    async execute(request: GetUserOutfitsRequest): Promise<GetUserOutfitsResponse> {
        const userOutfits = await this.outfitRepository.findByUserUuid(request.userUuid, {
            itemsPerPage: request.itemsPerPage,
            page: request.page,
        });

        return new GetUserOutfitsResponse(
            userOutfits.data,
            userOutfits.totalItems,
            request.itemsPerPage,
            request.page,
        );
    }
}
