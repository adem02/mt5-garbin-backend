import 'reflect-metadata';
import { DeleteOutfitByUuid } from '../../../../src/useCases/Outfit/DeleteOutfitByUuid/DeleteOutfitByUuid.useCase';
import { OutfitRepositoryInterface } from '../../../../src/useCases/gateway/OutfitRepository.interface';
import { DeleteOutfitByUuidRequest } from '../../../../src/useCases/Outfit/DeleteOutfitByUuid/DeleteOutfitByUuid.request';
import { OutfitBuilder } from '../../../faker/builder/Outfit.builder';
import { ApiError, ApiErrorCode } from '../../../../src/entities/error';

describe('Unit: Delete Outfit By Uuid use case', () => {
    let useCase: DeleteOutfitByUuid;
    let outfitRepository: Partial<OutfitRepositoryInterface>;
    let request: DeleteOutfitByUuidRequest;

    beforeEach(() => {
        outfitRepository = {
            getByUuid: jest.fn(async (uuid: string) => {
                if (uuid === 'outfitUuid')
                    return new OutfitBuilder().withUuid('outfitUuid').build();
                throw new ApiError(ApiErrorCode.NotFound, 'outfit/not-found', 'Outfit not found');
            }),
            deleteByUuid: jest.fn(async () => {}),
        };

        request = {
            uuid: 'outfitUuid',
            userUuid: 'userUuid',
        };

        useCase = new DeleteOutfitByUuid(outfitRepository as OutfitRepositoryInterface);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should delete outfit successfully', async () => {
        await useCase.execute(request);

        expect(outfitRepository.getByUuid).toHaveBeenCalledWith(request.uuid);
        expect(outfitRepository.deleteByUuid).toHaveBeenCalledWith(request.uuid);
    });

    it('should throw error if outfit does not belong to user', () => {
        request.userUuid = 'anotherUserUuid';

        expect(useCase.execute(request)).rejects.toThrow(
            'You are not authorized to delete this outfit',
        );
    });
});
