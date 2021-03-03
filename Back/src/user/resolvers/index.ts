import { UsersCheckToken } from './checkToken';
import { UsersCount } from './usersCount';
import { UsersList } from './usersList';
import { UsersLogIn } from './login';
import { UsersLogInSession } from './logInSession';
import { UsersRegister } from './register';
import { UsersUpload } from './upload';

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
