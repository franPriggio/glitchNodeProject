const express = require("express");
const { Router } = express;

const router = Router();

const personas = [
  { nombre: "Fede", apellido: "Martu", edad: 40 },
  { nombre: "Gus", apellido: "Cantero", edad: 37 },
  { nombre: "Fede", apellido: "Castelo", edad: 37 },
];

router.get("/", (req, res) => {
  res.status(200).send({ personas });
});

router.post("/", (req, res) => {
  const nuevaPersona = req.body;
  personas.push(nuevaPersona);
  res
    .status(200)
    .send(`Nueva persona ${JSON.stringify(nuevaPersona)} agregada`);
});

module.exports = router;
