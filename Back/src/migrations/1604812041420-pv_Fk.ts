import {MigrationInterface, QueryRunner} from "typeorm";

export class pvFk1604812041420 implements MigrationInterface {
    name = 'pvFk1604812041420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `pv` ADD `folder_id` int NULL");
        await queryRunner.query("ALTER TABLE `pv` ADD UNIQUE INDEX `IDX_0f8da930a2d2630cb8721f4d07` (`folder_id`)");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_0f8da930a2d2630cb8721f4d07` ON `pv` (`folder_id`)");
        await queryRunner.query("ALTER TABLE `pv` ADD CONSTRAINT `FK_0f8da930a2d2630cb8721f4d074` FOREIGN KEY (`folder_id`) REFERENCES `folder`(`folder_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `pv` DROP FOREIGN KEY `FK_0f8da930a2d2630cb8721f4d074`");
        await queryRunner.query("DROP INDEX `REL_0f8da930a2d2630cb8721f4d07` ON `pv`");
        await queryRunner.query("ALTER TABLE `pv` DROP INDEX `IDX_0f8da930a2d2630cb8721f4d07`");
        await queryRunner.query("ALTER TABLE `pv` DROP COLUMN `folder_id`");
    }

}
