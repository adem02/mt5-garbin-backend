import { RegisterUserRequest } from './RegisterUser.request';
import { inject, injectable } from 'tsyringe';
import { JwtManager, PasswordManager, UserRepository } from '../../../utilities/constants';
import { UserRepositoryInterface } from '../../gateway/UserRepository.interface';
import { User } from '../../../entities/User';
import { UserRoleEnum } from '../../../entities/enum/UserRole.enum';
import { ResourceId } from '../../../utilities/ResourceId';
import { PasswordManagerInterface } from '../../gateway/PasswordManager.interface';
import { JwtManagerInterface } from '../../gateway/JwtManager.interface';
import { JwtPayload } from '../../../entities/types/JwtManager.types';
import { ACCESS_AUD, ISSUER } from '../../../utilities/constants/jwt.constants';
import { RegisterUserResponse } from './RegisterUser.response';
import { ApiError, ApiErrorCode } from '../../../entities/error';

@injectable()
export class RegisterUser {
    constructor(
        @inject(UserRepository) private readonly userRepository: UserRepositoryInterface,
        @inject(PasswordManager) private readonly passwordManager: PasswordManagerInterface,
        @inject(JwtManager) private readonly jwtManager: JwtManagerInterface,
    ) {}

    async execute(request: RegisterUserRequest): Promise<RegisterUserResponse> {
        const existentUser = await this.userRepository.findByEmail(request.email);

        if (existentUser !== null) {
            throw new ApiError(
                ApiErrorCode.Unauthorized,
                'auth/email-already-exists',
                'Email already exists',
            );
        }

        const hashedPassword = await this.passwordManager.hash(request.password);

        const newUser = new User(
            ResourceId.generateUuid(),
            request.username,
            request.email,
            hashedPassword,
            UserRoleEnum.USER,
            new Date(),
        );

        await this.userRepository.create(newUser);

        const payload: JwtPayload = {
            userUuid: newUser.uuid,
            role: newUser.role.toString(),
        };

        const accessToken = await this.jwtManager.encode(payload, {
            expiresIn: '24 hours',
            issuer: ISSUER,
            audience: ACCESS_AUD,
        });

        return {
            user: {
                uuid: newUser.uuid,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
            accessToken,
        };
    }
}
