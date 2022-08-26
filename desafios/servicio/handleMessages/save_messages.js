import { knexConnection } from '../db_options/mariaDB.js'

export class SaveMessages {

    constructor() {}
    
    async saveMessage(msg) {
        // SELECT * FROM cars
        knexConnection("Messages").insert(msg)
        .then(() => {
            console.log("Message inserted");
        })
        .catch((err) => {
            console.error('Error saving product: ' + err);
        })
        .finally(() => {
            knexConnection.destroy();
        });
    }
}