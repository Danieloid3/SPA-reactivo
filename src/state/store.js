const createStore = (initialState) => {
    let state = initialState;
    const listeners = new Set();

    return {
        getState: () => state,
        setState: (newState) => {
            state = { ...state, ...newState };
            listeners.forEach(listener => listener(state));
        },
        subscribe: (listener) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        }
    };
};

// --- PERSISTENCIA ---
const savedTheme = localStorage.getItem('app_theme') || 'light';

// Intentamos leer tareas guardadas, si no hay, array vacío
const savedTodos = JSON.parse(localStorage.getItem('app_todos')) || [
    { id: 1, text: 'Tarea de ejemplo (Store)', completed: false }
];

export const store = createStore({
    user: null,
    theme: savedTheme,
    todos: savedTodos, // <--- ¡AQUÍ ESTÁN TUS TAREAS GLOBALES!
    cart: []
});
