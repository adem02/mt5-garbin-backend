import { injectable } from 'tsyringe';
import { Body, Controller, Put, Route, Tags, Request, Path, Security, SuccessResponse } from 'tsoa';
import { Request as ExpressRequest } from 'express';
import { UpdateOutfitPlan } from '../../../../useCases/OutfitPlan/UpdateOutfitPlan/UpdateOutfitPlan.useCase';
import { UpdateOutfitPlanInputDto } from './UpdateOutfitPlan.dto';
import { Validator } from '../../../services/Validator.service';
import { UpdateOutfitPlanRequest } from '../../../../useCases/OutfitPlan/UpdateOutfitPlan/UpdateOutfitPlan.request';

@Route('outfit-plans')
@Security('jwt')
@injectable()
export class UpdateOutfitPlanController extends Controller {
    constructor(private readonly useCase: UpdateOutfitPlan) {
        super();
    }

    @Put('{uuid}')
    @SuccessResponse('204')
    @Tags('OutfitPlan')
    async execute(
        @Path() uuid: string,
        @Body() body: UpdateOutfitPlanInputDto,
        @Request() req: ExpressRequest,
    ): Promise<void> {
        const userUuid = req.res?.locals.userUuid as string;

        await Validator.validate({
            data: body,
            validationClass: UpdateOutfitPlanInputDto,
        });

        const request: UpdateOutfitPlanRequest = {
            userUuid,
            uuid,
            date: body.date,
            location: body.location,
            name: body.name,
        };

        await this.useCase.execute(request);
    }
}
