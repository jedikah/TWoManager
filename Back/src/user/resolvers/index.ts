import { UsersLogIn } from './logIn';
import { UsersLogInSession } from './logInSession';
import { UsersCheckToken } from './checkToken';
import { UsersRegister } from './register';
import { UsersUpload } from './upload';
import { UsersList } from './usersList';
import { UsersCount } from './usersCount';

const UsersResolver = [
  UsersLogIn,
  UsersLogInSession,
  UsersCheckToken,
  UsersRegister,
  UsersUpload,
  UsersList,
  UsersCount,
];

export { UsersResolver };
