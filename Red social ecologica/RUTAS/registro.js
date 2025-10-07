const express = require('express');
const bcrypt = require('bcrypt');
const baseDatos = require('../conexion_basedatos');
const router = express.Router();


// Funciones del registro. 
router.post('/', async (req, res) => {
  console.log('Funcionando correctamente (rutas)');
  try{
    const {usuario, contrasena} = req.body;

    if (!usuario || !contrasena) {
      return res.status(400).json({error: "Debes rellenar todos los campos"});
    }

    //Encriptar contraseña
    const hash = await bcrypt.hash(contrasena, 10);

    //Registrar en base de datos
    const sql = ('INSERT INTO usuarios (nombre_usuario, contrasena) VALUES (?, ?)');
    baseDatos.query(sql, [usuario, hash], (err, result) => {
      if (err){
        console.error("Ocurrio un error en la base de datos", err);
        if (err.code === "ER_DUP_ENTRY"){
          return res.status(409).json({ error: "Nombre de usuario en uso"});
      }
      return res.status(500).json({ error: "error en el servidor"});
      }
      res.status(201).json({message: "Te has registrado correctamente", id: result.insertId});
      console.log("Usuario registrado correctamente");
    });
  } catch (error) {
    console.error("error en el servidor", error);
    res.status(500).json({error: "Ha ocurrido algo..."});
  }
});

module.exports = router;



