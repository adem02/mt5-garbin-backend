import { User } from '../../entities/User';

export interface UserRepositoryInterface {
    create(user: User): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
    getByUuid(uuid: string): Promise<User>;
    updatePassword(user: User, newPassword: string): Promise<void>;
}
