import { UserRoleEnum } from '../../../src/entities/enum/UserRole.enum';
import { User } from '../../../src/entities/User';
import { ResourceId } from '../../../src/utilities/ResourceId';

export class UserBuilder {
    private uuid: string;
    private username: string;
    private email: string;
    private password: string;
    private role: UserRoleEnum;
    private createdAt: Date;
    private firstname?: string | null;
    private lastname?: string | null;
    private updatedAt?: Date | null;

    constructor() {
        this.uuid = ResourceId.generateUuid();
        this.username = 'testuser';
        this.email = 'test@email.com';
        this.password = 'password';
        this.role = UserRoleEnum.USER;
        this.createdAt = new Date();
    }

    withUuid(uuid: string): UserBuilder {
        this.uuid = uuid;
        return this;
    }

    withUsername(username: string): UserBuilder {
        this.username = username;
        return this;
    }

    withEmail(email: string): UserBuilder {
        this.email = email;
        return this;
    }

    withPassword(password: string): UserBuilder {
        this.password = password;
        return this;
    }

    withRole(role: UserRoleEnum): UserBuilder {
        this.role = role;
        return this;
    }

    withCreatedAt(createdAt: Date): UserBuilder {
        this.createdAt = createdAt;
        return this;
    }

    withFirstname(firstname: string | null): UserBuilder {
        this.firstname = firstname;
        return this;
    }

    withLastname(lastname: string | null): UserBuilder {
        this.lastname = lastname;
        return this;
    }

    withUpdatedAt(updatedAt: Date | null): UserBuilder {
        this.updatedAt = updatedAt;
        return this;
    }

    build(): User {
        return new User(
            this.uuid,
            this.username,
            this.email,
            this.password,
            this.role,
            this.createdAt,
            this.firstname,
            this.lastname,
            this.updatedAt,
        );
    }
}
