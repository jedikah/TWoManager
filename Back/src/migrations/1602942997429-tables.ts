import {MigrationInterface, QueryRunner} from "typeorm";

export class tables1602942997429 implements MigrationInterface {
    name = 'tables1602942997429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `clients` (`client_id` int NOT NULL AUTO_INCREMENT, `client_name` varchar(255) NOT NULL, `domicile` varchar(255) NOT NULL, `contact` varchar(255) NOT NULL, PRIMARY KEY (`client_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `factures` (`facture_id` int NOT NULL AUTO_INCREMENT, `date_facture` datetime NOT NULL, PRIMARY KEY (`facture_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `folders` (`dossier_id` int NOT NULL AUTO_INCREMENT, `register` varchar(255) NOT NULL, `num_title` varchar(255) NULL, `ground_name` varchar(255) NOT NULL, `localisation_trav` varchar(255) NOT NULL, `fokontany` varchar(255) NOT NULL, `date_trav` datetime NOT NULL, `type_trav` varchar(255) NOT NULL, `price` int NULL, `user_id` int NULL, `client_id` int NULL, `facture_id` int NULL, PRIMARY KEY (`dossier_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`user_id` int NOT NULL AUTO_INCREMENT, `user_name` varchar(255) NOT NULL, `login` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `photo` varchar(255) NULL, `type` varchar(255) NULL, `status` tinyint NULL, UNIQUE INDEX `IDX_2d443082eccd5198f95f2a36e2` (`login`), PRIMARY KEY (`user_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `collaborate` (`created_at` datetime NOT NULL, `updated_at` datetime NOT NULL, `user_id` int NOT NULL, `client_id` int NOT NULL, PRIMARY KEY (`user_id`, `client_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `pvs` (`num_pv` int NOT NULL AUTO_INCREMENT, `attachments` varchar(255) NOT NULL, `commune` varchar(255) NOT NULL, `district` varchar(255) NOT NULL, `region` varchar(255) NOT NULL, PRIMARY KEY (`num_pv`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `convocations` (`num_register` int NOT NULL, `name_pers_conv` varchar(255) NOT NULL, `convoke_on` datetime NOT NULL, `at_town` varchar(255) NOT NULL, `at_time` varchar(255) NOT NULL, `num_requisition` varchar(255) NOT NULL, `folder_id` int NULL, `num_pv` int NULL, PRIMARY KEY (`num_register`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `letters` (`num_rtx` varchar(255) NOT NULL, `folder_id` int NOT NULL, `date_rtx` datetime NOT NULL, `letter_town` varchar(255) NOT NULL, `created_at` datetime NOT NULL, `object` varchar(255) NOT NULL, `folderFolderId` int NULL, UNIQUE INDEX `REL_1fb413592dc00b705f435a59b1` (`folderFolderId`), PRIMARY KEY (`num_rtx`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `folders` ADD CONSTRAINT `FK_71af7633de585b66b4db26734c9` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `folders` ADD CONSTRAINT `FK_f2971ea6ec4c9a20c22d7638854` FOREIGN KEY (`client_id`) REFERENCES `clients`(`client_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `folders` ADD CONSTRAINT `FK_f69b5bcd49f1e7c928e9cd4b0c0` FOREIGN KEY (`facture_id`) REFERENCES `factures`(`facture_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `collaborate` ADD CONSTRAINT `FK_07890b6cb0e21c189737225d018` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `collaborate` ADD CONSTRAINT `FK_85a0459f04a679b3004645087c8` FOREIGN KEY (`client_id`) REFERENCES `clients`(`client_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `convocations` ADD CONSTRAINT `FK_6dc0b0f60a40d5d0ff73b47d220` FOREIGN KEY (`folder_id`) REFERENCES `folders`(`dossier_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `convocations` ADD CONSTRAINT `FK_f2eac6219d55a797d51dd4c465f` FOREIGN KEY (`num_pv`) REFERENCES `pvs`(`num_pv`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `letters` ADD CONSTRAINT `FK_1fb413592dc00b705f435a59b1a` FOREIGN KEY (`folderFolderId`) REFERENCES `folders`(`dossier_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `letters` DROP FOREIGN KEY `FK_1fb413592dc00b705f435a59b1a`");
        await queryRunner.query("ALTER TABLE `convocations` DROP FOREIGN KEY `FK_f2eac6219d55a797d51dd4c465f`");
        await queryRunner.query("ALTER TABLE `convocations` DROP FOREIGN KEY `FK_6dc0b0f60a40d5d0ff73b47d220`");
        await queryRunner.query("ALTER TABLE `collaborate` DROP FOREIGN KEY `FK_85a0459f04a679b3004645087c8`");
        await queryRunner.query("ALTER TABLE `collaborate` DROP FOREIGN KEY `FK_07890b6cb0e21c189737225d018`");
        await queryRunner.query("ALTER TABLE `folders` DROP FOREIGN KEY `FK_f69b5bcd49f1e7c928e9cd4b0c0`");
        await queryRunner.query("ALTER TABLE `folders` DROP FOREIGN KEY `FK_f2971ea6ec4c9a20c22d7638854`");
        await queryRunner.query("ALTER TABLE `folders` DROP FOREIGN KEY `FK_71af7633de585b66b4db26734c9`");
        await queryRunner.query("DROP INDEX `REL_1fb413592dc00b705f435a59b1` ON `letters`");
        await queryRunner.query("DROP TABLE `letters`");
        await queryRunner.query("DROP TABLE `convocations`");
        await queryRunner.query("DROP TABLE `pvs`");
        await queryRunner.query("DROP TABLE `collaborate`");
        await queryRunner.query("DROP INDEX `IDX_2d443082eccd5198f95f2a36e2` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `folders`");
        await queryRunner.query("DROP TABLE `factures`");
        await queryRunner.query("DROP TABLE `clients`");
    }

}
