// import { options } from '../db_options/mariaDB.js';
import { knexConnnection } from '../db_options/mariaDB.js'

export class ReadProducts {

    constructor() {}
    
    async getProducts() {
        // SELECT * FROM cars
        knexConnnection
        .from("products")
        .select("*")
        .orderBy("price")
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