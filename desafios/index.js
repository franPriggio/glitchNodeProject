const express = require("express");
const ManejoArchivos = require("./contenedor.js");
const app = express();
const util = require("./util.js");
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

const newCont = new ManejoArchivos("./productos.txt");

app.get("/productos", async (req, res) => {
  const allProducts = await newCont.getAll();
  res.status(200).send({ allProducts });
});

app.get("/productoRandom", async (req, res) => {
  let productos = await newCont.getAll();
  const randomNumber = new util().generateRandom(1, productos.length + 1);
  const getProduct = await newCont.getById(randomNumber);
  res.send({ getProduct });
});
