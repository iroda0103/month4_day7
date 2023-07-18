import db from '../../db/index.js';

export const listPosts =async (contextValue,filter = {}) => {

  if(contextValue.user.role=='admin' || contextValue.user.role=='super_admin'){
    return await db('posts').where(filter).select('*');
  }
  
  const posts=await db('posts').where({}).orWhere({is_verified:true})
  return posts
};