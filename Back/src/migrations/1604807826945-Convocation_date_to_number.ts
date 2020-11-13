import {MigrationInterface, QueryRunner} from "typeorm";

export class ConvocationDateToNumber1604807826945 implements MigrationInterface {
    name = 'ConvocationDateToNumber1604807826945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `convocation` DROP COLUMN `at_time`");
        await queryRunner.query("ALTER TABLE `convocation` DROP COLUMN `convoke_on`");
        await queryRunner.query("ALTER TABLE `convocation` ADD `convoke_on` int NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `convocation` DROP COLUMN `convoke_on`");
        await queryRunner.query("ALTER TABLE `convocation` ADD `convoke_on` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `convocation` ADD `at_time` varchar(255) NOT NULL");
    }

}
