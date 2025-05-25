let lastScrollY = 0;

// Función que se ejecuta cuando un elemento observado entra o sale del viewport
const handleIntersect = (entries, observer) => {
    entries.forEach(entry => {
      const isScrollingDown = window.scrollY > lastScrollY;

      if (entry.isIntersecting) {
        // Si entra en la vista, siempre lo hacemos visible
        entry.target.classList.add('is-visible');
      } else {
        // Si sale de la vista
        const boundingClientRect = entry.boundingClientRect;
        const viewportHeight = window.innerHeight;

        // Si el elemento está completamente por encima del viewport (salió por arriba)
        // o completamente por debajo del viewport (salió por abajo)
        // Consideramos ocultarlo.
        // Una lógica más precisa para scroll arriba: si el borde inferior del elemento
        // está por encima del borde superior del viewport (salió hacia arriba)
        if (boundingClientRect.bottom < 0 && !isScrollingDown) {
           entry.target.classList.remove('is-visible');
        }
        // Ocultar también si sale completamente por abajo (aunque la animación al entrar
        // al scrollear hacia abajo ya maneja esto, es bueno tenerlo)
        if (boundingClientRect.top > viewportHeight && isScrollingDown) {
            entry.target.classList.remove('is-visible');
        }
         // Una simplificación: simplemente quitar la clase si no está intersecando.
         // Esto oculta al salir por arriba O por abajo. Puede ser suficiente visualmente.
         // entry.target.classList.remove('is-visible');
      }
    });
     lastScrollY = window.scrollY;
  };

  // Opciones para el observador (opcional, puedes ajustarlas)
// root: null - usa el viewport como contenedor
// rootMargin: '0px' - no añade margen alrededor del viewport
// threshold: 0.1 - el callback se ejecuta cuando al menos el 10% del elemento es visible
const observerOptions = {
    root: null,
    rootMargin: '0px',
    // Umbral 0 significa que el callback se dispara tan pronto como 1 pixel
    // del elemento entra o sale del viewport.
    threshold: 0,
  };
  
  // Crear una nueva instancia del IntersectionObserver
  const observer = new IntersectionObserver(handleIntersect, observerOptions);
  
  // Seleccionar todos los elementos con la clase 'faq-item'
  const faqItems = document.querySelectorAll('.faq-item');
  
  // Observar cada elemento seleccionado
  faqItems.forEach(item => {
    observer.observe(item);
  });

  // Opcional: resetear visibilidad al cargar la página para la primera vista
  document.addEventListener('DOMContentLoaded', () => {
      faqItems.forEach(item => {
          // Re-observar para asegurar que aparezcan si están en la vista inicial
          observer.unobserve(item); // Stop observing first to avoid issues
          observer.observe(item);
      });
  });

  // Opcional: Forzar una verificación inicial en caso de que algunos elementos
  // ya estén en la vista al cargar
  if (faqItems.length > 0) {
      // Pequeño timeout para dar tiempo al DOM a renderizar
      setTimeout(() => {
          faqItems.forEach(item => {
               // Trigger observer manually if element is already in view on load
               const boundingClientRect = item.getBoundingClientRect();
               if (boundingClientRect.top < window.innerHeight && boundingClientRect.bottom > 0) {
                   item.classList.add('is-visible');
               }
          });
      }, 100); // Ajusta el tiempo si es necesario
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Prevenir el comportamiento de salto por defecto
        e.preventDefault();

        // Obtener el ID de la sección desde el atributo href
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        // Si el elemento existe, desplázate suavemente hacia él
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth' // Esto habilita la animación de scroll
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger-menu');
  const navButtons = document.querySelector('.nav-buttons');

  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navButtons.classList.toggle('active');
  });

  // Cerrar el menú al hacer clic en un enlace
  const navLinks = document.querySelectorAll('.nav-buttons a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navButtons.classList.remove('active');
    });
  });
});
