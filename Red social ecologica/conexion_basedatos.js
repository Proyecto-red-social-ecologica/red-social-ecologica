const mysql = require('mysql2')
const dotenv = require('dotenv')

/* Configuracion para conectar a base de datos*/ 
dotenv.config();

const conexion = mysql.createConnection({
  host: process.env.CONEXION_HOST || "localhost",
  user: process.env.CONEXION_USER || "root",
  password: process.env.CONEXION_PASSWORD || "",
  database: process.env.CONEXION_NAME || "nuestraRedsocial"
});

conexion.connect ((err) =>{
  if (err){
    console.error("No ha sido posible conectar con la base de datos", err);
    return;
  }
  console.log("Conexion a la base de datos exitosa");
})

module.exports = conexion;
