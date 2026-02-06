// ==================== CERTIFICATIONS CARROUSEL ====================
document.addEventListener('DOMContentLoaded', function() {
    // Données des certifications
    const certImages = [
        'images/coursera4.jpeg',
        'images/courseraTools.jpeg',
        'images/courseraML.jpeg',
        'images/WhatsApp Image 2026-01-05 at 21.22.54.jpeg',
        'images/cisco.jpeg'
    ];

    let currentSlide = 0;
    const totalSlides = certImages.length;

    // Éléments DOM
    const carouselTrack = document.getElementById('carouselTrack');
    const indicators = document.querySelectorAll('.indicator');
    const currentSlideEl = document.getElementById('currentSlide');
    const totalSlidesEl = document.getElementById('totalSlides');
    const modal = document.getElementById('certModal');
    const modalImage = document.getElementById('modalImage');
    const modalCurrentSlideEl = document.getElementById('modalCurrentSlide');
    const modalTotalSlidesEl = document.getElementById('modalTotalSlides');

    // Vérifier si les éléments existent
    if (!carouselTrack || !modal || !modalImage) {
        console.log('Éléments du carrousel non trouvés');
        return;
    }

    // Initialiser
    totalSlidesEl.textContent = totalSlides;
    modalTotalSlidesEl.textContent = totalSlides;
    updateCounter();

    // Changer de slide dans le carrousel
    window.changeSlide = function(direction) {
        currentSlide += direction;
        
        if (currentSlide >= totalSlides) {
            currentSlide = 0;
        } else if (currentSlide < 0) {
            currentSlide = totalSlides - 1;
        }
        
        updateCarousel();
    };

    // Aller à un slide spécifique
    window.goToSlide = function(index) {
        currentSlide = index;
        updateCarousel();
    };

    // Mettre à jour le carrousel
    function updateCarousel() {
        // Déplacer le track
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Mettre à jour les indicateurs
        if (indicators.length > 0) {
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }
        
        // Mettre à jour le compteur
        updateCounter();
    }

    // Mettre à jour le compteur
    function updateCounter() {
        currentSlideEl.textContent = currentSlide + 1;
        modalCurrentSlideEl.textContent = currentSlide + 1;
    }

    // ==================== MODAL FUNCTIONS ====================
    window.openModal = function(index) {
        currentSlide = index;
        modalImage.src = certImages[currentSlide];
        updateCounter();
        updateCarousel(); // Synchroniser avec le carrousel
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    window.changeModalSlide = function(direction) {
        currentSlide += direction;
        
        if (currentSlide >= totalSlides) {
            currentSlide = 0;
        } else if (currentSlide < 0) {
            currentSlide = totalSlides - 1;
        }
        
        // Animation de transition
        modalImage.style.opacity = '0';
        
        setTimeout(() => {
            modalImage.src = certImages[currentSlide];
            modalImage.style.opacity = '1';
            updateCounter();
            updateCarousel();
        }, 150);
    };

    // Fermer le modal avec ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
        
        // Navigation avec flèches clavier
        if (modal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                changeModalSlide(-1);
            } else if (e.key === 'ArrowRight') {
                changeModalSlide(1);
            }
        }
    });

    // Fermer en cliquant en dehors de l'image
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('close')) {
            closeModal();
        }
    });

    // Navigation par swipe sur mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (carouselTrack) {
        carouselTrack.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        carouselTrack.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe gauche -> slide suivant
                changeSlide(1);
            } else {
                // Swipe droite -> slide précédent
                changeSlide(-1);
            }
        }
    }
});