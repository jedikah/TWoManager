import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

import { TableName } from '../TableName';

export class createTablesForeignKey1595003387087 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Collaborate table
    await queryRunner.createForeignKey(
      TableName.Collaborate,
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['userId'],
        referencedTableName: TableName.User,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      TableName.Collaborate,
      new TableForeignKey({
        columnNames: ['clientId'],
        referencedColumnNames: ['clientId'],
        referencedTableName: TableName.Client,
        onDelete: 'CASCADE',
      }),
    );

    // Folders table
    await queryRunner.createForeignKey(
      TableName.Folder,
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['userId'],
        referencedTableName: TableName.User,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      TableName.Folder,
      new TableForeignKey({
        columnNames: ['clientId'],
        referencedColumnNames: ['clientId'],
        referencedTableName: TableName.Client,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      TableName.Folder,
      new TableForeignKey({
        columnNames: ['factureId'],
        referencedColumnNames: ['factureId'],
        referencedTableName: TableName.Facture,
        onDelete: 'CASCADE',
      }),
    );

    // Lettres table
    await queryRunner.createForeignKey(
      TableName.Letter,
      new TableForeignKey({
        columnNames: ['folderId'],
        referencedColumnNames: ['folderId'],
        referencedTableName: TableName.Folder,
        onDelete: 'CASCADE',
      }),
    );

    // Convocation table
    await queryRunner.createForeignKey(
      TableName.Convocation,
      new TableForeignKey({
        columnNames: ['folderId'],
        referencedColumnNames: ['folderId'],
        referencedTableName: TableName.Folder,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      TableName.Convocation,
      new TableForeignKey({
        columnNames: ['pvNum'],
        referencedColumnNames: ['pvNum'],
        referencedTableName: TableName.Pv,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Collaborate table
    let table = await queryRunner.getTable(TableName.Collaborate);
    let foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('userId') !== -1,
    );
    await queryRunner.dropForeignKey(TableName.User, foreignKey);

    foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('clientId') !== -1,
    );
    await queryRunner.dropForeignKey(TableName.User, foreignKey);

    // Folders table
    table = await queryRunner.getTable(TableName.Folder);
    foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('userId') !== -1,
    );
    await queryRunner.dropForeignKey(TableName.User, foreignKey);

    foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('clientId') !== -1,
    );
    await queryRunner.dropForeignKey(TableName.User, foreignKey);

    foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('factureId') !== -1,
    );
    await queryRunner.dropForeignKey(TableName.User, foreignKey);

    // Letter table
    table = await queryRunner.getTable(TableName.Letter);
    foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('folderId') !== -1,
    );
    await queryRunner.dropForeignKey(TableName.User, foreignKey);

    // Convocation table
    table = await queryRunner.getTable(TableName.Convocation);
    foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('folderId') !== -1,
    );
    await queryRunner.dropForeignKey(TableName.User, foreignKey);

    table = await queryRunner.getTable(TableName.Convocation);
    foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('pvNum') !== -1,
    );
    await queryRunner.dropForeignKey(TableName.User, foreignKey);
  }
}
