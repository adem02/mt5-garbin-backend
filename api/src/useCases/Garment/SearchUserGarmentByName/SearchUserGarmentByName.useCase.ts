import { inject, injectable } from 'tsyringe';
import { GarmentRepositoryInterface } from '../../gateway/GarmentRepository.interface';
import { GarmentRepositoryToken } from '../../../utilities/constants';
import { SearchUserGarmentByNameRequest } from './SearchUserGarmentByName.request';
import { SearchUserGarmentByNameResponse } from './SearchUserGarmentByName.response';

@injectable()
export class SearchUserGarmentByName {
    constructor(
        @inject(GarmentRepositoryToken)
        private readonly garmentRepository: GarmentRepositoryInterface,
    ) {}

    async execute(
        request: SearchUserGarmentByNameRequest,
    ): Promise<SearchUserGarmentByNameResponse> {
        const paginatedGarments = await this.garmentRepository.searchUserGarmentsByName(
            request.userUuid,
            request.name,
            {
                page: request.page,
                itemsPerPage: request.itemsPerPage,
            },
        );

        return new SearchUserGarmentByNameResponse(
            paginatedGarments.garments,
            paginatedGarments.totalItems,
            request.itemsPerPage,
            request.page,
        );
    }
}
