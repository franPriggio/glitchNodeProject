import { ReadProducts } from '../../servicio/handleProducts/read_products.js'
import { SaveProducts } from '../../servicio/handleProducts/save_products.js'

export class HandleProducts {
  
  constructor() {
    this.products = [];
  }

  async update(object) {
    Object.keys(producto).forEach((key) => {
      producto[key] = newData[key];
    });

    const fs = require("fs");
    //leo contenido actual y parseo
    const contenidoActual = await fs.promises.readFile(
      this.nombreArchivo,
      "utf-8"
    );
    let contenidoObjActual = JSON.parse(contenidoActual);
    const updatedProducts = contenidoObjActual.map((obj) => {
      obj.id === object.id
        ? {
            ...obj,
            tile: object.title,
            price: object.price,
            thumbnail: object.thumbnail,
          }
        : obj;
    });
    this.products = updatedProducts;

    await fs.promises.writeFile(
      this.nombreArchivo,
      JSON.stringify(this.products)
    );

    return updatedProducts;
  }
  
  async save(object) {
    const dbSave = new SaveProducts();
    try {
      dbSave.saveProduct(object)
    } catch (error) {
      console.error("Error al guardar objeto en archivo", error);
    }
  }

  async getById(Number) {
    const fs = require("fs");
    //leo contenido actual y parseo
    const contenidoActual = await fs.promises.readFile(
      this.nombreArchivo,
      "utf-8"
    );
    let contenidoObjActual = JSON.parse(contenidoActual);

    const findProduct = contenidoObjActual.find((prod) => prod.id === Number);
    return !findProduct ? "No existe producto" : findProduct;
  }

  async getAll() {
    const dbQuery = new ReadProducts()
    return dbQuery.getProducts();
  }

  async deleteById(Number) {
    try {
      const fs = require("fs");
      //leo contenido actual y parseo
      const contenidoActual = await fs.promises.readFile(
        this.nombreArchivo,
        "utf-8"
      );

      const deletedObject = JSON.parse(contenidoActual).filter(
        (el) => el.id != Number
      );

      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(deletedObject)
      );
    } catch (error) {
      console.error("Error al borrar objecto", error);
    }
  }

  async deleteAll() {
    const fs = require("fs");
    //leo contenido actual y parseo
    const contenidoActual = await fs.promises.writeFile(
      this.nombreArchivo,
      JSON.stringify([])
    );
  }
}