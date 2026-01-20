export function CardsView() {
    const section = document.createElement('section');
    section.id = 'cards';
    section.className = 'section';

    // 1. Datos simulados (para rellenar el modal dinámicamente)
    // Esto simula una base de datos o respuesta de API
    const cardsData = [
        {
            id: 1,
            title: "Desarrollo Web",
            tag: "Frontend",
            img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            description: "Aprende a construir interfaces modernas y responsivas con HTML, CSS y JavaScript moderno. Incluye React, Vue y Angular.",
            details: "Duración: 4 meses | Nivel: Intermedio | Proyectos: 5"
        },
        {
            id: 2,
            title: "UX/UI Design",
            tag: "Diseño",
            img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            description: "Diseña experiencias de usuario que cautiven. Aprende Figma, prototipado y teoría del color aplicada a interfaces digitales.",
            details: "Duración: 3 meses | Nivel: Principiante | Herramientas: Figma"
        },
        {
            id: 3,
            title: "Arquitectura Backend",
            tag: "Backend",
            img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            description: "Domina la lógica del servidor. Node.js, Python, bases de datos SQL y NoSQL, y despliegue en la nube con AWS.",
            details: "Duración: 6 meses | Nivel: Avanzado | Bases de datos: Mongo & Postgres"
        }
    ];

    // 2. Generar el HTML de las tarjetas usando .map()
    // Es más limpio que repetir el bloque HTML tres veces
    const cardsHTML = cardsData.map(card => `
        <article class="card">
            <div class="card-header">
                <img src="${card.img}" class="card-img" alt="${card.title}">
            </div>
            <div class="card-body">
                <span class="tag tag-${card.tag === 'Frontend' ? 'blue' : card.tag === 'Diseño' ? 'purple' : 'green'}">${card.tag}</span>
                <h3>${card.title}</h3>
                <p>${card.description.substring(0, 60)}...</p>
                <!-- IMPORTANTE: data-id para saber cuál abrir -->
                <button class="btn btn-primary open-modal-btn" data-id="${card.id}">Ver detalle</button>
            </div>
        </article>
    `).join('');

    // 3. Estructura completa incluyendo el MODAL oculto
    section.innerHTML = `
        <h2 class="section-title">Nuestras Tarjetas</h2>
        <div class="cards-grid">
            ${cardsHTML}
        </div>

        <!-- ESTRUCTURA DEL MODAL -->
        <div id="card-modal" class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-header">
                    <img id="modal-img" src="" alt="">
                </div>
                <div class="modal-body">
                    <span id="modal-tag" class="tag"></span>
                    <h3 id="modal-title"></h3>
                    <p id="modal-desc"></p>
                    <hr style="margin: 15px 0; border: 0; border-top: 1px solid #eee;">
                    <small id="modal-details" style="color: #666; font-weight: bold;"></small>
                </div>
            </div>
        </div>
    `;

    // 4. Lógica del Modal
    const modal = section.querySelector('#card-modal');
    const closeBtn = section.querySelector('.modal-close');
    const btns = section.querySelectorAll('.open-modal-btn');

    // Elementos internos del modal para rellenar
    const mImg = section.querySelector('#modal-img');
    const mTag = section.querySelector('#modal-tag');
    const mTitle = section.querySelector('#modal-title');
    const mDesc = section.querySelector('#modal-desc');
    const mDetails = section.querySelector('#modal-details');

    // Función para abrir
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            const data = cardsData.find(c => c.id === id);

            if (data) {
                // Rellenar datos
                mImg.src = data.img;
                mTag.textContent = data.tag;

                // Color dinámico del tag (opcional, truco visual)
                mTag.className = 'tag'; // Reset
                if(data.tag === 'Frontend') mTag.classList.add('tag-blue');
                if(data.tag === 'Diseño') mTag.classList.add('tag-purple');
                if(data.tag === 'Backend') mTag.classList.add('tag-green');

                mTitle.textContent = data.title;
                mDesc.textContent = data.description;
                mDetails.textContent = data.details;

                // Mostrar modal
                modal.classList.add('active');
            }
        });
    });

    // Función para cerrar (Botón X)
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Cerrar al hacer click fuera del contenido (en el overlay oscuro)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    return section;
}
