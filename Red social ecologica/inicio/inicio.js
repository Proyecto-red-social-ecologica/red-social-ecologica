
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

