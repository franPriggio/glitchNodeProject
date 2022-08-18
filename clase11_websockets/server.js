const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));
// Esta ruta carga nuestro archivo index.html en la raíz de la misma
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

const mensajes = [];
const data = "Mensaje para el cliente desde el servidor";
// El servidor funcionando en el puerto 3000
httpServer.listen(3000, () => console.log("SERVER ON"));

// Servidor
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");
  //se envia mensaje al cliente
  socket.emit("mi mensaje", mensajes);

  socket.on("mensajeDesdeCliente", (data) => {
    mensajes.push({ mensaje: data });
    io.sockets.emit("mensajes", mensajes);
  });
});

// Servidor
io.on("notificacion", (data) => {
  console.log(data);
});
