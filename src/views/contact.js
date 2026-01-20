import { store } from '../state/store.js';

export function ContactView() {
    const section = document.createElement('section');
    section.id = 'contact';
    section.className = 'section';

    section.innerHTML = `
        <h2 class="section-title">Contacto</h2>
        <div class="form-wrapper">
            <form id="contact-form">
                <div class="form-group">
                    <label>Nombre</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="email" required>
                </div>
                <button type="submit" class="btn btn-block">Enviar</button>
            </form>
            <div id="last-user" style="margin-top:20px; text-align:center; color: #777;">
                <!-- Aquí mostraremos datos del store -->
            </div>
        </div>
    `;

    const form = section.querySelector('#contact-form');
    const lastUserDiv = section.querySelector('#last-user');

    // 1. Mostrar estado actual al cargar la vista
    const currentState = store.getState();
    if (currentState.user) {
        lastUserDiv.innerHTML = `Último usuario contactado: <b>${currentState.user.name}</b>`;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = section.querySelector('#name').value;
        const email = section.querySelector('#email').value;

        // 2. Despachar acción al store
        store.setState({
            user: { name, email }
        });

        alert(`Gracias ${name}, guardado en el State Global.`);
        form.reset();

        // Actualizamos la UI inmediatamente (o podríamos suscribirnos)
        lastUserDiv.innerHTML = `Último usuario contactado: <b>${name}</b>`;
    });

    return section;
}
