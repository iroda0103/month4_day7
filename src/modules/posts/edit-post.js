import db from '../../db/index.js';

export const editPost = async ({ id, ...changes },login_id) => {
  const post = await db('posts').where({ id }).first();

  if (!post) {
    throw new NotFoundError('Post not found');
  }

  if(post.user_id!=login_id){
      throw new Error('Siz faqat o\'zingiz yozgan postni tahrirlay olasiz')
  }

  return (await db('posts').where({ id }).update(changes).returning('*'))[0];
};