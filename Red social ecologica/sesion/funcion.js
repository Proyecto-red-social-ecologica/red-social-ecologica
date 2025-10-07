/* document.getElementById("enter").addEventListener("click", function(event) {
event.preventDefault();

    let usuario = document.getElementById("usuario").value.trim();
    let contraseña = document.getElementById("contraseña").value.trim();
    
    if (usuario === "" || contraseña === "") {
        alert("para entrar tienes que ingresar los datos");
        return;
    }

    window.location.href = "../inicio/inicio.html";
});


document.getElementById("registro").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "../registrar/registrar.html";
}); */

document.addEventListener("DOMContentLoaded", () =>{
  const formulario = document.getElementById('inicio');
  console.log('sesion funcionando correctamente');

  formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const contrasena = document.getElementById('contrasena').value;

    if (!usuario || !contrasena){
      alert('Para entrar tienes que ingresar los datos');
      return;
    }
    try{
      const respuesta = await fetch('/sesion', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({usuario, contrasena}),
      }); 

      const data = await respuesta.json();
      if (!respuesta.ok){
        alert(data.error || "Error al iniciar sesion");
        return;
      }
      if (data.redirect) {
        window.location.href = data.redirect
      } else {
        alert(data.message || "Has iniciado sesion correctamente");
        formulario.reset();
        window.location.href = "../inicio/inicio.html";
      }
     
    } catch (err) {
      console.error('Ha ocurrido un error en la conexion...', err);
      alert("No ha sido posible conectar con el servidor");
    }
  });

  const botonRegistro = document.getElementById('registro');
  botonRegistro.addEventListener('click', (e) =>{
    e.preventDefault();
    window.location.href = "registrar.html";
  })
});


