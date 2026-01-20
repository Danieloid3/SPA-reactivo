export function Footer() {
    const footer = document.createElement('footer');
    footer.style.backgroundColor = '#2c3e50';
    footer.style.color = 'white';
    footer.style.textAlign = 'center';
    footer.style.padding = '20px';
    footer.style.marginTop = 'auto'; // Para Sticky footer si se usa flex en body

    footer.innerHTML = `
        <p>&copy; ${new Date().getFullYear()} SPA Architecture. Hecho con Vanilla JS.</p>
    `;

    return footer;
}
