import db from '../../db/index.js';

export const listUsers = async(filter = {}) => {
  return (await db('users').where(filter).select('*'));
};