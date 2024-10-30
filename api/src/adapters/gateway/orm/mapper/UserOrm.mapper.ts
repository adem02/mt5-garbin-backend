import { User } from '../../../../entities/User';
import { UserEntity } from '../entity/User.entity';

export class UserOrmMapper {
    toOrmEntity(user: User): UserEntity {
        return new UserEntity(
            user.uuid,
            user.username,
            user.email,
            user.password,
            user.role,
            user.createdAt,
            user.updatedAt,
            user.firstname,
            user.lastname,
        );
    }

    toDomainEntity(ormEntity: UserEntity): User {
        return new User(
            ormEntity.uuid,
            ormEntity.username,
            ormEntity.email,
            ormEntity.password,
            ormEntity.role,
            ormEntity.createdAt,
            ormEntity.firstname,
            ormEntity.lastname,
            ormEntity.updatedAt,
        );
    }
}
