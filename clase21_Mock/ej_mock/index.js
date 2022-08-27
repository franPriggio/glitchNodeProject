import express from 'express';
import { faker } from '@faker-js/faker';

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

/**
 * Para que nuestro servidor express pueda interpretar en forma automática mensajes de tipo JSON en formato urlencoded
 * al recibirlos, debemos indicarlo en forma explícita, agregando las siguiente líneas luego de crearlo.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  
  const nombres = ['Luis', 'Lucia', 'Juan'];
  const apellidos = ['Pieres', 'Cacurri', 'Alberca'];
  const colores = ['rojo', 'verde', 'azul'];
  const resultado = [];

  for (let index = 0; index < 15; index++) {
    const nombre = nombres[Math.floor(Math.random() * nombres.length)];
    const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
    const color = nombres[Math.floor(Math.random() * colores.length)];

    resultado.push({nombre, apellido, color});
  }
  res.send(resultado);
});

app.get("/test/faker", (req, res) => {
  
  const cantidad = req.query.cant || 10;
  const resultado = [];

  for (let index = 0; index < 100; index++) {
    resultado.push({id: index,
                    nombre : faker.name.firstName(), 
                    apellido : faker.name.lastName(), 
                    color: faker.color.human()});
  }
  res.send(resultado);
});