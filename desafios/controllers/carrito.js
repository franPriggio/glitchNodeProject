const express = require("express");
const CartMgr = require("../objectsManager/cartManager.js");
const { upload } = require("../fileManager/multerArchives.js");
const router = express.Router();
const newCartMgr = new CartMgr("./cart.txt");

router.post("/", async (req, res) => {

  try {
    //let newProdId = await newCartMgr.save(newProd);
    let newCart = await newCartMgr.newCart();
    res
    .status(200)
    .send(`${JSON.stringify(newCart)}`);
  } catch (error) {
    res.status(500).send(`Error: ${JSON.stringify(error)}`);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    res.status(400).send({ error: "El parametro debe ser numerico" });
    return;
  }

  try {
    await newCartMgr.deleteById(id);
    res.status(200).send("Carrito eliminado");
  } catch (error) {
    res.status(500).send(`Error: ${JSON.stringify(error)}`);
  }
});

router.get("/:id/productos?", async function (req, res) {

  try {
    const id  = req.params.id;

    if (isNaN(id) || !id) {
      res.status(400).send({ error: "El parametro debe ser numerico y no vacio" });
      return;
    }

    //if if getbyId else getAll
    const allProducts = await newCartMgr.getAllCartProducts(id);
    res
    .status(200)
    .send(`${JSON.stringify(allProducts)}`);
  } catch (error) {
    res.status(500).send(`Error: ${JSON.stringify(error)}`);
  }
});

router.post("/:id/productos", async (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    res.status(400).send({ error: "El parametro debe ser numerico" });
    return;
  }

  try {
    const newProd = req.body;
    const producto = await newCartMgr.addProductToCart(id, newProd);
    res.status(200).send({ producto });
  } catch (error) {
    res.status(500).send(`Error: ${JSON.stringify(error)}`);
  }
});

router.delete("/:id/productos/:id_prod", async (req, res) => {
  const { id, id_prod } = req.params;

  if (isNaN(id)) {
    res.status(400).send({ error: "El parametro debe ser numerico" });
    return;
  }

  try {
    const updatedCart = await newCartMgr.deleteProductFromCart(id, id_prod);
    res.status(200).send({ updatedCart });
  } catch (error) {
    res.status(500).send(`Error: ${JSON.stringify(error)}`);
  }
});

module.exports = router;
