

//Mostrar edicion de perfil
function mostrarFormulario() {
  document.getElementById("formEditar").style.display = "block";
}

//Carga de perfil
async function cargarPerfil() {
  const res = await fetch(`/api/perfil`);
  const data = await res.json();

  document.querySelector(".nombreUS").innerText = data.nombre_usuario;
  document.querySelector(".perfil").src = data.foto_perfil || "/Red social ecologica/perfil/FOTOS/2.jpg";
  document.getElementById("bio").innerText = data.biografia || "Sin descripción";
  document.getElementById("nombreUsuario").innerText = data.nombre_usuario;
  document.getElementById("bioInput").value = data.biografia;
}

// Guardar cambios
document.getElementById("formPerfil").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const res = await fetch(`/api/perfil/editar`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  alert(data.mensaje);
  cargarPerfil(); 
});

cargarPerfil();

