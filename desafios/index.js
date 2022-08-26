import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";
const app = express();
import fs from 'fs';
const httpServer = createServer();
const io = new Server(httpServer);
const PORT = 8080;
import router from './src/controllers/productos.js';
let prods = [];
let messages = [];
import { HandleProducts } from './src/hndlProds/handleProducts.js'
const newProdMgr = new HandleProducts();
import { HandleMessages } from './src/hndlMsgs/handleMessages.js'
const newMsgMgr = new HandleMessages();

//configuracion de app middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("/public"));
app.use("/css", express.static("/public/css"));
app.use("/js", express.static("/public/js"));
app.use("/files", express.static("/public/files"));

// app.engine(
//   "hbs",
//   engine({
//     extname: ".hbs",
//     defaultLayout: "index.hbs",
//     layoutsDir: "/views/layouts",
//     partialsDir: "/views/partials"
//   })
// );

// app.set("view engine", "hbs");
// app.set("views", "./views");
app.use("/", router);

//escucha de server
const server = httpServer.listen(PORT, async () => {
console.log(`Servidor http escuchando en el puerto ${server.address().port}`);

//load products
// prods = await newProdMgr.getAll();
//load messages
// messages = newMsgMgr.getAll();

});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

//socket connection
//message to client
// io.on("connection", (socket) => {
//   console.log("Usuario conectado");  
//   //const textTemplate = await template.text();
//   const hnbleTmpl = fs.readFileSync(
//       "./views/prods_table.hbs",
//       "utf-8"
//     );

//   const compileTmp = HandleBars.compile(hnbleTmpl);
//   const dataTmp = compileTmp({products : prods, emptyProds : true})

//   //en inicio emit de todos los productos
//   socket.emit("prods", dataTmp);
  
//   const hnbleChatTmpl = fs.readFileSync(
//       "./views/chat.hbs",
//       "utf-8"
//   );

//   const compileChatTmp = HandleBars.compile(hnbleChatTmpl);
//   const dataChatTmp = compileChatTmp({messages : messages, emptyProds : true})

//   //en inicio emit de todos los mensajes
//   socket.emit("messages", dataChatTmp);

//   //to all clients
//   socket.on("new-message", async (data) => {
//     await newMsgMgr.save(data);
//     let messages = await newMsgMgr.getAll();
//     io.sockets.emit("mensajes", messages);
//   });

//   socket.on("new-product", async (data) => {
//     await newProdMgr.save(data);
//     prods = await newProdMgr.getAll();
//     const compileTmp = HandleBars.compile(hnbleTmpl);
//     const dataTmp = compileTmp({products : prods, emptyProds : true})
//     io.sockets.emit("prods", dataTmp);
//   });

//   //message from client
//   socket.on("clientNotif", (data) => {
//     console.log(data);
//   });
// });
