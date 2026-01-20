export function GalleryView() {
    const section = document.createElement('section');
    section.id = 'gallery';
    section.className = 'section';

    section.innerHTML = `
        <h2 class="section-title">Galería Interactiva</h2>
        <div class="carousel">
            <button class="carousel-btn btn-prev" aria-label="Anterior">&#10094;</button>
            
            <div class="carousel-track-container">
                <!-- Agregamos cursor pointer para indicar que es clickeable -->
                <ul class="carousel-track" style="cursor: pointer;" title="Click para Pausar/Reanudar">
                    <li class="carousel-slide current-slide">
                        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Montañas">
                        <div class="caption">Montañas Nevadas</div>
                    </li>
                    <li class="carousel-slide">
                        <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Valle">
                        <div class="caption">Atardecer en el Valle</div>
                    </li>
                    <li class="carousel-slide">
                        <img src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Bosque">
                        <div class="caption">Bosque Místico</div>
                    </li>
                </ul>
            </div>

            <button class="carousel-btn btn-next" aria-label="Siguiente">&#10095;</button>
        </div>

        <div class="carousel-nav">
            <button class="carousel-indicator current-slide" data-index="0"></button>
            <button class="carousel-indicator" data-index="1"></button>
            <button class="carousel-indicator" data-index="2"></button>
        </div>
    `;

    // --- VARIABLES Y SELECTORES ---
    const track = section.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextBtn = section.querySelector('.btn-next');
    const prevBtn = section.querySelector('.btn-prev');
    const dotsNav = section.querySelector('.carousel-nav');
    const dots = Array.from(dotsNav.children);

    let intervalId;
    let isPlaying = true; // ⏯️ Estado para saber si se mueve solo

    // --- FUNCIONES CORE ---
    const updateDots = (targetIndex) => {
        const currentDot = dotsNav.querySelector('.current-slide');
        if(currentDot) currentDot.classList.remove('current-slide');
        dots[targetIndex].classList.add('current-slide');
    };

    const moveToSlide = (currentSlide, targetSlide) => {
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    const handleNext = () => {
        const currentSlide = track.querySelector('.current-slide');
        let nextSlide = currentSlide.nextElementSibling;
        let targetIndex = slides.indexOf(nextSlide);

        if (!nextSlide) {
            nextSlide = slides[0];
            targetIndex = 0;
        }

        moveToSlide(currentSlide, nextSlide);
        updateDots(targetIndex);
    };

    const handlePrev = () => {
        const currentSlide = track.querySelector('.current-slide');
        let prevSlide = currentSlide.previousElementSibling;
        let targetIndex = slides.indexOf(prevSlide);

        if (!prevSlide) {
            prevSlide = slides[slides.length - 1];
            targetIndex = slides.length - 1;
        }

        moveToSlide(currentSlide, prevSlide);
        updateDots(targetIndex);
    };

    // --- LÓGICA DE TIEMPO (UPDATED) ---

    const startAutoplay = () => {
        if (intervalId) return; // Si ya corre, no hacer nada
        intervalId = setInterval(handleNext, 3000);
        isPlaying = true;
        // Feedback visual (Opcional: cambias la opacidad o cursor)
        track.style.opacity = "1";
    };

    const stopAutoplay = () => {
        clearInterval(intervalId);
        intervalId = null; // Limpiamos la variable
        isPlaying = false;
        // Feedback visual para que el usuario sepa que está pausado
        track.style.opacity = "0.8";
    };

    // Esta función se usa cuando tocas botones (Next/Prev)
    // Fuerza a reiniciar el timer si estaba pausado
    const resetAutoplay = () => {
        stopAutoplay();
        startAutoplay();
    };

    // --- EVENT LISTENERS ---

    nextBtn.addEventListener('click', () => {
        handleNext();
        resetAutoplay();
    });

    prevBtn.addEventListener('click', () => {
        handlePrev();
        resetAutoplay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const currentSlide = track.querySelector('.current-slide');
            const targetSlide = slides[index];
            moveToSlide(currentSlide, targetSlide);
            updateDots(index);
            resetAutoplay();
        });
    });

    // ⏯️ LÓGICA NUEVA: PAUSA AL CLICK EN IMAGEN
    track.addEventListener('click', () => {
        if (isPlaying) {
            stopAutoplay();
            console.log("⏸️ Carrusel Pausado");
        } else {
            startAutoplay();
            console.log("▶️ Carrusel Reanudado");
        }
    });

    // Iniciar al cargar
    startAutoplay();

    // Limpieza para el Router (evita errores al cambiar de página)
    section.cleanup = () => {
        stopAutoplay();
    };

    return section;
}
