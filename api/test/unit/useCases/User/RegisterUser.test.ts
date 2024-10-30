import 'reflect-metadata';
import { RegisterUser } from '../../../../src/useCases/User/RegisterUser/RegisterUser.useCase';
import { UserRepositoryInterface } from '../../../../src/useCases/gateway/UserRepository.interface';
import { PasswordManagerInterface } from '../../../../src/useCases/gateway/PasswordManager.interface';
import { JwtManagerInterface } from '../../../../src/useCases/gateway/JwtManager.interface';
import { RegisterUserRequest } from '../../../../src/useCases/User/RegisterUser/RegisterUser.request';
import { User } from '../../../../src/entities/User';
import { UserRoleEnum } from '../../../../src/entities/enum/UserRole.enum';

describe('Unit: Register User use case.', () => {
    let useCaseMock: RegisterUser;
    let userRepositoryMock: Partial<UserRepositoryInterface>;
    let passwordManagerMock: Partial<PasswordManagerInterface>;
    let jwtManagerMock: Partial<JwtManagerInterface>;
    let request: RegisterUserRequest;

    beforeEach(() => {
        userRepositoryMock = {
            create: jest.fn(async (_) => {}),
            findByEmail: jest.fn(async (_) => {
                return null;
            }),
        };
        passwordManagerMock = {
            hash: jest.fn(async (_) => 'hashedPassword'),
        };
        jwtManagerMock = {
            encode: jest.fn(async (_, __) => 'jwtToken'),
        };

        request = {
            username: 'username',
            email: 'email',
            password: 'password',
        };

        useCaseMock = new RegisterUser(
            userRepositoryMock as UserRepositoryInterface,
            passwordManagerMock as PasswordManagerInterface,
            jwtManagerMock as JwtManagerInterface,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should register a new user successfully', async () => {
        request = {
            username: 'username',
            email: 'email',
            password: 'password',
        };

        const response = await useCaseMock.execute(request);

        const user = new User(
            expect.any(String),
            request.username,
            request.email,
            'hashedPassword',
            UserRoleEnum.USER,
            expect.any(Date),
        );

        const payload = {
            userUuid: user.uuid,
            role: user.role.toString(),
        };

        expect(userRepositoryMock.findByEmail).toHaveBeenCalledTimes(1);
        expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(request.email);
        expect(passwordManagerMock.hash).toHaveBeenCalledTimes(1);
        expect(passwordManagerMock.hash).toHaveBeenCalledWith(request.password);
        expect(userRepositoryMock.create).toHaveBeenCalledTimes(1);
        expect(userRepositoryMock.create).toHaveBeenCalledWith(user);
        expect(jwtManagerMock.encode).toHaveBeenCalledTimes(1);
        expect(jwtManagerMock.encode).toHaveBeenCalledWith(payload, {
            expiresIn: '24 hours',
            issuer: 'api-auth',
            audience: 'api-access',
        });

        expect(response).toEqual({
            user: {
                uuid: expect.any(String),
                username: request.username,
                email: request.email,
                role: UserRoleEnum.USER,
            },
            accessToken: 'jwtToken',
        });
    });
    it('should throw an error if the email is already taken', async () => {
        userRepositoryMock.findByEmail = jest.fn(async (_) => {
            return new User('uuid', 'username', 'email', 'password', UserRoleEnum.USER, new Date());
        });

        await expect(useCaseMock.execute(request)).rejects.toThrow('Email already exists');
        expect(userRepositoryMock.findByEmail).toHaveBeenCalledTimes(1);
        expect(passwordManagerMock.hash).not.toHaveBeenCalled();
        expect(userRepositoryMock.create).not.toHaveBeenCalled();
        expect(jwtManagerMock.encode).not.toHaveBeenCalled();
    });
});
