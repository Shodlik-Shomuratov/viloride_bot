import knexfile from "knex";

export const knex = knexfile({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : 'root',
      database : 'viloride_bot'
    },
    useNullAsDefault: true
});