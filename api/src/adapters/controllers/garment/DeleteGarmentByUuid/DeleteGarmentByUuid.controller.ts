import { injectable } from 'tsyringe';
import { Controller, Delete, Path, Route, Security, Tags, Request, SuccessResponse } from 'tsoa';
import { Request as ExpressRequest } from 'express';
import { DeleteGarmentByUuid } from '../../../../useCases/Garment/DeleteGarmentByUuid/DeleteGarmentByUuid.useCase';

@Route('garments')
@Security('jwt')
@injectable()
export class DeleteGarmentByUuidController extends Controller {
    constructor(private readonly useCase: DeleteGarmentByUuid) {
        super();
    }

    @Tags('Garment')
    @Delete('{uuid}')
    @SuccessResponse('204')
    async deleteGarmentByUuid(@Path() uuid: string, @Request() req: ExpressRequest): Promise<void> {
        const userUuid = req.res?.locals.userUuid as string;

        await this.useCase.execute({
            uuid,
            userUuid,
        });
    }
}
