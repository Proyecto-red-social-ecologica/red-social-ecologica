const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const app = express();
const session = require("express-session");
const PORT = process.env.PORT || 3000;
const perfil = require("./RUTAS/perfil");
const retos = require("./RUTAS/retos");

// Midlewares 
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

app.use(session({
  secret: "888888",
  resave: false,
  saveUninitialized: false
}))

//Archivos de rutas estaticas
app.use(express.static(path.join(__dirname, 'sesion')));
app.use('/registrar', express.static(path.join(__dirname, 'registrar')));
app.use('/inicio', express.static(path.join(__dirname, 'inicio')));
app.use('/perfil', express.static(path.join(__dirname, 'perfil')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));
app.use('/subidas', express.static('subidas'));

//Rutas importantes
const rutaRegistro = require('./RUTAS/registro');
const rutaInicio = require('./RUTAS/sesion');

app.use('/registro', rutaRegistro);
app.use('/sesion', rutaInicio) ;
app.use('/api/perfil', perfil);
app.use('/api/retos', retos);


// Donde arranca el servidor
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/sesion', 'sesion.html'));
});


app.listen (PORT, () => {
  console.log(`La vida corre en: http://localhost:${PORT}`);
});



