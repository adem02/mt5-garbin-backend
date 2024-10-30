import 'reflect-metadata';
import { UpdateUserPassword } from '../../../../src/useCases/User/UpdateUserPassword/UpdateUserPassword.useCase';
import { UserRepositoryInterface } from '../../../../src/useCases/gateway/UserRepository.interface';
import { PasswordManagerInterface } from '../../../../src/useCases/gateway/PasswordManager.interface';
import { UpdateUserPasswordRequest } from '../../../../src/useCases/User/UpdateUserPassword/UpdateUserPassword.request';
import { UserBuilder } from '../../../faker/builder/User.builder';
import { UserRoleEnum } from '../../../../src/entities/enum/UserRole.enum';
import { ResourceId } from '../../../../src/utilities/ResourceId';

describe('Unit: Update User Password use case', () => {
    let useCase: UpdateUserPassword;
    let userRepositoryMock: Partial<UserRepositoryInterface>;
    let passwordManagerMock: Partial<PasswordManagerInterface>;
    let request: UpdateUserPasswordRequest;
    const userBuilder: UserBuilder = new UserBuilder();
    const userUuid = ResourceId.generateUuid();

    beforeEach(() => {
        userRepositoryMock = {
            getByUuid: jest.fn(async () => {
                return userBuilder
                    .withUuid(userUuid)
                    .withUsername('testuser')
                    .withEmail('testuser@email.com')
                    .withPassword('currentHashedPassword')
                    .build();
            }),
            updatePassword: jest.fn(),
        };

        passwordManagerMock = {
            hash: jest.fn(async () => 'newHashedPassword'),
        };

        request = {
            userUuid: userUuid,
            newPassword: 'new-password',
        };

        useCase = new UpdateUserPassword(
            userRepositoryMock as UserRepositoryInterface,
            passwordManagerMock as PasswordManagerInterface,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update user password successfully', async () => {
        await useCase.execute(request);

        expect(userRepositoryMock.getByUuid).toHaveBeenCalledWith(request.userUuid);
        expect(passwordManagerMock.hash).toHaveBeenCalledWith(request.newPassword);
        expect(userRepositoryMock.updatePassword).toHaveBeenCalledWith(
            expect.objectContaining({
                uuid: request.userUuid,
                username: 'testuser',
                email: 'testuser@email.com',
                password: 'currentHashedPassword',
                role: UserRoleEnum.USER,
                createdAt: expect.any(Date),
            }),
            'newHashedPassword',
        );
    });

    it('should throw error when new password is the same as the old password', async () => {
        request.newPassword = 'currentHashedPassword';

        await expect(useCase.execute(request)).rejects.toThrow(
            'New password cannot be the same as the old password',
        );
    });
});
