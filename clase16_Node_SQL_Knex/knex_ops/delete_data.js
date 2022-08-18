const { options } = require("../db_options/mariaDB.js");
const knex = require("knex")(options);

// SELECT * FROM cars
knex
  .from("cars")
  .where("price", ">", 50000)
  .del()
  .then(() => console.log("Cars deleted"))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
