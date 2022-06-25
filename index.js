const http = require("http");
const moment = require("moment");
const express = require("express");
const app = express();

const PORT = 8089;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

app.get("/", (solicitud, respuesta) => {
  respuesta.send({ resp: "<h1 style=color:blue>Bienvenidos a express</h1>" });
});

let visitas = 0;
app.get("/visitas", (solicitud, respuesta) => {
  visitas++;
  respuesta.send({ resp: `<h2>Cantidad de visitas al sitio: ${visitas}</h2>` });
});

app.get("/fyh", (solicitud, respuesta) => {
  const fechaActual = moment().format("DD/MM/YYYY HH:MM:SS");
  respuesta.send({ resp: fechaActual });
});
