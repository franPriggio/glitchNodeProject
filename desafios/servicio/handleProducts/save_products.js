// const { options } = require("../db_options/mariaDB.js");
// const knex = require("knex")(options);

import { knexConnnection } from '../db_options/mariaDB.js'

export class SaveProducts {

    constructor() {}
    
    async saveProduct(prod) {
        // SELECT * FROM cars
        knexConnnection("Products").insert(prod)
        .then(() => {
            console.log("Prod inserted");
        })
        .catch((err) => {
            console.error('Error saving product: ' + err);
        })
        .finally(() => {
            knex.destroy();
        });
    }
}