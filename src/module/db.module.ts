import { UserStaticMethodType } from './../../src-electron/dataBase/users/user.type';
import EotDataBase from 'src-electron/dataBase/database.type';

const { getGlobal } = require('electron').remote;
const Store = require('electron-store');
const store = new Store();

const DB: EotDataBase | null = getGlobal('db') || null;
let user: UserStaticMethodType = null;

if (DB) user = DB.user.asRxCollection;

export { user };
