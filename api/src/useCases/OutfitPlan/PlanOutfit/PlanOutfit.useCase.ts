import { inject, injectable } from 'tsyringe';
import { OutfitPlanRepositoryToken, OutfitRepositoryToken } from '../../../utilities/constants';
import { OutfitPlanRepositoryInterface } from '../../gateway/OutfitPlanRepository.interface';
import { OutfitRepositoryInterface } from '../../gateway/OutfitRepository.interface';
import { PlanOutfitRequest } from './PlanOutfit.request';
import { ResourceId } from '../../../utilities/ResourceId';
import { OutfitPlan } from '../../../entities/OutfitPlan';
import { ApiError, ApiErrorCode } from '../../../entities/error';
import { PlanOutfitResponse } from './PlanOutfit.response';

@injectable()
export class PlanOutfit {
    constructor(
        @inject(OutfitPlanRepositoryToken)
        private readonly planOutfitRepository: OutfitPlanRepositoryInterface,
        @inject(OutfitRepositoryToken) private readonly outfitRepository: OutfitRepositoryInterface,
    ) {}

    async execute(request: PlanOutfitRequest): Promise<PlanOutfitResponse> {
        const outfit = await this.outfitRepository.getByUuid(request.outfitUuid);

        if (outfit.userUuid !== request.userUuid) {
            throw new ApiError(
                ApiErrorCode.Forbidden,
                'outfit/unauthorized-action',
                'Outfit does not belong to user',
            );
        }

        const plannedDate = new Date(request.date);

        if (isNaN(plannedDate.getTime())) {
            throw new ApiError(ApiErrorCode.BadRequest, 'outfit-plan/invalid-date', 'Invalid date');
        }

        if (plannedDate <= new Date()) {
            throw new ApiError(
                ApiErrorCode.BadRequest,
                'outfit-plan/unauthorized-action',
                'Cannot plan outfit for past dates',
            );
        }

        const outfitPlan = new OutfitPlan(
            ResourceId.generateUuid(),
            request.eventName,
            request.userUuid,
            outfit.uuid,
            plannedDate,
            new Date(),
            request.location,
        );

        await this.planOutfitRepository.create(outfitPlan);

        return new PlanOutfitResponse(
            outfitPlan.uuid,
            outfitPlan.name,
            outfitPlan.outfitUuid,
            outfitPlan.date,
            outfitPlan.location,
        );
    }
}
