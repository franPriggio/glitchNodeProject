const socket = io(); 

//From Server
 socket.on('msgFromServer', data => {
     alert(data)
 })

 socket.on('prods', data => {
     //mostrar tabla
 })

//To Server 
 socket.on('clientToServer', data => {
    alert(data)
    socket.emit('clientNotif', 'Mensaje recibido exitosamente')
})
