import { knexConnection } from '../db_options/mariaDB.js'

export class SaveProducts {

    constructor() {}
    
    async saveProduct(prod) {
        // SELECT * FROM cars
        knexConnection("Products").insert(prod)
        .then(() => {
            console.log("Prod inserted");
        })
        .catch((err) => {
            console.error('Error saving product: ' + err);
        })
        .finally(() => {
            knexConnection.destroy();
        });
    }
}