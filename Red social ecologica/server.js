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
app.use(express.static(path.join(__dirname, 'registrar')));
app.use(express.static(path.join(__dirname, 'inicio')));
app.use(express.static(path.join(__dirname, 'perfil')));
app.use(express.static(path.join(__dirname, 'retos')));
app.use(express.static(path.join(__dirname, 'subidas')));

app.use(express.static(path.join(__dirname, '..')));
//Rutas importantes
const rutaRegistro = require('./RUTAS/registro');
const rutaInicio = require('./RUTAS/sesion');

app.use('/registro', rutaRegistro);
app.use('/sesion', rutaInicio) ;
app.use('/api/perfil', perfil);
app.use('/api/retos', retos);

// Validacion de usuario
app.get('/api/sesion-estado', (req, res) => {
  if (req.session.adminId) {
    return res.json({ tipo: 'admin' });
  } else if (req.session.userId) {
    return res.json({ tipo: 'usuario' });
  } else {
    return res.json({ tipo: 'ninguno' });
  }
});

// Donde arranca el servidor
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/sesion', 'sesion.html'));
});
//Get de enrutamiento 
app.get("/registrar", (req, res) => {
  res.sendFile(path.join(__dirname, 'registrar', 'registrar.html'));
});

app.get("/inicio", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});


app.listen (PORT, () => {
  console.log(`La vida corre en: http://localhost:${PORT}`);
});
