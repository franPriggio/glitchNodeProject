const express = require("express");
const mascotas = require("./controllers/mascotas.js");
const personas = require("./controllers/personas.js");

const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

/**
 * Para que nuestro servidor express pueda interpretar en forma automática mensajes de tipo JSON en formato urlencoded
 * al recibirlos, debemos indicarlo en forma explícita, agregando las siguiente líneas luego de crearlo.
 */

//Middleware a nivel de aplicacion
app.use("/api/mascotas", mascotas);
app.use("/api/personas", personas);
app.use("/static", express.static("public"));
