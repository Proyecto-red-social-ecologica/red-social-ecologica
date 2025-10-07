const express = require("express");
const multer = require("multer");
const path = require("path");
const baseDatos = require('../conexion_basedatos');
const router = express.Router();

//Configuracion de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "subidas/retos/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({storage});

//Subir publicacion de retos
router.post("/", upload.single("foto_reto"), (req, res) => {
  const { nombre_reto, descripcion } = req.body;
  const idAdmin = req.session.adminId; 
  if (!idAdmin) return res.status(401).json({ error: "Debes iniciar sesión como administrador" });

  const fotoRuta = req.file ? "/subidas/retos/" + req.file.filename : null;

  const sql = "INSERT INTO retos (nombre_reto, descripcion, foto_reto, id_admin) VALUES ($1, $2, $3, $4)";
  baseDatos.query(sql, [nombre_reto, descripcion, fotoRuta, idAdmin], (err, result) => {
    if (err) {
      console.error("Error al guardar reto:", err.sqlMessage);
      return res.status(500).json({ error: err.sqlMessage });
    }
    res.json({ mensaje: "Reto publicado correctamente" });
  });
});

//Carga de retos
router.get("/", (req, res) => {
  const sql = "SELECT * FROM retos ORDER BY id_reto DESC";
  baseDatos.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener retos:", err);
      return res.status(500).json({ error: "Error al cargar los retos" });
    }
    res.json(results);
  });
});

module.exports = router;

