import { injectable } from 'tsyringe';
import { Controller, Get, Path, Route, Security, Tags } from 'tsoa';
import { GetIncomingByOutfitUuid } from '../../../../useCases/OutfitPlan/GetIncomingByOutfitUuid/GetIncomingByOutfitUuid.useCase';
import { GetIncomingByOutfitUuidRequest } from '../../../../useCases/OutfitPlan/GetIncomingByOutfitUuid/GetIncomingByOutfitUuid.request';
import { GetIncomingByOutfitUuidOutputDto } from './GetIncomingByOutfitUuid.dto';

@Route('outfit-plans')
@Security('jwt')
@injectable()
export class GetIncomingByOutfitUuidController extends Controller {
    constructor(private readonly useCase: GetIncomingByOutfitUuid) {
        super();
    }

    @Get('{outfitUuid}/incoming')
    @Tags('OutfitPlan')
    async getIncomingByOutfitUuid(
        @Path() outfitUuid: string,
    ): Promise<GetIncomingByOutfitUuidOutputDto> {
        const request: GetIncomingByOutfitUuidRequest = { outfitUuid };

        const response = await this.useCase.execute(request);

        return new GetIncomingByOutfitUuidOutputDto(response);
    }
}
