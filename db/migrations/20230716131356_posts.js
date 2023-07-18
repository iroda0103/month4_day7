/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('posts',(table)=>{
    table.increments('id');
    table.string('title').notNullable();
    table.string('content',1000).notNullable();
    table.integer('user_id').references('id').inTable('users').onDelete('SET NULL');
    table.boolean('is_verified').notNullable();
    table.integer('verified_by').references('id').inTable('users').onDelete('SET NULL')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('posts')
};
