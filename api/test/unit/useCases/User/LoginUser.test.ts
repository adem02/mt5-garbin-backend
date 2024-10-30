import 'reflect-metadata';
import { LoginUser } from '../../../../src/useCases/User/LoginUser/LoginUser.useCase';
import { User } from '../../../../src/entities/User';
import { UserRoleEnum } from '../../../../src/entities/enum/UserRole.enum';
import { LoginUserRequest } from '../../../../src/useCases/User/LoginUser/LoginUser.request';
import { JwtManagerInterface } from '../../../../src/useCases/gateway/JwtManager.interface';
import { PasswordManagerInterface } from '../../../../src/useCases/gateway/PasswordManager.interface';
import { UserRepositoryInterface } from '../../../../src/useCases/gateway/UserRepository.interface';

describe('Unit: Login User use case', () => {
    let useCaseMock: LoginUser;
    let userRepositoryMock: Partial<UserRepositoryInterface>;
    let passwordManagerMock: Partial<PasswordManagerInterface>;
    let jwtManagerMock: Partial<JwtManagerInterface>;
    let request: LoginUserRequest;

    beforeEach(() => {
        userRepositoryMock = {
            findByEmail: jest.fn(async (_) => {
                return new User(
                    'uuid',
                    'username',
                    'email',
                    'hashedPassword',
                    UserRoleEnum.USER,
                    new Date(),
                );
            }),
        };

        passwordManagerMock = {
            compare: jest.fn(async (_, __) => true),
        };
        jwtManagerMock = {
            encode: jest.fn(async (_, __) => 'jwtLoginToken'),
        };

        request = {
            email: 'email',
            password: 'password',
        };

        useCaseMock = new LoginUser(
            userRepositoryMock as UserRepositoryInterface,
            passwordManagerMock as PasswordManagerInterface,
            jwtManagerMock as JwtManagerInterface,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should login a user successfully', async () => {
        const response = await useCaseMock.execute(request);

        const payload = {
            userUuid: 'uuid',
            role: UserRoleEnum.USER.toString(),
        };

        expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(request.email);
        expect(passwordManagerMock.compare).toHaveBeenCalledWith(
            request.password,
            'hashedPassword',
        );
        expect(jwtManagerMock.encode).toHaveBeenCalledWith(payload, {
            expiresIn: '24 hours',
            issuer: 'api-auth',
            audience: 'api-access',
        });
        expect(response).toEqual({
            user: {
                uuid: 'uuid',
                username: 'username',
                email: 'email',
                role: UserRoleEnum.USER,
            },
            accessToken: 'jwtLoginToken',
        });
    });
    it('should throw an error if user is not found with given email', async () => {
        userRepositoryMock.findByEmail = jest.fn(async (_) => null);

        await expect(useCaseMock.execute(request)).rejects.toThrow(
            'User with this email does not exist',
        );
        expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(request.email);
        expect(passwordManagerMock.compare).not.toHaveBeenCalled();
        expect(jwtManagerMock.encode).not.toHaveBeenCalled();
    });
    it('should throw an error if password does not match', async () => {
        passwordManagerMock.compare = jest.fn(async (_, __) => false);

        await expect(useCaseMock.execute(request)).rejects.toThrow('Invalid password');
        expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(request.email);
        expect(passwordManagerMock.compare).toHaveBeenCalledWith(
            request.password,
            'hashedPassword',
        );
        expect(jwtManagerMock.encode).not.toHaveBeenCalled();
    });
});
