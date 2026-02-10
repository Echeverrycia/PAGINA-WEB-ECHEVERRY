document.addEventListener('DOMContentLoaded', function () {
  const tabs  = document.querySelectorAll('.portfolio-tab');
  const grids = document.querySelectorAll('.portfolio-grid');

  if (!tabs.length || !grids.length) return; // por si acaso

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target; // soldadura / mecanizado / repuestos

      // Cambiar estado visual de las pestañas
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      // Mostrar solo las imágenes de la categoría seleccionada
      grids.forEach(grid => {
        if (grid.dataset.category === target) {
          grid.classList.add('is-active');
        } else {
          grid.classList.remove('is-active');
        }
      });
    });
  });
});


// ----- FORMULARIO DE CONTACTO -----
const contactForm = document.getElementById('contactForm');
const formMsg     = document.getElementById('formMsg');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();                       // Evita el envío “normal”
    formMsg.textContent = 'Enviando mensaje...';
    formMsg.style.color = '#e5e7eb';

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formMsg.textContent = '✅ Mensaje enviado correctamente. ¡Te responderemos pronto!';
        formMsg.style.color = '#4ade80';
        contactForm.reset();
      } else {
        formMsg.textContent = '⚠️ Ocurrió un error al enviar el mensaje. Inténtalo de nuevo.';
        formMsg.style.color = '#f97373';
      }
    } catch (err) {
      console.error(err);
      formMsg.textContent = '⚠️ No se pudo conectar al servidor. Revisa tu conexión.';
      formMsg.style.color = '#f97373';
    }
  });
}