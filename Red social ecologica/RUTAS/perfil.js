const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const baseDatos = require('../conexion_basedatos');
const { error } = require("console");

//Guardar fotos 
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "subidas/");
  },
  filename: (req, file, cd) => {
    cd(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({storage});
//Obtener datos
router.get("/", (req, res) => {
  const id = req.session.userId;
  if(!id) return res.status(401).json({error: "Debes iniciar sesion"});

  const sql = "SELECT nombre_usuario, biografia, foto_perfil FROM usuarios WHERE id_usuario = ?";
  baseDatos.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener perfil" });
    if (results.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json(results[0]);
  });
});

//Datos de perfil
router.post("/editar", upload.single("foto"), (req, res) => {
  const id = req.session.userId;
  if(!id) return res.status(401).json({error: "Debes iniciar sesion"});

  const {nombre_usuario, biografia} = req.body;
  let foto_perfil = null; 

  if (req.file) {
    foto_perfil = "/subidas/" + req.file.filename;
  }

  const sql = `UPDATE usuarios
    set biografia = ?, foto_perfil = COALESCE(?, foto_perfil)
    WHERE id_usuario = ? `;

    baseDatos.query(sql, [biografia, foto_perfil, id], (err, result) => {
      if (err) return res.status(500).json({error: "Error de actualizacion"});

      res.json({mensaje: "Se ha actualizado tu perfil correctamente"});
    });
});

module.exports = router;