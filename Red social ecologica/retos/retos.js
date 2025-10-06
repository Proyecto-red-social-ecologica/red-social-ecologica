const form = document.getElementById('formReto');


form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const resp = await fetch('/api/retos', {
      method: 'POST',
      body: formData
    });

    const data = await resp.json();
    if (!resp.ok) {
      alert(data.error || 'Ocurrio un error al crear el reto');
      return;
    }

    alert(data.mensaje || 'Se ha publicado el reto correctamente :D');
    form.reset();
  } catch (err) {
    alert('Error en el servidor');
    console.error(err);
  }
});

