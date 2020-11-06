import {MigrationInterface, QueryRunner} from "typeorm";

export class createTable1604668652375 implements MigrationInterface {
    name = 'createTable1604668652375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `client` (`client_id` int NOT NULL AUTO_INCREMENT, `client_name` varchar(255) NOT NULL, `domicile` varchar(255) NOT NULL, `contact` varchar(255) NOT NULL, PRIMARY KEY (`client_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `facture` (`facture_id` int NOT NULL AUTO_INCREMENT, `date_facture` datetime NOT NULL, PRIMARY KEY (`facture_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `folder` (`folder_id` int NOT NULL AUTO_INCREMENT, `register` varchar(255) NOT NULL, `num_title` varchar(255) NULL, `ground_name` varchar(255) NOT NULL, `localisation_trav` varchar(255) NOT NULL, `fokontany` varchar(255) NOT NULL, `date_trav` datetime NOT NULL, `type_trav` varchar(255) NOT NULL, `price` int NULL, `user_id` int NULL, `client_id` int NULL, `facture_id` int NULL, PRIMARY KEY (`folder_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`user_id` int NOT NULL AUTO_INCREMENT, `user_name` varchar(255) NOT NULL, `login` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `photo` varchar(255) NULL, `type` varchar(255) NULL, `status` tinyint NULL, UNIQUE INDEX `IDX_a62473490b3e4578fd683235c5` (`login`), PRIMARY KEY (`user_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `collaborate` (`created_at` datetime NOT NULL, `updated_at` datetime NOT NULL, `user_id` int NOT NULL, `client_id` int NOT NULL, PRIMARY KEY (`user_id`, `client_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `pv` (`num_pv` int NOT NULL AUTO_INCREMENT, `attachments` varchar(255) NOT NULL, `commune` varchar(255) NOT NULL, `district` varchar(255) NOT NULL, `region` varchar(255) NOT NULL, PRIMARY KEY (`num_pv`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `convocation` (`num_register` int NOT NULL, `name_pers_conv` varchar(255) NOT NULL, `convoke_on` datetime NOT NULL, `at_town` varchar(255) NOT NULL, `at_time` varchar(255) NOT NULL, `num_requisition` varchar(255) NOT NULL, `folder_id` int NULL, `num_pv` int NULL, PRIMARY KEY (`num_register`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `letter` (`id` int NOT NULL, `num_rtx` varchar(255) NOT NULL, `date_rtx` datetime NOT NULL, `letter_town` varchar(255) NOT NULL, `object` varchar(255) NOT NULL, `folder_id` int NULL, UNIQUE INDEX `REL_dfa8d9ecf76500531ee6ad54e3` (`folder_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `folder` ADD CONSTRAINT `FK_b5eabd10f2fe9607e6f5a6ec6bc` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `folder` ADD CONSTRAINT `FK_95d02e6371bfe532024d9cd5e79` FOREIGN KEY (`client_id`) REFERENCES `client`(`client_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `folder` ADD CONSTRAINT `FK_db511d3c4c5dec3f6be38a8b53f` FOREIGN KEY (`facture_id`) REFERENCES `facture`(`facture_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `collaborate` ADD CONSTRAINT `FK_07890b6cb0e21c189737225d018` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `collaborate` ADD CONSTRAINT `FK_85a0459f04a679b3004645087c8` FOREIGN KEY (`client_id`) REFERENCES `client`(`client_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `convocation` ADD CONSTRAINT `FK_55af6917cd0b0c569938345c399` FOREIGN KEY (`folder_id`) REFERENCES `folder`(`folder_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `convocation` ADD CONSTRAINT `FK_7410f11cb709b65126b7eb3ab8b` FOREIGN KEY (`num_pv`) REFERENCES `pv`(`num_pv`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `letter` ADD CONSTRAINT `FK_dfa8d9ecf76500531ee6ad54e34` FOREIGN KEY (`folder_id`) REFERENCES `folder`(`folder_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `letter` DROP FOREIGN KEY `FK_dfa8d9ecf76500531ee6ad54e34`");
        await queryRunner.query("ALTER TABLE `convocation` DROP FOREIGN KEY `FK_7410f11cb709b65126b7eb3ab8b`");
        await queryRunner.query("ALTER TABLE `convocation` DROP FOREIGN KEY `FK_55af6917cd0b0c569938345c399`");
        await queryRunner.query("ALTER TABLE `collaborate` DROP FOREIGN KEY `FK_85a0459f04a679b3004645087c8`");
        await queryRunner.query("ALTER TABLE `collaborate` DROP FOREIGN KEY `FK_07890b6cb0e21c189737225d018`");
        await queryRunner.query("ALTER TABLE `folder` DROP FOREIGN KEY `FK_db511d3c4c5dec3f6be38a8b53f`");
        await queryRunner.query("ALTER TABLE `folder` DROP FOREIGN KEY `FK_95d02e6371bfe532024d9cd5e79`");
        await queryRunner.query("ALTER TABLE `folder` DROP FOREIGN KEY `FK_b5eabd10f2fe9607e6f5a6ec6bc`");
        await queryRunner.query("DROP INDEX `REL_dfa8d9ecf76500531ee6ad54e3` ON `letter`");
        await queryRunner.query("DROP TABLE `letter`");
        await queryRunner.query("DROP TABLE `convocation`");
        await queryRunner.query("DROP TABLE `pv`");
        await queryRunner.query("DROP TABLE `collaborate`");
        await queryRunner.query("DROP INDEX `IDX_a62473490b3e4578fd683235c5` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `folder`");
        await queryRunner.query("DROP TABLE `facture`");
        await queryRunner.query("DROP TABLE `client`");
    }

}
