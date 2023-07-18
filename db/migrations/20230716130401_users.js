/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('users',(table)=>{
    table.increments('id');
    table.string('first_name');
    table.string('last_name');
    table.string('username').unique();
    table.string('password',350).notNullable();
    table.enum('role',['super_admin','admin','user']).notNullable();
    table.boolean('is_deleted').defaultTo(false);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('users')
};
