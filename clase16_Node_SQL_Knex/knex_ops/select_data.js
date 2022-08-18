const { options } = require("../db_options/sqlite_config.js");
const knex = require("knex")(options);

// SELECT * FROM cars
knex
  .from("cars")
  .select("*")
  .orderBy("price", "desc")
  .then((rows) => {
    console.log(rows);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });

// SELECT WHERE FROM cars
// knex
//   .from("cars")
//   .select("name", "price")
//   .where("price", ">", 50000)
//   .del()
//   .then(() => console.log("Cars deleted"))
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     knex.destroy();
//   });
