import db from '../../db/index.js';

export const showUser = async ({ id }) => {
  const user = await db('users').where({ id }).first();

  if (!user) {
    return {}
  }

  return user;
};