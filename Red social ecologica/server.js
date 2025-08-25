const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 3000;



// Midlewares 
app.use(express.json()); // Leer json en js
app.use(express.urlencoded({extended: true})) //Para uso de formularios

//Archivos de rutas estaticas
app.use(express.static(path.join(__dirname, '/sesion')));
app.use('/registrar', express.static(path.join(__dirname, 'registrar')));
app.use('/inicio', express.static(path.join(__dirname, 'inicio')))

//Rutas importantes
const rutaRegistro = require('./RUTAS/registro');
const rutaInicio = require('./RUTAS/sesion');

app.use('/registro', rutaRegistro);
app.use('/sesion', rutaInicio) ;

// Donde arranca el servidor
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/sesion', 'sesion.html'));
});


app.listen (PORT, () => {
  console.log(`La vida corre en: http://localhost:${PORT}`);
});


