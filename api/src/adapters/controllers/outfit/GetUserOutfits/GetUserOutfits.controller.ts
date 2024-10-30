import { injectable } from 'tsyringe';
import { Controller, Get, Query, Route, Security, Tags, Request, SuccessResponse } from 'tsoa';
import { Request as ExpressRequest } from 'express';
import { GetUserOutfits } from '../../../../useCases/Outfit/GetUserOutfits/GetUserOutfits.useCase';
import { GetUserOutfitsRequest } from '../../../../useCases/Outfit/GetUserOutfits/GetUserOutfits.request';
import { GetUserOutfitsOutputDto } from './GetUserOutfits.dto';
import { ApiError, ApiErrorCode } from '../../../../entities/error';

@Route('outfits')
@Security('jwt')
@injectable()
export class GetUserOutfitsController extends Controller {
    constructor(private readonly useCase: GetUserOutfits) {
        super();
    }

    @Tags('Outfit')
    @SuccessResponse('200')
    @Get()
    async getUserOutfits(
        @Query() page: number = 1,
        @Query() limit: number = 10,
        @Request() req: ExpressRequest,
    ): Promise<GetUserOutfitsOutputDto> {
        const userUuid = req.res?.locals.userUuid as string;

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

        const request: GetUserOutfitsRequest = {
            userUuid,
            page,
            itemsPerPage: limit,
        };

        const response = await this.useCase.execute(request);

        return new GetUserOutfitsOutputDto(response);
    }
}
