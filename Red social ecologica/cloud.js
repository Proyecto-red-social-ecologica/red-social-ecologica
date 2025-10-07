const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

//Configuración de Cloud
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

//Cargar fotos a perfil
const storagePerfil = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Red social ecologica/perfil', 
    format: async (req, file) => 'jpg',
    public_id: (req, file) => `perfil-${req.session.userId}-${Date.now()}`
  },
});

//Cargar fotos a retos
const storageReto = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Red social ecologica/retos', 
    format: async (req, file) => 'jpg',
    public_id: (req, file) => `reto-${Date.now()}`
  },
});

// modulo
exports.uploadPerfil = multer({ storage: storagePerfil });
exports.uploadReto = multer({ storage: storageReto });
