const express = require("express");
const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

/**
 * Para que nuestro servidor express pueda interpretar en forma automática mensajes de tipo JSON en formato urlencoded
 * al recibirlos, debemos indicarlo en forma explícita, agregando las siguiente líneas luego de crearlo.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = ["fede", "k", "martu", "gian"];
const frase = "hola k ase";

app.get("/", (req, res) => {
  //http:localhost:8080/users?age=18&country=mexico
  //const age = req.query.age;
  //const country = req.query.country;
  const { age, country } = req.query;

  res.status(200).send("Hola K Ase");
});

/**
 * PROCESAR PEDIDOS GET
 */

//con query params
app.get("/users", (req, res) => {
  //http:localhost:8080/users?age=18&country=mexico
  //const age = req.query.age;
  //const country = req.query.country;
  const { age, country } = req.query;

  res.status(200).send(users);
});

//params va a tener todos los parametros que lleguen en la url
app.get("/users/:index", (req, res) => {
  const user = index?.isNan()
    ? "El parametro debe ser numerico"
    : users[req.params.index];

  res.status(200).send(user);
});

app.get("/api/frase", (req, res) => {
  res.status(200).send({ frase });
});

app.get("/api/letras/:num", (req, res) => {
  const { num } = req.params.num;

  if (isNaN(num)) {
    res.status(400).send({ error: "El parametro debe ser numerico" });
    return;
  }
  if (num > frase.length) {
    res.status(400).send({ error: "El parametro esta fuera de rango" });
    return;
  }

  const letra = frase[req.params.num];
  res.status(200).send({ letra });
});

app.get("/api/palabras/:num", (req, res) => {
  if (isNaN(num)) {
    res.status(400).send({ error: "El parametro debe ser numerico" });
    return;
  }
  const palabras = frase.split(" ");

  if (num > palabras.length) {
    res.status(400).send({ error: "El parametro esta fuera de rango" });
    return;
  }

  const palabra = palabras[req.params.num];
  res.status(200).send({ palabra });
});
