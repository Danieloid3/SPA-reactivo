export function AccordionView() {
    const section = document.createElement('section');
    section.id = 'accordion';
    section.className = 'section';

    section.innerHTML = `
        <h2 class="section-title">Preguntas Frecuentes</h2>
        <div class="accordion-container"></div>
    `;

    const data = [
        { q: "¿Qué es esta arquitectura?", a: "Es una SPA basada en componentes y rutas con Vanilla JS." },
        { q: "¿Dónde está el estado?", a: "Centralizado en src/state/store.js." },
        { q: "¿Es reactivo?", a: "Usamos observadores manuales para actualizar la UI cuando cambia el store." }
    ];

    const container = section.querySelector('.accordion-container');

    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'accordion-item';
        div.innerHTML = `
            <button class="accordion-header">
                ${item.q} <span class="icon">+</span>
            </button>
            <div class="accordion-content">
                <div class="accordion-body">${item.a}</div>
            </div>
        `;

        const header = div.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            content.classList.toggle('active');
            header.classList.toggle('active');
        });

        container.appendChild(div);
    });

    return section;
}
