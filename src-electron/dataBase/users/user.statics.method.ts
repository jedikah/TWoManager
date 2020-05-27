import { UserStaticMethodType, UserCollection } from './user.type';

const userStaticMethods: UserStaticMethodType = {
  createUser: async function(
    this: UserCollection,
    user: { IdUser: string; name: string; login: string; password: string },
    pdp?: string
  ) {
    const newUser = await this.insert({
      IdUser: user.IdUser,
      name: user.name,
      login: user.login,
      password: user.password
    });

    if (pdp) {
      const res = await newUser.savePDP(pdp);
      return { user: newUser.see(), pdp: res };
    }

    return { user: newUser.see() };
  },
  getAllDocuments: async function(this: UserCollection) {
    const allDocs = await this.find().exec();
    const all = allDocs.map(user => ({
      IdUser: user.IdUser,
      name: user.name,
      login: user.login,
      password: user.password
    }));
    return { length: allDocs.length, all };
  }
};

export default userStaticMethods;
