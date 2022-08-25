import { knexConnection } from '../db_options/sqlite_config.js'

export class ReadMessages {

    constructor() {}
    
    async getMessages() {
        // SELECT * FROM cars
        knexConnection.from("Messages")
        .select("*")
        .then((rows) => {
          console.log(rows);
          return rows;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          knexConnection.destroy();
        });
    }
}