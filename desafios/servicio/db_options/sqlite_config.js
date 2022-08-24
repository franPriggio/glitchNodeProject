import knex from 'knex';

export const options = {
  client: "sqlite3",
  connection: {
    filename: "../DB/ecom.sqlite",
  },
  useNullAsDefault: true,
};

export const knexConnnection = knex(options);