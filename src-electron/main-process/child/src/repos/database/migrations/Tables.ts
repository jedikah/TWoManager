import { Table } from 'typeorm';
import { TableName } from '../TableName';

export const UsersTable: Table = new Table({
  name: TableName.User,
  columns: [
    {
      name: 'userId',
      type: 'integer',
      isGenerated: true,
      generationStrategy: 'increment',
      isPrimary: true,
      length: '3',
    },
    {
      name: 'userName',
      type: 'varchar',
      isNullable: false,
      isUnique: false,
      length: '20',
    },
    {
      name: 'login',
      type: 'varchar',
      isNullable: false,
      isUnique: true,
      length: '10',
    },
    {
      name: 'password',
      type: 'varchar',
      isNullable: false,
      isUnique: false,
      length: '15',
    },
  ],
});

export const ClientsTable: Table = new Table({
  name: TableName.Client,
  columns: [
    {
      name: 'clientId',
      type: 'integer',
      isGenerated: true,
      generationStrategy: 'increment',
      isPrimary: true,
      length: '7',
    },
    {
      name: 'clientName',
      type: 'varchar',
      isNullable: false,
      isUnique: false,
      length: '25',
    },
    {
      name: 'domicile',
      type: 'varchar',
      isNullable: false,
      isUnique: false,
      length: '20',
    },
    {
      name: 'contact',
      type: 'varchar',
      isNullable: false,
      isUnique: false,
      length: '10',
    },
  ],
});

export const FoldersTable: Table = new Table({
  name: TableName.Folder,
  columns: [
    {
      name: 'folderId',
      type: 'integer',
      isGenerated: true,
      generationStrategy: 'increment',
      isPrimary: true,
      length: '9',
    },
    {
      name: 'userId',
      type: 'integer',
      isNullable: false,
      isUnique: false,
      length: '3',
    },
    {
      name: 'clientId',
      type: 'integer',
      isNullable: false,
      isUnique: false,
      length: '7',
    },
    {
      name: 'factureId',
      type: 'integer',
      isNullable: false,
      isUnique: false,
      length: '9',
    },
    {
      name: 'Register',
      type: 'varchar',
      isNullable: true,
      isUnique: true,
      length: '6',
    },
    {
      name: 'numTitle',
      type: 'varchar',
      isNullable: true,
      isUnique: true,
      length: '6',
    },
    {
      name: 'groundName',
      type: 'varchar',
      isNullable: true,
      isUnique: false,
      length: '30',
    },
    {
      name: 'localisationTrav',
      type: 'varchar',
      isNullable: true,
      isUnique: false,
      length: '20',
    },
    {
      name: 'fokontany',
      type: 'varchar',
      isNullable: true,
      isUnique: false,
      length: '15',
    },
    {
      name: 'dateTrav',
      type: 'date',
      isNullable: true,
      isUnique: false,
    },
    {
      name: 'typeTrav',
      type: 'varchar',
      isNullable: true,
      isUnique: false,
      length: '20',
    },
    {
      name: 'price',
      type: 'integer',
      isNullable: true,
      isUnique: false,
      length: '10',
    },
  ],
});

export const FacturesTable: Table = new Table({
  name: TableName.Facture,
  columns: [
    {
      name: 'factureId',
      type: 'integer',
      isGenerated: true,
      generationStrategy: 'increment',
      isPrimary: true,
      length: '9',
    },
    {
      name: 'dateFacture',
      type: 'date',
      isNullable: true,
      isUnique: false,
    },
  ],
});

export const LettresTable: Table = new Table({
  name: TableName.Letter,
  columns: [
    {
      name: 'rtxNum',
      type: 'integer',
      isPrimary: true,
      length: '7',
    },
    {
      name: 'folderId',
      type: 'integer',
      isNullable: true,
      isUnique: false,
      length: '9',
    },
    {
      name: 'dateRtx',
      type: 'date',
      isNullable: true,
      isUnique: false,
    },
    {
      name: 'letterTown',
      type: 'varchar',
      isNullable: true,
      isUnique: false,
      length: '15',
    },
    {
      name: 'createdAt',
      type: 'date',
      isNullable: true,
      isUnique: false,
    },
    {
      name: 'object',
      type: 'varchar',
      isNullable: true,
      isUnique: false,
      length: '80',
    },
  ],
});

export const ConvocationsTable: Table = new Table({
  name: TableName.Convocation,
  columns: [
    {
      name: 'registerNum',
      type: 'integer',
      isPrimary: true,
      length: '6',
    },
    {
      name: 'folderId',
      type: 'integer',
      isNullable: false,
      isUnique: true,
      length: '9',
    },
    {
      name: 'pvNum',
      type: 'integer',
      isNullable: true,
      isUnique: false,
      length: '9',
    },
    {
      name: 'nomPersConv',
      type: 'varchar',
      isNullable: true,
      isUnique: false,
      length: '40',
    },
    {
      name: 'convokeOn',
      type: 'date',
      isNullable: true,
      isUnique: false,
    },
    {
      name: 'AtTown',
      type: 'integer',
      isNullable: true,
      isUnique: false,
      length: '15',
    },
    {
      name: 'atTime',
      type: 'varchar',
      isNullable: true,
      isUnique: false,
      length: '8',
    },
    {
      name: 'requisitionNum',
      type: 'varchar',
      isNullable: true,
      isUnique: false,
      length: '6',
    },
  ],
});

export const PvsTable: Table = new Table({
  name: TableName.Pv,
  columns: [
    {
      name: 'pvNum',
      type: 'integer',
      isGenerated: true,
      generationStrategy: 'increment',
      isPrimary: true,
      length: '9',
    },
    {
      name: 'attachments',
      type: 'text',
      isNullable: true,
      isUnique: false,
    },
    {
      name: 'commune',
      type: 'varchar',
      isNullable: true,
      isUnique: false,
      length: '15',
    },
    {
      name: 'district',
      type: 'varchar',
      isNullable: true,
      isUnique: false,
      length: '15',
    },
    {
      name: 'region',
      type: 'varchar',
      isNullable: true,
      isUnique: false,
      length: '15',
    },
  ],
});

export const CollaborerTable: Table = new Table({
  name: TableName.Collaborate,
  columns: [
    {
      name: 'clientId',
      type: 'integer',
      isPrimary: true,
      length: '7',
    },
    {
      name: 'userId',
      type: 'integer',
      isPrimary: true,
      length: '3',
    },
    {
      name: 'createdAt',
      type: 'date',
      isNullable: true,
      isUnique: false,
    },
    {
      name: 'updatedAt',
      type: 'date',
      isNullable: true,
      isUnique: false,
    },
  ],
});
