import {MigrationInterface, QueryRunner} from "typeorm";

export class tableLetterSetPrimayGenerated1604669125777 implements MigrationInterface {
    name = 'tableLetterSetPrimayGenerated1604669125777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `letter` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `letter` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `letter` ADD `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `letter` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `letter` ADD `id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `letter` ADD PRIMARY KEY (`id`)");
    }

}
