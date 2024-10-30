import { inject, injectable } from 'tsyringe';
import { OutfitPlanRepositoryToken } from '../../../utilities/constants';
import { OutfitPlanRepositoryInterface } from '../../gateway/OutfitPlanRepository.interface';
import { DeleteOutfitByUuidRequest } from '../../Outfit/DeleteOutfitByUuid/DeleteOutfitByUuid.request';
import { ApiError, ApiErrorCode } from '../../../entities/error';

@injectable()
export class DeleteOutfitPlanByUuid {
    constructor(
        @inject(OutfitPlanRepositoryToken)
        private readonly outfitPlanRepository: OutfitPlanRepositoryInterface,
    ) {}

    async execute(request: DeleteOutfitByUuidRequest): Promise<void> {
        const outfitPlanToDelete = await this.outfitPlanRepository.getByUuid(request.uuid);

        if (request.userUuid !== outfitPlanToDelete.userUuid) {
            throw new ApiError(
                ApiErrorCode.Unauthorized,
                'outfit/unauthorized-action',
                'You are not authorized to delete this outfit plan',
            );
        }

        await this.outfitPlanRepository.deleteByUuid(outfitPlanToDelete.uuid);
    }
}
