const express = require("express");
const handlebars = require("express-handlebars");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const PORT = 8080;
const productos = require("./controllers/productos.js");

//configuracion de app middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/public"));
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/js', express.static(__dirname + '/public/js'))
app.use("/files", express.static(__dirname + "/public/files"));    
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/", productos);

//escucha de server
const server = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

//socket connection 
//message to client
io.on('connection', socket => {
    console.log('Usuario conectado')
    socket.emit('msgFromServer', 'Este es mi mensaje desde el servidor')

    //emit de todos los productos
    const prods = productos.getAllProducts();
    socket.emit('prods', prods);
    
    //to all clients
    socket.on('mensaje', data => {
        mensajes.push({ socketid: socket.id, mensaje: data })
        io.sockets.emit('mensajes', mensajes);
    });
    //message from client
    socket.on('clientNotif', data => {
        console.log(data)
    })

})
