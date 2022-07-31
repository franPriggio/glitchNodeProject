const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const PORT = 8080;
const productos = require("./controllers/productos.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "public"));
app.use("/static", express.static(__dirname + "files"));

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

// defino el motor de plantilla hbs
// app.engine(
//   "hbs",
//   handlebars.engine({
//     extname: ".hbs",
//     defaultLayout: "index.hbs",
//     layoutsDir: __dirname + "/views/layouts",
//     partialsDir: __dirname + "/views/partials",
//   })
// );

// //app.set("view engine", "hbs");
// app.set("view engine", "pug");
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/", productos);

server.on("error", (error) => console.log(`Error en servidor ${error}`));

// app.get("/", (req, res) => {
//   res.sendFile("productos.html", { root: "public" });
// });
