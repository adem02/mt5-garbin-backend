import { injectable } from 'tsyringe';
import { Controller, Delete, Route, Request, Tags, Security } from 'tsoa';
import { Request as ExpressRequest } from 'express';
import { DeleteOutfitByUuid } from '../../../../useCases/Outfit/DeleteOutfitByUuid/DeleteOutfitByUuid.useCase';
import { DeleteOutfitByUuidRequest } from '../../../../useCases/Outfit/DeleteOutfitByUuid/DeleteOutfitByUuid.request';

@Route('outfits')
@Security('jwt')
@injectable()
export class DeleteOutfitByUuidController extends Controller {
    constructor(private readonly useCase: DeleteOutfitByUuid) {
        super();
    }

    @Tags('Outfit')
    @Delete('{uuid}')
    async deleteByUuid(uuid: string, @Request() req: ExpressRequest): Promise<void> {
        const userUuid = req.res?.locals.userUuid as string;

        const request: DeleteOutfitByUuidRequest = {
            uuid,
            userUuid,
        };

        await this.useCase.execute(request);
    }
}
