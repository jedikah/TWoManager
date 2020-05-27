import { UserSchemaType } from './user.type';
import { RxJsonSchema } from 'rxdb';

const userSchema: RxJsonSchema<UserSchemaType> = {
  title: 'userDocType',
  version: 0,
  description: 'description des utilisateur',
  type: 'object',
  properties: {
    IdUser: {
      type: 'string',
      primary: true
    },
    name: {
      type: 'string'
    },
    login: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: ['IdUser', 'name', 'login', 'password', 'password'],
  attachments: {
    encrypted: true
  }
};

export default userSchema;
