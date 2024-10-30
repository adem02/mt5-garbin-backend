import 'reflect-metadata';
import { DeleteOutfitPlanByUuid } from '../../../../src/useCases/OutfitPlan/DeleteOutfitPlanByUuid/DeleteOutfitPlanByUuid.useCase';
import { OutfitPlanRepositoryInterface } from '../../../../src/useCases/gateway/OutfitPlanRepository.interface';
import { DeleteOutfitPlanByUuidRequest } from '../../../../src/useCases/OutfitPlan/DeleteOutfitPlanByUuid/DeleteOutfitPlanByUuid.request';
import { OutfitPlan } from '../../../../src/entities/OutfitPlan';

describe('Unit: Delete Outfit Plan By Uuid use case', () => {
    let useCase: DeleteOutfitPlanByUuid;
    let outfitPlanRepository: Partial<OutfitPlanRepositoryInterface>;
    let request: DeleteOutfitPlanByUuidRequest;

    beforeEach(() => {
        outfitPlanRepository = {
            getByUuid: jest.fn(async () => {
                return new OutfitPlan(
                    'outfitPlanUuid',
                    'Concert',
                    'userUuid',
                    'outfitUuid',
                    new Date('2024-10-15'),
                    new Date(),
                    'Venice',
                );
            }),
            deleteByUuid: jest.fn(async () => {}),
        };

        request = {
            uuid: 'outfitPlanUuid',
            userUuid: 'userUuid',
        };

        useCase = new DeleteOutfitPlanByUuid(outfitPlanRepository as OutfitPlanRepositoryInterface);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should delete outfit plan', async () => {
        await useCase.execute(request);

        expect(outfitPlanRepository.getByUuid).toHaveBeenCalledWith(request.uuid);
        expect(outfitPlanRepository.deleteByUuid).toHaveBeenCalledWith(request.uuid);
    });

    it('should throw error if outfit does not belong to user', async () => {
        request.userUuid = 'anotherUserUuid';

        await expect(useCase.execute(request)).rejects.toThrow(
            'You are not authorized to delete this outfit plan',
        );
    });
});
