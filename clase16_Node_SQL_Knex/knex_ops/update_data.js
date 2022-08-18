const { options } = require("../db_options/mariaDB.js");
const knex = require("knex")(options);

// SELECT WHERE FROM cars
knex
  .from("cars")
  .select("name", "price")
  .where("price", ">", 50000)
  .update({ price: 55000 })
  .del()
  .then(() => console.log("Cars deleted"))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
