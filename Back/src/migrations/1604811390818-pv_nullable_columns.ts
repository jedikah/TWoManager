import {MigrationInterface, QueryRunner} from "typeorm";

export class pvNullableColumns1604811390818 implements MigrationInterface {
    name = 'pvNullableColumns1604811390818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `pv` ADD `cause` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `pv` CHANGE `attachments` `attachments` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `pv` DROP COLUMN `commune`");
        await queryRunner.query("ALTER TABLE `pv` ADD `commune` varchar(20) NULL");
        await queryRunner.query("ALTER TABLE `pv` DROP COLUMN `district`");
        await queryRunner.query("ALTER TABLE `pv` ADD `district` varchar(20) NULL");
        await queryRunner.query("ALTER TABLE `pv` DROP COLUMN `region`");
        await queryRunner.query("ALTER TABLE `pv` ADD `region` varchar(20) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `pv` DROP COLUMN `region`");
        await queryRunner.query("ALTER TABLE `pv` ADD `region` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `pv` DROP COLUMN `district`");
        await queryRunner.query("ALTER TABLE `pv` ADD `district` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `pv` DROP COLUMN `commune`");
        await queryRunner.query("ALTER TABLE `pv` ADD `commune` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `pv` CHANGE `attachments` `attachments` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `pv` DROP COLUMN `cause`");
    }

}
