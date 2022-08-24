const { options } = require('./db_options/sqlite_config.js');
const knex = require('knex')(options);

// create table cars
knex.schema.createTable('Messages', table => {
    table.increments('id');
    table.string('Message');
    table.string('Email');
    table.string('Date');
})
.then(() => {
    console.log('Table cars created');
})
.catch(err => {
    console.log(err);
})
.finally(() => {
    knex.destroy();
});

const msgs = [
  { Message: "Hola", Email: 2000, Date: "12/07/2020"},
  { Message: "Que haces?", Email: 3000, Date: "12/07/2020"},
  { Message: "Almorzando, vos?", Email: 4000, Date: "12/07/2020" }
];

// insert cars to BD
knex("Messages").insertMany(msgs)
  .then(() => {
    console.log("Messages inserted");
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });