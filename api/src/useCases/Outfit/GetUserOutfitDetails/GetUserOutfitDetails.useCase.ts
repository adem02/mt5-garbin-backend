import { inject, injectable } from 'tsyringe';
import { OutfitPlanRepositoryToken, OutfitRepositoryToken } from '../../../utilities/constants';
import { OutfitRepositoryInterface } from '../../gateway/OutfitRepository.interface';
import { GetUserOutfitDetailsRequest } from './GetUserOutfitDetails.request';
import { OutfitPlanRepositoryInterface } from '../../gateway/OutfitPlanRepository.interface';
import { GetUserOutfitDetailsResponse } from './GetUserOutfitDetails.response';
import { OutfitHistoryPlanInterface } from '../../../entities/types/Outfit.types';
import { ApiError, ApiErrorCode } from '../../../entities/error';

@injectable()
export class GetUserOutfitDetails {
    constructor(
        @inject(OutfitRepositoryToken) private readonly outfitRepository: OutfitRepositoryInterface,
        @inject(OutfitPlanRepositoryToken)
        private readonly outfitPlanRepository: OutfitPlanRepositoryInterface,
    ) {}

    async execute(request: GetUserOutfitDetailsRequest): Promise<GetUserOutfitDetailsResponse> {
        const outfit = await this.outfitRepository.getByUuid(request.uuid);

        if (outfit.userUuid !== request.userUuid) {
            throw new ApiError(
                ApiErrorCode.Forbidden,
                'outfit/unauthorized-action',
                'Outfit does not belong to user',
            );
        }

        const outfitPlanHistory = await this.outfitPlanRepository.findOutfitPlanHistoryByOutfitUuid(
            outfit.uuid,
        );

        const outfitHistoryPlans: OutfitHistoryPlanInterface[] = outfitPlanHistory.map(
            (outfitPlan) => {
                return {
                    name: outfitPlan.name,
                    date: outfitPlan.date,
                    location: outfitPlan.location,
                };
            },
        );

        return new GetUserOutfitDetailsResponse(
            outfit.uuid,
            outfit.name,
            {
                mainTop: outfit.mainTop,
                subTop: outfit.subTop,
                bottom: outfit.bottom,
                shoes: outfit.shoes,
            },
            outfitHistoryPlans,
        );
    }
}
