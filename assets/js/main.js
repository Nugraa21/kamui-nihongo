/**
 * KAMUI NIHONGO (神威日本語) — OFFICIAL WEBSITE
 * Interactive Features: Washi Aesthetics, Sakura Particles,
 * Gallery Switcher, Micro-Interactions, Scroll Reveals.
 * Author: Ludang Prasetyo Nugroho (nugra21)
 */

document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    initThemeCompareClicks();
    initScrollReveal();
    initHeaderScroll();
    initMobileNav();
    initSakuraParticles();
});

/* ====== 1. GALLERY TABS ====== */
const GALLERY_ITEMS = {
    exam: {
        title: 'Mode Ujian JLPT — Simulasi Resmi N5, N4, & N3',
        img: 'assets/images/screenshots/screenshot-1.png'
    },
    hardcore: {
        title: 'Mode Hardcore — Boss Battle Sudden Death (死線モード)',
        img: 'assets/images/screenshots/screenshot-2.png'
    },
    stroke: {
        title: 'Stroke Lab — 101 Aksara Panduan Kaligrafi Presisi',
        img: 'assets/images/screenshots/screenshot-3.png'
    },
    kamus: {
        title: 'Kamus Komprehensif — 506+ Kosakata & Audio Pelafalan',
        img: 'assets/images/screenshots/screenshot-4.png'
    },
    tema: {
        title: 'Koleksi 13 Tema — Light & Dark Glass Palette',
        img: 'assets/images/screenshots/screenshot-5.png'
    },
    games: {
        title: 'Mini Game Edukasi — Kotoba Arena & Memory Match',
        img: 'assets/images/screenshots/screenshot-6.png'
    }
};

function initGallery() {
    const tabs = document.querySelectorAll('.gallery-tab');
    const imgEl = document.getElementById('galleryImg');
    const titleEl = document.getElementById('galleryTitle');

    if (!tabs.length || !imgEl || !titleEl) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const tabKey = tab.dataset.tab;
            const data = GALLERY_ITEMS[tabKey];
            if (data) {
                imgEl.style.opacity = '0.3';
                setTimeout(() => {
                    imgEl.src = data.img;
                    imgEl.alt = data.title;
                    titleEl.textContent = data.title;
                    imgEl.style.opacity = '1';
                }, 160);
            }
        });
    });
}

/* ====== 2. THEME COMPARISON THUMBNAIL CLICK ====== */
function initThemeCompareClicks() {
    const thumbs = document.querySelectorAll('.compare-imgs img');
    const imgEl = document.getElementById('galleryImg');
    const titleEl = document.getElementById('galleryTitle');

    if (!thumbs.length || !imgEl || !titleEl) return;

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            imgEl.style.opacity = '0.3';
            setTimeout(() => {
                imgEl.src = thumb.src;
                imgEl.alt = thumb.alt;
                titleEl.textContent = `Pratinjau Tema: ${thumb.alt}`;
                imgEl.style.opacity = '1';
            }, 160);

            // Scroll gently into gallery view
            const gallerySection = document.getElementById('pratinjau');
            if (gallerySection) {
                gallerySection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
}

/* ====== 3. SCROLL REVEAL (IntersectionObserver) ====== */
function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
}

/* ====== 4. HEADER STICKY SCROLL EFFECT ====== */
function initHeaderScroll() {
    const header = document.getElementById('siteHeader');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
}

/* ====== 5. MOBILE NAVIGATION TOGGLE ====== */
function initMobileNav() {
    const btn = document.getElementById('navHamburger');
    const menu = document.getElementById('navMenu');

    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking link
    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ====== 6. SAKURA PETALS GENERATION ====== */
function initSakuraParticles() {
    const container = document.getElementById('sakuraContainer');
    if (!container) return;

    const PETAL_COUNT = 15;
    for (let i = 0; i < PETAL_COUNT; i++) {
        createPetal(container);
    }
}

function createPetal(container) {
    const petal = document.createElement('div');
    petal.className = 'sakura-petal';

    const size = Math.random() * 8 + 8; // 8px to 16px
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.3}px`;
    petal.style.left = `${Math.random() * 100}vw`;

    const duration = Math.random() * 7 + 8; // 8s to 15s
    const delay = Math.random() * 10;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;

    container.appendChild(petal);
}
