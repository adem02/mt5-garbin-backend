import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { GarmentCategory } from './GarmentCategory.entity';

@Entity('garment_sub_category')
export class GarmentSubCategory {
    @PrimaryColumn()
    public readonly id: number;

    @Column({
        unique: true,
        length: 45,
    })
    public readonly name: string;

    @ManyToOne(() => GarmentCategory)
    @JoinColumn({ name: 'category_id' })
    public readonly category: GarmentCategory;

    constructor(id: number, name: string, category: GarmentCategory) {
        this.id = id;
        this.name = name;
        this.category = category;
    }
}
