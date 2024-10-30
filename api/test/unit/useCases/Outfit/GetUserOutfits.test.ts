import 'reflect-metadata';
import { GetUserOutfits } from '../../../../src/useCases/Outfit/GetUserOutfits/GetUserOutfits.useCase';
import { GetUserOutfitsRequest } from '../../../../src/useCases/Outfit/GetUserOutfits/GetUserOutfits.request';
import { OutfitRepositoryInterface } from '../../../../src/useCases/gateway/OutfitRepository.interface';
import { PaginatedEntities } from '../../../../src/entities/PaginatedEntities';
import { UserOutfitResponseInterface } from '../../../../src/entities/types/Outfit.types';
import { GetUserOutfitsResponse } from '../../../../src/useCases/Outfit/GetUserOutfits/GetUserOutfits.response';

describe('Unit: Get User Outfits use case', () => {
    let useCase: GetUserOutfits;
    let outfitRepository: Partial<OutfitRepositoryInterface>;
    let request: GetUserOutfitsRequest;

    beforeEach(() => {
        outfitRepository = {
            findByUserUuid: jest.fn(async () => {
                return new PaginatedEntities<UserOutfitResponseInterface>([], 0);
            }),
        };

        request = {
            userUuid: 'user-uuid',
            itemsPerPage: 3,
            page: 1,
        };

        useCase = new GetUserOutfits(outfitRepository as OutfitRepositoryInterface);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return user outfits', async () => {
        const response = await useCase.execute(request);

        expect(outfitRepository.findByUserUuid).toHaveBeenCalledWith(request.userUuid, {
            itemsPerPage: request.itemsPerPage,
            page: request.page,
        });
        expect(response).toBeInstanceOf(GetUserOutfitsResponse);
        expect(response).toEqual({
            outfits: [],
            totalItems: 0,
            itemsPerPage: request.itemsPerPage,
            currentPage: request.page,
        });
    });

    it('should return user outfits with data', async () => {
        const userOutfit: UserOutfitResponseInterface = {
            uuid: 'uuid',
            name: 'name',
            garments: {
                mainTop: { name: 'name', imageUrl: 'imageUrl' },
                bottom: undefined,
                subTop: undefined,
                shoes: { name: 'name', imageUrl: 'imageUrl' },
            },
        };
        const outfits: UserOutfitResponseInterface[] = [userOutfit];
        const totalItems = 1;

        outfitRepository.findByUserUuid = jest.fn(async () => {
            return new PaginatedEntities<UserOutfitResponseInterface>(outfits, totalItems);
        });

        const response = await useCase.execute(request);

        expect(outfitRepository.findByUserUuid).toHaveBeenCalledWith(request.userUuid, {
            itemsPerPage: request.itemsPerPage,
            page: request.page,
        });
        expect(response).toBeInstanceOf(GetUserOutfitsResponse);
        expect(response).toBeInstanceOf(GetUserOutfitsResponse);
        expect(response).toMatchObject({
            outfits: [
                {
                    uuid: userOutfit.uuid,
                    name: userOutfit.name,
                    garments: {
                        mainTop: { name: 'name', imageUrl: 'imageUrl' },
                        bottom: undefined,
                        subTop: undefined,
                        shoes: { name: 'name', imageUrl: 'imageUrl' },
                    },
                },
            ],
            totalItems: totalItems,
            itemsPerPage: request.itemsPerPage,
            currentPage: request.page,
        });
    });
});
