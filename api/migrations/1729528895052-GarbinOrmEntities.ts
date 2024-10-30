import { MigrationInterface, QueryRunner } from "typeorm";

export class GarbinOrmEntities1729528895052 implements MigrationInterface {
    name = 'GarbinOrmEntities1729528895052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`uuid\` uuid NOT NULL, \`username\` varchar(50) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('admin', 'user') NOT NULL DEFAULT 'user', \`firstname\` varchar(50) NULL, \`lastname\` varchar(50) NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`garment\` (\`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`uuid\` uuid NOT NULL, \`user_uuid\` uuid NOT NULL, \`name\` varchar(25) NOT NULL, \`image_url\` varchar(255) NOT NULL, \`size\` json NULL, \`brand\` varchar(255) NULL, \`colors\` text NULL, \`category_id\` int NULL, \`sub_category_id\` int NULL, INDEX \`IDX_f5ea0df9c3ca100102c5d0f3e4\` (\`user_uuid\`), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`outfit\` (\`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`uuid\` uuid NOT NULL, \`user_uuid\` uuid NOT NULL, \`name\` varchar(50) NOT NULL, \`main_top_uuid\` uuid NULL, \`sub_top_uuid\` uuid NULL, \`bottom_uuid\` uuid NULL, \`shoes_uuid\` uuid NULL, INDEX \`IDX_57fa90a29ff810118f358b8b79\` (\`user_uuid\`), UNIQUE INDEX \`REL_b23d544fabade34cce68f53b8b\` (\`main_top_uuid\`), UNIQUE INDEX \`REL_0578d7a1ce3d41bcc44325f91b\` (\`sub_top_uuid\`), UNIQUE INDEX \`REL_861bc040862c4e30baec91b98c\` (\`bottom_uuid\`), UNIQUE INDEX \`REL_26a4c33c7bfd8d924f7f6cb00b\` (\`shoes_uuid\`), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`outfit_plan\` (\`created_at\` datetime NOT NULL, \`updated_at\` datetime NULL, \`uuid\` uuid NOT NULL, \`name\` varchar(255) NOT NULL, \`user_uuid\` uuid NOT NULL, \`date\` datetime NOT NULL, \`location\` varchar(50) NULL, \`event\` varchar(150) NULL, \`outfit_uuid\` uuid NULL, INDEX \`IDX_3de2940b08e935304d39dcdaa1\` (\`user_uuid\`, \`outfit_uuid\`, \`date\`), UNIQUE INDEX \`REL_ed2a91bbc6b7bd903e44806e18\` (\`outfit_uuid\`), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`garment\` ADD CONSTRAINT \`FK_11b1146d590e4879878c2593614\` FOREIGN KEY (\`category_id\`) REFERENCES \`garment_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`garment\` ADD CONSTRAINT \`FK_37c319b081fd899447b2b51f1d9\` FOREIGN KEY (\`sub_category_id\`) REFERENCES \`garment_sub_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`outfit\` ADD CONSTRAINT \`FK_b23d544fabade34cce68f53b8bd\` FOREIGN KEY (\`main_top_uuid\`) REFERENCES \`garment\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`outfit\` ADD CONSTRAINT \`FK_0578d7a1ce3d41bcc44325f91b4\` FOREIGN KEY (\`sub_top_uuid\`) REFERENCES \`garment\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`outfit\` ADD CONSTRAINT \`FK_861bc040862c4e30baec91b98c2\` FOREIGN KEY (\`bottom_uuid\`) REFERENCES \`garment\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`outfit\` ADD CONSTRAINT \`FK_26a4c33c7bfd8d924f7f6cb00b4\` FOREIGN KEY (\`shoes_uuid\`) REFERENCES \`garment\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`outfit_plan\` ADD CONSTRAINT \`FK_ed2a91bbc6b7bd903e44806e181\` FOREIGN KEY (\`outfit_uuid\`) REFERENCES \`outfit\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`outfit_plan\` DROP FOREIGN KEY \`FK_ed2a91bbc6b7bd903e44806e181\``);
        await queryRunner.query(`ALTER TABLE \`outfit\` DROP FOREIGN KEY \`FK_26a4c33c7bfd8d924f7f6cb00b4\``);
        await queryRunner.query(`ALTER TABLE \`outfit\` DROP FOREIGN KEY \`FK_861bc040862c4e30baec91b98c2\``);
        await queryRunner.query(`ALTER TABLE \`outfit\` DROP FOREIGN KEY \`FK_0578d7a1ce3d41bcc44325f91b4\``);
        await queryRunner.query(`ALTER TABLE \`outfit\` DROP FOREIGN KEY \`FK_b23d544fabade34cce68f53b8bd\``);
        await queryRunner.query(`ALTER TABLE \`garment\` DROP FOREIGN KEY \`FK_37c319b081fd899447b2b51f1d9\``);
        await queryRunner.query(`ALTER TABLE \`garment\` DROP FOREIGN KEY \`FK_11b1146d590e4879878c2593614\``);
        await queryRunner.query(`DROP INDEX \`REL_ed2a91bbc6b7bd903e44806e18\` ON \`outfit_plan\``);
        await queryRunner.query(`DROP INDEX \`IDX_3de2940b08e935304d39dcdaa1\` ON \`outfit_plan\``);
        await queryRunner.query(`DROP TABLE \`outfit_plan\``);
        await queryRunner.query(`DROP INDEX \`REL_26a4c33c7bfd8d924f7f6cb00b\` ON \`outfit\``);
        await queryRunner.query(`DROP INDEX \`REL_861bc040862c4e30baec91b98c\` ON \`outfit\``);
        await queryRunner.query(`DROP INDEX \`REL_0578d7a1ce3d41bcc44325f91b\` ON \`outfit\``);
        await queryRunner.query(`DROP INDEX \`REL_b23d544fabade34cce68f53b8b\` ON \`outfit\``);
        await queryRunner.query(`DROP INDEX \`IDX_57fa90a29ff810118f358b8b79\` ON \`outfit\``);
        await queryRunner.query(`DROP TABLE \`outfit\``);
        await queryRunner.query(`DROP INDEX \`IDX_f5ea0df9c3ca100102c5d0f3e4\` ON \`garment\``);
        await queryRunner.query(`DROP TABLE \`garment\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
