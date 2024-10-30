import { LoginUserRequest } from './LoginUser.request';
import { LoginUserResponse } from './LoginUser.response';
import { JwtManagerInterface } from '../../gateway/JwtManager.interface';
import { PasswordManagerInterface } from '../../gateway/PasswordManager.interface';
import { UserRepositoryInterface } from '../../gateway/UserRepository.interface';
import { inject, injectable } from 'tsyringe';
import { JwtManager, PasswordManager, UserRepository } from '../../../utilities/constants';
import { ACCESS_AUD, ISSUER } from '../../../utilities/constants/jwt.constants';
import { JwtPayload } from '../../../entities/types/JwtManager.types';
import { ApiError, ApiErrorCode } from '../../../entities/error';

@injectable()
export class LoginUser {
    constructor(
        @inject(UserRepository) private readonly userRepository: UserRepositoryInterface,
        @inject(PasswordManager) private readonly passwordManager: PasswordManagerInterface,
        @inject(JwtManager) private readonly jwtManager: JwtManagerInterface,
    ) {}

    async execute(request: LoginUserRequest): Promise<LoginUserResponse> {
        const user = await this.userRepository.findByEmail(request.email);

        if (user === null) {
            throw new ApiError(
                ApiErrorCode.Unauthorized,
                'auth/unknown-email',
                'User with this email does not exist',
            );
        }

        const passwordMatch = await this.passwordManager.compare(request.password, user.password);
        if (!passwordMatch) {
            throw new ApiError(
                ApiErrorCode.Unauthorized,
                'auth/invalid-password',
                'Invalid password',
            );
        }

        const payload: JwtPayload = {
            userUuid: user.uuid,
            role: user.role.toString(),
        };

        const accessToken = await this.jwtManager.encode(payload, {
            expiresIn: '24 hours',
            issuer: ISSUER,
            audience: ACCESS_AUD,
        });

        return {
            user: {
                uuid: user.uuid,
                email: user.email,
                username: user.username,
                role: user.role.toString(),
            },
            accessToken,
        };
    }
}
