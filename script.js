// --- Interactive Crosshair Engine Configuration ---
const dot = document.querySelector('.custom-cursor-dot');
const outline = document.querySelector('.custom-cursor-outline');

window.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    
    outline.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
    }, { duration: 240, fill: "forwards" });
});

// Dynamic Card Shifting Interface Interactions
document.querySelectorAll('.hub-card').forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        outline.style.width = '48px';
        outline.style.height = '48px';
        // Set outline color contextually based on card focus
        outline.style.borderColor = (index === 0) ? '#00f0ff' : '#39ff14';
    });
    
    card.addEventListener('mouseleave', () => {
        outline.style.width = '30px';
        outline.style.height = '30px';
        outline.style.borderColor = '#00a030';
    });
});

// Add listeners for simple link targets too
document.querySelectorAll('.discord-btn, .channel-tag').forEach(item => {
    item.addEventListener('mouseenter', () => {
        outline.style.width = '40px';
        outline.style.height = '40px';
        outline.style.borderColor = item.classList.contains('discord-btn') ? '#5865F2' : '#39ff14';
    });
    item.addEventListener('mouseleave', () => {
        outline.style.width = '30px';
        outline.style.height = '30px';
        outline.style.borderColor = '#00a030';
    });
});

// --- High-Performance System Ambient Particles Core ---
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class HubParticle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.8 + 0.4;
        this.speedY = -Math.random() * 0.25 - 0.05;
        this.alpha = Math.random() * 0.25 + 0.05;
        // 30% chance for cyan matrix dots, remaining are tracking green dots
        this.color = Math.random() > 0.7 ? '#00f0ff' : '#39ff14';
    }
    update() {
        this.y += this.speedY;
        if (this.y < 0) this.reset();
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}

// Instantiate internal array mapping loop
for(let i=0; i < 50; i++) { particles.push(new HubParticle()); }

function renderLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(renderLoop);
}
renderLoop();
