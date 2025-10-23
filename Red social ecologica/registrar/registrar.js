/*document.getElementById("registrarse").addEventListener("click", function(event) {
    event.preventDefault();
    
        let usuario = document.getElementById("usuario").value.trim();
        let contraseña = document.getElementById("contraseña").value.trim();
        let confirmar = document.getElementById("confirmar").value.trim();
        
        if (usuario === "" || contraseña === "" || confirmar === "") {
            alert("para registrarte tienes que ingresar los datos");
            return;
        }

        if (contraseña !== confirmar) {
            alert("Las contraseñas no son iguales por favor verifica que escribiste lo mismo en la confirmacion de contraseña");
            return;
        }
    
        window.location.href = "../sesion/sesion.html";
    });*/

document.addEventListener("DOMContentLoaded", () =>{
  const formulario = document.getElementById('registro');
  console.log('Funcionando correctamente (registrar)');
  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log('formulario enviado')
    const usuario = document.getElementById('usuario').value.trim();
    const contrasena = document.getElementById('contraseña').value;
    const confirmar = document.getElementById('confirmar').value;

    if (!usuario || !contrasena || !confirmar) {
      alert("Para registrarte tienes que ingresar los datos");
      return
    }

    if (contrasena !== confirmar) {
      alert("Las contraseñas no son iguales por favor verifica que escribiste lo mismo en la confirmacion de contraseña");
      return;
    }

    try {
      const respuesta = await fetch("/registro", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({usuario, contrasena})
      }); 

      const data = await respuesta.json();

      if (!respuesta.ok) {
        alert(data.error || "error en el registro");
        return;
      }
      alert(data.message || "Te has registrado correctamente");
      formulario.reset();

      window.location.href = "/Red social ecologica/sesion/sesion.html";

    } catch (err) {
      console.error(err);
      alert("Error de conexion, que ocurrio??")
    }
  });

});


