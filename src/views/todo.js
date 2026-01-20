import { TodoItem } from '../components/TodoItem.js';
import { store } from '../state/store.js'; // 1. Importar Store

export function TodoView() {
    const section = document.createElement('section');
    section.id = 'todo';
    section.className = 'section';

    section.innerHTML = `
        <h2 class="section-title">Lista de Tareas</h2>
        <div class="todo-wrapper">
            <div class="todo-input-group">
                <input type="text" id="todo-input" placeholder="Nueva tarea...">
                <button id="add-btn" class="btn btn-primary">+</button>
            </div>
            
            <!-- Filtros -->
            <div class="todo-filters">
                <button class="filter-btn active" data-filter="all">Todas</button>
                <button class="filter-btn" data-filter="pending">Pendientes</button>
                <button class="filter-btn" data-filter="completed">Completas</button>
            </div>

            <ul class="todo-list" id="todo-list"></ul>
            <div class="todo-footer">
                <span id="counter">0 items</span>
                <button id="clear-btn" class="clear-btn">Limpiar completadas</button>
            </div>
        </div>
    `;

    // --- ESTADO LOCAL (Solo UI) ---
    // El filtro sí es local, porque si salgo y vuelvo, no importa si se resetea a 'all'
    let currentFilter = 'all';

    // --- SELECTORES ---
    const listContainer = section.querySelector('#todo-list');
    const input = section.querySelector('#todo-input');
    const addBtn = section.querySelector('#add-btn');
    const clearBtn = section.querySelector('#clear-btn');
    const counter = section.querySelector('#counter');
    const filterBtns = section.querySelectorAll('.filter-btn');

    // --- RENDER ---
    const render = () => {
        listContainer.innerHTML = '';

        // 2. LEER DEL STORE
        const globalTodos = store.getState().todos;

        // Aplicar filtro
        const filteredTodos = globalTodos.filter(todo => {
            if (currentFilter === 'pending') return !todo.completed;
            if (currentFilter === 'completed') return todo.completed;
            return true;
        });

        filteredTodos.forEach(todo => {
            const itemElement = TodoItem({
                todo,
                onToggle: handleToggle,
                onDelete: handleDelete
            });
            listContainer.appendChild(itemElement);
        });

        // Contador de pendientes reales
        const pendingCount = globalTodos.filter(t => !t.completed).length;
        counter.textContent = `${pendingCount} pendientes`;
    };

    // --- ACCIONES (Modifican el Store) ---

    const handleAdd = () => {
        const text = input.value.trim();
        if (text) {
            // 1. Leer estado actual
            const currentTodos = store.getState().todos;
            // 2. Crear nuevo array con la tarea nueva
            const newTodos = [...currentTodos, { id: Date.now(), text, completed: false }];
            // 3. Guardar en el store
            store.setState({ todos: newTodos });

            input.value = '';
            input.focus();
            render();
        }
    };

    const handleToggle = (id) => {
        const currentTodos = store.getState().todos;
        const newTodos = currentTodos.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        );
        store.setState({ todos: newTodos });
        render();
    };

    const handleDelete = (id) => {
        const currentTodos = store.getState().todos;
        const newTodos = currentTodos.filter(t => t.id !== id);
        store.setState({ todos: newTodos });
        render();
    };

    const handleClearCompleted = () => {
        const currentTodos = store.getState().todos;
        const newTodos = currentTodos.filter(t => !t.completed);
        store.setState({ todos: newTodos });
        render();
    };

    // --- LISTENERS ---
    addBtn.addEventListener('click', handleAdd);
    input.addEventListener('keydown', (e) => { if(e.key === 'Enter') handleAdd() });
    clearBtn.addEventListener('click', handleClearCompleted);

    // Lógica de botones de filtro
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            render();
        });
    });

    // Render inicial
    render();

    return section;
}
