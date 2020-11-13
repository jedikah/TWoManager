import {MigrationInterface, QueryRunner} from "typeorm";

export class pvIdentifiant1605010274029 implements MigrationInterface {
    name = 'pvIdentifiant1605010274029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_0f8da930a2d2630cb8721f4d07` ON `pv`");
        await queryRunner.query("ALTER TABLE `pv` CHANGE `num_pv` `pv_Id` int NOT NULL AUTO_INCREMENT");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `pv` CHANGE `pv_Id` `num_pv` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_0f8da930a2d2630cb8721f4d07` ON `pv` (`folder_id`)");
    }

}
