const express = require("express");
const { Router } = express;
const ManejoProductos = require("../manejoProductos/manejoProductos.js");
const router = Router();
const util = require("../utilidades/utilProducts.js");
const newProdMgr = new ManejoProductos("./productos.txt");

router.get("/", async (req, res) => {
  try {
    const allProducts = await newProdMgr.getAll();
    res.status(200).send({ allProducts });
  } catch (error) {
    res.status(500).send(`Error: ${JSON.stringify(error)}`);
  }
});

router.post("/", (req, res) => {
  const newProd = req.body;
  if (!newProd) {
    res.status(400).send({ error: "Producto no valido" });
    return;
  }

  try {
    let newProdId = await newProdMgr.save(newProd);
    res.status(200).send(`Nuevo producto ${JSON.stringify(newProdId)} agregada`);
  } catch (error) {
    res.status(500).send(`Error: ${JSON.stringify(error)}`);
  }
});

router.post("/:id", (req, res) => {
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

  try{
    const producto = await newProdMgr.getById(id);
    res.status(200).send({ producto });
  } catch (error) {
    res.status(500).send(`Error: ${JSON.stringify(error)}`);
  }
});

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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
})


router.get("/productoRandom", async (req, res) => {
  try{
    let productos = await newProdMgr.getAll();
    const randomNumber = new util().generateRandom(1, productos.length + 1);
    const getProduct = await newProdMgr.getById(randomNumber);
    res.send({ getProduct });
  } catch (error) {
    res.status(500).send(`Error: ${JSON.stringify(error)}`);
  }
});
