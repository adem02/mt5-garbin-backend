import { User } from '../../../../entities/User';
import { UserRepositoryInterface } from '../../../../useCases/gateway/UserRepository.interface';
import { injectable } from 'tsyringe';
import { UserOrmMapper } from '../mapper/UserOrm.mapper';
import DataSource from '../../../../frameworks/db/data-source';
import { UserEntity } from '../entity/User.entity';
import { Repository } from 'typeorm';
import { ApiError, ApiErrorCode } from '../../../../entities/error';

@injectable()
export class UserRepository implements UserRepositoryInterface {
    private readonly repository: Repository<UserEntity>;

    constructor(private readonly userOrmMapper: UserOrmMapper) {
        this.repository = DataSource.getRepository(UserEntity);
    }

    async create(user: User): Promise<void> {
        const userEntity = this.userOrmMapper.toOrmEntity(user);

        try {
            await this.repository.insert(userEntity);
        } catch (error: any) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ApiError(ApiErrorCode.BadRequest, 'sql/failed', 'User already exists');
            }

            throw error;
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        const userEntity = await this.repository.findOneBy({ email });

        if (userEntity === null) {
            return null;
        }

        return this.userOrmMapper.toDomainEntity(userEntity);
    }

    async getByUuid(uuid: string): Promise<User> {
        const userEntity = await this.repository.findOneBy({ uuid });

        if (userEntity === null) {
            throw new ApiError(ApiErrorCode.NotFound, 'sql/not-found', 'User not found');
        }

        return this.userOrmMapper.toDomainEntity(userEntity);
    }

    async updatePassword(user: User, newPassword: string): Promise<void> {
        await this.repository.update(user.uuid, { password: newPassword });
    }
}
