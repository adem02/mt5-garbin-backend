import 'reflect-metadata';
import { OutfitPlanRepositoryInterface } from '../../../../src/useCases/gateway/OutfitPlanRepository.interface';
import { OutfitRepositoryInterface } from '../../../../src/useCases/gateway/OutfitRepository.interface';
import { PlanOutfit } from '../../../../src/useCases/OutfitPlan/PlanOutfit/PlanOutfit.useCase';
import { PlanOutfitRequest } from '../../../../src/useCases/OutfitPlan/PlanOutfit/PlanOutfit.request';
import { OutfitBuilder } from '../../../faker/builder/Outfit.builder';
import { OutfitPlan } from '../../../../src/entities/OutfitPlan';
import { ApiError, ApiErrorCode } from '../../../../src/entities/error';
import { PlanOutfitResponse } from '../../../../src/useCases/OutfitPlan/PlanOutfit/PlanOutfit.response';

describe('Unit: Plan Outfit use case', () => {
    let useCase: PlanOutfit;
    let planOutfitRepository: Partial<OutfitPlanRepositoryInterface>;
    let outfitRepository: Partial<OutfitRepositoryInterface>;
    let request: PlanOutfitRequest;

    beforeEach(() => {
        planOutfitRepository = {
            create: jest.fn(async () => {}),
        };
        outfitRepository = {
            getByUuid: jest.fn(async (uuid: string) => {
                if (uuid === 'outfitUuid')
                    return new OutfitBuilder().withUuid('outfitUuid').build();
                throw new ApiError(ApiErrorCode.NotFound, 'outfit/not-found', 'Outfit not found');
            }),
        };

        request = {
            eventName: 'Wedding',
            userUuid: 'userUuid',
            outfitUuid: 'outfitUuid',
            date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            location: 'Paris',
        };

        useCase = new PlanOutfit(
            planOutfitRepository as OutfitPlanRepositoryInterface,
            outfitRepository as OutfitRepositoryInterface,
        );
    });

    it('should create a new outfit plan', async () => {
        const response = await useCase.execute(request);

        expect(outfitRepository.getByUuid).toHaveBeenCalled();
        expect(planOutfitRepository.create).toHaveBeenCalledWith(expect.any(OutfitPlan));
        expect(response).toBeInstanceOf(PlanOutfitResponse);
        expect(response.name).toEqual(request.eventName);
        expect(response.location).toEqual(request.location);
        expect(response.date).toEqual(new Date(request.date));
        expect(response.outfitUuid).toEqual(request.outfitUuid);
    });

    it('should throw error if outfit does not exist', async () => {
        request.outfitUuid = 'nonExistentOutfitUuid';

        await expect(useCase.execute(request)).rejects.toThrow('Outfit not found');
    });

    it('should throw error if outfit does not belong to user', async () => {
        request.userUuid = 'anotherUserUuid';

        await expect(useCase.execute(request)).rejects.toThrow('Outfit does not belong to user');
    });

    it('should throw error if date is invalid', async () => {
        request.date = '28-10-2024';

        await expect(useCase.execute(request)).rejects.toThrow('Invalid date');
    });
});
