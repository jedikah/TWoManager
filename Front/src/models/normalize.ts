import { normalize, schema } from 'normalizr';
import { User } from './types';

export const normalizeUsers = (data: User[]) => {
  const user = new schema.Entity('users', {}, { idAttribute: 'IdUser' });
  const normalizeData = normalize(data, [user]);
  return {
    allIds: normalizeData.result,
    byId: normalizeData.entities.users
  };
};
