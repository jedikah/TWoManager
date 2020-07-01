import { user } from '../../module/db.module';
import { normalizeUsers } from '../normalize';

export default {
  users: async () => {
    const users = (await user.getAllDocuments()).allUsers;
    return normalizeUsers(users);
  },
  login: async (username: string, password: string) => {
    return await user.login(username, password);
  }
};
