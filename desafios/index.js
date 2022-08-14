const express = require("express");
const { Server: HttpServer } = require("http");
const app = express();
const httpServer = new HttpServer(app);
const PORT = process.env.PORT || 8080;
const productos = require("./controllers/product.js");
const carrito = require("./controllers/carrito.js");


//configuracion de app middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/public"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/files", express.static(__dirname + "/public/files"));

app.use("/api/productos", productos);
app.use("/api/carrito", carrito);

//escucha de server
const server = httpServer.listen(PORT, async () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));