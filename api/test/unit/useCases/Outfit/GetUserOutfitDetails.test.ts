import 'reflect-metadata';
import { GetUserOutfitDetails } from '../../../../src/useCases/Outfit/GetUserOutfitDetails/GetUserOutfitDetails.useCase';
import { OutfitRepositoryInterface } from '../../../../src/useCases/gateway/OutfitRepository.interface';
import { OutfitPlanRepositoryInterface } from '../../../../src/useCases/gateway/OutfitPlanRepository.interface';
import { GetUserOutfitDetailsRequest } from '../../../../src/useCases/Outfit/GetUserOutfitDetails/GetUserOutfitDetails.request';
import { OutfitBuilder } from '../../../faker/builder/Outfit.builder';
import { GetUserOutfitDetailsResponse } from '../../../../src/useCases/Outfit/GetUserOutfitDetails/GetUserOutfitDetails.response';

describe('Unit: Get User Outfit Detail use case', () => {
    let useCase: GetUserOutfitDetails;
    let outfitRepository: Partial<OutfitRepositoryInterface>;
    let outfitPlanRepository: Partial<OutfitPlanRepositoryInterface>;
    let request: GetUserOutfitDetailsRequest;

    beforeEach(() => {
        outfitRepository = {
            getByUuid: jest.fn(async () => {
                return new OutfitBuilder().withName('outfitName').withUuid('outfitUuid').build();
            }),
        };
        outfitPlanRepository = {
            findOutfitPlanHistoryByOutfitUuid: jest.fn(async () => {
                return [
                    {
                        uuid: 'uuid',
                        name: 'name',
                        userUuid: 'userUuid',
                        outfitUuid: 'outfitUuid',
                        date: new Date(),
                        createdAt: new Date(),
                        location: 'location',
                    },
                ];
            }),
        };

        request = {
            uuid: 'outfitUuid',
            userUuid: 'userUuid',
        };

        useCase = new GetUserOutfitDetails(
            outfitRepository as OutfitRepositoryInterface,
            outfitPlanRepository as OutfitPlanRepositoryInterface,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get user outfit details', async () => {
        const response = await useCase.execute(request);

        expect(outfitRepository.getByUuid).toBeCalledWith(request.uuid);
        expect(outfitPlanRepository.findOutfitPlanHistoryByOutfitUuid).toBeCalledWith('outfitUuid');

        expect(response).toBeInstanceOf(GetUserOutfitDetailsResponse);
        expect(response.outfitUuid).toBe('outfitUuid');
        expect(response.outfitName).toBe('outfitName');
        expect(response.outfitGarments).toEqual({
            mainTop: expect.objectContaining({
                name: 'name',
                imageUrl: 'imageUrl',
                categoryLabel: 'MAIN_TOP',
                subCategoryLabel: 'Dress',
            }),
            subTop: null,
            bottom: null,
            shoes: expect.objectContaining({
                name: 'name',
                imageUrl: 'imageUrl',
                categoryLabel: 'SHOES',
                subCategoryLabel: 'Ankle_boots',
            }),
        });
        expect(response.outfitHistoryPlans).toEqual([
            {
                name: 'name',
                date: expect.any(Date),
                location: 'location',
            },
        ]);
    });
});
