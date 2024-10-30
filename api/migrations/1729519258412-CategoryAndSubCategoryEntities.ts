import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryAndSubCategoryEntities1729519258412 implements MigrationInterface {
    name = 'CategoryAndSubCategoryEntities1729519258412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`garment_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, UNIQUE INDEX \`IDX_44e9a77678482e3e60b00b2aba\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`garment_sub_category\` (\`id\` int NOT NULL, \`name\` varchar(45) NOT NULL, \`category_id\` int NULL, UNIQUE INDEX \`IDX_cdb3f4594928c7fd967d4f90f5\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`garment_sub_category\` ADD CONSTRAINT \`FK_162efc58ce233f9c23641439306\` FOREIGN KEY (\`category_id\`) REFERENCES \`garment_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`garment_sub_category\` DROP FOREIGN KEY \`FK_162efc58ce233f9c23641439306\``);
        await queryRunner.query(`DROP INDEX \`IDX_cdb3f4594928c7fd967d4f90f5\` ON \`garment_sub_category\``);
        await queryRunner.query(`DROP TABLE \`garment_sub_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_44e9a77678482e3e60b00b2aba\` ON \`garment_category\``);
        await queryRunner.query(`DROP TABLE \`garment_category\``);
    }

}
