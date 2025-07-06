/**
 * NER0 Website - WebGL Components
 * Autor: Alwin Litscher
 */

// Initialisiert alle WebGL-Container auf der Seite
function initAllWebGLContainers() {
    // Prüfe, ob Three.js verfügbar ist
    if (typeof THREE === 'undefined') {
        console.error('Three.js ist nicht geladen!');
        return;
    }
    
    // Intro WebGL Container auf der Startseite
    initIntroWebGL();
    
    // Feature WebGL Container
    initFeatureWebGLContainers();
    
    // Technik WebGL Container
    initTechnikWebGLContainers();
    
    // Design WebGL Container
    initDesignWebGLContainers();
    
    // Produkt WebGL Container
    initProductWebGLContainers();
}

/**
 * Initialisiert den Intro-Container auf der Startseite mit verbesserter Visualisierung
 */
function initIntroWebGL() {
    const container = document.getElementById('intro-webgl-container');
    
    if (!container) return;
    
    // Szene, Kamera und Renderer erstellen
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfdf6e4);
    
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    
    // Verbesserte Beleuchtung
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);
    
    // Verbessertes NER0-Gerät mit mehr Details erstellen
    const deviceGroup = new THREE.Group();
    
    // Hauptkörper des Geräts mit abgerundeten Kanten
    const bodyGeometry = new THREE.BoxGeometry(3, 2, 0.2);
    const bodyMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0x333333,
        roughness: 0.3,
        metalness: 0.7,
        clearcoat: 0.5,
        clearcoatRoughness: 0.1
    });
    
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    deviceGroup.add(body);
    
    // Display mit Glaseffekt
    const displayGeometry = new THREE.PlaneGeometry(2.5, 1.5);
    const displayMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0xfbfcf8,
        roughness: 0.1,
        metalness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 0.5,
        side: THREE.DoubleSide
    });
    
    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.position.z = 0.11;
    display.receiveShadow = true;
    deviceGroup.add(display);
    
    // Buttons hinzufügen
    const buttonCount = 3;
    const buttonPositions = [
        { x: 0.9, y: 0.7, z: 0.11, size: 0.1 },
        { x: 0.9, y: 0.4, z: 0.11, size: 0.1 },
        { x: 0.9, y: 0.1, z: 0.11, size: 0.1 }
    ];
    
    const buttons = [];
    
    for (let i = 0; i < buttonCount; i++) {
        const pos = buttonPositions[i];
        
        // Button-Basis
        const buttonGeometry = new THREE.CylinderGeometry(pos.size, pos.size, 0.03, 32);
        const buttonMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x999999,
            roughness: 0.5,
            metalness: 0.7
        });
        
        const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
        button.rotation.x = Math.PI / 2;
        button.position.set(pos.x, pos.y, pos.z);
        button.castShadow = true;
        
        buttons.push(button);
        deviceGroup.add(button);
    }
    
    // Verbessertes Pixel-Haustier mit mehr Details
    const pixelPet = createEnhancedPixelPet(0.15, 0.01, 0xff9913);
    pixelPet.position.set(0, 0, 0.12);
    pixelPet.scale.set(0.4, 0.4, 0.4);
    deviceGroup.add(pixelPet);
    
    scene.add(deviceGroup);
    
    // Verbesserte Animation
    function animate() {
        requestAnimationFrame(animate);
        
        const time = Date.now() * 0.001;
        
        // Gerät komplexer animieren
        deviceGroup.rotation.y = Math.sin(time * 0.5) * 0.2;
        deviceGroup.rotation.x = Math.sin(time * 0.3) * 0.05;
        deviceGroup.position.y = Math.sin(time * 0.7) * 0.1;
        
        // Buttons animieren
        if (buttons && buttons.length) {
            buttons.forEach((button, index) => {
                // Buttons pulsieren lassen
                const pulse = Math.sin(time * 0.5 + index) * 0.5 + 0.5;
                button.position.z = 0.11 + pulse * 0.01;
                
                // Buttons leicht leuchten lassen
                if (button.material.emissiveIntensity !== undefined) {
                    button.material.emissiveIntensity = 0.2 + pulse * 0.3;
                }
            });
        }
        
        // Verbessertes Pixel-Haustier animieren
        if (pixelPet && pixelPet.userData && pixelPet.userData.animate) {
            pixelPet.userData.animate(time);
        }
        
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
 * Initialisiert alle Feature WebGL Container mit spezifischen Visualisierungen
 */
function initFeatureWebGLContainers() {
    // AI-Assistant WebGL mit neuronaler Netzwerk-Visualisierung
    initFeatureWebGLContainer('ai-assistant-webgl', 0xff9913, 'ai-assistant');
    
    // Checklists WebGL mit Checklist-Visualisierung
    initFeatureWebGLContainer('checklists-webgl', 0x3399ff, 'checklist');
    
    // Smart Home WebGL mit Smart-Home-Visualisierung
    initFeatureWebGLContainer('smart-home-webgl', 0x66cc66, 'smart-home');
    
    // Calendar Sync WebGL mit Kalender-Visualisierung
    initFeatureWebGLContainer('calendar-sync-webgl', 0xff6666, 'calendar');
}

/**
 * Initialisiert einen Feature WebGL-Container mit spezifischer Visualisierung
 */
function initFeatureWebGLContainer(containerId, color, featureType) {
    const container = document.getElementById(containerId);
    
    if (!container) return;
    
    // Szene, Kamera und Renderer erstellen
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfdf6e4);
    
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    
    // Verbesserte Beleuchtung
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);
    
    // Spezifisches Feature-Objekt erstellen basierend auf dem Typ
    let object;
    
    switch(featureType) {
        case 'ai-assistant':
            object = createAIAssistantVisualization(color);
            break;
        case 'checklist':
            object = createChecklistVisualization(color);
            break;
        case 'smart-home':
            object = createSmartHomeVisualization(color);
            break;
        case 'calendar':
            object = createCalendarVisualization(color);
            break;
        default:
            // Fallback: Standard Feature-Visualisierung
            object = createDefaultFeatureVisualization(color);
    }
    
    scene.add(object);
    
    // Animation mit verbesserter Kamerabewegung
    let time = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        // Subtile Kamerabewegung für mehr Dynamik
        camera.position.y = Math.sin(time * 0.2) * 0.1;
        camera.lookAt(scene.position);
        
        // Objekt animieren
        if (object && object.userData && object.userData.animate) {
            object.userData.animate(time);
        }
        
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
 * Initialisiert alle Technik WebGL Container mit verbesserten Visualisierungen
 */
function initTechnikWebGLContainers() {
    // Raspberry Pi WebGL
    initTechWebGLContainer('raspberry-pi-webgl', 0x66cc66, 'raspberry');
    
    // E-Ink WebGL
    initTechWebGLContainer('e-ink-webgl', 0xcccccc, 'e-ink');
    
    // Solar WebGL
    initTechWebGLContainer('solar-webgl', 0xffcc00, 'solar');
    
    // 5G Antenna WebGL
    initTechWebGLContainer('5g-antenna-webgl', 0x3399ff, '5g');
}

/**
 * Initialisiert einen Technik WebGL-Container mit spezifischer Visualisierung
 */
function initTechWebGLContainer(containerId, color, techType) {
    const container = document.getElementById(containerId);
    
    if (!container) return;
    
    // Szene, Kamera und Renderer erstellen
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfdf6e4);
    
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    
    // Verbesserte Beleuchtung
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);
    
    // Spezifisches Technik-Objekt erstellen
    const object = createTechVisualization(color, techType);
    scene.add(object);
    
    // Animation mit verbesserter Kamerabewegung
    let time = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        // Subtile Kamerabewegung für mehr Dynamik
        camera.position.y = Math.sin(time * 0.2) * 0.1;
        camera.lookAt(scene.position);
        
        // Objekt animieren
        if (object && object.userData && object.userData.animate) {
            object.userData.animate(time);
        }
        
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
 * Initialisiert alle Design WebGL Container
 */
function initDesignWebGLContainers() {
    initDesignWebGLContainer('minimalist-design-webgl', 0xff9913, 'minimalist');
    initDesignWebGLContainer('sustainable-design-webgl', 0x66cc66, 'sustainable');
    initDesignWebGLContainer('user-friendly-design-webgl', 0x3399ff, 'user-friendly');
}

/**
 * Initialisiert einen einzelnen Design WebGL Container
 */
function initDesignWebGLContainer(containerId, color, designType) {
    const container = document.getElementById(containerId);
    
    if (!container) return;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfdf6e4);
    
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    
    // Verbesserte Beleuchtung
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);
    
    // Akzentlicht hinzufügen
    const accentLight = new THREE.PointLight(color, 1, 10);
    accentLight.position.set(2, 2, 0);
    scene.add(accentLight);
    
    // Design-Visualisierung erstellen mit spezifischem Typ
    const designObject = createDesignVisualization(color, designType);
    scene.add(designObject);
    
    // Animation mit subtiler Kamerabewegung
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        // Subtile Kamerabewegung
        camera.position.x = Math.sin(time * 0.3) * 0.5;
        camera.position.y = Math.sin(time * 0.5) * 0.3;
        camera.lookAt(0, 0, 0);
        
        // Akzentlicht animieren
        accentLight.intensity = 0.8 + Math.sin(time * 0.8) * 0.2;
        
        if (designObject && designObject.userData && designObject.userData.animate) {
            designObject.userData.animate(time);
        }
        
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
 * Initialisiert alle Produkt WebGL Container
 */
function initProductWebGLContainers() {
    // Hauptprodukt WebGL
    initWebGLContainer('product-webgl-container', 0xff9913);
    
    // Varianten WebGL
    initWebGLContainer('product-variants-webgl', 0x3399ff);
}

/**
 * Initialisiert einen einzelnen WebGL-Container
 */
function initWebGLContainer(containerId, color) {
    const container = document.getElementById(containerId);
    
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
    
    // Einfaches 3D-Objekt erstellen
    let object;
    
    // Je nach Container-ID unterschiedliche Objekte erstellen
    if (containerId.includes('product')) {
        // Produkt: NER0-Gerät
        object = createDeviceModel(color);
    } else if (containerId.includes('feature') || containerId.includes('assistant')) {
        // Feature: Animierte Kugel mit Partikeln
        object = createFeatureVisualization(color);
    } else if (containerId.includes('tech') || containerId.includes('raspberry') || 
               containerId.includes('e-ink') || containerId.includes('solar') || 
               containerId.includes('5g')) {
        // Technik: Technisches Objekt
        object = createTechVisualization(color);
    } else if (containerId.includes('gehaeuse')) {
        // Gehäuse-Visualisierung
        object = createGehauseVisualization(color);
    } else if (containerId.includes('portabilitaet')) {
        // Portabilität-Visualisierung
        object = createPortabilitaetVisualization(color);
    } else if (containerId.includes('pc-anbindung')) {
        // PC-Anbindung-Visualisierung
        object = createPCAnbindungVisualization(color);
    } else if (containerId.includes('design')) {
        // Design: Ästhetisches Objekt
        object = createDesignVisualization(color);
    } else {
        // Fallback: Einfache rotierende Kugel
        const geometry = new THREE.SphereGeometry(1.5, 32, 32);
        const material = new THREE.MeshStandardMaterial({ 
            color: color || 0xff9913,
            roughness: 0.3,
            metalness: 0.2
        });
        object = new THREE.Mesh(geometry, material);
    }
    
    scene.add(object);
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        // Objekt animieren
        if (object) {
            object.rotation.y += 0.005;
            
            // Zusätzliche Animationen je nach Objekt-Typ
            if (object.userData && object.userData.animate) {
                object.userData.animate();
            }
        }
        
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
 * Erstellt ein NER0-Gerät-Modell
 */
function createDeviceModel(color) {
    const deviceGroup = new THREE.Group();
    
    // Hauptkörper des Geräts
    const bodyGeometry = new THREE.BoxGeometry(3, 2, 0.2);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: color || 0x333333,
        roughness: 0.3,
        metalness: 0.7
    });
    
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    deviceGroup.add(body);
    
    // Display
    const displayGeometry = new THREE.PlaneGeometry(2.5, 1.5);
    const displayMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xfbfcf8,
        side: THREE.DoubleSide
    });
    
    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.position.z = 0.11;
    deviceGroup.add(display);
    
    // Buttons hinzufügen
    const buttonGeometry = new THREE.CircleGeometry(0.1, 32);
    const buttonMaterial = new THREE.MeshStandardMaterial({ color: 0x999999 });
    
    const button1 = new THREE.Mesh(buttonGeometry, buttonMaterial);
    button1.position.set(0.8, 0.7, 0.11);
    deviceGroup.add(button1);
    
    const button2 = new THREE.Mesh(buttonGeometry, buttonMaterial);
    button2.position.set(0.8, 0.4, 0.11);
    deviceGroup.add(button2);
    
    return deviceGroup;
}

/**
 * Erstellt eine verbesserte Feature-Visualisierung mit mehr Variation
 */
function createFeatureVisualization(color, type) {
    // Je nach Feature-Typ unterschiedliche Visualisierungen erstellen
    switch(type) {
        case 'ai-assistant':
            return createAIAssistantVisualization(color);
        case 'checklist':
            return createChecklistVisualization(color);
        case 'smart-home':
            return createSmartHomeVisualization(color);
        case 'calendar':
            return createCalendarVisualization(color);
        default:
            return createDefaultFeatureVisualization(color);
    }
}

/**
 * Standard-Feature-Visualisierung mit verbesserter Darstellung
 */
function createDefaultFeatureVisualization(color) {
    const group = new THREE.Group();
    
    // Zentrale Kugel mit komplexerer Geometrie
    const sphereGeometry = new THREE.IcosahedronGeometry(1, 1);
    const sphereMaterial = new THREE.MeshPhysicalMaterial({ 
        color: color || 0xff9913,
        roughness: 0.3,
        metalness: 0.5,
        transparent: true,
        opacity: 0.8,
        clearcoat: 0.5,
        clearcoatRoughness: 0.1
    });
    
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    group.add(sphere);
    
    // Umgebende Ringe mit unterschiedlichen Rotationen
    const ringCount = 3;
    const rings = [];
    
    for (let i = 0; i < ringCount; i++) {
        const ringGeometry = new THREE.TorusGeometry(1.2 + i * 0.3, 0.05, 16, 32);
        const ringMaterial = new THREE.MeshStandardMaterial({ 
            color: color || 0xff9913,
            roughness: 0.3,
            metalness: 0.5,
            transparent: true,
            opacity: 0.7 - i * 0.15
        });
        
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2 + i * Math.PI / ringCount;
        ring.rotation.y = i * Math.PI / ringCount;
        
        rings.push(ring);
        group.add(ring);
    }
    
    // Partikel um die Kugel herum mit verschiedenen Formen
    const particleCount = 20;
    const particles = [];
    
    // Verschiedene Geometrien für mehr Variation
    const geometries = [
        new THREE.SphereGeometry(0.1, 8, 8),
        new THREE.BoxGeometry(0.15, 0.15, 0.15),
        new THREE.TetrahedronGeometry(0.15),
        new THREE.OctahedronGeometry(0.12)
    ];
    
    for (let i = 0; i < particleCount; i++) {
        // Zufällige Geometrie auswählen
        const geoIndex = Math.floor(Math.random() * geometries.length);
        
        // Zufällige Farbe basierend auf der Hauptfarbe
        const particleColor = color ? 
            new THREE.Color(color).offsetHSL(Math.random() * 0.1 - 0.05, 0, Math.random() * 0.2) : 
            new THREE.Color(0xff9913).offsetHSL(Math.random() * 0.1 - 0.05, 0, Math.random() * 0.2);
        
        const particleMaterial = new THREE.MeshStandardMaterial({ 
            color: particleColor,
            emissive: particleColor,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.7
        });
        
        const particle = new THREE.Mesh(geometries[geoIndex], particleMaterial);
        
        // Zufällige Position auf einer Kugel
        const radius = 1.8 + Math.random() * 0.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
        particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
        particle.position.z = radius * Math.cos(phi);
        
        // Speichere Originalposition und Bewegungsparameter
        particle.userData = {
            originalPosition: particle.position.clone(),
            speed: 0.01 + Math.random() * 0.02,
            rotationSpeed: 0.01 + Math.random() * 0.02,
            offset: Math.random() * Math.PI * 2,
            pulseSpeed: 0.5 + Math.random() * 1.5
        };
        
        particles.push(particle);
        group.add(particle);
    }
    
    // Animation-Funktion für die Partikel
    group.userData = {
        particles: particles,
        rings: rings,
        sphere: sphere,
        animate: function() {
            const time = Date.now() * 0.001;
            
            // Partikel um die Kugel bewegen
            particles.forEach((particle, index) => {
                const data = particle.userData;
                const offset = data.offset + time * data.speed;
                
                // Komplexere Bewegung
                particle.position.x = data.originalPosition.x * Math.cos(offset);
                particle.position.z = data.originalPosition.z * Math.sin(offset);
                particle.position.y = data.originalPosition.y + Math.sin(time * 0.5 + index) * 0.2;
                
                // Rotation
                particle.rotation.x += data.rotationSpeed * 0.1;
                particle.rotation.y += data.rotationSpeed * 0.15;
                
                // Größe pulsieren lassen
                const scale = 1 + Math.sin(time * data.pulseSpeed) * 0.2;
                particle.scale.set(scale, scale, scale);
                
                // Emissive-Intensität pulsieren lassen
                if (particle.material.emissiveIntensity !== undefined) {
                    particle.material.emissiveIntensity = 0.3 + Math.sin(time * data.pulseSpeed) * 0.3;
                }
            });
            
            // Ringe animieren
            rings.forEach((ring, index) => {
                ring.rotation.x += 0.002;
                ring.rotation.y += 0.003;
                ring.rotation.z += 0.001;
            });
            
            // Kugel komplexer pulsieren lassen
            sphere.scale.set(
                1 + Math.sin(time * 0.7) * 0.05,
                1 + Math.sin(time * 0.5) * 0.05,
                1 + Math.sin(time * 0.3) * 0.05
            );
        }
    };
    
    return group;
}

/**
 * AI-Assistant Visualisierung: Neuronales Netzwerk
 */
function createAIAssistantVisualization(color) {
    const group = new THREE.Group();
    
    // Zentrales Gehirn-ähnliches Objekt
    const brainGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const brainMaterial = new THREE.MeshStandardMaterial({
        color: color || 0xff9913,
        roughness: 0.4,
        metalness: 0.3,
        transparent: true,
        opacity: 0.8
    });
    
    const brain = new THREE.Mesh(brainGeometry, brainMaterial);
    group.add(brain);
    
    // Neuronales Netzwerk erstellen (Knoten und Verbindungen)
    const nodeCount = 20;
    const nodes = [];
    const nodeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    
    // Verschiedene Materialien für die Knoten
    const nodeMaterials = [
        new THREE.MeshStandardMaterial({
            color: color || 0xff9913,
            emissive: color || 0xff9913,
            emissiveIntensity: 0.5
        }),
        new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0xffffff,
            emissiveIntensity: 0.3
        }),
        new THREE.MeshStandardMaterial({
            color: 0x66ccff,
            emissive: 0x66ccff,
            emissiveIntensity: 0.5
        })
    ];
    
    // Knoten erstellen
    for (let i = 0; i < nodeCount; i++) {
        const materialIndex = Math.floor(Math.random() * nodeMaterials.length);
        const node = new THREE.Mesh(nodeGeometry, nodeMaterials[materialIndex]);
        
        // Zufällige Position im Raum
        const radius = 1.2 + Math.random() * 0.8;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        node.position.x = radius * Math.sin(phi) * Math.cos(theta);
        node.position.y = radius * Math.sin(phi) * Math.sin(theta);
        node.position.z = radius * Math.cos(phi);
        
        // Bewegungsparameter
        node.userData = {
            originalPosition: node.position.clone(),
            speed: 0.01 + Math.random() * 0.02,
            offset: Math.random() * Math.PI * 2,
            pulseSpeed: 0.005 + Math.random() * 0.01,
            connections: []
        };
        
        nodes.push(node);
        group.add(node);
    }
    
    // Verbindungen zwischen Knoten erstellen
    const lineMaterials = [
        new THREE.LineBasicMaterial({ color: color || 0xff9913, transparent: true, opacity: 0.4 }),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 }),
        new THREE.LineBasicMaterial({ color: 0x66ccff, transparent: true, opacity: 0.4 })
    ];
    
    // Verbindungen erstellen (nicht alle Knoten verbinden)
    for (let i = 0; i < nodes.length; i++) {
        const connectionsCount = 2 + Math.floor(Math.random() * 3); // 2-4 Verbindungen pro Knoten
        
        for (let c = 0; c < connectionsCount; c++) {
            // Zufälligen anderen Knoten auswählen
            const targetIndex = Math.floor(Math.random() * nodes.length);
            if (targetIndex !== i) {
                const materialIndex = Math.floor(Math.random() * lineMaterials.length);
                
                const points = [
                    nodes[i].position,
                    nodes[targetIndex].position
                ];
                
                const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
                const line = new THREE.Line(lineGeometry, lineMaterials[materialIndex]);
                
                // Verbindung speichern
                nodes[i].userData.connections.push({
                    line: line,
                    target: targetIndex
                });
                
                group.add(line);
            }
        }
    }
    
    // Animation-Funktion
    group.userData = {
        nodes: nodes,
        brain: brain,
        animate: function() {
            const time = Date.now() * 0.001;
            
            // Gehirn pulsieren lassen
            brain.scale.set(
                1 + Math.sin(time * 0.5) * 0.05,
                1 + Math.sin(time * 0.5) * 0.05,
                1 + Math.sin(time * 0.5) * 0.05
            );
            
            // Knoten animieren
            nodes.forEach((node, index) => {
                const data = node.userData;
                
                // Position animieren
                node.position.x = data.originalPosition.x * (1 + Math.sin(time * data.speed) * 0.1);
                node.position.y = data.originalPosition.y * (1 + Math.sin(time * data.speed + 1) * 0.1);
                node.position.z = data.originalPosition.z * (1 + Math.sin(time * data.speed + 2) * 0.1);
                
                // Größe pulsieren lassen
                node.scale.set(
                    1 + Math.sin(time * data.pulseSpeed + index) * 0.3,
                    1 + Math.sin(time * data.pulseSpeed + index) * 0.3,
                    1 + Math.sin(time * data.pulseSpeed + index) * 0.3
                );
                
                // Verbindungen aktualisieren
                data.connections.forEach(connection => {
                    const targetNode = nodes[connection.target];
                    const lineGeometry = connection.line.geometry;
                    
                    // Punkte aktualisieren
                    const positions = lineGeometry.attributes.position.array;
                    positions[0] = node.position.x;
                    positions[1] = node.position.y;
                    positions[2] = node.position.z;
                    positions[3] = targetNode.position.x;
                    positions[4] = targetNode.position.y;
                    positions[5] = targetNode.position.z;
                    
                    lineGeometry.attributes.position.needsUpdate = true;
                });
            });
        }
    };
    
    return group;
}

/**
 * Checklist-Visualisierung
 */
function createChecklistVisualization(color) {
    const group = new THREE.Group();
    
    // Basis-Notizblock
    const notepadGeometry = new THREE.BoxGeometry(2, 2.5, 0.1);
    const notepadMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.8,
        metalness: 0.1
    });
    
    const notepad = new THREE.Mesh(notepadGeometry, notepadMaterial);
    group.add(notepad);
    
    // Linien auf dem Notizblock
    const lineCount = 7;
    const lineGeometry = new THREE.PlaneGeometry(1.8, 0.02);
    const lineMaterial = new THREE.MeshBasicMaterial({
        color: 0xcccccc,
        side: THREE.DoubleSide
    });
    
    const lines = [];
    
    for (let i = 0; i < lineCount; i++) {
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        line.position.set(0, 0.8 - i * 0.3, 0.06);
        lines.push(line);
        group.add(line);
    }
    
    // Checkboxen
    const checkboxCount = 5;
    const checkboxGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.02);
    const checkboxMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.5,
        metalness: 0.1
    });
    
    const checkboxOutlineMaterial = new THREE.LineBasicMaterial({
        color: 0x333333
    });
    
    const checkboxes = [];
    const checks = [];
    
    for (let i = 0; i < checkboxCount; i++) {
        // Checkbox
        const checkbox = new THREE.Mesh(checkboxGeometry, checkboxMaterial);
        checkbox.position.set(-0.7, 0.8 - i * 0.3, 0.06);
        
        // Outline
        const outlineGeometry = new THREE.EdgesGeometry(checkboxGeometry);
        const outline = new THREE.LineSegments(outlineGeometry, checkboxOutlineMaterial);
        checkbox.add(outline);
        
        // Checkmark (anfangs unsichtbar)
        const checkGeometry = new THREE.BufferGeometry();
        const checkPoints = [
            new THREE.Vector3(-0.05, 0, 0.02),
            new THREE.Vector3(0, -0.05, 0.02),
            new THREE.Vector3(0.08, 0.08, 0.02)
        ];
        checkGeometry.setFromPoints(checkPoints);
        
        const check = new THREE.Line(checkGeometry, new THREE.LineBasicMaterial({
            color: color || 0xff9913,
            linewidth: 2
        }));
        
        check.visible = false;
        checkbox.add(check);
        
        checkboxes.push(checkbox);
        checks.push(check);
        group.add(checkbox);
    }
    
    // Stift
    const pencilGroup = new THREE.Group();
    pencilGroup.position.set(0.7, -0.7, 0.2);
    pencilGroup.rotation.z = -Math.PI / 4;
    
    const pencilBodyGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 16);
    const pencilBodyMaterial = new THREE.MeshStandardMaterial({
        color: color || 0xff9913
    });
    
    const pencilBody = new THREE.Mesh(pencilBodyGeometry, pencilBodyMaterial);
    pencilGroup.add(pencilBody);
    
    const pencilTipGeometry = new THREE.ConeGeometry(0.05, 0.2, 16);
    const pencilTipMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333
    });
    
    const pencilTip = new THREE.Mesh(pencilTipGeometry, pencilTipMaterial);
    pencilTip.position.y = -0.6;
    pencilGroup.add(pencilTip);
    
    group.add(pencilGroup);
    
    // Animation-Funktion
    group.userData = {
        notepad: notepad,
        pencil: pencilGroup,
        checks: checks,
        checkboxes: checkboxes,
        animate: function() {
            const time = Date.now() * 0.001;
            
            // Notizblock leicht schweben lassen
            notepad.position.y = Math.sin(time * 0.5) * 0.05;
            
            // Stift animieren
            pencilGroup.position.y = -0.7 + Math.sin(time * 0.7) * 0.1;
            pencilGroup.rotation.z = -Math.PI / 4 + Math.sin(time * 0.3) * 0.1;
            
            // Checkboxen nacheinander abhaken
            const checkInterval = 2; // Sekunden pro Check
            const totalCycle = checkboxCount * checkInterval;
            const cycleTime = time % totalCycle;
            const activeIndex = Math.floor(cycleTime / checkInterval);
            
            checks.forEach((check, index) => {
                if (index === activeIndex) {
                    // Checkbox gerade aktiv - Animation zeigen
                    const progress = (cycleTime % checkInterval) / checkInterval;
                    check.visible = progress > 0.2;
                    
                    // Checkbox leicht hervorheben
                    checkboxes[index].scale.set(1 + (1 - progress) * 0.2, 1 + (1 - progress) * 0.2, 1);
                } else if (index < activeIndex) {
                    // Bereits abgehakte Checkbox
                    check.visible = true;
                    checkboxes[index].scale.set(1, 1, 1);
                } else {
                    // Noch nicht abgehakte Checkbox
                    check.visible = false;
                    checkboxes[index].scale.set(1, 1, 1);
                }
            });
        }
    };
    
    return group;
}

/**
 * Smart Home Visualisierung
 */
function createSmartHomeVisualization(color) {
    const group = new THREE.Group();
    
    // Haus-Grundstruktur
    const houseGroup = new THREE.Group();
    
    // Hauptkörper des Hauses
    const houseGeometry = new THREE.BoxGeometry(2, 1.5, 2);
    const houseMaterial = new THREE.MeshStandardMaterial({
        color: 0xeeeeee,
        roughness: 0.7,
        metalness: 0.1
    });
    
    const house = new THREE.Mesh(houseGeometry, houseMaterial);
    house.position.y = 0.75;
    houseGroup.add(house);
    
    // Dach
    const roofGeometry = new THREE.ConeGeometry(1.5, 1, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({
        color: color || 0xff9913,
        roughness: 0.6,
        metalness: 0.2
    });
    
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 2;
    roof.rotation.y = Math.PI / 4;
    houseGroup.add(roof);
    
    // Tür
    const doorGeometry = new THREE.PlaneGeometry(0.4, 0.8);
    const doorMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        roughness: 0.8,
        metalness: 0.1,
        side: THREE.DoubleSide
    });
    
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 0.4, 1.01);
    houseGroup.add(door);
    
    // Fenster
    const windowGeometry = new THREE.PlaneGeometry(0.4, 0.4);
    const windowMaterial = new THREE.MeshStandardMaterial({
        color: 0x66ccff,
        roughness: 0.2,
        metalness: 0.8,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
    });
    
    // Vordere Fenster
    const frontWindow1 = new THREE.Mesh(windowGeometry, windowMaterial);
    frontWindow1.position.set(-0.6, 0.8, 1.01);
    houseGroup.add(frontWindow1);
    
    const frontWindow2 = new THREE.Mesh(windowGeometry, windowMaterial);
    frontWindow2.position.set(0.6, 0.8, 1.01);
    houseGroup.add(frontWindow2);
    
    // Smart-Home-Elemente
    const smartElements = [];
    
    // WLAN-Signal über dem Haus
    const wifiGroup = new THREE.Group();
    wifiGroup.position.y = 2.8;
    
    for (let i = 0; i < 3; i++) {
        const arcGeometry = new THREE.TorusGeometry(0.3 + i * 0.2, 0.03, 16, 32, Math.PI);
        const arcMaterial = new THREE.MeshStandardMaterial({
            color: color || 0xff9913,
            emissive: color || 0xff9913,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.8 - i * 0.2
        });
        
        const arc = new THREE.Mesh(arcGeometry, arcMaterial);
        arc.rotation.x = Math.PI;
        arc.userData = {
            pulseSpeed: 0.5 + i * 0.2,
            baseOpacity: 0.8 - i * 0.2
        };
        
        smartElements.push(arc);
        wifiGroup.add(arc);
    }
    
    houseGroup.add(wifiGroup);
    
    // Sensoren an verschiedenen Stellen des Hauses
    const sensorGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const sensorMaterial = new THREE.MeshStandardMaterial({
        color: 0x66ccff,
        emissive: 0x66ccff,
        emissiveIntensity: 0.5
    });
    
    // Sensor-Positionen
    const sensorPositions = [
        { x: -0.9, y: 1.2, z: 0.9 },
        { x: 0.9, y: 1.2, z: 0.9 },
        { x: 0.9, y: 1.2, z: -0.9 },
        { x: -0.9, y: 1.2, z: -0.9 },
        { x: 0, y: 2.5, z: 0 }
    ];
    
    sensorPositions.forEach((pos, index) => {
        const sensor = new THREE.Mesh(sensorGeometry, sensorMaterial);
        sensor.position.set(pos.x, pos.y, pos.z);
        sensor.userData = {
            pulseSpeed: 0.5 + index * 0.1,
            baseScale: 1
        };
        
        smartElements.push(sensor);
        houseGroup.add(sensor);
    });
    
    group.add(houseGroup);
    
    // Animation-Funktion
    group.userData = {
        houseGroup: houseGroup,
        smartElements: smartElements,
        animate: function() {
            const time = Date.now() * 0.001;
            
            // Smart-Elemente animieren
            smartElements.forEach((element, index) => {
                if (element.userData.pulseSpeed) {
                    // Pulsieren
                    const pulse = Math.sin(time * element.userData.pulseSpeed) * 0.5 + 0.5;
                    
                    if (element.material.opacity !== undefined) {
                        // Transparenz pulsieren lassen
                        element.material.opacity = element.userData.baseOpacity * (0.7 + pulse * 0.3);
                    }
                    
                    if (element.userData.baseScale) {
                        // Größe pulsieren lassen
                        const scale = element.userData.baseScale * (1 + pulse * 0.3);
                        element.scale.set(scale, scale, scale);
                    }
                    
                    // Emissive-Intensität pulsieren lassen
                    element.material.emissiveIntensity = 0.3 + pulse * 0.7;
                }
            });
            
            // Haus leicht schweben lassen
            houseGroup.position.y = Math.sin(time * 0.5) * 0.05;
            houseGroup.rotation.y = Math.sin(time * 0.2) * 0.05;
        }
    };
    
    return group;
}

/**
 * Kalender-Visualisierung
 */
function createCalendarVisualization(color) {
    const group = new THREE.Group();
    
    // Kalender-Basis
    const calendarGeometry = new THREE.BoxGeometry(2, 2, 0.1);
    const calendarMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.7,
        metalness: 0.1
    });
    
    const calendar = new THREE.Mesh(calendarGeometry, calendarMaterial);
    group.add(calendar);
    
    // Kalender-Kopfzeile
    const headerGeometry = new THREE.BoxGeometry(2, 0.4, 0.12);
    const headerMaterial = new THREE.MeshStandardMaterial({
        color: color || 0xff9913,
        roughness: 0.5,
        metalness: 0.3
    });
    
    const header = new THREE.Mesh(headerGeometry, headerMaterial);
    header.position.set(0, 0.8, 0.01);
    group.add(header);
    
    // Kalender-Gitter erstellen
    const gridSize = 5;
    const cellSize = 0.3;
    const gridOffset = 0.3;
    
    const cells = [];
    
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            // Zelle
            const cellGeometry = new THREE.PlaneGeometry(cellSize, cellSize);
            const cellMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide
            });
            
            const cell = new THREE.Mesh(cellGeometry, cellMaterial);
            
            // Position berechnen (zentriert)
            const offsetX = (col - gridSize / 2) * (cellSize + 0.05) + cellSize / 2;
            const offsetY = (gridSize / 2 - row) * (cellSize + 0.05) - gridOffset;
            
            cell.position.set(offsetX, offsetY, 0.06);
            
            // Zellrahmen
            const borderGeometry = new THREE.EdgesGeometry(cellGeometry);
            const borderMaterial = new THREE.LineBasicMaterial({ color: 0xcccccc });
            const border = new THREE.LineSegments(borderGeometry, borderMaterial);
            cell.add(border);
            
            // Zufällige Markierungen für einige Zellen
            if (Math.random() > 0.7) {
                const markerGeometry = new THREE.CircleGeometry(cellSize * 0.3, 16);
                const markerMaterial = new THREE.MeshBasicMaterial({
                    color: color || 0xff9913,
                    side: THREE.DoubleSide
                });
                
                const marker = new THREE.Mesh(markerGeometry, markerMaterial);
                marker.position.z = 0.01;
                cell.add(marker);
                
                // Animation-Parameter
                cell.userData = {
                    hasMarker: true,
                    pulseSpeed: 0.5 + Math.random() * 1.5
                };
            }
            
            cells.push(cell);
            group.add(cell);
        }
    }
    
    // Aktuelle Tageszelle hervorheben
    const todayCell = cells[12]; // Mittlere Zelle
    todayCell.material = new THREE.MeshBasicMaterial({
        color: 0xf0f0f0,
        side: THREE.DoubleSide
    });
    
    const todayBorderGeometry = new THREE.EdgesGeometry(new THREE.PlaneGeometry(cellSize, cellSize));
    const todayBorderMaterial = new THREE.LineBasicMaterial({ color: color || 0xff9913, linewidth: 2 });
    const todayBorder = new THREE.LineSegments(todayBorderGeometry, todayBorderMaterial);
    todayCell.add(todayBorder);
    
    // Animation-Funktion
    group.userData = {
        calendar: calendar,
        cells: cells,
        todayBorder: todayBorder,
        animate: function() {
            const time = Date.now() * 0.001;
            
            // Kalender leicht schweben lassen
            calendar.position.y = Math.sin(time * 0.5) * 0.05;
            calendar.rotation.x = Math.sin(time * 0.3) * 0.03;
            calendar.rotation.y = Math.sin(time * 0.4) * 0.03;
            
            // Markierte Zellen animieren
            cells.forEach((cell, index) => {
                if (cell.userData && cell.userData.hasMarker) {
                    const marker = cell.children[1]; // Der Marker ist das zweite Kind (nach dem Rahmen)
                    if (marker) {
                        const pulse = Math.sin(time * cell.userData.pulseSpeed) * 0.5 + 0.5;
                        marker.scale.set(0.8 + pulse * 0.4, 0.8 + pulse * 0.4, 1);
                    }
                }
            });
            
            // Heutige Zelle hervorheben
            const todayPulse = Math.sin(time * 2) * 0.5 + 0.5;
            this.todayBorder.material.color.setHSL((time * 0.05) % 1, 0.7, 0.5);
        }
    };
    
    return group;
}

/**
 * Erstellt eine erweiterte Technik-Visualisierung mit mehr Details und komplexeren Animationen
 * @param {number} color - Die Hauptfarbe für die Visualisierung
 * @param {string} techType - Der Typ der Technik-Visualisierung ('raspberry', 'e-ink', 'solar', '5g')
 */
function createTechVisualization(color, techType) {
    const group = new THREE.Group();
    const mainColor = color || 0xff9913;
    
    // Basis-Plattform (verbessertes Circuit Board mit Leiterbahnen)
    const baseGeometry = new THREE.BoxGeometry(3.5, 0.1, 3.5);
    const baseTexture = createCircuitTexture(mainColor);
    const baseMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x222222,
        roughness: 0.7,
        metalness: 0.3,
        map: baseTexture,
        emissive: mainColor,
        emissiveIntensity: 0.2
    });
    
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.receiveShadow = true;
    group.add(base);
    
    // Zentrale CPU/Prozessor
    const cpuGeometry = new THREE.BoxGeometry(0.8, 0.15, 0.8);
    const cpuMaterial = new THREE.MeshPhysicalMaterial({ 
        color: mainColor,
        roughness: 0.2,
        metalness: 0.8,
        clearcoat: 0.5,
        clearcoatRoughness: 0.3
    });
    
    const cpu = new THREE.Mesh(cpuGeometry, cpuMaterial);
    cpu.position.y = 0.125;
    cpu.castShadow = true;
    cpu.receiveShadow = true;
    group.add(cpu);
    
    // Kühlkörper auf der CPU
    const heatsinkGroup = new THREE.Group();
    heatsinkGroup.position.y = 0.2;
    
    const heatsinkMaterial = new THREE.MeshStandardMaterial({
        color: 0x888888,
        roughness: 0.1,
        metalness: 0.9
    });
    
    // Kühlrippen erstellen
    for (let i = 0; i < 8; i++) {
        const finGeometry = new THREE.BoxGeometry(0.7, 0.2, 0.05);
        const fin = new THREE.Mesh(finGeometry, heatsinkMaterial);
        fin.position.z = -0.35 + i * 0.1;
        fin.castShadow = true;
        heatsinkGroup.add(fin);
    }
    
    group.add(heatsinkGroup);
    
    // Verschiedene elektronische Komponenten
    const componentGeometries = [
        new THREE.BoxGeometry(0.4, 0.1, 0.4),        // IC-Chip
        new THREE.BoxGeometry(0.3, 0.08, 0.2),      // Kleinerer Chip
        new THREE.CylinderGeometry(0.15, 0.15, 0.2, 16), // Runder Kondensator
        new THREE.CylinderGeometry(0.1, 0.1, 0.3, 8),    // Kleinerer Zylinder
        new THREE.BoxGeometry(0.15, 0.05, 0.3)      // Widerstand
    ];
    
    // Verschiedene Materialien für Komponenten
    const componentMaterials = [
        new THREE.MeshStandardMaterial({ color: mainColor, roughness: 0.5, metalness: 0.8 }),
        new THREE.MeshStandardMaterial({ color: 0x66cc66, roughness: 0.5, metalness: 0.6 }),
        new THREE.MeshStandardMaterial({ color: 0x3399ff, roughness: 0.4, metalness: 0.7 }),
        new THREE.MeshStandardMaterial({ color: 0xcc6666, roughness: 0.6, metalness: 0.5 })
    ];
    
    const components = [];
    const componentCount = 15;
    
    // Komponenten in einem Raster anordnen
    const gridSize = Math.floor(Math.sqrt(componentCount));
    const spacing = 0.6;
    
    for (let i = 0; i < componentCount; i++) {
        // Überspringen, wenn Position zu nah an der CPU ist
        const gridX = (i % gridSize) - Math.floor(gridSize/2);
        const gridZ = Math.floor(i / gridSize) - Math.floor(gridSize/2);
        
        const posX = gridX * spacing;
        const posZ = gridZ * spacing;
        
        // Nicht zu nah an der CPU platzieren
        if (Math.abs(posX) < 0.5 && Math.abs(posZ) < 0.5) continue;
        
        const geometryIndex = Math.floor(Math.random() * componentGeometries.length);
        const materialIndex = Math.floor(Math.random() * componentMaterials.length);
        
        const component = new THREE.Mesh(
            componentGeometries[geometryIndex], 
            componentMaterials[materialIndex].clone() // Clone für individuelle Anpassungen
        );
        
        component.position.set(posX, 0.1, posZ);
        component.rotation.y = Math.random() * Math.PI * 2;
        component.castShadow = true;
        component.receiveShadow = true;
        
        // Speichere Originalhöhe für Animation
        component.userData = {
            originalY: component.position.y,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.5 + Math.random() * 1.5
        };
        
        components.push(component);
        group.add(component);
    }
    
    // Verbindungslinien zwischen Komponenten und CPU
    const lineGroup = new THREE.Group();
    
    components.forEach((component) => {
        // Verbindung zur CPU
        const points = [];
        points.push(new THREE.Vector3(component.position.x, 0.05, component.position.z));
        points.push(new THREE.Vector3(0, 0.05, 0)); // CPU-Position
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: mainColor,
            transparent: true,
            opacity: 0.6
        });
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        lineGroup.add(line);
    });
    
    group.add(lineGroup);
    
    // Datenfluss-Partikel entlang der Linien
    const particleGroup = new THREE.Group();
    const particles = [];
    
    components.forEach((component) => {
        const particleGeometry = new THREE.SphereGeometry(0.03, 8, 8);
        const particleMaterial = new THREE.MeshBasicMaterial({ 
            color: mainColor,
            transparent: true,
            opacity: 0.8
        });
        
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        // Startposition bei der Komponente
        particle.position.copy(component.position);
        particle.position.y = 0.05;
        
        // Speichere Ziel (CPU) und Startposition für Animation
        particle.userData = {
            startPos: new THREE.Vector3(component.position.x, 0.05, component.position.z),
            endPos: new THREE.Vector3(0, 0.05, 0),
            progress: Math.random(),
            speed: 0.01 + Math.random() * 0.02,
            active: true
        };
        
        particles.push(particle);
        particleGroup.add(particle);
    });
    
    group.add(particleGroup);
    
    // Holographisches Display über der CPU
    const holoSize = 0.6;
    const holoHeight = 0.8;
    
    const holoGeometry = new THREE.CylinderGeometry(holoSize, holoSize, holoHeight, 16, 1, true);
    const holoMaterial = new THREE.MeshBasicMaterial({
        color: mainColor,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide,
        wireframe: true
    });
    
    const hologram = new THREE.Mesh(holoGeometry, holoMaterial);
    hologram.position.y = 0.5;
    group.add(hologram);
    
    // Holographische Daten im Inneren
    const holoContentGroup = new THREE.Group();
    holoContentGroup.position.y = 0.5;
    
    // Verschiedene schwebende Elemente im Hologramm
    for (let i = 0; i < 5; i++) {
        const size = 0.05 + Math.random() * 0.1;
        let geometry;
        
        // Verschiedene Formen für Hologramm-Inhalte
        const shapeType = Math.floor(Math.random() * 3);
        switch(shapeType) {
            case 0:
                geometry = new THREE.BoxGeometry(size, size, size);
                break;
            case 1:
                geometry = new THREE.SphereGeometry(size, 8, 8);
                break;
            case 2:
                geometry = new THREE.TetrahedronGeometry(size);
                break;
        }
        
        const element = new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({
                color: mainColor,
                transparent: true,
                opacity: 0.5 + Math.random() * 0.3
            })
        );
        
        // Zufällige Position innerhalb des Hologramms
        const radius = holoSize * 0.7 * Math.random();
        const angle = Math.random() * Math.PI * 2;
        element.position.x = Math.cos(angle) * radius;
        element.position.z = Math.sin(angle) * radius;
        element.position.y = (Math.random() - 0.5) * (holoHeight * 0.8);
        
        // Speichere Animations-Parameter
        element.userData = {
            rotSpeed: (Math.random() - 0.5) * 0.05,
            floatPhase: Math.random() * Math.PI * 2,
            floatSpeed: 0.5 + Math.random() * 1.5,
            floatAmount: 0.05 + Math.random() * 0.1
        };
        
        holoContentGroup.add(element);
    }
    
    group.add(holoContentGroup);
    
    // Hilfsfunktion zum Erstellen einer Circuit-Textur
    function createCircuitTexture(color) {
        const size = 512;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // Hintergrund
        ctx.fillStyle = '#111111';
        ctx.fillRect(0, 0, size, size);
        
        // Leiterbahnen zeichnen
        ctx.strokeStyle = new THREE.Color(color).getStyle();
        ctx.lineWidth = 2;
        
        // Horizontale Linien
        for (let i = 0; i < 10; i++) {
            const y = Math.floor(Math.random() * size);
            ctx.beginPath();
            ctx.moveTo(0, y);
            
            let x = 0;
            while (x < size) {
                x += Math.floor(Math.random() * 50) + 20;
                const newY = y + (Math.random() - 0.5) * 50;
                ctx.lineTo(x, newY);
            }
            
            ctx.stroke();
        }
        
        // Vertikale Linien
        for (let i = 0; i < 10; i++) {
            const x = Math.floor(Math.random() * size);
            ctx.beginPath();
            ctx.moveTo(x, 0);
            
            let y = 0;
            while (y < size) {
                y += Math.floor(Math.random() * 50) + 20;
                const newX = x + (Math.random() - 0.5) * 50;
                ctx.lineTo(newX, y);
            }
            
            ctx.stroke();
        }
        
        // Punkte für Verbindungen
        ctx.fillStyle = new THREE.Color(color).getStyle();
        for (let i = 0; i < 30; i++) {
            const x = Math.floor(Math.random() * size);
            const y = Math.floor(Math.random() * size);
            const radius = Math.floor(Math.random() * 5) + 2;
            
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }
    
    // Animation-Funktion
    group.userData = {
        animate: function(time) {
            if (!time) time = Date.now() * 0.001;
            
            // CPU pulsieren
            cpu.material.emissiveIntensity = 0.2 + Math.sin(time * 1.5) * 0.1;
            cpu.material.emissive = new THREE.Color(mainColor);
            
            // Komponenten animieren
            components.forEach((component) => {
                const { pulsePhase, pulseSpeed, originalY } = component.userData;
                component.position.y = originalY + Math.sin(time * pulseSpeed + pulsePhase) * 0.03;
                
                // Emissive-Effekt für aktive Komponenten
                if (component.material.emissive) {
                    component.material.emissive = new THREE.Color(mainColor);
                    component.material.emissiveIntensity = 0.1 + Math.sin(time * pulseSpeed + pulsePhase) * 0.1;
                }
            });
            
            // Partikel entlang der Linien bewegen
            particles.forEach((particle) => {
                const { startPos, endPos, speed, progress } = particle.userData;
                
                // Progress aktualisieren
                particle.userData.progress += speed;
                if (particle.userData.progress > 1) {
                    particle.userData.progress = 0;
                    
                    // Zufällig Richtung ändern (von CPU zu Komponente oder umgekehrt)
                    const temp = particle.userData.startPos;
                    particle.userData.startPos = particle.userData.endPos;
                    particle.userData.endPos = temp;
                }
                
                // Position interpolieren
                particle.position.lerpVectors(
                    particle.userData.startPos,
                    particle.userData.endPos,
                    particle.userData.progress
                );
                
                // Pulsieren
                particle.material.opacity = 0.4 + Math.sin(time * 5) * 0.2;
            });
            
            // Hologramm rotieren
            hologram.rotation.y += 0.01;
            
            // Hologramm-Inhalte animieren
            holoContentGroup.children.forEach((element) => {
                // Rotation
                element.rotation.x += element.userData.rotSpeed;
                element.rotation.y += element.userData.rotSpeed * 1.5;
                
                // Schweben
                const { floatPhase, floatSpeed, floatAmount } = element.userData;
                element.position.y += Math.sin(time * floatSpeed + floatPhase) * floatAmount * 0.02;
                
                // Pulsieren
                element.material.opacity = 0.5 + Math.sin(time * 2 + floatPhase) * 0.2;
            });
            
            // Kühlkörper subtil bewegen
            heatsinkGroup.position.y = 0.2 + Math.sin(time * 0.8) * 0.01;
        }
    };
    
    return group;
}

/**
 * Erstellt eine verbesserte Design-Visualisierung mit verschiedenen Stilen
 * @param {number} color - Die Hauptfarbe für die Visualisierung
 * @param {string} designType - Der Typ des Designs ('minimalist', 'sustainable', 'user-friendly')
 */
function createDesignVisualization(color, designType) {
    const mainColor = color || 0xff9913;
    
    switch(designType) {
        case 'minimalist':
            return createMinimalistDesign(mainColor);
        case 'sustainable':
            return createSustainableDesign(mainColor);
        case 'user-friendly':
            return createUserFriendlyDesign(mainColor);
        default:
            return createDefaultDesign(mainColor);
    }
}

/**
 * Erstellt ein minimalistisches Design mit klaren Linien und einfachen Formen
 */
function createMinimalistDesign(color) {
    const group = new THREE.Group();
    const shapes = [];
    
    // Hauptplattform - flache, schwebende Platte
    const platformGeometry = new THREE.BoxGeometry(3, 0.05, 3);
    const platformMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.1,
        metalness: 0.2,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
        reflectivity: 0.5
    });
    
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = -0.5;
    platform.receiveShadow = true;
    group.add(platform);
    
    // Minimalistische geometrische Formen
    const geometries = [
        new THREE.BoxGeometry(0.8, 0.8, 0.8),
        new THREE.SphereGeometry(0.5, 16, 16),
        new THREE.ConeGeometry(0.5, 1, 16)
    ];
    
    const positions = [
        new THREE.Vector3(-0.8, 0, -0.8),
        new THREE.Vector3(0.8, 0, -0.8),
        new THREE.Vector3(0, 0, 0.8)
    ];
    
    // Material mit subtilen Variationen
    for (let i = 0; i < geometries.length; i++) {
        const shapeMaterial = new THREE.MeshPhysicalMaterial({
            color: color,
            roughness: 0.2 + (i * 0.1),
            metalness: 0.1,
            clearcoat: 0.5,
            clearcoatRoughness: 0.1,
            transparent: true,
            opacity: 0.9
        });
        
        const shape = new THREE.Mesh(geometries[i], shapeMaterial);
        shape.position.copy(positions[i]);
        shape.castShadow = true;
        shape.receiveShadow = true;
        
        // Speichere Originalposition und Rotationsgeschwindigkeit
        shape.userData = {
            originalY: shape.position.y,
            rotationSpeed: 0.005 + (i * 0.002),
            floatPhase: Math.random() * Math.PI * 2
        };
        
        shapes.push(shape);
        group.add(shape);
    }
    
    // Dünne Verbindungslinien zwischen den Formen
    const lines = [];
    for (let i = 0; i < shapes.length; i++) {
        const nextIndex = (i + 1) % shapes.length;
        
        const points = [];
        points.push(shapes[i].position.clone());
        points.push(shapes[nextIndex].position.clone());
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.5
        });
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        lines.push(line);
        group.add(line);
    }
    
    // Animation-Funktion
    group.userData = {
        animate: function(time) {
            if (!time) time = Date.now() * 0.001;
            
            // Formen animieren
            shapes.forEach((shape, index) => {
                // Rotation
                shape.rotation.x += shape.userData.rotationSpeed * 0.5;
                shape.rotation.y += shape.userData.rotationSpeed;
                
                // Schweben
                const floatSpeed = 0.8 + (index * 0.2);
                shape.position.y = shape.userData.originalY + Math.sin(time * floatSpeed + shape.userData.floatPhase) * 0.1;
            });
            
            // Linien aktualisieren, um mit den bewegten Formen verbunden zu bleiben
            for (let i = 0; i < shapes.length; i++) {
                const nextIndex = (i + 1) % shapes.length;
                const line = lines[i];
                
                const positions = line.geometry.attributes.position.array;
                
                // Start- und Endpunkte aktualisieren
                positions[0] = shapes[i].position.x;
                positions[1] = shapes[i].position.y;
                positions[2] = shapes[i].position.z;
                
                positions[3] = shapes[nextIndex].position.x;
                positions[4] = shapes[nextIndex].position.y;
                positions[5] = shapes[nextIndex].position.z;
                
                line.geometry.attributes.position.needsUpdate = true;
                
                // Pulsieren der Linien
                line.material.opacity = 0.3 + Math.sin(time * 1.5 + i) * 0.2;
            }
            
            // Plattform subtil animieren
            platform.rotation.y = Math.sin(time * 0.1) * 0.05;
        }
    };
    
    return group;
}

/**
 * Erstellt ein nachhaltiges Design mit organischen Formen und natürlichen Elementen
 */
function createSustainableDesign(color) {
    const group = new THREE.Group();
    
    // Natürliche Basis - wie eine Grasfläche
    const baseGeometry = new THREE.CircleGeometry(2, 32);
    const baseTexture = createGrassTexture();
    const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0x66aa44,
        roughness: 0.8,
        metalness: 0.1,
        map: baseTexture
    });
    
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.rotation.x = -Math.PI / 2;
    base.position.y = -0.5;
    base.receiveShadow = true;
    group.add(base);
    
    // Baum / Pflanze in der Mitte
    const treeGroup = createTree(color);
    treeGroup.position.y = -0.5;
    group.add(treeGroup);
    
    // Kreisförmige Anordnung von Blättern/Elementen
    const leafCount = 12;
    const leaves = [];
    
    for (let i = 0; i < leafCount; i++) {
        const angle = (i / leafCount) * Math.PI * 2;
        const radius = 1.2;
        
        const leafGeometry = new THREE.TetrahedronGeometry(0.15);
        const leafMaterial = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(color).lerp(new THREE.Color(0x66aa44), Math.random() * 0.5),
            roughness: 0.6,
            metalness: 0.1,
            clearcoat: 0.2,
            clearcoatRoughness: 0.8,
            transmission: 0.2
        });
        
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        
        // Position im Kreis
        leaf.position.x = Math.cos(angle) * radius;
        leaf.position.z = Math.sin(angle) * radius;
        leaf.position.y = 0.1 + Math.random() * 0.2;
        
        // Zufällige Rotation
        leaf.rotation.x = Math.random() * Math.PI;
        leaf.rotation.y = Math.random() * Math.PI;
        leaf.rotation.z = Math.random() * Math.PI;
        
        leaf.scale.set(
            0.8 + Math.random() * 0.4,
            0.8 + Math.random() * 0.4,
            0.8 + Math.random() * 0.4
        );
        
        leaf.castShadow = true;
        
        // Speichere Animation-Parameter
        leaf.userData = {
            originalY: leaf.position.y,
            floatSpeed: 0.5 + Math.random() * 1.5,
            floatPhase: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.01
        };
        
        leaves.push(leaf);
        group.add(leaf);
    }
    
    // Sonnenlicht-Partikel
    const particleCount = 30;
    const particles = [];
    
    const particleGeometry = new THREE.SphereGeometry(0.03, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffaa,
        transparent: true,
        opacity: 0.6
    });
    
    for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial.clone());
        
        // Zufällige Position über der Szene
        const radius = 1.5 * Math.random();
        const angle = Math.random() * Math.PI * 2;
        
        particle.position.x = Math.cos(angle) * radius;
        particle.position.z = Math.sin(angle) * radius;
        particle.position.y = 1 + Math.random() * 1.5;
        
        particle.userData = {
            speed: 0.01 + Math.random() * 0.02,
            originalY: particle.position.y
        };
        
        particles.push(particle);
        group.add(particle);
    }
    
    // Hilfsfunktion zum Erstellen eines Baumes
    function createTree(color) {
        const treeGroup = new THREE.Group();
        
        // Stamm
        const trunkGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.8, 8);
        const trunkMaterial = new THREE.MeshStandardMaterial({
            color: 0x8B4513,
            roughness: 0.9,
            metalness: 0.1
        });
        
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = 0.4;
        trunk.castShadow = true;
        treeGroup.add(trunk);
        
        // Krone / Blätter
        const crownGeometry = new THREE.IcosahedronGeometry(0.4, 1);
        const crownMaterial = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.8,
            metalness: 0.1,
            flatShading: true
        });
        
        const crown = new THREE.Mesh(crownGeometry, crownMaterial);
        crown.position.y = 0.9;
        crown.castShadow = true;
        treeGroup.add(crown);
        
        // Animation-Parameter
        treeGroup.userData = {
            crown: crown,
            trunk: trunk
        };
        
        return treeGroup;
    }
    
    // Hilfsfunktion zum Erstellen einer Gras-Textur
    function createGrassTexture() {
        const size = 512;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // Hintergrund
        ctx.fillStyle = '#4a7c3a';
        ctx.fillRect(0, 0, size, size);
        
        // Grashalme zeichnen
        for (let i = 0; i < 1000; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const length = 2 + Math.random() * 8;
            const width = 1 + Math.random() * 2;
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + (Math.random() - 0.5) * 5, y - length);
            
            const colorValue = 100 + Math.floor(Math.random() * 100);
            ctx.strokeStyle = `rgb(0, ${colorValue}, 0)`;
            ctx.lineWidth = width;
            ctx.stroke();
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }
    
    // Animation-Funktion
    group.userData = {
        animate: function(time) {
            if (!time) time = Date.now() * 0.001;
            
            // Blätter animieren
            leaves.forEach((leaf) => {
                const { originalY, floatSpeed, floatPhase, rotationSpeed } = leaf.userData;
                
                // Schweben
                leaf.position.y = originalY + Math.sin(time * floatSpeed + floatPhase) * 0.1;
                
                // Rotation
                leaf.rotation.x += rotationSpeed;
                leaf.rotation.y += rotationSpeed * 0.8;
                leaf.rotation.z += rotationSpeed * 0.5;
            });
            
            // Baum animieren
            const treeData = treeGroup.userData;
            treeData.crown.rotation.y += 0.005;
            treeData.crown.rotation.x = Math.sin(time * 0.5) * 0.05;
            treeData.trunk.rotation.x = Math.sin(time * 0.5) * 0.02;
            
            // Sonnenlicht-Partikel fallen lassen
            particles.forEach((particle, index) => {
                particle.position.y -= particle.userData.speed;
                
                // Wenn Partikel den Boden erreicht, zurück nach oben setzen
                if (particle.position.y < -0.4) {
                    particle.position.y = particle.userData.originalY;
                    
                    // Neue horizontale Position
                    const radius = 1.5 * Math.random();
                    const angle = Math.random() * Math.PI * 2;
                    particle.position.x = Math.cos(angle) * radius;
                    particle.position.z = Math.sin(angle) * radius;
                }
                
                // Pulsieren
                particle.material.opacity = 0.4 + Math.sin(time * 2 + index) * 0.2;
            });
            
            // Basis subtil animieren
            base.rotation.z = Math.sin(time * 0.2) * 0.05;
        }
    };
    
    return group;
}

/**
 * Erstellt ein benutzerfreundliches Design mit interaktiven Elementen
 */
function createUserFriendlyDesign(color) {
    const group = new THREE.Group();
    
    // Basis - wie ein Touchscreen oder Tablet
    const baseGeometry = new THREE.BoxGeometry(2.5, 0.1, 1.8);
    const baseMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x333333,
        roughness: 0.1,
        metalness: 0.8,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
    });
    
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.receiveShadow = true;
    group.add(base);
    
    // Bildschirm / Interface
    const screenGeometry = new THREE.PlaneGeometry(2.3, 1.6);
    const screenTexture = createInterfaceTexture(color);
    const screenMaterial = new THREE.MeshBasicMaterial({
        map: screenTexture,
        transparent: true
    });
    
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.y = 0.06;
    screen.rotation.x = -Math.PI / 2;
    group.add(screen);
    
    // Interaktive UI-Elemente
    const uiElements = [];
    const uiTypes = ['button', 'slider', 'toggle'];
    
    // Buttons / Interaktionselemente
    for (let i = 0; i < 5; i++) {
        const uiType = uiTypes[i % uiTypes.length];
        let uiGeometry;
        
        switch(uiType) {
            case 'button':
                uiGeometry = new THREE.BoxGeometry(0.3, 0.08, 0.3);
                break;
            case 'slider':
                uiGeometry = new THREE.BoxGeometry(0.6, 0.05, 0.15);
                break;
            case 'toggle':
                uiGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 16);
                break;
        }
        
        const uiMaterial = new THREE.MeshPhysicalMaterial({
            color: color,
            roughness: 0.2,
            metalness: 0.5,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2,
            emissive: color,
            emissiveIntensity: 0.2
        });
        
        const uiElement = new THREE.Mesh(uiGeometry, uiMaterial);
        
        // Position auf dem Bildschirm
        const gridX = (i % 3) - 1;
        const gridY = Math.floor(i / 3) - 0.5;
        
        uiElement.position.x = gridX * 0.7;
        uiElement.position.z = gridY * 0.7;
        uiElement.position.y = 0.1;
        
        // Animation-Parameter
        uiElement.userData = {
            type: uiType,
            originalY: uiElement.position.y,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 1 + Math.random(),
            active: Math.random() > 0.5,
            hoverState: 0
        };
        
        uiElements.push(uiElement);
        group.add(uiElement);
    }
    
    // Cursor / Zeiger
    const cursorGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const cursorMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
    });
    
    const cursor = new THREE.Mesh(cursorGeometry, cursorMaterial);
    cursor.position.y = 0.15;
    cursor.userData = {
        targetX: 0,
        targetZ: 0,
        speed: 0.1
    };
    group.add(cursor);
    
    // Verbindungslinien / Datenpfade
    const connectionLines = [];
    
    for (let i = 0; i < uiElements.length - 1; i++) {
        const startElement = uiElements[i];
        const endElement = uiElements[i + 1];
        
        const points = [];
        points.push(new THREE.Vector3(startElement.position.x, 0.05, startElement.position.z));
        points.push(new THREE.Vector3(endElement.position.x, 0.05, endElement.position.z));
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.3
        });
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        connectionLines.push(line);
        group.add(line);
    }
    
    // Hilfsfunktion zum Erstellen einer Interface-Textur
    function createInterfaceTexture(color) {
        const size = 512;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // Hintergrund
        const gradient = ctx.createLinearGradient(0, 0, 0, size);
        gradient.addColorStop(0, '#222222');
        gradient.addColorStop(1, '#111111');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
        
        // Raster / Grid
        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < size; i += 32) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(size, i);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, size);
            ctx.stroke();
        }
        
        // UI-Elemente
        const colorHex = new THREE.Color(color).getHexString();
        ctx.fillStyle = `#${colorHex}`;
        ctx.strokeStyle = `#${colorHex}`;
        
        // Kreise / Buttons
        for (let i = 0; i < 5; i++) {
            const x = 100 + Math.random() * (size - 200);
            const y = 100 + Math.random() * (size - 200);
            const radius = 10 + Math.random() * 20;
            
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.globalAlpha = 0.3 + Math.random() * 0.4;
            ctx.fill();
            ctx.globalAlpha = 0.7;
            ctx.stroke();
        }
        
        // Linien / Verbindungen
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.5;
        
        for (let i = 0; i < 8; i++) {
            const x1 = Math.random() * size;
            const y1 = Math.random() * size;
            const x2 = Math.random() * size;
            const y2 = Math.random() * size;
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
        
        ctx.globalAlpha = 1.0;
        
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }
    
    // Animation-Funktion
    group.userData = {
        animate: function(time) {
            if (!time) time = Date.now() * 0.001;
            
            // UI-Elemente animieren
            uiElements.forEach((element, index) => {
                const { type, originalY, pulsePhase, pulseSpeed, active } = element.userData;
                
                // Hover-Effekt
                const cursorDistance = Math.sqrt(
                    Math.pow(cursor.position.x - element.position.x, 2) + 
                    Math.pow(cursor.position.z - element.position.z, 2)
                );
                
                if (cursorDistance < 0.2) {
                    // Cursor ist in der Nähe - Hover-Effekt aktivieren
                    element.userData.hoverState = Math.min(1, element.userData.hoverState + 0.1);
                    
                    // Zufällig den aktiven Status ändern
                    if (Math.random() < 0.005) {
                        element.userData.active = !element.userData.active;
                    }
                    
                    // Cursor-Ziel auf dieses Element setzen
                    if (Math.random() < 0.01) {
                        cursor.userData.targetX = element.position.x;
                        cursor.userData.targetZ = element.position.z;
                    }
                } else {
                    // Hover-Effekt deaktivieren
                    element.userData.hoverState = Math.max(0, element.userData.hoverState - 0.05);
                }
                
                // Hover-Effekt anwenden
                const hoverLift = element.userData.hoverState * 0.1;
                const activeBoost = element.userData.active ? 0.05 : 0;
                
                // Position und Skalierung basierend auf Hover und aktivem Status
                element.position.y = originalY + hoverLift + activeBoost + Math.sin(time * pulseSpeed + pulsePhase) * 0.02;
                
                // Emissive-Intensität basierend auf Status
                element.material.emissiveIntensity = 0.2 + (element.userData.active ? 0.4 : 0) + element.userData.hoverState * 0.4;
                
                // Spezifische Animation je nach UI-Typ
                switch(type) {
                    case 'button':
                        // Button wird gedrückt und springt zurück
                        if (element.userData.active) {
                            element.scale.y = 0.8 + Math.sin(time * 8) * 0.2;
                        } else {
                            element.scale.y = 1.0;
                        }
                        break;
                    case 'slider':
                        // Slider bewegt sich hin und her
                        const sliderPos = Math.sin(time * 0.5 + index);
                        element.position.x += (sliderPos * 0.2 - element.position.x) * 0.1;
                        break;
                    case 'toggle':
                        // Toggle dreht sich
                        element.rotation.y += 0.02;
                        break;
                }
            });
            
            // Cursor bewegen
            cursor.position.x += (cursor.userData.targetX - cursor.position.x) * cursor.userData.speed;
            cursor.position.z += (cursor.userData.targetZ - cursor.position.z) * cursor.userData.speed;
            
            // Zufällig neues Ziel setzen
            if (Math.random() < 0.01) {
                cursor.userData.targetX = (Math.random() - 0.5) * 2;
                cursor.userData.targetZ = (Math.random() - 0.5) * 1.4;
            }
            
            // Cursor-Pulsieren
            cursor.scale.setScalar(0.8 + Math.sin(time * 5) * 0.2);
            
            // Verbindungslinien animieren
            connectionLines.forEach((line, index) => {
                line.material.opacity = 0.2 + Math.sin(time * 2 + index) * 0.1;
            });
            
            // Basis subtil animieren
            base.rotation.z = Math.sin(time * 0.2) * 0.02;
            base.rotation.x = Math.sin(time * 0.3) * 0.02;
        }
    };
    
    return group;
}

/**
 * Erstellt ein Standard-Design mit geometrischen Formen und Animationen
 */
function createDefaultDesign(color) {
    const group = new THREE.Group();
    
    // Mehrere geometrische Formen, die zusammen ein ästhetisches Design bilden
    const shapes = [];
    
    // Zentrale Form
    const centerGeometry = new THREE.TorusKnotGeometry(1, 0.3, 64, 16);
    const centerMaterial = new THREE.MeshStandardMaterial({ 
        color: color || 0xff9913,
        roughness: 0.2,
        metalness: 0.8,
        transparent: true,
        opacity: 0.9
    });
    
    const centerShape = new THREE.Mesh(centerGeometry, centerMaterial);
    shapes.push(centerShape);
    group.add(centerShape);
    
    // Umgebende Ringe
    const ringCount = 3;
    
    for (let i = 0; i < ringCount; i++) {
        const ringGeometry = new THREE.TorusGeometry(1.5 + i * 0.4, 0.05, 16, 32);
        const ringMaterial = new THREE.MeshStandardMaterial({ 
            color: color || 0xff9913,
            roughness: 0.3,
            metalness: 0.5,
            transparent: true,
            opacity: 0.7 - i * 0.15
        });
        
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        ring.rotation.y = i * Math.PI / ringCount;
        
        shapes.push(ring);
        group.add(ring);
    }
    
    // Kleine dekorative Kugeln an den Kreuzungspunkten
    const sphereCount = 8;
    for (let i = 0; i < sphereCount; i++) {
        const angle = (i / sphereCount) * Math.PI * 2;
        const radius = 1.8;
        
        const sphereGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const sphereMaterial = new THREE.MeshPhysicalMaterial({
            color: color || 0xff9913,
            roughness: 0.1,
            metalness: 0.9,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            emissive: color || 0xff9913,
            emissiveIntensity: 0.3
        });
        
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.x = Math.cos(angle) * radius;
        sphere.position.z = Math.sin(angle) * radius;
        
        sphere.userData = {
            originalPos: sphere.position.clone(),
            phase: i * (Math.PI / 4)
        };
        
        shapes.push(sphere);
        group.add(sphere);
    }
    
    // Animation-Funktion
    group.userData = {
        animate: function(time) {
            if (!time) time = Date.now() * 0.001;
            
            // Zentrale Form rotieren
            centerShape.rotation.x += 0.005;
            centerShape.rotation.z += 0.003;
            
            // Ringe animieren
            for (let i = 1; i < ringCount + 1; i++) {
                const ring = shapes[i];
                ring.rotation.x = Math.PI / 2 + Math.sin(time * 0.5 + i) * 0.2;
                ring.rotation.z = i * Math.PI / ringCount + time * 0.2;
            }
            
            // Kugeln animieren
            for (let i = ringCount + 1; i < shapes.length; i++) {
                const sphere = shapes[i];
                const { originalPos, phase } = sphere.userData;
                
                // Komplexe Bewegung entlang einer Lissajous-Kurve
                sphere.position.x = originalPos.x + Math.sin(time * 0.7 + phase) * 0.2;
                sphere.position.y = Math.sin(time * 0.9 + phase * 2) * 0.3;
                sphere.position.z = originalPos.z + Math.sin(time * 0.8 + phase * 3) * 0.2;
                
                // Pulsieren der Emissivität
                sphere.material.emissiveIntensity = 0.2 + Math.sin(time * 2 + phase) * 0.2;
            }
        }
    };
    
    return group;
}

/**
 * Hilfsfunktion zum Erstellen eines Pixel-Haustiers
 */
function createPixelPet(pixelSize, pixelGap, color) {
    const pixelGrid = [
        [0,1,0,1,0],
        [1,1,1,1,1],
        [1,1,1,1,1],
        [0,1,1,1,0],
        [0,0,1,0,0]
    ];
    
    const pixelGeometry = new THREE.BoxGeometry(pixelSize, pixelSize, pixelSize);
    const pixelMaterial = new THREE.MeshStandardMaterial({ 
        color: color || 0xff9913,
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
    
    return pixelPet;
}

/**
 * Hilfsfunktion zum Erstellen eines Pixel-Haustiers
 */
function createPixelPet(size, spacing, color) {
    const group = new THREE.Group();
    
    // Einfache Pixel-Form (5x5 Pixel)
    const pixelLayout = [
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0]
    ];
    
    const pixelGeometry = new THREE.BoxGeometry(size, size, size);
    const pixelMaterial = new THREE.MeshStandardMaterial({ 
        color: color || 0xff9913,
        emissive: color || 0xff9913,
        emissiveIntensity: 0.5
    });
    
    // Pixel platzieren
    for (let y = 0; y < pixelLayout.length; y++) {
        for (let x = 0; x < pixelLayout[y].length; x++) {
            if (pixelLayout[y][x] === 1) {
                const pixel = new THREE.Mesh(pixelGeometry, pixelMaterial);
                
                // Position berechnen (zentriert)
                const offsetX = (x - pixelLayout[y].length / 2) * (size + spacing);
                const offsetY = (pixelLayout.length / 2 - y) * (size + spacing);
                
                pixel.position.set(offsetX, offsetY, 0);
                group.add(pixel);
            }
        }
    }
    
    return group;
}

/**
 * Erstellt ein verbessertes Pixel-Haustier mit mehr Details und Animation
 */
function createEnhancedPixelPet(size, spacing, color) {
    const group = new THREE.Group();
    
    // Komplexere Pixel-Form (8x8 Pixel) für mehr Details
    const pixelLayout = [
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 1, 1, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 0]
    ];
    
    // Verschiedene Materialien für mehr Variation
    const pixelMaterials = [
        new THREE.MeshStandardMaterial({ 
            color: color || 0xff9913,
            emissive: color || 0xff9913,
            emissiveIntensity: 0.5,
            roughness: 0.3,
            metalness: 0.7
        }),
        new THREE.MeshStandardMaterial({ 
            color: color ? new THREE.Color(color).offsetHSL(0.05, 0, 0) : 0xffaa33,
            emissive: color ? new THREE.Color(color).offsetHSL(0.05, 0, 0) : 0xffaa33,
            emissiveIntensity: 0.6,
            roughness: 0.4,
            metalness: 0.6
        }),
        new THREE.MeshStandardMaterial({ 
            color: color ? new THREE.Color(color).offsetHSL(-0.05, 0, 0) : 0xff8800,
            emissive: color ? new THREE.Color(color).offsetHSL(-0.05, 0, 0) : 0xff8800,
            emissiveIntensity: 0.4,
            roughness: 0.5,
            metalness: 0.5
        })
    ];
    
    // Verschiedene Geometrien für mehr Variation
    const pixelGeometries = [
        new THREE.BoxGeometry(size, size, size),
        new THREE.SphereGeometry(size/2, 8, 8),
        new THREE.OctahedronGeometry(size/2)
    ];
    
    const pixels = [];
    
    // Pixel platzieren
    for (let y = 0; y < pixelLayout.length; y++) {
        for (let x = 0; x < pixelLayout[y].length; x++) {
            if (pixelLayout[y][x] === 1) {
                // Zufällige Geometrie und Material auswählen
                const geoIndex = Math.floor(Math.random() * pixelGeometries.length);
                const matIndex = Math.floor(Math.random() * pixelMaterials.length);
                
                const pixel = new THREE.Mesh(
                    pixelGeometries[geoIndex],
                    pixelMaterials[matIndex].clone() // Clone für individuelle Anpassungen
                );
                
                // Position berechnen (zentriert)
                const offsetX = (x - pixelLayout[y].length / 2) * (size + spacing);
                const offsetY = (pixelLayout.length / 2 - y) * (size + spacing);
                
                pixel.position.set(offsetX, offsetY, 0);
                
                // Animation-Parameter
                pixel.userData = {
                    originalY: offsetY,
                    speed: 0.5 + Math.random() * 1.5,
                    amplitude: 0.01 + Math.random() * 0.02,
                    phase: Math.random() * Math.PI * 2
                };
                
                pixels.push(pixel);
                group.add(pixel);
            }
        }
    }
    
    // Augen hinzufügen (besondere Pixel)
    const eyePositions = [
        { x: -1.5 * (size + spacing), y: 1 * (size + spacing), z: size/2 },
        { x: 1.5 * (size + spacing), y: 1 * (size + spacing), z: size/2 }
    ];
    
    const eyeGeometry = new THREE.SphereGeometry(size/3, 8, 8);
    const eyeMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 0.7
    });
    
    const pupilGeometry = new THREE.SphereGeometry(size/6, 8, 8);
    const pupilMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x000000
    });
    
    const eyes = [];
    
    eyePositions.forEach(pos => {
        // Auge
        const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        eye.position.set(pos.x, pos.y, pos.z);
        
        // Pupille
        const pupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        pupil.position.z = size/3;
        eye.add(pupil);
        
        eyes.push({ eye, pupil });
        group.add(eye);
    });
    
    // Animation-Funktion
    group.userData = {
        pixels: pixels,
        eyes: eyes,
        animate: function(time) {
            // Pixel animieren
            pixels.forEach((pixel, index) => {
                const data = pixel.userData;
                pixel.position.y = data.originalY + Math.sin(time * data.speed + data.phase) * data.amplitude;
                
                // Leicht rotieren
                pixel.rotation.x = Math.sin(time * 0.3 + index * 0.1) * 0.1;
                pixel.rotation.z = Math.sin(time * 0.2 + index * 0.1) * 0.1;
                
                // Emissive-Intensität pulsieren lassen
                if (pixel.material.emissiveIntensity !== undefined) {
                    const pulse = Math.sin(time * 0.5 + index * 0.2) * 0.5 + 0.5;
                    pixel.material.emissiveIntensity = 0.3 + pulse * 0.4;
                }
            });
            
            // Augen animieren
            eyes.forEach((eye, index) => {
                // Augen blinken lassen
                const blink = Math.sin(time * 0.2 + index) > 0.95;
                eye.eye.scale.y = blink ? 0.1 : 1;
                
                // Pupillen bewegen
                const pupilX = Math.sin(time * 0.3) * 0.3;
                const pupilY = Math.cos(time * 0.2) * 0.3;
                eye.pupil.position.x = pupilX * size/3;
                eye.pupil.position.y = pupilY * size/3;
            });
        }
    };
    
    return group;
}

/**
 * Erstellt eine sehr einfache Gehäuse-Visualisierung
 */
function createGehauseVisualization(color) {
    const group = new THREE.Group();
    
    // Einfaches Quadrat
    const squareShape = new THREE.Shape();
    squareShape.moveTo(-0.7, -0.7);
    squareShape.lineTo(0.7, -0.7);
    squareShape.lineTo(0.7, 0.7);
    squareShape.lineTo(-0.7, 0.7);
    squareShape.lineTo(-0.7, -0.7);
    
    const squareGeometry = new THREE.ShapeGeometry(squareShape);
    const squareMaterial = new THREE.MeshBasicMaterial({ 
        color: color || 0xff9913,
        side: THREE.DoubleSide
    });
    
    const square = new THREE.Mesh(squareGeometry, squareMaterial);
    group.add(square);
    
    // Animation-Funktion
    group.userData = {
        animate: function(time) {
            time = time || Date.now() * 0.001;
            
            // Leichtes Schweben
            group.position.y = Math.sin(time * 0.5) * 0.05;
        }
    };
    
    return group;
}

/**
 * Erstellt eine sehr einfache Portabilitäts-Visualisierung
 */
function createPortabilitaetVisualization(color) {
    const group = new THREE.Group();
    
    // Einfaches Dreieck
    const triangleShape = new THREE.Shape();
    triangleShape.moveTo(0, 0.8);
    triangleShape.lineTo(-0.7, -0.4);
    triangleShape.lineTo(0.7, -0.4);
    triangleShape.lineTo(0, 0.8);
    
    const triangleGeometry = new THREE.ShapeGeometry(triangleShape);
    const triangleMaterial = new THREE.MeshBasicMaterial({ 
        color: color || 0x66cc66,
        side: THREE.DoubleSide
    });
    
    const triangle = new THREE.Mesh(triangleGeometry, triangleMaterial);
    group.add(triangle);
    
    // Animation-Funktion
    group.userData = {
        animate: function(time) {
            time = time || Date.now() * 0.001;
            
            // Leichtes Schweben
            group.position.y = Math.sin(time * 0.5) * 0.05;
        }
    };
    
    return group;
}

/**
 * Erstellt eine sehr einfache PC-Anbindungs-Visualisierung
 */
function createPCAnbindungVisualization(color) {
    const group = new THREE.Group();
    
    // Einfacher Kreis
    const circleGeometry = new THREE.CircleGeometry(0.8, 32);
    const circleMaterial = new THREE.MeshBasicMaterial({ 
        color: color || 0x3366cc,
        side: THREE.DoubleSide
    });
    
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);
    group.add(circle);
    
    // Animation-Funktion
    group.userData = {
        animate: function(time) {
            time = time || Date.now() * 0.001;
            
            // Leichtes Schweben
            group.position.y = Math.sin(time * 0.5) * 0.05;
        }
    };
    
    return group;
}

// Initialisiere alle WebGL-Container, wenn das Dokument geladen ist
document.addEventListener('DOMContentLoaded', initAllWebGLContainers);
