import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertGarmentCategoryAndSubCategoryStaticData1729521923500 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO garment_category (id, name) VALUES 
            (1, 'main_top'), 
            (2, 'sub_top'), 
            (3, 'bottom'), 
            (4, 'shoes');
        `);

        await queryRunner.query(`
            INSERT INTO garment_sub_category (id, name, category_id) VALUES 
            (1, 'dress', 1), 
            (2, 'jacket', 1), 
            (3, 'coat', 1), 
            (4, 'bomber', 1), 
            (5, 'vest', 1), 
            (6, 'sweater', 1), 
            (7, 'sweatshirt', 1), 
            (8, 'down_jacket', 1), 
            (9, 'shirt', 2), 
            (10, 't-shirt', 2), 
            (11, 'polo', 2), 
            (12, 'tank_top', 2), 
            (13, 'short_sleeve_shirt', 2), 
            (14, 'sport_top', 2), 
            (15, 'sleeveless_top', 2), 
            (16, 'pants', 3), 
            (17, 'skirt', 3), 
            (18, 'shorts', 3), 
            (19, 'leggings', 3), 
            (20, 'jeans', 3), 
            (21, 'bermuda_shorts', 3), 
            (22, 'jogging_pants', 3), 
            (23, 'overalls', 3), 
            (24, 'cargo_pants', 3), 
            (25, 'sneakers', 4), 
            (26, 'sandals', 4), 
            (27, 'boots', 4), 
            (28, 'dress_shoes', 4), 
            (29, 'loafers', 4), 
            (30, 'espadrilles', 4), 
            (31, 'flip-flops', 4), 
            (32, 'ankle_boots', 4), 
            (33, 'sports_shoes', 4), 
            (34, 'hiking_shoes', 4), 
            (35, 'flats', 4);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM garment_sub_category WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35);`);

        await queryRunner.query(`DELETE FROM garment_category WHERE id IN (1, 2, 3, 4);`);
    }

}
