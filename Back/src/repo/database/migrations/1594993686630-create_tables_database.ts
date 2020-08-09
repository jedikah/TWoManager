import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import {
  UsersTable,
  ClientsTable,
  FoldersTable,
  FacturesTable,
  LettresTable,
  ConvocationsTable,
  PvsTable,
  CollaborerTable,
} from './Tables';

export class createUserTable1594808032051 implements MigrationInterface {
  constructor(
    private usersTable: Table = UsersTable,
    private clientsTable: Table = ClientsTable,
    private foldersTable: Table = FoldersTable,
    private facturesTable: Table = FacturesTable,
    private lettresTable: Table = LettresTable,
    private convocationsTable: Table = ConvocationsTable,
    private pvsTable: Table = PvsTable,
    private collaborerTable: Table = CollaborerTable,
  ) {}

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.usersTable, true);
    await queryRunner.createTable(this.clientsTable, true);
    await queryRunner.createTable(this.foldersTable, true);
    await queryRunner.createTable(this.facturesTable, true);
    await queryRunner.createTable(this.lettresTable, true);
    await queryRunner.createTable(this.convocationsTable, true);
    await queryRunner.createTable(this.pvsTable, true);
    await queryRunner.createTable(this.collaborerTable, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.usersTable, true);
    await queryRunner.dropTable(this.clientsTable, true);
    await queryRunner.dropTable(this.foldersTable, true);
    await queryRunner.dropTable(this.facturesTable, true);
    await queryRunner.dropTable(this.lettresTable, true);
    await queryRunner.dropTable(this.convocationsTable, true);
    await queryRunner.dropTable(this.pvsTable, true);
    await queryRunner.dropTable(this.collaborerTable, true);
  }
}
