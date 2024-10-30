import 'reflect-metadata';
import { GetIncomingByOutfitUuid } from '../../../../src/useCases/OutfitPlan/GetIncomingByOutfitUuid/GetIncomingByOutfitUuid.useCase';
import { OutfitPlanRepositoryInterface } from '../../../../src/useCases/gateway/OutfitPlanRepository.interface';
import { GetIncomingByOutfitUuidRequest } from '../../../../src/useCases/OutfitPlan/GetIncomingByOutfitUuid/GetIncomingByOutfitUuid.request';
import { GetIncomingByOutfitUuidResponse } from '../../../../src/useCases/OutfitPlan/GetIncomingByOutfitUuid/GetIncomingByOutfitUuid.response';
import { OutfitPlan } from '../../../../src/entities/OutfitPlan';

describe('Unit: Get Incoming By Outfit Uuid use case', () => {
    let useCase: GetIncomingByOutfitUuid;
    let outfitPlanRepository: Partial<OutfitPlanRepositoryInterface>;
    let request: GetIncomingByOutfitUuidRequest;

    beforeEach(() => {
        outfitPlanRepository = {
            findIncomingByOutfitUuid: jest.fn(async () => {
                return [
                    new OutfitPlan(
                        'first-outfit-plan-uuid',
                        'First Outfit plan',
                        'user-uuid',
                        'outfit-uuid',
                        new Date('2024-10-15'),
                        new Date(),
                        'Paris',
                    ),
                    new OutfitPlan(
                        'second-outfit-plan-uuid',
                        'Second Outfit plan',
                        'user-uuid',
                        'outfit-uuid',
                        new Date('2024-10-25'),
                        new Date(),
                        'Paris',
                    ),
                    new OutfitPlan(
                        'third-outfit-plan-uuid',
                        'Third Outfit plan',
                        'user-uuid',
                        'outfit-uuid',
                        new Date('2024-10-30'),
                        new Date(),
                        'Paris',
                    ),
                ];
            }),
        };

        request = {
            outfitUuid: 'outfit-uuid',
        };

        useCase = new GetIncomingByOutfitUuid(
            outfitPlanRepository as OutfitPlanRepositoryInterface,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return incoming outfits with data', async () => {
        const response = await useCase.execute(request);

        expect(outfitPlanRepository.findIncomingByOutfitUuid).toHaveBeenCalledWith(
            request.outfitUuid,
        );
        expect(response).toBeInstanceOf(GetIncomingByOutfitUuidResponse);
        expect(response.data).toEqual(
            expect.arrayContaining([
                {
                    uuid: 'first-outfit-plan-uuid',
                    name: 'First Outfit plan',
                    date: new Date('2024-10-15'),
                    location: 'Paris',
                },
                {
                    uuid: 'second-outfit-plan-uuid',
                    name: 'Second Outfit plan',
                    date: new Date('2024-10-25'),
                    location: 'Paris',
                },
                {
                    uuid: 'third-outfit-plan-uuid',
                    name: 'Third Outfit plan',
                    date: new Date('2024-10-30'),
                    location: 'Paris',
                },
            ]),
        );
    });
});
