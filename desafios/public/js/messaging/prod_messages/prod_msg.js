const socket = io(); 

socket.on('messages', function (data) {
  document.getElementById("chat").innerHTML = data;
});

function addMessage() {
   let email = document.getElementById('inp_email').value;
   let msg = document.getElementById('inp_msg').value;
   const msgDate = moment().format('DD/MM/YYYY HH:mm:ss');

  const newMsg = {
    email: email,
    date: msgDate,
    message: msg,
  };

  if(email && msg) {
    socket.emit("new-msg", newMsg);
  }
  msg = "";
}
