// Update with your config settings.
import config from './src/shared/config/index.js'

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {

  development: {
    client: 'postgresql',
    connection: {
      host:config.db.host,
      database: config.db.name,
      user:     config.db.user,
      password: config.db.password,
      port:config.db.port
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory:'db/migrations'
    },
    seeds:{
      directory:'db/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host:config.db.host,
      database: config.db.name,
      user:     config.db.user,
      password: config.db.password,
      port:config.db.port
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory:'db/migrations'
    },
    seeds:{
      directory:'db/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host:config.db.host,
      database: config.db.name,
      user:     config.db.user,
      password: config.db.password,
      port:config.db.port
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory:'db/migrations'
    },
    seeds:{
      directory:'db/seeds'
    }
  }

};
