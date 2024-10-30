import 'reflect-metadata';
import { GetOutfitView } from '../../../../src/useCases/Outfit/GetOutfitView/GetOutfitView.useCase';
import { OutfitRepositoryInterface } from '../../../../src/useCases/gateway/OutfitRepository.interface';
import { GetOutfitViewRequest } from '../../../../src/useCases/Outfit/GetOutfitView/GetOutfitView.request';
import { UserBuilder } from '../../../faker/builder/User.builder';
import { UserRepositoryInterface } from '../../../../src/useCases/gateway/UserRepository.interface';
import { GetOutfitViewResponse } from '../../../../src/useCases/Outfit/GetOutfitView/GetOutfitView.response';

describe('Unit: Get Outfit View use case', () => {
    let useCase: GetOutfitView;
    let outfitRepository: Partial<OutfitRepositoryInterface>;
    let userRepository: Partial<UserRepositoryInterface>;
    let request: GetOutfitViewRequest;

    beforeEach(() => {
        outfitRepository = {
            getByUuid: jest.fn().mockResolvedValue({
                uuid: 'uuid',
                name: 'name',
                userUuid: 'userUuid',
                mainTop: { name: 'mainTopName', imageUrl: 'mainTopImageUrl' },
                bottom: { name: 'bottomName', imageUrl: 'bottomImageUrl' },
                subTop: { name: 'subTopName', imageUrl: 'subTopImageUrl' },
                shoes: { name: 'shoesName', imageUrl: 'shoesImageUrl' },
            }),
        };
        userRepository = {
            getByUuid: jest.fn().mockResolvedValue(new UserBuilder().build()),
        };

        request = { uuid: 'uuid' };

        useCase = new GetOutfitView(
            outfitRepository as OutfitRepositoryInterface,
            userRepository as UserRepositoryInterface,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get outfit view successfully', async () => {
        const response = await useCase.execute(request);

        expect(outfitRepository.getByUuid).toBeCalledWith('uuid');
        expect(userRepository.getByUuid).toBeCalledWith('userUuid');
        expect(response).toBeInstanceOf(GetOutfitViewResponse);
        expect(response).toEqual({
            name: 'name',
            garments: {
                mainTop: { name: 'mainTopName', imageUrl: 'mainTopImageUrl' },
                bottom: { name: 'bottomName', imageUrl: 'bottomImageUrl' },
                subTop: { name: 'subTopName', imageUrl: 'subTopImageUrl' },
                shoes: { name: 'shoesName', imageUrl: 'shoesImageUrl' },
            },
            creator: {
                username: 'testuser',
                firstname: undefined,
                lastname: undefined,
            },
        });
    });
});
