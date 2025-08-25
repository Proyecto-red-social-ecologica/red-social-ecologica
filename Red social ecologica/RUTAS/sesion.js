const express = require('express');
const bcrypt = require('bcrypt');
const baseDatos = require('../conexion_basedatos');
const router = express.Router();

//Funciones de inicio de sesion
router.post('/', async (req, res) => {
  console.log('Funcinonando correctamente inicio de sesion');
  try {
    const {usuario, contrasena} = req.body;
    if (!usuario || !contrasena){
      console.log('Faltan datos');

      return res.status(400).json({error: 'Debes ingresar tu usuario y contraseña'});
    }
    //validar usuario en la base de datos
    const validarSql = 'SELECT * FROM Usuarios WHERE nombre_usuario = ?';
    baseDatos.query(validarSql, [usuario], async (err, resultados) => {
      if (err){
        console.error("Ha ocurrido un error con las bases de datos", err);
        return res.status(500).json({error: 'Error en el servidor :('});
      }
      console.log('Resultados:', resultados);

      if (resultados.length === 0){
        return res.status(404).json({error: 'Usuario no encontrado'});
      }
      const usuarioExistente = resultados[0];
      console.log("Usuario encontrado:", usuarioExistente.nombre_usuario);
      console.log("Contraseña en BD:", usuarioExistente.contrasena);
      if (!usuarioExistente.contrasena) {
        console.error("La contraseña del usuario no está definida");
        return res.status(500).json({ error: "Error interno: contraseña no disponible" });
      }

      const math = await bcrypt.compare(contrasena, usuarioExistente.contrasena);
      if(!math){
        return res.status(404).json({error: "Contraseña incorrecta"});
      }
      res.status(200).json({message: 'Inicio de sesion exitoso :D', id: usuarioExistente.id_usuario});
      console.log('Inicio correcto');
    });
  } catch (error) {
    console.error("Ha ocurrido un error en el servidor...", error);
    res.status(500).json({error: "ha ocurrido un error inesperado..."});
  }
});

module.exports = router;