import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

import { TableName } from '../TableName';

export class createTablesForeignKey1595003387087 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Collaborate table
    await queryRunner.createForeignKey(
      TableName.Collaborate,
      new TableForeignKey({
        columnNames: ['user_Id'],
        referencedColumnNames: ['user_Id'],
        referencedTableName: TableName.User,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      TableName.Collaborate,
      new TableForeignKey({
        columnNames: ['client_Id'],
        referencedColumnNames: ['client_Id'],
        referencedTableName: TableName.Client,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    // Folders table
    await queryRunner.createForeignKey(
      TableName.Folder,
      new TableForeignKey({
        columnNames: ['user_Id'],
        referencedColumnNames: ['user_Id'],
        referencedTableName: TableName.User,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      TableName.Folder,
      new TableForeignKey({
        columnNames: ['client_Id'],
        referencedColumnNames: ['client_Id'],
        referencedTableName: TableName.Client,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      TableName.Folder,
      new TableForeignKey({
        columnNames: ['facture_Id'],
        referencedColumnNames: ['facture_Id'],
        referencedTableName: TableName.Facture,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    // Lettres table
    await queryRunner.createForeignKey(
      TableName.Letter,
      new TableForeignKey({
        columnNames: ['folder_Id'],
        referencedColumnNames: ['folder_Id'],
        referencedTableName: TableName.Folder,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    // Convocation table
    await queryRunner.createForeignKey(
      TableName.Convocation,
      new TableForeignKey({
        columnNames: ['folder_Id'],
        referencedColumnNames: ['folder_Id'],
        referencedTableName: TableName.Folder,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      TableName.Convocation,
      new TableForeignKey({
        columnNames: ['pv_Num'],
        referencedColumnNames: ['pv_Num'],
        referencedTableName: TableName.Pv,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Collaborate table
    let table = await queryRunner.getTable(TableName.Collaborate);
    let foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('user_Id') !== -1,
    );
    await queryRunner.dropForeignKey(TableName.User, foreignKey);

    foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('client_Id') !== -1,
    );
    await queryRunner.dropForeignKey(TableName.User, foreignKey);

    // Folders table
    table = await queryRunner.getTable(TableName.Folder);
    foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('user_Id') !== -1,
    );
    await queryRunner.dropForeignKey(TableName.User, foreignKey);

    foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('client_Id') !== -1,
    );
    await queryRunner.dropForeignKey(TableName.User, foreignKey);

    foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('facture_Id') !== -1,
    );
    await queryRunner.dropForeignKey(TableName.User, foreignKey);

    // Letter table
    table = await queryRunner.getTable(TableName.Letter);
    foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('folder_Id') !== -1,
    );
    await queryRunner.dropForeignKey(TableName.User, foreignKey);

    // Convocation table
    table = await queryRunner.getTable(TableName.Convocation);
    foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('folder_Id') !== -1,
    );
    await queryRunner.dropForeignKey(TableName.User, foreignKey);

    table = await queryRunner.getTable(TableName.Convocation);
    foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('pv_Num') !== -1,
    );
    await queryRunner.dropForeignKey(TableName.User, foreignKey);
  }
}
