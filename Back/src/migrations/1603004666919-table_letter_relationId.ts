import {MigrationInterface, QueryRunner} from "typeorm";

export class tableLetterRelationId1603004666919 implements MigrationInterface {
    name = 'tableLetterRelationId1603004666919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `letters` DROP FOREIGN KEY `FK_1fb413592dc00b705f435a59b1a`");
        await queryRunner.query("DROP INDEX `REL_1fb413592dc00b705f435a59b1` ON `letters`");
        await queryRunner.query("ALTER TABLE `letters` DROP COLUMN `folderFolderId`");
        await queryRunner.query("ALTER TABLE `letters` CHANGE `folder_id` `folder_id` int NULL");
        await queryRunner.query("ALTER TABLE `letters` ADD UNIQUE INDEX `IDX_8bc0705f086455656013abead6` (`folder_id`)");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_8bc0705f086455656013abead6` ON `letters` (`folder_id`)");
        await queryRunner.query("ALTER TABLE `letters` ADD CONSTRAINT `FK_8bc0705f086455656013abead6e` FOREIGN KEY (`folder_id`) REFERENCES `folders`(`dossier_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `letters` DROP FOREIGN KEY `FK_8bc0705f086455656013abead6e`");
        await queryRunner.query("DROP INDEX `REL_8bc0705f086455656013abead6` ON `letters`");
        await queryRunner.query("ALTER TABLE `letters` DROP INDEX `IDX_8bc0705f086455656013abead6`");
        await queryRunner.query("ALTER TABLE `letters` CHANGE `folder_id` `folder_id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `letters` ADD `folderFolderId` int NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_1fb413592dc00b705f435a59b1` ON `letters` (`folderFolderId`)");
        await queryRunner.query("ALTER TABLE `letters` ADD CONSTRAINT `FK_1fb413592dc00b705f435a59b1a` FOREIGN KEY (`folderFolderId`) REFERENCES `folders`(`dossier_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
