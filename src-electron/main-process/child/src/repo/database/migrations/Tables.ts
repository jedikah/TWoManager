import { Table } from 'typeorm';
import { TableName } from '../TableName';

export const UsersTable: Table = new Table({
  name: TableName.User,
  columns: [
    {
      name: 'user_Id',
      type: 'integer',
      isGenerated: true,
      generationStrategy: 'increment',
      isPrimary: true,
      length: '3',
    },
    {
      name: 'user_Name',
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
      length: '65',
    },
    {
      name: 'photo',
      type: 'varchar',
      isNullable: true,
      isUnique: false,
      length: '15',
    },
    {
      name: 'type',
      type: 'varchar',
      isNullable: true,
      isUnique: false,
      length: '15',
    },
    {
      name: 'status',
      type: 'boolean',
      isNullable: true,
      isUnique: false,
      default: false,
    },
  ],
});

export const ClientsTable: Table = new Table({
  name: TableName.Client,
  columns: [
    {
      name: 'client_Id',
      type: 'integer',
      isGenerated: true,
      generationStrategy: 'increment',
      isPrimary: true,
      length: '7',
    },
    {
      name: 'clien_tName',
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
      name: 'folder_Id',
      type: 'integer',
      isGenerated: true,
      generationStrategy: 'increment',
      isPrimary: true,
      length: '9',
    },
    {
      name: 'user_Id',
      type: 'integer',
      isNullable: false,
      isUnique: false,
      length: '3',
    },
    {
      name: 'client_Id',
      type: 'integer',
      isNullable: false,
      isUnique: false,
      length: '7',
    },
    {
      name: 'facture_Id',
      type: 'integer',
      isNullable: false,
      isUnique: false,
      length: '9',
    },
    {
      name: 'register',
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
      name: 'ground_Name',
      type: 'varchar',
      isNullable: true,
      isUnique: false,
      length: '30',
    },
    {
      name: 'localisation_Trav',
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
      name: 'date_Trav',
      type: 'date',
      isNullable: true,
      isUnique: false,
    },
    {
      name: 'type_Trav',
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
      name: 'facture_Id',
      type: 'integer',
      isGenerated: true,
      generationStrategy: 'increment',
      isPrimary: true,
      length: '9',
    },
    {
      name: 'date_Facture',
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
      name: 'rtx_Num',
      type: 'integer',
      isPrimary: true,
      length: '7',
    },
    {
      name: 'folder_Id',
      type: 'integer',
      isNullable: true,
      isUnique: false,
      length: '9',
    },
    {
      name: 'date_Rtx',
      type: 'date',
      isNullable: true,
      isUnique: false,
    },
    {
      name: 'letter_Town',
      type: 'varchar',
      isNullable: true,
      isUnique: false,
      length: '15',
    },
    {
      name: 'created_At',
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
      name: 'register_Num',
      type: 'integer',
      isPrimary: true,
      length: '6',
    },
    {
      name: 'folder_Id',
      type: 'integer',
      isNullable: false,
      isUnique: true,
      length: '9',
    },
    {
      name: 'pv_Num',
      type: 'integer',
      isNullable: true,
      isUnique: false,
      length: '9',
    },
    {
      name: 'nomPers_Conv',
      type: 'varchar',
      isNullable: true,
      isUnique: false,
      length: '40',
    },
    {
      name: 'convoke_On',
      type: 'date',
      isNullable: true,
      isUnique: false,
    },
    {
      name: 'at_Town',
      type: 'integer',
      isNullable: true,
      isUnique: false,
      length: '15',
    },
    {
      name: 'at_Time',
      type: 'varchar',
      isNullable: true,
      isUnique: false,
      length: '8',
    },
    {
      name: 'requisition_Num',
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
      name: 'pv_Num',
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
      name: 'client_Id',
      type: 'integer',
      isPrimary: true,
      length: '7',
    },
    {
      name: 'user_Id',
      type: 'integer',
      isPrimary: true,
      length: '3',
    },
    {
      name: 'created_At',
      type: 'date',
      isNullable: true,
      isUnique: false,
    },
    {
      name: 'updated_At',
      type: 'date',
      isNullable: true,
      isUnique: false,
    },
  ],
});
