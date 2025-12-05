function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({behavior: 'smooth'});
}

function submitForm(e){
  e.preventDefault();
  alert('¡Gracias por tu mensaje! Te responderé pronto.');
  e.target.reset();
}


/* ---------- CONFIGURACIÓN: reemplaza con tu URL del Apps Script ---------- */
// Debe ser la URL del "Deploy as web app" (la que permite GET/POST)
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbydPtMZeYfU1RRzJWwDU35L-I9BxK00F8p4hAv-tj0GR3VO8fSxuCLcSrOIk1EkQahM/exec";

/* ---------- Inicializar FullCalendar ---------- */
document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');
  
  if (calendarEl) {
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      selectable: true,
      firstDay: 1,
      locale: 'es',
      dateClick: function(info) {
        form.fechaevento.value = info.dateStr;
        modal.style.display = "block";
      },
      height: 650
    });
    calendar.render();
  } else {
    console.error("Error: no se encontró el elemento con id 'calendar'");
  }
});


/* ---------- Modal helpers ---------- */
function openModal(dateStr) {
  document.getElementById('selectedDate').value = dateStr;
  document.getElementById('selectedTime').value = "";
  document.getElementById('nombre').value = "";
  document.getElementById('email').value = "";
  document.getElementById('comentarios').value = "";
  document.getElementById('modalMsg').innerText = "";
  document.getElementById('modal').className = 'modal-visible';
  document.getElementById('nombre').focus();
}

function closeModal() {
  document.getElementById('modal').className = 'modal-hidden';
}

/* ---------- Enviar reserva al Apps Script (POST) ---------- */
async function submitReserva() {
  const date = document.getElementById('selectedDate').value;
  const time = document.getElementById('selectedTime').value;
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const comentarios = document.getElementById('comentarios').value.trim();

  if (!date || !nombre || !email) {
    document.getElementById('modalMsg').innerText = "Por favor rellena fecha, nombre y email.";
    return;
  }

  const payload = { date, time, nombre, email, comentarios };

  try {
    const resp = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await resp.json();
    if (data && data.status === 'OK') {
      document.getElementById('modalMsg').innerText = "Reserva guardada. Te llegará un email de confirmación.";
      // refrescar calendario recargando eventos
      setTimeout(() => {
        location.reload(); // simple y eficaz para recargar eventos
      }, 900);
    } else {
      document.getElementById('modalMsg').innerText = "Error guardando la reserva: " + (data.message || JSON.stringify(data));
    }
  } catch (err) {
    console.error(err);
    document.getElementById('modalMsg').innerText = "Error de red al guardar la reserva.";
  }
}

/* ---------- utilidad de scroll (mantener tu comportamiento) ---------- */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}
