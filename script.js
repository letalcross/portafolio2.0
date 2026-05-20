document.addEventListener('DOMContentLoaded', () => {
    // ==================== CERRAR MENÚ HAMBURGUESA AL HACER CLIC ====================
    const menuCheckbox = document.getElementById('menu-toggle');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuCheckbox && menuCheckbox.checked) {
                menuCheckbox.checked = false;
            }
        });
    });
    
    // ==================== EFECTO FADE-UP EN TARJETAS DE TRABAJOS ====================
    const workCards = document.querySelectorAll('.work-card');
    
    const workObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                workObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    workCards.forEach(card => {
        workObserver.observe(card);
    });
    
    // ==================== ANIMACIÓN DE ENTRADA EN INFO (slide-in) ====================
    const timelineEntries = document.querySelectorAll('.timeline-entry');
    
    const infoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in');
                infoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    timelineEntries.forEach(entry => {
        infoObserver.observe(entry);
    });
    
    // ==================== CARRUSEL DE MÚSICA ====================
    const wrapper = document.querySelector('.carousel-wrapper');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const musicaLink = document.querySelector('a[href="#musica"]');
    
    if (wrapper && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const card = document.querySelector('.music-card');
            if (!card) return 300;
            const cardWidth = card.offsetWidth;
            const track = document.querySelector('.carousel-track');
            const gap = track ? parseInt(getComputedStyle(track).gap) || 32 : 32;
            return cardWidth + gap;
        };
        
        const scrollLeft = () => {
            wrapper.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        };
        
        const scrollRight = () => {
            wrapper.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        };
        
        prevBtn.addEventListener('click', scrollLeft);
        nextBtn.addEventListener('click', scrollRight);
        
        if (musicaLink) {
            musicaLink.addEventListener('click', (e) => {
                setTimeout(() => {
                    const track = document.querySelector('.carousel-track');
                    if (track && track.scrollWidth > wrapper.clientWidth) {
                        const centerScroll = (track.scrollWidth - wrapper.clientWidth) / 2;
                        wrapper.scrollTo({ left: centerScroll, behavior: 'smooth' });
                    } else {
                        wrapper.scrollTo({ left: 0, behavior: 'smooth' });
                    }
                }, 150);
            });
        }
        
        // Centrar al cargar
        setTimeout(() => {
            const track = document.querySelector('.carousel-track');
            if (track && track.scrollWidth > wrapper.clientWidth) {
                const centerScroll = (track.scrollWidth - wrapper.clientWidth) / 2;
                wrapper.scrollTo({ left: centerScroll, behavior: 'auto' });
            }
        }, 100);
    }
});