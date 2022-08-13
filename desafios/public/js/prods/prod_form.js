const socket = io.connect();

async function addProduct(){
  let name = document.getElementById('inp_name').value;
  let price = document.getElementById('inp_price').value;
  let url = document.getElementById('inp_url').value;
  let description = document.getElementById('inp_desc').value;
  let code = document.getElementById('inp_code').value;
  let stock = document.getElementById('inp_stock').value;
  let tmStmp = Date.now();

  const newProd = {
    title: name,
    price: price,
    timestamp : tmStmp,
    description : description,
    code : code,
    stock : stock,
    thumbnail: url,
  };

  name = "";
  price = "";
  url = "";
  description = "";
  code = "";
  stock = "";

  //fetch
  postData('/api/productos', newProd)
  .then((data) => {
    //compile hbs and render
  });
}

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
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
