import { CardsView } from '../views/cards.js';
import { AccordionView } from '../views/accordion.js';
import { GalleryView } from '../views/gallery.js';
import { ContactView } from '../views/contact.js';
import { TodoView } from '../views/todo.js';

const routes = {
    '#cards': CardsView,
    '#accordion': AccordionView,
    '#gallery': GalleryView,
    '#contact': ContactView,
    '#todo': TodoView
};

export function initRouter(mainContainer) {
    function handleRoute() {
        const hash = window.location.hash || '#cards';
        const renderView = routes[hash] || routes['#cards'];

        // ===============================================
        // PASO CRÍTICO: LIMPIEZA (Unmount)
        // ===============================================
        // Antes de borrar el contenido, verificamos si hay algo que limpiar
        if (mainContainer.firstChild && mainContainer.firstChild.cleanup) {
            // Si la vista actual tiene un método .cleanup(), lo ejecutamos
            mainContainer.firstChild.cleanup();
        }

        // 1. Limpiar vista anterior
        mainContainer.innerHTML = '';

        // 2. Renderizar nueva vista
        const viewElement = renderView();
        viewElement.classList.add('active');
        mainContainer.appendChild(viewElement);

        // 3. Actualizar Navbar
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // 4. Cerrar menú móvil
        const navMenu = document.getElementById('nav-menu');
        if(navMenu) navMenu.classList.remove('active');
    }

    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('load', handleRoute);
}
