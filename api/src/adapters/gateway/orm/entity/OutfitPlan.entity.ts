import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { AbstractEntity } from './AbstractEntity';
import { OutfitEntity } from './Outfit.entity';

@Entity('outfit_plan')
@Index(['userUuid', 'date'])
export class OutfitPlanEntity extends AbstractEntity {
    @PrimaryColumn({
        type: 'uuid',
        update: false,
    })
    public readonly uuid: string;

    @Column({ length: 50 })
    name: string;

    @Column({
        type: 'uuid',
        update: false,
        name: 'user_uuid',
    })
    public readonly userUuid: string;

    @ManyToOne(() => OutfitEntity)
    @JoinColumn({ name: 'outfit_uuid' })
    @Index()
    public readonly outfit: OutfitEntity;

    @Column({ type: 'datetime' })
    public readonly date: Date;

    @Column({ length: 50 })
    public readonly location: string;

    constructor(
        uuid: string,
        name: string,
        userUuid: string,
        outfit: OutfitEntity,
        date: Date,
        createdAt: Date,
        location: string,
        updatedAt?: Date | null,
    ) {
        super(createdAt, updatedAt);

        this.uuid = uuid;
        this.name = name;
        this.userUuid = userUuid;
        this.outfit = outfit;
        this.date = date;
        this.location = location;
    }
}
