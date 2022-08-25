// import { options } from '../db_options/mariaDB.js';
import { knexConnection } from '../db_options/mariaDB.js'

export class ReadProducts {

    constructor() {}
    
    async getProducts() {
        // SELECT * FROM cars
        knexConnection
        .from("products")
        .select("*")
        .orderBy("price")
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