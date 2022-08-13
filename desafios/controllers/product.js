const express = require("express");
const prodMgr = require("../objectsManager/prodManager.js");
const { upload } = require("../fileManager/multerArchives.js");
const router = express.Router();
const util = require("../utilidades/utilProducts.js");
const newProdMgr = new prodMgr("./productos.txt");
const admin = true;
// router.get("/", async (req, res) => {
//   try {
//     const allProducts = await newProdMgr.getAll();
//     res.status(200).send({ allProducts });
//   } catch (error) {
//     res.status(500).send(`Error: ${JSON.stringify(error)}`);
//   }
// });

router.get("/:id?", async function (req, res) {
  try {
    const { id } = req.params.id;
    //if if getbyId else getAll
    const allProducts = id == null ? await newProdMgr.getAll() : await newProdMgr.getById(id);
    const emptyProds = false;
    res.status(200).send({ allProducts , isAdmin: admin});
    // res.render("ingresoproductos.hbs", {
    //   products: allProducts, emptyProds
    // });
  } catch (error) {
    res.status(500).send(`Error: ${JSON.stringify(error)}`);
  }
});

router.post("/", async (req, res) => {

  if(!admin) {
    res.status(400).send({ error: "Ruta no autorizada" });
    return;
  }

  const newProd = req.body;
  if (!newProd) {
    res.status(400).send({ error: "Producto no valido" });
    return;
  }

  try {
    //let newProdId = await newProdMgr.save(newProd);
    await newProdMgr.save(newProd);
    res
    .status(200)
    .send(`${JSON.stringify(newProdId)}`);
    // res.writeHead(301, { Location: "/productos" });
    // return res.end();
  } catch (error) {
    res.status(500).send(`Error: ${JSON.stringify(error)}`);
  }
});

router.put("/:id", async (req, res) => {

   if(!admin) {
    res.status(400).send({ error: "Ruta no autorizada" });
    return;
  }

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

   if(!admin) {
    res.status(400).send({ error: "Ruta no autorizada" });
    return;
  }

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

// router.get("/productos", async (req, res) => {
//   try {
//     const allProducts = await newProdMgr.getAll();
//     const emptyProds = allProducts.length > 0;
//     res.render("mostrarproductos.hbs", {
//       products: allProducts, emptyProds
//     });
//   } catch (error) {
//     res.status(500).send(`Error: ${JSON.stringify(error)}`);
//   }
// });

// router.get("/productoRandom", async (req, res) => {
//   try {
//     let productos = await newProdMgr.getAll();
//     const randomNumber = new util().generateRandom(1, productos.length + 1);
//     const getProduct = await newProdMgr.getById(randomNumber);
//     res.send({ getProduct });
//   } catch (error) {
//     res.status(500).send(`Error: ${JSON.stringify(error)}`);
//   }
// });

// Tener en cuenta que el name(nombre,en español)del campo archivo debe
// ser el mismo que el argumento myFile pasadoala función upload.single.
// router.post("/uploadfile", upload.single("myFile"), (req, res, next) => {
//   const file = req.file;
//   if (!file) {
//     const error = new Error("Please uploadafile");
//     error.httpStatusCode = 400;
//     return next(error);
//   }
//   res.send(file);
// });

// Uploading multiple files
// router.post(
//   "/uploadmultiple",
//   upload.array("myFiles", 10),
//   (req, res, next) => {
//     const files = req.files;
//     if (!files) {
//       const error = new Error("Please choose files");
//       error.httpStatusCode = 400;
//       return next(error);
//     }
//     res.send(files);
//   }
// );

module.exports = router;
