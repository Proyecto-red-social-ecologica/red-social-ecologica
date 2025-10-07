
  const menuBtn = document.querySelector('.treslineas');
  const menu = document.getElementById('menu');

  menuBtn.addEventListener('click', () => {
    // Alternar visibilidad
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'block';
    }
  });

  
  const desBtn = document.querySelector('.retos');
  const des = document.getElementById('des');

  desBtn.addEventListener('click', () => {
    // Alternar visibilidad
    if (des.style.display === 'block') {
      des.style.display = 'none';
    } else {
      des.style.display = 'block';
    }
  }); 
//Carga de retos
document.addEventListener("DOMContentLoaded", async () => {
  const lista = document.getElementById("lista-retos");
  const plantilla = document.getElementById("plantilla-reto");

  try {
    const res = await fetch("/api/retos");
    const retos = await res.json();

    retos.forEach(reto => {
      const clon = plantilla.cloneNode(true);
      clon.style.display = "block";  
      clon.id = ""; 

      clon.querySelector(".tit").textContent = "Ecosistema_oficial ✅";
      clon.querySelector(".TRES img").src = reto.foto_reto || "FOTOS/default.jpg";
      clon.querySelector(".descripcion").textContent = (reto.nombre_reto ? reto.nombre_reto + ": " : "") + (reto.descripcion || "");

      lista.appendChild(clon);
    });
  } catch (err) {
    console.error("Error cargando retos:", err);
  }

  //Creacion de retos administrador
    try {
    const resp = await fetch("/api/sesion-estado");
    const data = await resp.json();

    if (data.tipo === "admin") {
      const enlaceAdmin = document.createElement("a");
      enlaceAdmin.href = "/retos";
      enlaceAdmin.className = "menu-item";
      enlaceAdmin.textContent = "- Crear o gestionar retos 🧩";
      des.appendChild(enlaceAdmin);
    }
  } catch (err) {
    console.error("Error verificando sesión:", err);
  }
});

