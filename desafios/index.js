const express = require("express");
const { Server: HttpServer } = require("http");
const handlebars = require("express-handlebars");
const hnbl = require("handlebars");
const path = require("path")
const { Server: IOServer } = require("socket.io");
const app = express();
const fs = require("fs");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = process.env.PORT || 8080;
const productos = require("./controllers/product.js");
const carrito = require("./controllers/carrito.js");
const ManejoProductos = require("./objectsManager/prodManager.js");
const newProdMgr = new ManejoProductos("./productos.txt");
const newCarritoMgr = new ManejoProductos("./carrito.txt");

//local vars
let prods = [];
let messages = [];


//configuracion de app middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/public"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/files", express.static(__dirname + "/public/files"));

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");
app.use("/api/productos", productos);
app.use("/api/carrito", carrito);

//escucha de server
const server = httpServer.listen(PORT, async () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
  prods = await newProdMgr.getAll();

  fs.promises
    .readFile('mensajes.txt')
    .then((data) => JSON.parse(data))
    .then((data) => {
      for (const msg of data) {
        messages.push(msg);
      }
    });

});

server.on("error", (error) => console.log(`Error en servidor ${error}`));


//socket connection
//message to client
io.on("connection", (socket) => {
  console.log("Usuario conectado");  
  //const textTemplate = await template.text();
  const hnbleTmpl = fs.readFileSync(
      "./views/prods_table.hbs",
      "utf-8"
    );

  const compileTmp = hnbl.compile(hnbleTmpl);
  const dataTmp = compileTmp({products : prods, emptyProds : true})

  //en inicio emit de todos los productos
  socket.emit("prods", dataTmp);
  
  const hnbleChatTmpl = fs.readFileSync(
      "./views/chat.hbs",
      "utf-8"
    );

  const compileChatTmp = hnbl.compile(hnbleChatTmpl);
  const dataChatTmp = compileChatTmp({messages : messages})

  //en inicio emit de todos los mensajes
  socket.emit("messages", dataChatTmp);

  //to all clients

  socket.on("new-msg", async (data) => {
    messages.push(data);
    await fs.promises.writeFile('mensajes.txt', `${JSON.stringify(messages)}`);
    const compileChatTmp = hnbl.compile(hnbleChatTmpl);
    const dataChatTmp = compileChatTmp({messages : messages})
    io.sockets.emit("messages", dataChatTmp);
  });

  socket.on("new-product", async (data) => {
    await newProdMgr.save(data);
    prods = await newProdMgr.getAll();
    const compileTmp = hnbl.compile(hnbleTmpl);
    const dataTmp = compileTmp({products : prods, emptyProds : true})
    io.sockets.emit("products", dataTmp);
  });

});
