const socket = io.connect();

function addProduct(){
  let name = document.getElementById('inp_name').value;
  let price = document.getElementById('inp_price').value;
  let url = document.getElementById('inp_url').value;

  const newProd = {
    title: name,
    price: price,
    thumbnail: url,
  };

  name = "";
  price = "";
  url = "";

  socket.emit("new-product", newProd);
}

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

function render(data) {
  const html = data
    .map((elem) => {
      return `<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em> </div>`;
    })
    .join(" ");
  document.getElementById("prodTable").innerHTML = html;
}

//From Server
socket.on("prods", (data) => {
  document.getElementById("prodsInForm").innerHTML = data;
});

socket.on('messages', function (data) {
  document.getElementById("chat").innerHTML = data;
});

(function () {
  "use strict";
  const forms = document.querySelectorAll(".requires-validation");
  Array.from(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
