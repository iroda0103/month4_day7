import knex from "knex";
import config from "../shared/config/index.js";

const db=knex({
    client:'postgresql',
    connection: {
        host:config.db.host,
        database: config.db.name,
        user:     config.db.user,
        password: config.db.password,
        port:config.db.port
      },
})

export default db