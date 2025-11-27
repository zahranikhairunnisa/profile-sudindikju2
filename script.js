document.addEventListener('DOMContentLoaded', () => {
    // Inject Components
    const components = [
        { id: 'header-root', content: HeaderComponent },
        { id: 'hero-root', content: HeroComponent },
        { id: 'profile-root', content: ProfileComponent },
        { id: 'vision-root', content: VisionMissionComponent },
        { id: 'gallery-root', content: GalleryComponent },
        { id: 'news-root', content: NewsComponent },
        { id: 'footer-root', content: FooterComponent }
    ];

    components.forEach(component => {
        const root = document.getElementById(component.id);
        if (root) {
            root.innerHTML = component.content;
        }
    });

    // Initialize App Logic (after components are rendered)
    initializeApp();
});

function initializeApp() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Animate Links
            links.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            menuToggle.classList.toggle('toggle');
        });
    }

    // Close mobile menu when clicking a link
    if (links) {
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('toggle');
            });
        });
    }

    // Scroll Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Sticky Header Effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
                header.style.padding = '0';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            }
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Hero Slider Logic
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // Change slide every 5 seconds

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }
}
