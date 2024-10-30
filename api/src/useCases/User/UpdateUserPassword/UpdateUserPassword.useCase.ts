import { inject, injectable } from 'tsyringe';
import { UserRepositoryInterface } from '../../gateway/UserRepository.interface';
import { UpdateUserPasswordRequest } from './UpdateUserPassword.request';
import { PasswordManagerInterface } from '../../gateway/PasswordManager.interface';
import { PasswordManager, UserRepository } from '../../../utilities/constants';
import { ApiError, ApiErrorCode } from '../../../entities/error';

@injectable()
export class UpdateUserPassword {
    constructor(
        @inject(UserRepository) private readonly userRepository: UserRepositoryInterface,
        @inject(PasswordManager) private readonly passwordEncoder: PasswordManagerInterface,
    ) {}

    async execute(request: UpdateUserPasswordRequest): Promise<void> {
        const user = await this.userRepository.getByUuid(request.userUuid);

        if (user.password === request.newPassword) {
            throw new ApiError(
                ApiErrorCode.BadRequest,
                'user/password-same-as-old',
                'New password cannot be the same as the old password',
            );
        }

        const hashedPassword = await this.passwordEncoder.hash(request.newPassword);

        await this.userRepository.updatePassword(user, hashedPassword);
    }
}
