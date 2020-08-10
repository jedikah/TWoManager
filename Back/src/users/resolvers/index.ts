import { UsersLogin } from './login';
import { UsersCheckToken } from './checkToken';
import { UsersRegister } from './register';
import { UsersUpload } from './upload';
import { UsersList } from './usersList';

const UsersResolver = [
  UsersLogin,
  UsersCheckToken,
  UsersRegister,
  UsersUpload,
  UsersList,
];

export { UsersResolver };
