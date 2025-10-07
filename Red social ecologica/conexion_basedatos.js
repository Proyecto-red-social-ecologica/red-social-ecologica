const mysql = require('mysql2')
const dotenv = require('dotenv')

/* Configuracion para conectar a base de datos*/ 
dotenv.config();
const conexion = mysql.createPool({
  host: process.env.HOST || "localhost",
  user: process.env.USER || "root",
  password: process.env.PASSWORD || "",
  database: process.env.DATA_BASE || "nuestraRedsocial",
  connectionLimit: 1
});
//Validacion de conexion
conexion.getConnection((err, connection) =>{
  if (err){
    console.error("No ha sido posible conectar con la base de datos", err);
    return;
  }
  connection.release();
  console.log("Conexion a la base de datos exitosa");
})

module.exports = conexion;















