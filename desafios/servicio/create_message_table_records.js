import { knexConnection } from './db_options/sqlite_config.js'

// create table cars
knexConnection.schema.createTable('Messages', table => {
    table.increments('id');
    table.string('Message');
    table.string('Email');
    table.string('Date');
})
.then(() => {
    console.log('Table Messages created');
})
.catch(err => {
    console.log(err);
})
.finally(() => {
    knexConnection.destroy();
});

const msgs = [
  { Message: "Hola", Email: 2000, Date: "12/07/2020"},
  { Message: "Que haces?", Email: 3000, Date: "12/07/2020"},
  { Message: "Almorzando, vos?", Email: 4000, Date: "12/07/2020" }
];

// insert cars to BD
knexConnection("Messages").insert(msgs)
  .then(() => {
    console.log("Messages inserted");
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knexConnection.destroy();
  });