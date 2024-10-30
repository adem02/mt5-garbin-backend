import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { GarmentCategory } from './GarmentCategory.entity';
import { GarmentSubCategory } from './GarmentSubCategory.entity';
import { AbstractEntity } from './AbstractEntity';
import {
    BottomGarmentSizeType,
    ShoeGarmentSizeType,
    TopGarmentSizeType,
} from '../../../../entities/types/GarmentSize.types';

type SizeType = TopGarmentSizeType | BottomGarmentSizeType | ShoeGarmentSizeType;

@Entity('garment')
@Index(['userUuid'])
export class GarmentEntity extends AbstractEntity {
    @PrimaryColumn({
        type: 'uuid',
        update: false,
    })
    public readonly uuid: string;

    @Column({
        type: 'uuid',
        name: 'user_uuid',
        update: false,
    })
    public readonly userUuid: string;

    @Column({
        length: 50,
    })
    public readonly name: string;

    @Column({ name: 'image_url' })
    public readonly imageUrl: string;

    @ManyToOne(() => GarmentCategory)
    @JoinColumn({ name: 'category_id' })
    public readonly category: GarmentCategory;

    @ManyToOne(() => GarmentSubCategory)
    @JoinColumn({ name: 'sub_category_id' })
    public readonly subCategory: GarmentSubCategory;

    @Column({
        type: 'json',
        nullable: true,
        default: null,
    })
    public readonly size: SizeType | null;

    @Column({
        type: 'varchar',
        nullable: true,
        default: null,
    })
    public readonly brand: string | null;

    @Column({
        type: 'simple-array',
        nullable: true,
        default: null,
    })
    public readonly colors: string[] | null;

    constructor(
        uuid: string,
        name: string,
        userUuid: string,
        category: GarmentCategory,
        subCategory: GarmentSubCategory,
        imageUrl: string,
        createdAt: Date,
        size?: SizeType | null,
        brand?: string | null,
        colors?: string[] | null,
        updatedAt?: Date | null,
    ) {
        super(createdAt, updatedAt);

        this.uuid = uuid;
        this.name = name;
        this.userUuid = userUuid;
        this.category = category;
        this.subCategory = subCategory;
        this.imageUrl = imageUrl;
        this.size = size ?? null;
        this.brand = brand ?? null;
        this.colors = colors ?? null;
    }
}
