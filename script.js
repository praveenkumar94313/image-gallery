class RomanticCubeGallery {
    constructor() {
        this.cube = document.querySelector('.cube-container');
        this.rotationX = 0;
        this.rotationY = 0;
        this.isMouseDown = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        
        this.init();
    }
    
    init() {
        this.addEventListeners();
        this.createFloatingHearts();
        this.startAutoRotation();
        this.startPetalRain();
        this.addFlowerInteractions();
        this.createMagicParticles();
    }
    
    addEventListeners() {
        // Mouse scroll for rotation
        window.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.rotationY += e.deltaY * 0.5;
            this.rotationX += e.deltaX * 0.5;
            this.updateCubeRotation();
        });
        
        // Mouse drag for rotation
        document.addEventListener('mousedown', (e) => {
            this.isMouseDown = true;
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
            document.body.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!this.isMouseDown) return;
            
            const deltaX = e.clientX - this.lastMouseX;
            const deltaY = e.clientY - this.lastMouseY;
            
            this.rotationY += deltaX * 0.5;
            this.rotationX -= deltaY * 0.5;
            
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
            
            this.updateCubeRotation();
        });
        
        document.addEventListener('mouseup', () => {
            this.isMouseDown = false;
            document.body.style.cursor = 'grab';
        });
        
        // Touch events for mobile
        document.addEventListener('touchstart', (e) => {
            this.isMouseDown = true;
            this.lastMouseX = e.touches[0].clientX;
            this.lastMouseY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!this.isMouseDown) return;
            e.preventDefault();
            
            const deltaX = e.touches[0].clientX - this.lastMouseX;
            const deltaY = e.touches[0].clientY - this.lastMouseY;
            
            this.rotationY += deltaX * 0.5;
            this.rotationX -= deltaY * 0.5;
            
            this.lastMouseX = e.touches[0].clientX;
            this.lastMouseY = e.touches[0].clientY;
            
            this.updateCubeRotation();
        });
        
        document.addEventListener('touchend', () => {
            this.isMouseDown = false;
        });
        
        // Face hover effects
        const faces = document.querySelectorAll('.face');
        faces.forEach(face => {
            face.addEventListener('mouseenter', () => {
                this.createHeartBurst(face);
            });
        });
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    this.rotationY -= 15;
                    break;
                case 'ArrowRight':
                    this.rotationY += 15;
                    break;
                case 'ArrowUp':
                    this.rotationX -= 15;
                    break;
                case 'ArrowDown':
                    this.rotationX += 15;
                    break;
            }
            this.updateCubeRotation();
        });
    }
    
    updateCubeRotation() {
        this.cube.style.transform = `rotateX(${this.rotationX}deg) rotateY(${this.rotationY}deg)`;
    }
    
    startAutoRotation() {
        setInterval(() => {
            if (!this.isMouseDown) {
                this.rotationY += 0.2;
                this.updateCubeRotation();
            }
        }, 50);
    }
    
    createFloatingHearts() {
        const heartsContainer = document.querySelector('.hearts-bg');
        const heartEmojis = ['💕', '💖', '💗', '💝', '💘', '🌹', '✨', '💫', '🦋', '🌸'];
        
        setInterval(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 1.5 + 1}rem;
                left: ${Math.random() * 100}%;
                top: 100%;
                opacity: 0.6;
                pointer-events: none;
                z-index: 5;
                animation: floatUp 4s ease-out forwards;
            `;
            
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 4000);
        }, 2000);
    }
    
    createHeartBurst(face) {
        const rect = face.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 6; i++) {
            const heart = document.createElement('div');
            heart.textContent = '💖';
            heart.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: 1.5rem;
                pointer-events: none;
                z-index: 1000;
                animation: heartBurst 1s ease-out forwards;
                animation-delay: ${i * 0.1}s;
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 1000);
        }
    }
    
    startPetalRain() {
        const petalEmojis = ['🌸', '🌺', '🌹', '🌷', '🌻', '🌼', '💮', '🏵️'];
        
        setInterval(() => {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
            petal.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: -50px;
                font-size: ${Math.random() * 1 + 1.5}rem;
                opacity: ${Math.random() * 0.5 + 0.3};
                pointer-events: none;
                z-index: 3;
                animation: petalFall ${Math.random() * 3 + 5}s linear forwards;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            document.body.appendChild(petal);
            
            setTimeout(() => {
                petal.remove();
            }, 8000);
        }, 800);
    }
    
    addFlowerInteractions() {
        const flowers = document.querySelectorAll('.flower');
        
        flowers.forEach(flower => {
            flower.addEventListener('mouseenter', () => {
                this.createFlowerSparkles(flower);
            });
            
            flower.addEventListener('click', () => {
                this.createFlowerBurst(flower);
            });
        });
    }
    
    createFlowerSparkles(flower) {
        const rect = flower.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 4; i++) {
            const sparkle = document.createElement('div');
            sparkle.textContent = '✨';
            sparkle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: 1rem;
                pointer-events: none;
                z-index: 1000;
                animation: sparkleOut 1.5s ease-out forwards;
                animation-delay: ${i * 0.2}s;
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1500);
        }
    }
    
    createFlowerBurst(flower) {
        const rect = flower.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const burstEmojis = ['🌸', '🌺', '💐', '🌷', '🌻'];
        
        for (let i = 0; i < 8; i++) {
            const burstFlower = document.createElement('div');
            burstFlower.textContent = burstEmojis[Math.floor(Math.random() * burstEmojis.length)];
            burstFlower.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: 1.5rem;
                pointer-events: none;
                z-index: 1000;
                animation: flowerBurst 2s ease-out forwards;
                animation-delay: ${i * 0.1}s;
            `;
            
            document.body.appendChild(burstFlower);
            
            setTimeout(() => {
                burstFlower.remove();
            }, 2000);
        }
    }
    
    createMagicParticles() {
        const cubeContainer = document.querySelector('.cube-container');
        
        setInterval(() => {
            const particle = document.createElement('div');
            particle.textContent = ['✨', '💫', '⭐', '🌟'][Math.floor(Math.random() * 4)];
            
            const angle = Math.random() * Math.PI * 2;
            const radius = 200 + Math.random() * 50;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            particle.style.cssText = `
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(${x}px, ${y}px);
                font-size: 1.2rem;
                pointer-events: none;
                z-index: 7;
                animation: magicParticle 3s ease-out forwards;
                opacity: 0.8;
            `;
            
            cubeContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }, 500);
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes heartBurst {
        0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RomanticCubeGallery();
});

// Add some romantic quotes that appear on click
const romanticQuotes = [
    "Love is in the air 💕",
    "You make my heart skip a beat 💖",
    "Together we create magic ✨",
    "Every moment with you is precious 💝",
    "You are my sunshine 🌹",
    "Love conquers all 💫"
];

document.addEventListener('click', (e) => {
    if (e.target.closest('.face')) {
        const quote = document.createElement('div');
        quote.textContent = romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)];
        quote.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            color: #ff69b4;
            font-weight: bold;
            font-size: 1.2rem;
            pointer-events: none;
            z-index: 1000;
            animation: fadeUpOut 2s ease-out forwards;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(quote);
        
        setTimeout(() => {
            quote.remove();
        }, 2000);
    }
});

// Add fadeUpOut animation
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeUpOut {
        0% {
            transform: translateY(0);
            opacity: 1;
        }
        100% {
            transform: translateY(-50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(fadeStyle);

// Add additional CSS animations for new effects
const additionalStyle = document.createElement('style');
additionalStyle.textContent = `
    @keyframes sparkleOut {
        0% {
            transform: translate(0, 0) scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.5) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes flowerBurst {
        0% {
            transform: translate(0, 0) scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px) scale(1.2) rotate(180deg);
            opacity: 0;
        }
    }
    
    @keyframes magicParticle {
        0% {
            opacity: 0.8;
            transform: translate(var(--x, 0), var(--y, 0)) scale(0);
        }
        50% {
            opacity: 1;
            transform: translate(var(--x, 0), var(--y, 0)) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translate(var(--x, 0), var(--y, 0)) scale(0.5);
        }
    }
`;
document.head.appendChild(additionalStyle);