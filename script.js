document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.carousel-wrapper');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const musicaLink = document.querySelector('a[href="#musica"]');
    
    if (!wrapper || !prevBtn || !nextBtn) return;
    
    // Desplazamiento en píxeles por clic (ancho de tarjeta + gap)
    const getScrollAmount = () => {
        const card = document.querySelector('.music-card');
        if (!card) return 300;
        const cardWidth = card.offsetWidth;
        const gap = parseInt(getComputedStyle(document.querySelector('.carousel-track')).gap) || 32;
        return cardWidth + gap;
    };
    
    const scrollLeftSmooth = () => {
        const amount = getScrollAmount();
        wrapper.scrollBy({ left: -amount, behavior: 'smooth' });
    };
    
    const scrollRightSmooth = () => {
        const amount = getScrollAmount();
        wrapper.scrollBy({ left: amount, behavior: 'smooth' });
    };
    
    prevBtn.addEventListener('click', scrollLeftSmooth);
    nextBtn.addEventListener('click', scrollRightSmooth);
    
    // Al hacer clic en "Música", centramos el scroll horizontal después de un pequeño retraso
    if (musicaLink) {
        musicaLink.addEventListener('click', (e) => {
            setTimeout(() => {
                // Centrar el carrusel: desplazar hasta que el wrapper quede centrado respecto al track
                const track = document.querySelector('.carousel-track');
                if (!track) return;
                const wrapperWidth = wrapper.clientWidth;
                const trackWidth = track.scrollWidth;
                if (trackWidth > wrapperWidth) {
                    const centerScroll = (trackWidth - wrapperWidth) / 2;
                    wrapper.scrollTo({ left: centerScroll, behavior: 'smooth' });
                } else {
                    wrapper.scrollTo({ left: 0, behavior: 'smooth' });
                }
            }, 150); // tiempo para que el scroll vertical termine
        });
    }
    
    // Opcional: centrar también al cargar la página
    setTimeout(() => {
        const track = document.querySelector('.carousel-track');
        if (track && track.scrollWidth > wrapper.clientWidth) {
            const centerScroll = (track.scrollWidth - wrapper.clientWidth) / 2;
            wrapper.scrollTo({ left: centerScroll, behavior: 'auto' });
        }
    }, 100);
});