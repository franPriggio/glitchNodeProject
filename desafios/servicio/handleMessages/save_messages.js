import { knexConnnection } from '../db_options/sqlite_config.js'

export class SaveMessages {

    constructor() {}
    
    async saveMessage(msg) {
        // SELECT * FROM cars
        knexConnnection("Messages").insert(msg)
        .then(() => {
            console.log("Message inserted");
        })
        .catch((err) => {
            console.error('Error saving product: ' + err);
        })
        .finally(() => {
            knex.destroy();
        });
    }
}