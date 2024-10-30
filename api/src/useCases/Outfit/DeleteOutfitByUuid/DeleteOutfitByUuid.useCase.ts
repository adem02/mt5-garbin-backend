import { inject, injectable } from 'tsyringe';
import { DeleteOutfitByUuidRequest } from './DeleteOutfitByUuid.request';
import { OutfitRepositoryToken } from '../../../utilities/constants';
import { ApiError, ApiErrorCode } from '../../../entities/error';
import { OutfitRepositoryInterface } from '../../gateway/OutfitRepository.interface';

@injectable()
export class DeleteOutfitByUuid {
    constructor(
        @inject(OutfitRepositoryToken) private readonly outfitRepository: OutfitRepositoryInterface,
    ) {}

    async execute(request: DeleteOutfitByUuidRequest): Promise<void> {
        const outfitToDelete = await this.outfitRepository.getByUuid(request.uuid);

        if (request.userUuid !== outfitToDelete.userUuid) {
            throw new ApiError(
                ApiErrorCode.Unauthorized,
                'outfit/unauthorized-action',
                'You are not authorized to delete this outfit',
            );
        }

        await this.outfitRepository.deleteByUuid(outfitToDelete.uuid);
    }
}
