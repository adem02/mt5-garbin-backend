import { inject, injectable } from 'tsyringe';
import { OutfitPlanRepositoryToken } from '../../../utilities/constants';
import { OutfitPlanRepositoryInterface } from '../../gateway/OutfitPlanRepository.interface';
import { UpdateOutfitPlanRequest } from './UpdateOutfitPlan.request';
import { ApiError, ApiErrorCode } from '../../../entities/error';
import { OutfitPlan } from '../../../entities/OutfitPlan';

@injectable()
export class UpdateOutfitPlan {
    constructor(
        @inject(OutfitPlanRepositoryToken)
        private readonly outfitPlanRepository: OutfitPlanRepositoryInterface,
    ) {}

    async execute(request: UpdateOutfitPlanRequest): Promise<void> {
        const outfitPlanToUpdate = await this.outfitPlanRepository.getByUuid(request.uuid);

        if (request.userUuid !== outfitPlanToUpdate.userUuid) {
            throw new ApiError(
                ApiErrorCode.Unauthorized,
                'outfit/unauthorized-action',
                'You are not authorized to update this outfit plan',
            );
        }

        if (request.date) {
            if (isNaN(new Date(request.date).getTime())) {
                throw new ApiError(
                    ApiErrorCode.BadRequest,
                    'outfit-plan/invalid-date',
                    'Invalid date',
                );
            }

            if (new Date(request.date) <= new Date()) {
                throw new ApiError(
                    ApiErrorCode.BadRequest,
                    'outfit-plan/unauthorized-action',
                    'Cannot plan outfit for past dates',
                );
            }
        }

        const outfitPlan = new OutfitPlan(
            request.uuid,
            request.name ?? outfitPlanToUpdate.name,
            request.userUuid,
            outfitPlanToUpdate.outfitUuid,
            request.date ? new Date(request.date) : outfitPlanToUpdate.date,
            outfitPlanToUpdate.createdAt,
            request.location ?? outfitPlanToUpdate.location,
            new Date(),
        );

        await this.outfitPlanRepository.update(outfitPlan);
    }
}
