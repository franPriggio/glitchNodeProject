class CartManager {

  constructor(fileName) {
    this.fileName = fileName;
    this.carts = [];
    this.cartId = ''
  }

  async newCart() {
    // id, timestamp(carrito), 
    // productos: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }
    const newCart = {
      timestamp : String.toString(Date.now()),
      products : []
    }
    const fs = require("fs");
    try {
      let storedData;

      if (fs.existsSync(this.fileName)) {
        storedData = await fs.promises.readFile(
          this.fileName,
          "utf-8"
        );
      } else {
        storedData = await fs.promises.writeFile(this.myFile, "");
      }

       if (storedData === "") {
        newCart["cartId"] = 1;
        this.carts.push(newCart);

        await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(this.newCart)
        );
        return newCart["id"];
      }

      this.carts = JSON.parse(storedData);
      let newId = this.carts[this.carts.length - 1].id + 1;
      let newCarts = [...this.carts, { ...newCart, id: newId }];
      this.carts = newCarts;

      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(this.carts)
      );

      return newId;

    } catch (error) {
      console.error("Error al guardar carrito en archivo", error);
    }
  }
 
    async deleteById(id) {
    try {
      const fs = require("fs");
      //leo contenido actual y parseo
      const contenidoActual = await fs.promises.readFile(
        this.fileName,
        "utf-8"
      );

      const deletedObject = JSON.parse(contenidoActual).filter(
        (el) => el.id != id
      );

      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(deletedObject)
      );
    } catch (error) {
      console.error("Error al borrar objecto", error);
    }
  }

  async getAllCartProducts(id) {
    
    const fs = require("fs");

    const storedFileData = await fs.promises.readFile(
      this.fileName,
      "utf-8"
    );
    let storedData = JSON.parse(storedFileData);
    const findCart = storedData.find((prod) => prod.id === id);
    return !findCart.products || findCart.products.length ==0 ? "Carrito vacio o no existente" : findCart.products;
  }

  async addProductToCart(id, newProd) {

    const fs = require("fs");
    //leo contenido actual y parseo
    const storedFile = await fs.promises.readFile(
      this.fileName,
      "utf-8"
    );
    let storedData = JSON.parse(storedFile);
    const findCart = storedData.find((prod) => prod.id === id);
    let newProductList = findCart.products.push(newProd);
    const updatedCarts = storedData.map((obj) => {
      obj.id === id
        ? {
            ...obj,
            products : newProductList,
          }
        : obj;
    });
    this.carts = updatedCarts;

    await fs.promises.writeFile(
      this.fileName,
      JSON.stringify(this.carts)
    );

    return updatedCarts;
  }

  async deleteProductFromCart(id, id_prod) {

    try {
      const fs = require("fs");
      //leo contenido actual y parseo
      const storedFile = await fs.promises.readFile(
        this.fileName,
        "utf-8"
      );
      let storedData = JSON.parse(storedFile);
      const findCart = storedData.find((prod) => prod.id === id);
      const deletedProduct = findCart.filter(
          (el) => el.id != id_prod);
      const updatedCarts = storedData.map((obj) => {
      obj.id === id
        ? {
            ...obj,
            products : deletedProduct,
          }
        : obj;
    });
    this.carts = updatedCarts;
    
    await fs.promises.writeFile(
      this.fileName,
      JSON.stringify(this.carts)
    );

    return updatedCarts;

    } catch (error) {
      console.error("Error al guardar objeto en archivo", error);
    }
  }
}

module.exports = CartManager;