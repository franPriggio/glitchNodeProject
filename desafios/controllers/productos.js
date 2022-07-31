const express = require("express");
const { Router } = express;
const ManejoProductos = require("../manejoProductos/manejoProductos.js");
const { upload } = require("../manejoArchivos/multerArchives.js");
const router = Router();
const util = require("../utilidades/utilProducts.js");
const newProdMgr = new ManejoProductos("./productos.txt");

// router.get("/", async (req, res) => {
//   try {
//     const allProducts = await newProdMgr.getAll();
//     res.status(200).send({ allProducts });
//   } catch (error) {
//     res.status(500).send(`Error: ${JSON.stringify(error)}`);
//   }
// });

router.get("/", function (req, res) {
  //res.render("ingresoproductos");
  //res.render("ingresoproductos.pug");
  res.render("pages/ingresoproductos");
});

router.get("/productos", async (req, res) => {
  try {
    const allProducts = await newProdMgr.getAll();
    // res.status(200).send({ allProducts });
    // res.render("mostrarproductos.hbs", {
    //   productos: allProducts,
    // });
    // res.render("mostrarproductos.pug", {
    //   productos: allProducts,
    // });
    res.render("pages/mostrarproductos", {
      productos: allProducts,
    });
  } catch (error) {
    res.status(500).send(`Error: ${JSON.stringify(error)}`);
  }
});

router.post("/productos", async (req, res) => {
  const newProd = req.body;
  if (!newProd) {
    res.status(400).send({ error: "Producto no valido" });
    return;
  }

  try {
    //let newProdId = await newProdMgr.save(newProd);
    await newProdMgr.save(newProd);
    // res
    //.status(200)
    //.send(`<h2>Nuevo producto ${JSON.stringify(newProdId)} agregada</h2>`);
    res.writeHead(301, { Location: "/productos" });
    return res.end();
  } catch (error) {
    res.status(500).send(`Error: ${JSON.stringify(error)}`);
  }
});

// Tener en cuenta que el name(nombre,en español)del campo archivo debe
// ser el mismo que el argumento myFile pasadoala función upload.single.
router.post("/uploadfile", upload.single("myFile"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please uploadafile");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

// Uploading multiple files
router.post(
  "/uploadmultiple",
  upload.array("myFiles", 10),
  (req, res, next) => {
    const files = req.files;
    if (!files) {
      const error = new Error("Please choose files");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send(files);
  }
);

router.post("/:id", async (req, res) => {
  const { id } = req.params.id;

  if (isNaN(id)) {
    res.status(400).send({ error: "El parametro debe ser numerico" });
    return;
  }
  const allProducts = await newProdMgr.getAll();
  if (id > allProducts.length) {
    res.status(400).send({ error: "El parametro esta fuera de rango" });
    return;
  }

  try {
    const producto = await newProdMgr.getById(id);
    res.status(200).send({ producto });
  } catch (error) {
    res.status(500).send(`Error: ${JSON.stringify(error)}`);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params.id;

  if (isNaN(id)) {
    res.status(400).send({ error: "El parametro debe ser numerico" });
    return;
  }
  const allProducts = await newProdMgr.getAll();
  if (id > allProducts.length) {
    res.status(400).send({ error: "El parametro esta fuera de rango" });
    return;
  }

  const newData = req.body;
  if (!newData) {
    res.status(400).send({ error: "Nuevo producto invalido" });
    return;
  }

  try {
    const updatedProducts = await newProdMgr.update(newData);
    res.status(200).send({ updatedProducts });
  } catch (error) {
    res.status(500).send(`Error: ${JSON.stringify(error)}`);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params.id;

  if (isNaN(id)) {
    res.status(400).send({ error: "El parametro debe ser numerico" });
    return;
  }
  const allProducts = await newProdMgr.getAll();
  if (id > allProducts.length) {
    res.status(400).send({ error: "El parametro esta fuera de rango" });
    return;
  }

  try {
    await newProdMgr.deleteById(id);
    res.status(200).send("Producto eliminado");
  } catch (error) {
    res.status(500).send(`Error: ${JSON.stringify(error)}`);
  }
});

router.get("/productoRandom", async (req, res) => {
  try {
    let productos = await newProdMgr.getAll();
    const randomNumber = new util().generateRandom(1, productos.length + 1);
    const getProduct = await newProdMgr.getById(randomNumber);
    res.send({ getProduct });
  } catch (error) {
    res.status(500).send(`Error: ${JSON.stringify(error)}`);
  }
});

module.exports = router;
