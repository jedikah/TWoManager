/* eslint-disable @typescript-eslint/no-unused-vars */
import { user } from './../../../src/store/user/index';
import { UserStaticMethodType, UserCollection } from './user.type';
const base64 = require('base64-min');

const userStaticMethods: UserStaticMethodType = {
  createUser: async function(
    this: UserCollection,
    user: { name: string; login: string; password: string },
    pdp?: string
  ) {
    const search = await this.findOne({
      selector: { login: user.login.toLocaleLowerCase() }
    }).exec();

    if (search) {
      return 'The login ' + search.see().login + ' is alreeady used !';
    }

    const newUser = await this.insert({
      IdUser: '',
      name: user.name,
      login: user.login.toLocaleLowerCase(),
      password: user.password
    });

    if (pdp) {
      const res = await newUser.savePDP(pdp);
      return { user: newUser.see(), pdp: res };
    }

    return { user: newUser.see() };
  },
  getAllFullDocuments: async function(this: UserCollection) {
    const allDocs = await this.find().exec();
    const allUsers = allDocs.map(user => ({
      IdUser: user.IdUser,
      name: user.name,
      login: user.login,
      password: user.password
    }));
    return { allUsers, length: allDocs.length };
  },
  getAllDocuments: async function(this: UserCollection) {
    const allDocs = await this.find().exec();
    const allUsers = allDocs.map(user => ({
      IdUser: user.IdUser,
      name: user.name
    }));
    return { allUsers, length: allDocs.length };
  },
  login: async function(this: UserCollection, login: string, password: string) {
    const user = await this.findOne({
      selector: { login: login.toLocaleLowerCase(), password }
    }).exec();
    let see: { IdUser: string; name: string; login: string; password: string };
    see = {
      IdUser: null,
      name: null,
      login: null,
      password: null
    };

    if (user) see = user.see();

    return see;
  },
  fileUploader: async (src: string) => {
    const b64 = await Promise.resolve(base64.encodeFile(src));
    return b64;
  }
};

export default userStaticMethods;
