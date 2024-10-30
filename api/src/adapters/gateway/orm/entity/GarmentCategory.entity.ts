import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('garment_category')
export class GarmentCategory {
    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Column({
        unique: true,
        length: 20,
    })
    public readonly name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
