import { UserRoleEnum } from './enum/UserRole.enum';

export class User {
    constructor(
        public readonly uuid: string,
        public readonly username: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: UserRoleEnum,
        public readonly createdAt: Date,
        public readonly firstname?: string | null,
        public readonly lastname?: string | null,
        public readonly updatedAt?: Date | null,
    ) {}
}
