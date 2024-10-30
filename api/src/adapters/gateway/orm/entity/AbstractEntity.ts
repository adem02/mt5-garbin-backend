import { Column, Entity } from 'typeorm';

@Entity()
export abstract class AbstractEntity {
    @Column({
        type: 'datetime',
        name: 'created_at',
        update: false,
    })
    createdAt: Date;

    @Column({
        type: 'datetime',
        name: 'updated_at',
        nullable: true,
        default: null,
    })
    updatedAt: Date | null;

    protected constructor(createdAt: Date, updatedAt?: Date | null) {
        this.createdAt = createdAt;
        this.updatedAt = updatedAt ?? null;
    }
}
