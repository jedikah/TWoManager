import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { TableName } from '../TableName';

export class createUserTable1594808032051 implements MigrationInterface {
  public userTable: Table = new Table({
    name: TableName.User,
    columns: [
      {
        name: 'IdUser',
        type: 'integer',
        isGenerated: true,
        generationStrategy: 'increment',
        isPrimary: true,
      },
      {
        name: 'userName',
        type: 'varchar',
        isNullable: false,
        isUnique: false,
      },
      {
        name: 'login',
        type: 'varchar',
        isNullable: false,
        isUnique: true,
      },
      {
        name: 'password',
        type: 'varchar',
        isNullable: false,
        isUnique: false,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.userTable, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.userTable);
  }
}
