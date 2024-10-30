import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { UserRoleEnum } from '../../../../entities/enum/UserRole.enum';
import { AbstractEntity } from './AbstractEntity';

@Entity('user')
export class UserEntity extends AbstractEntity {
    @PrimaryColumn({
        type: 'uuid',
        update: false,
    })
    public readonly uuid: string;

    @Column({ length: 50 })
    @Index({ unique: true })
    public readonly username: string;

    @Column({ length: 100 })
    @Index({ unique: true })
    public readonly email: string;

    @Column()
    public readonly password: string;

    @Column({
        type: 'enum',
        enum: UserRoleEnum,
        default: UserRoleEnum.USER,
    })
    public readonly role: UserRoleEnum;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true,
        default: null,
    })
    public readonly firstname: string | null;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true,
        default: null,
    })
    public readonly lastname: string | null;

    constructor(
        uuid: string,
        username: string,
        email: string,
        password: string,
        role: UserRoleEnum,
        createdAt: Date,
        updatedAt?: Date | null,
        firstname?: string | null,
        lastname?: string | null,
    ) {
        super(createdAt, updatedAt);

        this.uuid = uuid;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.firstname = firstname ?? null;
        this.lastname = lastname ?? null;
    }
}
