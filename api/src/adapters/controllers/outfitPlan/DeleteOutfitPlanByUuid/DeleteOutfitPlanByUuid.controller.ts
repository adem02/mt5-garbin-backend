import { injectable } from 'tsyringe';
import { Controller, Delete, Route, Security, Request, Tags } from 'tsoa';
import { Request as ExpressRequest } from 'express';
import { DeleteOutfitPlanByUuid } from '../../../../useCases/OutfitPlan/DeleteOutfitPlanByUuid/DeleteOutfitPlanByUuid.useCase';
import { DeleteOutfitByUuidRequest } from '../../../../useCases/Outfit/DeleteOutfitByUuid/DeleteOutfitByUuid.request';

@Route('outfit-plans')
@Security('jwt')
@injectable()
export class DeleteOutfitPlanByUuidController extends Controller {
    constructor(private readonly useCase: DeleteOutfitPlanByUuid) {
        super();
    }

    @Delete('{uuid}')
    @Tags('OutfitPlan')
    async deleteOutfitPlanByUuid(uuid: string, @Request() req: ExpressRequest): Promise<void> {
        const userUuid = req.res?.locals.userUuid as string;

        const request: DeleteOutfitByUuidRequest = { userUuid, uuid };

        await this.useCase.execute(request);
    }
}
