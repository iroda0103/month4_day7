import {hashSync} from 'bcrypt';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id:1,
      first_name:"Iroda",
      last_name:"Muminova",
      username:"iroda",
      password:hashSync('1234',10),
      role:"super_admin",
      is_deleted:false
    },
    {
      id:2,
      first_name:"Farangiz",
      last_name:"Ismatova",
      username:"farangiz",
      password:hashSync('1234',10),
      role:"admin",
      is_deleted:false
    },
    {
      id:3,
      first_name:"Dilnoza",
      last_name:"Sunnatova",
      username:"dilnoza",
      password:hashSync('1234',10),
      role:"user",
      is_deleted:false
    },
    {
      id:4,
      first_name:"Hilola",
      last_name:"Rustamova",
      username:"hilola",
      password:hashSync('1234',10),
      role:"user",
      is_deleted:false
    },
  ]);
};
