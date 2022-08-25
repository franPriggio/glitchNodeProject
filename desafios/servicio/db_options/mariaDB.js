import knex from 'knex';

let options = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "ecom",
  },
};

export const knexConnection = knex(options);
