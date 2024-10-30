import {
    Body,
    Controller,
    Post,
    Route,
    Tags,
    Request,
    Path,
    Security,
    SuccessResponse,
} from 'tsoa';
import { Request as ExpressRequest } from 'express';
import { injectable } from 'tsyringe';
import { PlanOutfit } from '../../../../useCases/OutfitPlan/PlanOutfit/PlanOutfit.useCase';
import { PlanOutfitInputDto, PlanOutfitOutputDto } from './PlanOutfit.dto';
import { Validator } from '../../../services/Validator.service';
import { PlanOutfitRequest } from '../../../../useCases/OutfitPlan/PlanOutfit/PlanOutfit.request';

@Route('outfit-plans')
@Security('jwt')
@injectable()
export class PlanOutfitController extends Controller {
    constructor(private readonly useCase: PlanOutfit) {
        super();
    }

    @Tags('OutfitPlan')
    @SuccessResponse('201')
    @Post('{outfitUuid}')
    async planOutfit(
        @Path() outfitUuid: string,
        @Body() body: PlanOutfitInputDto,
        @Request() req: ExpressRequest,
    ): Promise<PlanOutfitOutputDto> {
        const userUuid = req.res?.locals.userUuid as string;

        await Validator.validate({
            data: body,
            validationClass: PlanOutfitInputDto,
        });

        const request: PlanOutfitRequest = {
            userUuid,
            outfitUuid,
            date: body.date,
            location: body.location,
            eventName: body.name,
        };

        const response = await this.useCase.execute(request);

        return new PlanOutfitOutputDto(response);
    }
}
