import { inject, injectable } from 'tsyringe';
import { GarmentRepositoryToken } from '../../../utilities/constants';
import { GarmentRepositoryInterface } from '../../gateway/GarmentRepository.interface';
import { GetUserGarmentsRequest } from './GetUserGarments.request';
import { GetUserGarmentsResponse } from './GetUserGarments.response';

@injectable()
export class GetUserGarments {
    constructor(
        @inject(GarmentRepositoryToken)
        private readonly garmentRepository: GarmentRepositoryInterface,
    ) {}

    async execute(request: GetUserGarmentsRequest): Promise<GetUserGarmentsResponse> {
        const paginatedGarments = await this.garmentRepository.findGarmentsByUserUuid(
            request.userUuid,
            {
                itemsPerPage: request.itemsPerPage,
                page: request.page,
            },
        );

        return new GetUserGarmentsResponse(
            paginatedGarments.garments,
            paginatedGarments.totalItems,
            request.itemsPerPage,
            request.page,
        );
    }
}
