import { injectable } from 'tsyringe';
import { Body, Controller, Post, Route, Security, Tags, Request, SuccessResponse } from 'tsoa';
import { Request as ExpressRequest } from 'express';
import { CreateOutfit } from '../../../../useCases/Outfit/CreateOutfit/CreateOutfit.useCase';
import { CreateOutfitInputDto, CreateOutfitOutputDto } from './CreateOutfit.dto';
import { Validator } from '../../../services/Validator.service';
import { CreateOutfitRequest } from '../../../../useCases/Outfit/CreateOutfit/CreateOutfit.request';

@Security('jwt')
@Route('outfits')
@injectable()
export class CreateOutfitController extends Controller {
    constructor(private readonly useCase: CreateOutfit) {
        super();
    }

    @Tags('Outfit')
    @Post()
    @SuccessResponse('201')
    async createOutfit(
        @Body() body: CreateOutfitInputDto,
        @Request() req: ExpressRequest,
    ): Promise<CreateOutfitOutputDto> {
        const userUuid = req.res?.locals.userUuid as string;

        await Validator.validate({
            data: body,
            validationClass: CreateOutfitInputDto,
        });

        const request: CreateOutfitRequest = {
            userUuid,
            name: body.name,
            mainTopGarmentUuid: body.mainTopUuid,
            subTopGarmentUuid: body.subTopUuid,
            bottomGarmentUuid: body.bottomUuid,
            shoesGarmentUuid: body.shoesUuid,
        };

        const response = await this.useCase.execute(request);

        return new CreateOutfitOutputDto(response);
    }
}
