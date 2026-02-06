// ==================== NAVIGATION DYNAMIQUE ====================
document.addEventListener('DOMContentLoaded', function() {
    
    // Gestion du menu actif selon la section visible
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar ul li');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(li => {
            li.classList.remove('active');
            const link = li.querySelector('a');
            if (link && link.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });
    
    // Smooth scroll pour les liens de navigation
    document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ==================== NAVBAR TRANSPARENCE ====================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(31, 36, 45, 0.98)';
                navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(31, 36, 45, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    // ==================== MENU MOBILE ====================
    const createMobileMenu = () => {
        const nav = document.querySelector('.navbar');
        if (!nav) return;
        
        const ul = nav.querySelector('ul');
        if (!ul) return;
        
        // Créer le bouton hamburger
        const menuBtn = document.createElement('div');
        menuBtn.className = 'menu-toggle';
        menuBtn.innerHTML = '<i class="bx bx-menu"></i>';
        nav.appendChild(menuBtn);
        
        // CSS pour le menu mobile
        const mobileStyle = document.createElement('style');
        mobileStyle.textContent = `
            @media (max-width: 768px) {
                .menu-toggle {
                    display: block !important;
                    cursor: pointer;
                    font-size: 28px;
                    color: #7cf03d;
                    z-index: 101;
                }
                
                .navbar ul {
                    position: fixed;
                    top: 0;
                    right: -100%;
                    width: 70%;
                    height: 100vh;
                    background: #1f242d;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    transition: right 0.3s ease;
                    padding: 80px 20px;
                    gap: 30px;
                    box-shadow: -5px 0 15px rgba(0,0,0,0.3);
                }
                
                .navbar ul.active {
                    right: 0;
                }
                
                .navbar ul li a {
                    font-size: 18px;
                    padding: 10px 20px;
                    display: block;
                    width: 100%;
                    text-align: center;
                }
            }
            
            @media (min-width: 769px) {
                .menu-toggle {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(mobileStyle);
        
        // Toggle menu
        menuBtn.addEventListener('click', () => {
            ul.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (ul.classList.contains('active')) {
                icon.className = 'bx bx-x';
            } else {
                icon.className = 'bx bx-menu';
            }
        });
        
        // Fermer le menu au clic sur un lien
        document.querySelectorAll('.navbar ul li a').forEach(link => {
            link.addEventListener('click', () => {
                ul.classList.remove('active');
                menuBtn.querySelector('i').className = 'bx bx-menu';
            });
        });
    };
    
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
    
    // ==================== EFFET DE TYPING ====================
    // const spans = document.querySelectorAll('.home-info h2 span');
    const roles = ['Data engineer/ML'];
    
    if (spans.length > 0) {
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseTime = 2000;
        
        // Désactiver l'animation CSS
        spans.forEach((span, index) => {
            if (index > 0) span.style.display = 'none';
        });
        
        function typeEffect() {
            const currentRole = roles[roleIndex];
            const displaySpan = spans[0];
            
            if (!displaySpan) return;
            
            if (isDeleting) {
                displaySpan.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                displaySpan.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }
            
            displaySpan.style.display = 'inline-block';
            displaySpan.style.color = '#7cf03d';
            displaySpan.style.webkitTextStroke = '0';
            
            let timeout = isDeleting ? deletingSpeed : typingSpeed;
            
            if (!isDeleting && charIndex === currentRole.length) {
                timeout = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
            
            setTimeout(typeEffect, timeout);
        }
        
        setTimeout(typeEffect, 1000);
    }
    
    // ==================== ANIMATION AU SCROLL ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Appliquer l'animation aux éléments
    const animatedElements = document.querySelectorAll(
        '.education .container > div, .skill-card, #projects .rounded-lg'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
    
    // ==================== COMPTEUR DE PROJETS ====================
    const projectSection = document.querySelector('#projects .max-w-7xl');
    if (projectSection) {
        const projectCards = document.querySelectorAll('#projects .rounded-lg');
        const projectCount = document.createElement('p');
        projectCount.className = 'project-count';
        projectCount.style.cssText = 'text-align: center; color: #7cf03d; font-size: 18px; margin-top: 40px;';
        projectCount.textContent = `Total: ${projectCards.length} projet${projectCards.length > 1 ? 's' : ''} réalisé${projectCards.length > 1 ? 's' : ''}`;
        projectSection.appendChild(projectCount);
    }
    
    // ==================== FILTRE DE PROJETS ====================
    const createProjectFilters = () => {
        const projectSection = document.querySelector('#projects .max-w-7xl');
        if (!projectSection) return;
        
        const title = projectSection.querySelector('h1');
        if (!title) return;
        
        const filterContainer = document.createElement('div');
        filterContainer.className = 'project-filters';
        filterContainer.style.cssText = 'display: flex; justify-content: center; gap: 15px; margin-bottom: 40px; flex-wrap: wrap;';
        
        const filters = ['Tous', 'Database', 'Web', 'Data Analysis'];
        
        filters.forEach((filter, index) => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.textContent = filter;
            btn.style.cssText = `
                padding: 10px 25px;
                background: ${index === 0 ? '#7cf03d' : 'transparent'};
                color: ${index === 0 ? '#1f242d' : '#7cf03d'};
                border: 2px solid #7cf03d;
                border-radius: 25px;
                cursor: pointer;
                transition: 0.3s;
                font-weight: 600;
            `;
            
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => {
                    b.style.background = 'transparent';
                    b.style.color = '#7cf03d';
                });
                
                btn.style.background = '#7cf03d';
                btn.style.color = '#1f242d';
                
                filterProjects(filter);
            });
            
            btn.addEventListener('mouseenter', () => {
                if (btn.style.background !== 'rgb(124, 240, 61)') {
                    btn.style.background = 'rgba(124, 240, 61, 0.1)';
                }
            });
            
            btn.addEventListener('mouseleave', () => {
                if (btn.style.background !== 'rgb(124, 240, 61)') {
                    btn.style.background = 'transparent';
                }
            });
            
            filterContainer.appendChild(btn);
        });
        
        title.after(filterContainer);
    };
    
    function filterProjects(category) {
        const projects = document.querySelectorAll('#projects .rounded-lg');
        
        projects.forEach(project => {
            const titleEl = project.querySelector('h5');
            if (!titleEl) return;
            
            const title = titleEl.textContent.toLowerCase();
            let show = false;
            
            if (category === 'Tous') {
                show = true;
            } else if (category === 'Database' && title.includes('base de données')) {
                show = true;
            } else if (category === 'Web' && title.includes('e-commerce')) {
                show = true;
            } else if (category === 'Data Analysis' && title.includes('analyse')) {
                show = true;
            }
            
            if (show) {
                project.style.display = 'block';
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'translateY(0)';
                }, 10);
            } else {
                project.style.opacity = '0';
                project.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            }
        });
    }
    
    if (document.querySelector('#projects')) {
        createProjectFilters();
    }
    
    // ==================== ANIMATION DES SKILLS ====================
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.1) rotate(5deg)';
            card.style.boxShadow = '0 10px 30px rgba(124, 240, 61, 0.4)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 5px 15px rgba(124, 240, 61, 0.2)';
        });
    });
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.skill-card');
                cards.forEach(card => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                });
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('.skills-group').forEach(group => {
        skillObserver.observe(group);
    });
    
    // ==================== BOUTON SCROLL TO TOP ====================
    const createScrollTopButton = () => {
        const btn = document.createElement('button');
        btn.className = 'scroll-top';
        btn.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
        btn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: #7cf03d;
            color: #1f242d;
            border: none;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 999;
            transition: 0.3s;
            box-shadow: 0 5px 20px rgba(124, 240, 61, 0.4);
        `;
        
        document.body.appendChild(btn);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                btn.style.display = 'flex';
            } else {
                btn.style.display = 'none';
            }
        });
        
        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.1)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
        });
    };
    
    createScrollTopButton();
    
    // ==================== EFFET PARALLAXE ====================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const homeImg = document.querySelector('.home-img');
        if (homeImg) {
            homeImg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    console.log('🚀 Portfolio interactif chargé avec succès !');
});