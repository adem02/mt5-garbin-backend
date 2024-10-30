import { injectable } from 'tsyringe';
import { Controller, Get, Path, Query, Request, Route, Security, Tags } from 'tsoa';
import { Request as ExpressRequest } from 'express';
import { GetUserGarmentsByCategory } from '../../../../useCases/Garment/GetUserGarmentsByCategory/GetUserGarmentsByCategory.useCase';
import { GetUserGarmentsByCategoryOutputDto } from './GetUserGarmentsByCategory.dto';
import { GarmentCategoryLabelType } from '../../../../entities/types/GarmentCategory.types';

@Route('garments')
@Security('jwt')
@injectable()
export class GetUserGarmentsByCategoryController extends Controller {
    constructor(private readonly useCase: GetUserGarmentsByCategory) {
        super();
    }

    @Tags('Garment')
    @Get('{category}')
    async getUserGarmentsByCategory(
        @Query() page: number = 1,
        @Query() limit: number = 10,
        @Path() category: GarmentCategoryLabelType,
        @Request() req: ExpressRequest,
    ): Promise<GetUserGarmentsByCategoryOutputDto> {
        const userUuid = req.res?.locals.userUuid as string;

        const response = await this.useCase.execute({
            userUuid,
            itemsPerPage: limit,
            page,
            category,
        });

        return new GetUserGarmentsByCategoryOutputDto(response);
    }
}
