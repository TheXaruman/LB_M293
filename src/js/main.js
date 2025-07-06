/**
 * NER0 Website - Main JavaScript
 * Autor: Alwin Litscher
 */

// DOM-Elemente laden, wenn das Dokument bereit ist
document.addEventListener('DOMContentLoaded', function() {
    // Animation für Elemente beim Scrollen
    initScrollAnimations();
    
    // FAQ-Funktionalität
    initFAQ();
    
    // Farbauswahl auf der Produktseite
    initColorSelection();
    
    // Mobile Navigation
    initMobileNav();
    
    // WebGL-Initialisierung
    initWebGL();
});

/**
 * Initialisiert Scroll-Animationen für Elemente
 */
function initScrollAnimations() {
    // Alle Elemente, die animiert werden sollen
    const animatedElements = document.querySelectorAll('.feature-card, .feature-detail, .tech-detail, .design-detail, .product-image');
    
    // Intersection Observer für Scroll-Animationen
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Beobachte alle animierten Elemente
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Initialisiert die FAQ-Funktionalität
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Toggle aktiven Zustand
                const isActive = item.classList.contains('active');
                
                // Schließe alle anderen FAQ-Items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Öffne das aktuelle Item, wenn es nicht bereits geöffnet war
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

/**
 * Initialisiert die Farbauswahl auf der Produktseite
 */
function initColorSelection() {
    const colorOptions = document.querySelectorAll('.color-option');
    
    if (colorOptions.length > 0) {
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Entferne aktiven Status von allen Optionen
                colorOptions.forEach(opt => {
                    opt.classList.remove('active');
                });
                
                // Setze aktiven Status für die ausgewählte Option
                option.classList.add('active');
                
                // Hier könnte man das 3D-Modell aktualisieren
                const color = option.getAttribute('data-color');
                updateProductModel(color);
            });
        });
    }
}

/**
 * Aktualisiert das 3D-Modell basierend auf der ausgewählten Farbe
 */
function updateProductModel(color) {
    // Diese Funktion wird aufgerufen, wenn der Benutzer eine andere Farbe auswählt
    if (window.productModel) {
        // Farben für die verschiedenen Optionen
        const colors = {
            'graphite': 0x333333,
            'silver': 0xD9D9D9,
            'gold': 0xCFBB8E
        };
        
        // Aktualisiere die Farbe des Modells
        if (window.productModel.material) {
            window.productModel.material.color.setHex(colors[color] || colors['graphite']);
        }
    }
}

/**
 * Initialisiert die mobile Navigation
 */
function initMobileNav() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }
}

/**
 * Initialisiert WebGL für 3D-Modelle
 */
function initWebGL() {
    // Prüfe, ob Three.js verfügbar ist
    if (typeof THREE === 'undefined') {
        console.error('Three.js ist nicht geladen!');
        return;
    }
    
    // Initialisiere WebGL für verschiedene Seiten und Container
    initHomePageWebGL();
    initProductWebGL();
    initDesignWebGL();
    initFeaturesWebGL();
    initTechnikWebGL();
    
    // Intro WebGL Container auf der Startseite
    initIntroWebGL();
}

/**
 * Initialisiert WebGL für die Startseite
 */
function initHomePageWebGL() {
    const container = document.getElementById('webgl-container');
    
    if (!container) return;
    
    // Szene, Kamera und Renderer erstellen
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfdf6e4);
    
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Licht hinzufügen
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);
    
    // Einfaches NER0-Modell erstellen (Platzhalter)
    const geometry = new THREE.BoxGeometry(2, 3, 0.2);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x333333,
        roughness: 0.5,
        metalness: 0.8
    });
    
    const nero = new THREE.Mesh(geometry, material);
    scene.add(nero);
    
    // Bildschirm des Geräts hinzufügen
    const screenGeometry = new THREE.PlaneGeometry(1.8, 2.5);
    const screenMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xfbfcf8,
        side: THREE.DoubleSide
    });
    
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.11;
    nero.add(screen);
    
    // Pixel-Haustier (einfache Animation)
    const pixelPetGeometry = new THREE.PlaneGeometry(1, 1);
    const pixelPetMaterial = new THREE.MeshBasicMaterial({
        color: 0xff9913,
        transparent: true,
        opacity: 0.8
    });
    
    const pixelPet = new THREE.Mesh(pixelPetGeometry, pixelPetMaterial);
    pixelPet.scale.set(0.3, 0.3, 0.3);
    pixelPet.position.set(0, 0, 0.12);
    screen.add(pixelPet);
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        // Gerät leicht rotieren
        nero.rotation.y = Math.sin(Date.now() * 0.001) * 0.3;
        nero.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1;
        
        // Pixel-Haustier animieren
        pixelPet.position.y = Math.sin(Date.now() * 0.002) * 0.2;
        pixelPet.scale.x = 0.3 + Math.sin(Date.now() * 0.003) * 0.03;
        pixelPet.scale.y = 0.3 + Math.sin(Date.now() * 0.003) * 0.03;
        
        renderer.render(scene, camera);
    }
    
    // Responsives Verhalten
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    animate();
}

/**
 * Initialisiert WebGL für die Produktseite
 */
function initProductWebGL() {
    const container = document.getElementById('product-webgl-container');
    
    if (!container) return;
    
    // Szene, Kamera und Renderer erstellen
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfdf6e4);
    
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Licht hinzufügen
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);
    
    // Detaillierteres NER0-Modell erstellen
    const geometry = new THREE.BoxGeometry(2, 3, 0.2);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x333333,
        roughness: 0.5,
        metalness: 0.8
    });
    
    const nero = new THREE.Mesh(geometry, material);
    scene.add(nero);
    window.productModel = nero; // Für Farbwechsel speichern
    
    // Bildschirm des Geräts hinzufügen
    const screenGeometry = new THREE.PlaneGeometry(1.8, 2.5);
    const screenMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xfbfcf8,
        side: THREE.DoubleSide
    });
    
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.11;
    nero.add(screen);
    
    // Buttons hinzufügen
    const buttonGeometry = new THREE.CircleGeometry(0.1, 32);
    const buttonMaterial = new THREE.MeshStandardMaterial({ color: 0x999999 });
    
    const button1 = new THREE.Mesh(buttonGeometry, buttonMaterial);
    button1.position.set(0.8, 1.3, 0.11);
    nero.add(button1);
    
    const button2 = new THREE.Mesh(buttonGeometry, buttonMaterial);
    button2.position.set(0.8, 1.0, 0.11);
    nero.add(button2);
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        // Gerät rotieren
        nero.rotation.y += 0.005;
        
        renderer.render(scene, camera);
    }
    
    // Responsives Verhalten
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    animate();
}

/**
 * Initialisiert WebGL für die Design-Seite
 */
function initDesignWebGL() {
    const container = document.getElementById('design-webgl-container');
    
    if (!container) return;
    
    // Szene, Kamera und Renderer erstellen
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfdf6e4);
    
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Licht hinzufügen
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);
    
    // Pixel-Haustier erstellen (einfache Animation mit Würfeln)
    const pixelSize = 0.2;
    const pixelGap = 0.02;
    const pixelGrid = [
        [0,1,0,1,0],
        [1,1,1,1,1],
        [1,1,1,1,1],
        [0,1,1,1,0],
        [0,0,1,0,0]
    ];
    
    const pixelGeometry = new THREE.BoxGeometry(pixelSize, pixelSize, pixelSize);
    const pixelMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xff9913,
        roughness: 0.3,
        metalness: 0.2
    });
    
    const pixelPet = new THREE.Group();
    
    // Pixel-Grid erstellen
    for (let y = 0; y < pixelGrid.length; y++) {
        for (let x = 0; x < pixelGrid[y].length; x++) {
            if (pixelGrid[y][x] === 1) {
                const pixel = new THREE.Mesh(pixelGeometry, pixelMaterial);
                pixel.position.set(
                    (x - pixelGrid[y].length / 2) * (pixelSize + pixelGap),
                    (pixelGrid.length / 2 - y) * (pixelSize + pixelGap),
                    0
                );
                pixelPet.add(pixel);
            }
        }
    }
    
    scene.add(pixelPet);
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        // Pixel-Haustier animieren
        pixelPet.rotation.y = Math.sin(Date.now() * 0.001) * 0.5;
        pixelPet.position.y = Math.sin(Date.now() * 0.002) * 0.2;
        
        // Einzelne Pixel animieren
        pixelPet.children.forEach((pixel, index) => {
            pixel.position.z = Math.sin(Date.now() * 0.003 + index * 0.2) * 0.1;
        });
        
        renderer.render(scene, camera);
    }
    
    // Responsives Verhalten
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    animate();
}
