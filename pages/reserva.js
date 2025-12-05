document.addEventListener('DOMContentLoaded', function () {

  // ===== CALENDARIO =====
  var calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
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

  // ===== MODAL =====
  var modal = document.querySelector("#reservaModal");
  var closeBtn = modal.querySelector(".close");
  var form = modal.querySelector("form");

  closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
  });

  window.addEventListener("click", function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  // ===== FORMULARIO =====
  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = {
        id: Date.now(),
        nombre: form.nombre.value,
        apellidos: form.apellidos.value,
        email: form.email.value,
        telefono: form.telefono.value,          // ← nuevo
        ubicacion: form.ubicacion.value,        // ← nuevo
        fechaevento: form.fechaevento.value,
        npersonas: form.npersonas.value,
        horainicio: form.horainicio.value,
        horafin: form.horafin.value,
        fecharegistro: new Date().toISOString()
    };

    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbydPtMZeYfU1RRzJWwDU35L-I9BxK00F8p4hAv-tj0GR3VO8fSxuCLcSrOIk1EkQahM/exec", {
        method: "POST",
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (result.status === "OK") {
        alert("Reserva enviada correctamente 🎉");
        modal.style.display = "none";
        form.reset();
      } else {
        alert("Error al enviar la reserva.");
      }
    } catch(err) {
      alert("Error de conexión con el servidor.");
      console.error(err);
    }
  });

});
