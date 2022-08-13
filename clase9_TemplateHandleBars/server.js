const express = require("express");
const fs = require("fs");

const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

// defino el motor de plantilla
app.engine("cte", function (filePath, options, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) {
      return callback(new Error(err));
    }
    const rendered = content
      .toString()
      .replace("#title#", "" + options.title + "")
      .replace("#message#", "" + options.message + "");
    return callback(null, rendered);
  });
});
app.set("views", "./views"); // especifica el directorio de vistas
app.set("view engine", "cte"); // registra el motor de plantillas

app.get("/", function (req, res) {
  res.render("plantillaUno", { title: "Hey", message: "Hello there!" });
});
