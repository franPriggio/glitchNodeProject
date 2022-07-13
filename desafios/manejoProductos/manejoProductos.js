class ManejoProductos {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
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
    const fs = require("fs");

    try {
      let contenidoActual;

      if (fs.existsSync(this.nombreArchivo)) {
        contenidoActual = await fs.promises.readFile(
          this.nombreArchivo,
          "utf-8"
        );
      } else {
        contenidoActual = await fs.promises.writeFile(this.myFile, "");
      }

      if (contenidoActual === "") {
        object["id"] = 1;
        this.products.push(object);

        await fs.promises.writeFile(
          this.nombreArchivo,
          JSON.stringify(this.products)
        );
        return object["id"];
      }

      this.products = JSON.parse(contenidoActual);

      //Asigno id a nuevo objeto
      //agrego nuevo objeto al objeto actual y escribo archivo
      console.log(
        "this.products[this.products.length - 1].id: " +
          this.products[this.products.length - 1].id
      );

      let nuevoId = this.products[this.products.length - 1].id + 1;
      console.log("nuevoId: " + nuevoId);
      let newProducts = [...this.products, { ...object, id: nuevoId }];
      this.products = newProducts;

      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(this.products)
      );

      return nuevoId;
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
    const fs = require("fs");
    //leo contenido actual y parseo
    const contenidoActual = await fs.promises.readFile(
      this.nombreArchivo,
      "utf-8"
    );

    return JSON.parse(contenidoActual);
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

module.exports = ManejoProductos;

async function crearProductos() {
  const newCont = new ManejoArchivos("./productos.txt");
  try {
    await newCont.save({
      title: "Cuaderno",
      price: 100,
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    });
  } catch (error) {
    console.error("Error al borrar objecto", error);
  }
}
crearProductos();
//   await newCont.save({
//     title: "Calculadora",
//     price: 234.56,
//     thumbnail:
//       "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
//   });
//   await newCont.save({
//     title: "Globo Terráqueo",
//     price: 345.67,
//     thumbnail:
//       "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
//   });

//Descomentar para probar resto de las funciones

//newCont.getById(2);
//newCont.getAll();
//newCont.deleteById(2);
//newCont.deleteAll();
