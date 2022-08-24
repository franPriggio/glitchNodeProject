import { knexConnnection } from '../db_options/sqlite_config.js'

export class ReadMessages {

    constructor() {}
    
    async getMessages() {
        // SELECT * FROM cars
        knexConnnection.from("Messages")
        .select("*")
        .then((rows) => {
          console.log(rows);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          knex.destroy();
        });
    }
}