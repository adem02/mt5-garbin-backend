import { injectable } from 'tsyringe';
import { Controller, Get, Route, Security, Tags, Request, Query } from 'tsoa';
import { Request as ExpressRequest } from 'express';
import { GetUserGarments } from '../../../../useCases/Garment/GetUserGarments/GetUserGarments.useCase';
import { GetUserGarmentsOutputDto } from './GetUserGarments.dto';

@Route('garments')
@Security('jwt')
@injectable()
export class GetUserGarmentsController extends Controller {
    constructor(private readonly useCase: GetUserGarments) {
        super();
    }

    @Tags('Garment')
    @Get()
    async getUserGarments(
        @Query() page: number = 1,
        @Query() limit: number = 10,
        @Request() req: ExpressRequest,
    ): Promise<GetUserGarmentsOutputDto> {
        const userUuid = req.res?.locals.userUuid as string;

        const response = await this.useCase.execute({
            userUuid,
            itemsPerPage: limit,
            page,
        });

        return new GetUserGarmentsOutputDto(response);
    }
}
