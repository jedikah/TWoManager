import {MigrationInterface, QueryRunner} from "typeorm";

export class tablesSetLength1604809036121 implements MigrationInterface {
    name = 'tablesSetLength1604809036121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `client_name`");
        await queryRunner.query("ALTER TABLE `client` ADD `client_name` varchar(35) NOT NULL");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `domicile`");
        await queryRunner.query("ALTER TABLE `client` ADD `domicile` varchar(50) NOT NULL");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `contact`");
        await queryRunner.query("ALTER TABLE `client` ADD `contact` varchar(10) NOT NULL");
        await queryRunner.query("ALTER TABLE `facture` DROP COLUMN `date_facture`");
        await queryRunner.query("ALTER TABLE `facture` ADD `date_facture` int NOT NULL");
        await queryRunner.query("ALTER TABLE `folder` DROP COLUMN `register`");
        await queryRunner.query("ALTER TABLE `folder` ADD `register` varchar(8) NOT NULL");
        await queryRunner.query("ALTER TABLE `folder` DROP COLUMN `num_title`");
        await queryRunner.query("ALTER TABLE `folder` ADD `num_title` varchar(8) NULL");
        await queryRunner.query("ALTER TABLE `folder` DROP COLUMN `ground_name`");
        await queryRunner.query("ALTER TABLE `folder` ADD `ground_name` varchar(30) NOT NULL");
        await queryRunner.query("ALTER TABLE `folder` DROP COLUMN `localisation_trav`");
        await queryRunner.query("ALTER TABLE `folder` ADD `localisation_trav` varchar(20) NOT NULL");
        await queryRunner.query("ALTER TABLE `folder` DROP COLUMN `fokontany`");
        await queryRunner.query("ALTER TABLE `folder` ADD `fokontany` varchar(15) NOT NULL");
        await queryRunner.query("ALTER TABLE `convocation` DROP COLUMN `name_pers_conv`");
        await queryRunner.query("ALTER TABLE `convocation` ADD `name_pers_conv` varchar(35) NOT NULL");
        await queryRunner.query("ALTER TABLE `convocation` DROP COLUMN `at_town`");
        await queryRunner.query("ALTER TABLE `convocation` ADD `at_town` varchar(20) NOT NULL");
        await queryRunner.query("ALTER TABLE `convocation` DROP COLUMN `num_requisition`");
        await queryRunner.query("ALTER TABLE `convocation` ADD `num_requisition` varchar(8) NOT NULL");
        await queryRunner.query("ALTER TABLE `letter` DROP COLUMN `num_rtx`");
        await queryRunner.query("ALTER TABLE `letter` ADD `num_rtx` varchar(8) NOT NULL");
        await queryRunner.query("ALTER TABLE `letter` DROP COLUMN `letter_town`");
        await queryRunner.query("ALTER TABLE `letter` ADD `letter_town` varchar(15) NOT NULL");
        await queryRunner.query("ALTER TABLE `letter` DROP COLUMN `object`");
        await queryRunner.query("ALTER TABLE `letter` ADD `object` varchar(80) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `letter` DROP COLUMN `object`");
        await queryRunner.query("ALTER TABLE `letter` ADD `object` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `letter` DROP COLUMN `letter_town`");
        await queryRunner.query("ALTER TABLE `letter` ADD `letter_town` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `letter` DROP COLUMN `num_rtx`");
        await queryRunner.query("ALTER TABLE `letter` ADD `num_rtx` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `convocation` DROP COLUMN `num_requisition`");
        await queryRunner.query("ALTER TABLE `convocation` ADD `num_requisition` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `convocation` DROP COLUMN `at_town`");
        await queryRunner.query("ALTER TABLE `convocation` ADD `at_town` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `convocation` DROP COLUMN `name_pers_conv`");
        await queryRunner.query("ALTER TABLE `convocation` ADD `name_pers_conv` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `folder` DROP COLUMN `fokontany`");
        await queryRunner.query("ALTER TABLE `folder` ADD `fokontany` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `folder` DROP COLUMN `localisation_trav`");
        await queryRunner.query("ALTER TABLE `folder` ADD `localisation_trav` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `folder` DROP COLUMN `ground_name`");
        await queryRunner.query("ALTER TABLE `folder` ADD `ground_name` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `folder` DROP COLUMN `num_title`");
        await queryRunner.query("ALTER TABLE `folder` ADD `num_title` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `folder` DROP COLUMN `register`");
        await queryRunner.query("ALTER TABLE `folder` ADD `register` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `facture` DROP COLUMN `date_facture`");
        await queryRunner.query("ALTER TABLE `facture` ADD `date_facture` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `contact`");
        await queryRunner.query("ALTER TABLE `client` ADD `contact` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `domicile`");
        await queryRunner.query("ALTER TABLE `client` ADD `domicile` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `client_name`");
        await queryRunner.query("ALTER TABLE `client` ADD `client_name` varchar(255) NOT NULL");
    }

}
