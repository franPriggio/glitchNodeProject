const express = require("express");
const { Router } = express;
const ManejoDatos = require("../middlewareMascotas/manejoDatos.js");
const { upload } = require("../manejoArchivos/multerArchives.js");

const router = Router();

const mascotas = [
  { nombre: "Jessy", raza: "Princesa", edad: 3 },
  { nombre: "Ra", raza: "Principe", edad: 2 },
  { nombre: "Kira", raza: "Reina", edad: 4 },
];

//middleWare a nivel de router
router.use(function (req, res, next) {
  console.log("Time:", Date.now());
  next();
});

router.get("/", (req, res) => {
  res.status(200).send({ mascotas });
});

//middleWare a nivel de ruta
const petMiddleware = new ManejoDatos();

router.get("/awesomepets", petMiddleware.sortByAgeIncrease, (req, res) => {
  let petsMessage = req.petsMessage;
  res.status(200).send({ petsMessage });
});

router.post("/datosmascotafoto", upload.single("photo"), (req, res, next) => {
  const file = req.file;
  console.log("req.file: " + req.file);
  if (!file) {
    const error = new Error("Please upload a pet image file");
    error.httpStatusCode = 400;
    return next(error);
  }

  petMiddleware.uploadData(req.body);
  res.status(200).send(file);
});

// router.post("/", (req, res) => {
//   const nuevaMascota = req.body;
//   mascotas.push(nuevaMascota);

//   res.status(201).send({
//     respuesta: `Nueva mascota ${JSON.stringify(nuevaMascota)} agregada`,
//   });
// });

router.use(function (req, res, next) {
  console.log("Time:", Date.now());
  next();
});

router.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(`Error ordering pets: ${err.stack}`);
});

module.exports = router;
