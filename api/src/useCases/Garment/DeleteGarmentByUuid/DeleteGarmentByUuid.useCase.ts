import { inject, injectable } from 'tsyringe';
import { GarmentRepositoryToken } from '../../../utilities/constants';
import { GarmentRepositoryInterface } from '../../gateway/GarmentRepository.interface';
import { DeleteGarmentRequest } from './DeleteGarment.request';
import { ApiError, ApiErrorCode } from '../../../entities/error';

@injectable()
export class DeleteGarmentByUuid {
    constructor(
        @inject(GarmentRepositoryToken)
        private readonly garmentRepository: GarmentRepositoryInterface,
    ) {}

    async execute(request: DeleteGarmentRequest): Promise<void> {
        const garmentToDelete = await this.garmentRepository.getByUuid(request.uuid);

        if (garmentToDelete.userUuid !== request.userUuid) {
            throw new ApiError(
                ApiErrorCode.Unauthorized,
                'garment/unauthorized-action',
                'Unauthorized to delete this garment',
            );
        }

        await this.garmentRepository.delete(garmentToDelete.uuid);
    }
}
