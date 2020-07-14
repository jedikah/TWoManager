import { UserStaticMethodType } from './../../src-electron/dataBase/users/user.type';
import TWoMDataBase from 'src-electron/dataBase/database.type';

const { getGlobal } = require('electron').remote;

const DB: TWoMDataBase | null = getGlobal('db') || null;
let user: UserStaticMethodType;

if (DB) user = DB.user.asRxCollection;

export { user };
