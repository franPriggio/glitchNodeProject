const socket = io();
let todosLosMensajes = [];

// Cliente
socket.on("mi mensaje", (data) => {
  console.log(data);
  //mensaje al server
  socket.emit("notificacion", "Mensaje recibido exitosamente");
});

socket.on("mensajes", (messages) => {
  console.log("messages: " + JSON.stringify(messages));
  //mensaje al server
  messages.forEach((element) => {
    todosLosMensajes.push(element.mensaje);
  });

  document.getElementById("nuevoMensaje").innerHTML =
    JSON.stringify(todosLosMensajes);
});

function enviarMensaje() {
  console.log("envio mensaje: " + document.getElementById("mensaje").value);
  let mensaje = document.getElementById("mensaje").value;
  socket.emit("mensajeDesdeCliente", mensaje);
}
