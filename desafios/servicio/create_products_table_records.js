import { knexConnection } from './db_options/mariaDB.js'

// create table cars
knexConnection.schema.createTable('Products', table => {
    table.increments('id');
    table.string('Name');
    table.string('Photo');
    table.string('Timestamp');
    table.integer('Price');
    table.string('Description');
    table.string('Code');
    table.integer('Stock');
})
.then(() => {
    console.log('Table Products created');
})
.catch(err => {
    console.log(err);
})
.finally(() => {
    knexConnection.destroy();
});

const prods = [
  { Name: "Ferrari", Price: 2000, Photo: "https://www.img.com", Timestamp: "12/07/2020", Description: "Desc Prod", Code: "ST-1", Stock: 10  },
  { Name: "Lamborghini", Price: 3000, Photo: "https://www.img.com", Timestamp: "12/07/2020" , Description: "Desc Prod", Code: "ST-1", Stock: 10},
  { Name: "Bugatti", Price: 4000, Photo: "https://www.img.com", Timestamp: "12/07/2020", Description: "Desc Prod", Code: "ST-1", Stock: 10 },
  { Name: "Porsche", Price: 5000, Photo: "https://www.img.com", Timestamp: "12/07/2020", Description: "Desc Prod", Code: "ST-1", Stock: 10 },
  { Name: "Mercedes", Price: 6000, Photo: "https://www.img.com", Timestamp: "12/07/2020", Description: "Desc Prod", Code: "ST-1", Stock: 10 },
  { Name: "Audi", Price: 7000, Photo: "https://www.img.com", Timestamp: "12/07/2020", Description: "Desc Prod", Code: "ST-1", Stock: 10 },
  { Name: "BMW", Price: 8000, Photo: "https://www.img.com", Timestamp: "12/07/2020", Description: "Desc Prod", Code: "ST-1", Stock: 10 },
  { Name: "Volkswagen", Price: 9000, Photo: "https://www.img.com", Timestamp: "12/07/2020", Description: "Desc Prod", Code: "ST-1", Stock: 10},
];

// insert cars to BD
knexConnection("Products").insertMany(prods)
  .then(() => {
    console.log("Prods inserted");
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knexConnection.destroy();
  });