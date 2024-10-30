import { Body, Controller, Path, Put, Request, Route, Security, SuccessResponse, Tags } from 'tsoa';
import { Request as ExpressRequest } from 'express';
import { injectable } from 'tsyringe';
import { UpdateGarment } from '../../../../useCases/Garment/UpdateGarment/UpdateGarment.useCase';
import { Validator } from '../../../services/Validator.service';
import { UpdateGarmentInputDto } from './UpdateGarment.dto';
import { UpdateGarmentRequest } from '../../../../useCases/Garment/UpdateGarment/UpdateGarment.request';

@Route('garments')
@Security('jwt')
@injectable()
export class UpdateGarmentController extends Controller {
    constructor(private readonly useCase: UpdateGarment) {
        super();
    }

    @Tags('Garment')
    @Put('{uuid}')
    @SuccessResponse('204')
    async updateGarment(
        @Path() uuid: string,
        @Body() body: UpdateGarmentInputDto,
        @Request() req: ExpressRequest,
    ): Promise<void> {
        const userUuid = req.res?.locals.userUuid as string;

        await Validator.validate({
            data: body,
            validationClass: UpdateGarmentInputDto,
        });

        const request: UpdateGarmentRequest = {
            uuid,
            userUuid,
            name: body.name,
            brand: body.brand || null,
            size: body.size ? { value: body.size } : body.size === null ? null : undefined,
            colors: body.colors,
        };

        await this.useCase.execute(request);
    }
}
