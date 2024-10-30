import { inject, injectable } from 'tsyringe';
import { GarmentRepositoryToken } from '../../../utilities/constants';
import { GarmentRepositoryInterface } from '../../gateway/GarmentRepository.interface';
import { GetUserGarmentsByCategoryRequest } from './GetUserGarmentsByCategory.request';
import { GetUserGarmentsByCategoryResponse } from './GetUserGarmentsByCategory.response';

@injectable()
export class GetUserGarmentsByCategory {
    constructor(
        @inject(GarmentRepositoryToken)
        private readonly garmentRepository: GarmentRepositoryInterface,
    ) {}

    async execute(
        request: GetUserGarmentsByCategoryRequest,
    ): Promise<GetUserGarmentsByCategoryResponse> {
        const paginatedGarments = await this.garmentRepository.findGarmentsByUserUuidAndCategory(
            request.userUuid,
            request.category,
            {
                itemsPerPage: request.itemsPerPage,
                page: request.page,
            },
        );

        return new GetUserGarmentsByCategoryResponse(
            paginatedGarments.garments,
            paginatedGarments.totalItems,
            request.itemsPerPage,
            request.page,
        );
    }
}
