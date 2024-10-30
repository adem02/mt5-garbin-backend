import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { AbstractEntity } from './AbstractEntity';
import { GarmentEntity } from './Garment.entity';

@Entity('outfit')
@Index(['userUuid'])
export class OutfitEntity extends AbstractEntity {
    @PrimaryColumn({
        type: 'uuid',
        update: false,
    })
    public readonly uuid: string;

    @Column({
        type: 'uuid',
        update: false,
        name: 'user_uuid',
    })
    public readonly userUuid: string;

    @Column({ length: 50 })
    public readonly name: string;

    @ManyToOne(() => GarmentEntity, { nullable: true })
    @JoinColumn({ name: 'main_top_uuid' })
    public readonly mainTop: GarmentEntity | null;

    @ManyToOne(() => GarmentEntity, { nullable: true })
    @JoinColumn({ name: 'sub_top_uuid' })
    public readonly subTop: GarmentEntity | null;

    @ManyToOne(() => GarmentEntity, { nullable: true })
    @JoinColumn({ name: 'bottom_uuid' })
    public readonly bottom: GarmentEntity | null;

    @ManyToOne(() => GarmentEntity, { nullable: true })
    @JoinColumn({ name: 'shoes_uuid' })
    public readonly shoes: GarmentEntity | null;

    constructor(
        uuid: string,
        userUuid: string,
        name: string,
        createdAt: Date,
        mainTop?: GarmentEntity | null,
        subTop?: GarmentEntity | null,
        bottom?: GarmentEntity | null,
        shoes?: GarmentEntity | null,
        updatedAt?: Date | null,
    ) {
        super(createdAt, updatedAt);

        this.uuid = uuid;
        this.userUuid = userUuid;
        this.name = name;
        this.mainTop = mainTop ?? null;
        this.subTop = subTop ?? null;
        this.bottom = bottom ?? null;
        this.shoes = shoes ?? null;
    }
}
