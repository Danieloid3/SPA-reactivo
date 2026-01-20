export function TodoItem({ todo, onToggle, onDelete }) {
    // 1. Crear el elemento DOM
    const li = document.createElement('li');

    // 2. Aplicar clases condicionales
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

    // 3. Crear el HTML interno
    li.innerHTML = `
        <span class="todo-text">${todo.text}</span>
        <div class="todo-actions">
            <button class="action-btn check-btn" aria-label="Completar">
                ${todo.completed ? '↩' : '✓'}
            </button>
            <button class="action-btn delete-btn" aria-label="Eliminar">
                🗑️
            </button>
        </div>
    `;

    // 4. Agregar Event Listeners (La lógica del click)
    // Aquí no modificamos datos, solo "avisamos" al padre ejecutando la función que nos pasó

    const checkBtn = li.querySelector('.check-btn');
    checkBtn.addEventListener('click', () => {
        onToggle(todo.id); // "Papá, me hicieron click en completar"
    });

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        onDelete(todo.id); // "Papá, me hicieron click en eliminar"
    });

    return li;
}
