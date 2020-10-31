import {MigrationInterface, QueryRunner} from "typeorm";

export class tableFolderId1603713844377 implements MigrationInterface {
    name = 'tableFolderId1603713844377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_8bc0705f086455656013abead6` ON `letters`");
        await queryRunner.query("ALTER TABLE `folders` CHANGE `dossier_id` `folder_id` int NOT NULL AUTO_INCREMENT");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `folders` CHANGE `folder_id` `dossier_id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_8bc0705f086455656013abead6` ON `letters` (`folder_id`)");
    }

}
