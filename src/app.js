import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { initRouter } from './router/router.js';
import { store } from './state/store.js'; // <--- Importante importar store

const app = document.getElementById('app');

// 1. Crear Layout Base (Navbar + Main + Footer)
const layoutFragment = document.createDocumentFragment();

// Agregar Navbar
layoutFragment.appendChild(Navbar());

// Agregar Main (donde el Router renderizará las vistas)
const mainContainer = document.createElement('main');
mainContainer.className = 'container';
// Le damos un min-height para que el footer no suba si no hay contenido
mainContainer.style.minHeight = '80vh';
layoutFragment.appendChild(mainContainer);

// Agregar Footer
layoutFragment.appendChild(Footer());

// Montar en el DOM
app.appendChild(layoutFragment);



// --- PERSISTENCIA AUTOMÁTICA ---
store.subscribe((state) => {
    // Tema
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('app_theme', state.theme);

    // Tareas (Guardamos el array convertido a texto)
    localStorage.setItem('app_todos', JSON.stringify(state.todos));
});

// ... inicialización ...

// --- INICIALIZACIÓN ---
// Aplicamos el tema guardado apenas carga la app
const initialState = store.getState();
document.documentElement.setAttribute('data-theme', initialState.theme);


// 2. Inicializar Router (pasándole el contenedor donde debe pintar)
initRouter(mainContainer);
