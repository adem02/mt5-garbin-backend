import { injectable } from 'tsyringe';
import { Controller, Get, Query, Request, Route, Security, SuccessResponse, Tags } from 'tsoa';
import { Request as ExpressRequest } from 'express';
import { SearchUserGarmentByName } from '../../../../useCases/Garment/SearchUserGarmentByName/SearchUserGarmentByName.useCase';
import { ApiError, ApiErrorCode } from '../../../../entities/error';
import { SearchUserGarmentsByNameOutputDto } from './SearchUserGarmentsByName.dto';

@Route('/garments')
@Security('jwt')
@injectable()
export class SearchUserGarmentsByNameController extends Controller {
    constructor(private readonly useCase: SearchUserGarmentByName) {
        super();
    }

    @Tags('Garment')
    @Get('/search')
    @SuccessResponse('200')
    async searchUserGarmentsByName(
        @Query() name: string,
        @Query() page: number = 1,
        @Query() limit: number = 10,
        @Request() req: ExpressRequest,
    ): Promise<SearchUserGarmentsByNameOutputDto> {
        const userUuid = req.res?.locals.userUuid as string;

        if (!name || name.trim().length === 0) {
            throw new ApiError(ApiErrorCode.BadRequest, 'validation/failed', 'name is required');
        }

        if (limit < 1 || limit > 100) {
            throw new ApiError(
                ApiErrorCode.BadRequest,
                'validation/failed',
                'limit must be between 1 and 100',
            );
        }

        if (page < 1) {
            throw new ApiError(
                ApiErrorCode.BadRequest,
                'validation/failed',
                'page must be greater than 0',
            );
        }

        const response = await this.useCase.execute({
            userUuid,
            name,
            itemsPerPage: limit,
            page,
        });

        return new SearchUserGarmentsByNameOutputDto(response);
    }
}
