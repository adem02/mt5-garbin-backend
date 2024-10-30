import { inject, injectable } from 'tsyringe';
import { OutfitPlanRepositoryToken } from '../../../utilities/constants';
import { OutfitPlanRepositoryInterface } from '../../gateway/OutfitPlanRepository.interface';
import { GetIncomingByOutfitUuidRequest } from './GetIncomingByOutfitUuid.request';
import { GetIncomingByOutfitUuidResponse } from './GetIncomingByOutfitUuid.response';
import { IncomingOutfitPlanInterface } from '../../../entities/types/Outfit.types';

@injectable()
export class GetIncomingByOutfitUuid {
    constructor(
        @inject(OutfitPlanRepositoryToken)
        private readonly outfitPlanRepository: OutfitPlanRepositoryInterface,
    ) {}

    async execute(
        request: GetIncomingByOutfitUuidRequest,
    ): Promise<GetIncomingByOutfitUuidResponse> {
        const outfitPlans = await this.outfitPlanRepository.findIncomingByOutfitUuid(
            request.outfitUuid,
        );

        const mappedOutfitPlans: IncomingOutfitPlanInterface[] = outfitPlans.map((outfitPlan) => {
            return {
                uuid: outfitPlan.uuid,
                name: outfitPlan.name,
                date: outfitPlan.date,
                location: outfitPlan.location,
            };
        });

        return new GetIncomingByOutfitUuidResponse(mappedOutfitPlans);
    }
}
