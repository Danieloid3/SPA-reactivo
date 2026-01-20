import { store } from '../state/store.js';

export function Navbar() {
    const header = document.createElement('header');
    header.className = 'main-header';

    header.innerHTML = `
        <nav class="navbar">
            <div class="logo">SPA Pro</div>
            
            <div class="nav-controls">
                <!-- Botón de Tema (Dentro de un contenedor para mejor alineación) -->
                <button id="theme-toggle" class="theme-btn" aria-label="Cambiar tema">
                    🌙
                </button>

                <!-- Botón Hamburguesa -->
                <button class="hamburger-btn" id="nav-toggle" aria-label="Abrir menú">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </button>
            </div>

            <!-- Menú de navegación COMPLETO -->
            <ul class="nav-menu" id="nav-menu">
                <li class="nav-item"><a href="#cards" class="nav-link">Tarjetas</a></li>
                <li class="nav-item"><a href="#accordion" class="nav-link">Acordeón</a></li>
                <li class="nav-item"><a href="#gallery" class="nav-link">Galería</a></li>
                <li class="nav-item"><a href="#todo" class="nav-link">Tareas</a></li>
                <li class="nav-item"><a href="#contact" class="nav-link">Contacto</a></li>
            </ul>
        </nav>
    `;

    // --- LÓGICA DEL TEMA ---
    const themeBtn = header.querySelector('#theme-toggle');

    const updateIcon = () => {
        const currentTheme = store.getState().theme;
        // Si es light mostramos luna (para ir a dark), si es dark mostramos sol
        themeBtn.textContent = currentTheme === 'light' ? '🌙' : '🌞';
    };

    themeBtn.addEventListener('click', () => {
        const currentTheme = store.getState().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        store.setState({ theme: newTheme });
    });

    store.subscribe(updateIcon);
    updateIcon(); // Inicializar icono correcto

    // --- LÓGICA DEL MENÚ ---
    const toggleBtn = header.querySelector('#nav-toggle');
    const navMenu = header.querySelector('#nav-menu');

    toggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un link (UX móvil)
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    return header;
}
