import { injectable } from 'tsyringe';
import { Controller, Get, Route, Security, Tags, Request } from 'tsoa';
import { Request as ExpressRequest } from 'express';
import { GetUserOutfitDetails } from '../../../../useCases/Outfit/GetUserOutfitDetails/GetUserOutfitDetails.useCase';
import { GetUserOutfitDetailsRequest } from '../../../../useCases/Outfit/GetUserOutfitDetails/GetUserOutfitDetails.request';
import { GetUserOutfitDetailsOutputDto } from './GetUserOutfitDetails.dto';

@Route('outfits')
@Security('jwt')
@injectable()
export class GetUserOutfitDetailsController extends Controller {
    constructor(private readonly useCase: GetUserOutfitDetails) {
        super();
    }

    @Tags('Outfit')
    @Get('{uuid}')
    async getUserOutfitDetails(
        uuid: string,
        @Request() req: ExpressRequest,
    ): Promise<GetUserOutfitDetailsOutputDto> {
        const userUuid = req.res?.locals.userUuid as string;

        const request: GetUserOutfitDetailsRequest = {
            uuid,
            userUuid,
        };

        const response = await this.useCase.execute(request);

        return new GetUserOutfitDetailsOutputDto(response);
    }
}
