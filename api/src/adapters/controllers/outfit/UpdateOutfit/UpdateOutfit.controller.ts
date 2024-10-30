import { injectable } from 'tsyringe';
import { Controller, Route, Security, Tags, Request, Body, Put, SuccessResponse } from 'tsoa';
import { Request as ExpressRequest } from 'express';
import { UpdateOutfit } from '../../../../useCases/Outfit/UpdateOutfit/UpdateOutfit.useCase';
import { UpdateOutfitRequest } from '../../../../useCases/Outfit/UpdateOutfit/UpdateOutfit.request';
import { UpdateOutfitInputDto } from './UpdateOutfit.dto';
import { Validator } from '../../../services/Validator.service';

@Route('outfits')
@Security('jwt')
@injectable()
export class UpdateOutfitController extends Controller {
    constructor(private readonly useCase: UpdateOutfit) {
        super();
    }

    @Tags('Outfit')
    @Put('{uuid}')
    @SuccessResponse('204')
    async updateOutfit(
        uuid: string,
        @Body() body: UpdateOutfitInputDto,
        @Request() req: ExpressRequest,
    ): Promise<void> {
        const userUuid = req.res?.locals.userUuid as string;

        await Validator.validate({
            data: body,
            validationClass: UpdateOutfitInputDto,
        });

        const request: UpdateOutfitRequest = {
            userUuid,
            uuid,
            name: body.name,
            mainTopGarmentUuid: body.mainTopGarmentUuid,
            subTopGarmentUuid: body.subTopGarmentUuid,
            bottomGarmentUuid: body.bottomGarmentUuid,
            shoesGarmentUuid: body.shoesGarmentUuid,
        };

        await this.useCase.execute(request);
    }
}
