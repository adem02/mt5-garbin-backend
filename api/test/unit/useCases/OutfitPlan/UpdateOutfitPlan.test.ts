import 'reflect-metadata';
import { UpdateOutfitPlan } from '../../../../src/useCases/OutfitPlan/UpdateOutfitPlan/UpdateOutfitPlan.useCase';
import { OutfitPlanRepositoryInterface } from '../../../../src/useCases/gateway/OutfitPlanRepository.interface';
import { UpdateOutfitPlanRequest } from '../../../../src/useCases/OutfitPlan/UpdateOutfitPlan/UpdateOutfitPlan.request';
import { OutfitPlan } from '../../../../src/entities/OutfitPlan';

describe('Unit: Update Outfit Plan use case', () => {
    let useCase: UpdateOutfitPlan;
    let outfitPlanRepository: Partial<OutfitPlanRepositoryInterface>;
    let request: UpdateOutfitPlanRequest;

    beforeEach(() => {
        outfitPlanRepository = {
            getByUuid: jest.fn(async () => {
                return new OutfitPlan(
                    'outfitPlanUuid',
                    'Concert',
                    'userUuid',
                    'outfitUuid',
                    new Date('2024-10-10'),
                    new Date(),
                    'Venice',
                );
            }),
            update: jest.fn(async () => {}),
        };

        request = {
            uuid: 'outfitPlanUuid',
            userUuid: 'userUuid',
            name: 'Wedding',
            date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            location: 'Paris',
        };

        useCase = new UpdateOutfitPlan(outfitPlanRepository as OutfitPlanRepositoryInterface);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update outfit plan', async () => {
        await useCase.execute(request);

        expect(outfitPlanRepository.getByUuid).toHaveBeenCalledWith(request.uuid);
        const outfitPlan = new OutfitPlan(
            'outfitPlanUuid',
            'Wedding',
            'userUuid',
            'outfitUuid',
            new Date(request.date!),
            expect.any(Date),
            'Paris',
            expect.any(Date),
        );

        expect(outfitPlanRepository.update).toHaveBeenCalledWith(outfitPlan);
    });

    it('should throw error if user is not authorized to update outfit plan', async () => {
        request.userUuid = 'unauthorizedUserUuid';

        await expect(useCase.execute(request)).rejects.toThrow(
            'You are not authorized to update this outfit plan',
        );
    });

    it('should throw error if date is invalid', async () => {
        request.date = '28-10-2024';

        await expect(useCase.execute(request)).rejects.toThrow('Invalid date');
    });

    it('should throw error if date is in the past', async () => {
        request.date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0];

        await expect(useCase.execute(request)).rejects.toThrow('Cannot plan outfit for past dates');
    });
});
