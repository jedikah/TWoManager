import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserAdmin1595320503952 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // const userName = 'Admin',
    //   login = 'admin',
    //   password = 'root',
    //   type = 'admninistrateur',
    //   status = true;
    // await queryRunner.query(
    //   /*sql */ `INSERT
    //                 INTO users(user_Name, login, password, Type, status)
    //               VALUES (?,?,?,?,?)
    //               `,
    //   [userName, login, password, type, status],
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(/*sql*/ `DELETE FROM 'users' WHERE 1`);
  }
}
