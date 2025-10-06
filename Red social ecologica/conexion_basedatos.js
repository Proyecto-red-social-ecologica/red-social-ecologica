const mysql = require('mysql2')
const dotenv = require('dotenv')

/* Configuracion para conectar a base de datos*/ 
dotenv.config();

const conexion = mysql.createConnection({
  host:  "bvhiffdubewju9mcd3hm-mysql.services.clever-cloud.com",
  user: "u2mewwsigm7q7xee",
  password: "LBqY3NsstVZNXTk7xWBQ",
  database: "bvhiffdubewju9mcd3hm"
});


conexion.connect ((err) =>{
  if (err){
    console.error("No ha sido posible conectar con la base de datos", err);
    return;
  }
  console.log("Conexion a la base de datos exitosa");
})

module.exports = conexion;






