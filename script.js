function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({behavior: 'smooth'});
}

function submitForm(e){
  e.preventDefault();
  alert('¡Gracias por tu mensaje! Te responderé pronto.');
  e.target.reset();
}
