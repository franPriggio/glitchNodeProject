const express = require("express");
const app = express();
const PORT = 8080;

app.set("views", "./views");
// app.set("view engine", "pug");
app.set("view engine", "ejs");

app.listen(PORT, () => console.log("server running on PORT " + PORT));

app.get("/hello", (req, res) => {
  res.render("hello.pug", { mensaje: "Hola K ase mensaje para PUG" });
});

app.get("/datos", (req, res) => {
  const { min, nivel, max, titulo } = req.query;
  const blueback = "color: blue";
  res.render("medidor", {
    titulo,
    min,
    max,
    nivel,
    blueback,
  });
});

let page;
let tagline;

app.get("/medidorejs", (req, res) => {
  let mascots = [
    { name: "Sammy", organization: "DigitalOcean", birth_year: 2012 },
    { name: "Tux", organization: "Linux", birth_year: 1996 },
    { name: "Moby Dock", organization: "Docker", birth_year: 2013 },
  ];
  tagline = "No programming concept is complete without a cute animal mascot.";
  page = "home";
  res.render("medidorejs", { mascots, tagline, page });
});

// about page
app.get("/about", (req, res) => {
  page = "about";
  tagline = "Abouts Us";
  res.render("about", { tagline, page });
});
