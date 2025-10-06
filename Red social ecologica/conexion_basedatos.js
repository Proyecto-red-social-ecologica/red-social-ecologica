const mysql = require('mysql2')
const dotenv = require('dotenv')

/* Configuracion para conectar a base de datos*/ 
dotenv.config();

const conexion = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST || "localhost",
  user: process.env.MYSQL_ADDON_USER || "root",
  password: process.env.MYSQL_ADDON_PASSWORD || "",
  database: process.env.MYSQL_ADDON_DB || "nuestraRedsocial",

  connectionLimit: 3 
});



conexion.connect ((err) =>{
  if (err){
    console.error("No ha sido posible conectar con la base de datos", err);
    return;
  }
  console.log("Conexion a la base de datos exitosa");
})

module.exports = conexion;








