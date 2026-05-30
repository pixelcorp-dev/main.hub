// --- Tactical Target Grid Canvas System ---
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let mouseX = 0;
let mouseY = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Draws structural grid patterns and laser alignment metrics near the cursor position
function drawTargetMatrix() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const gridSize = 50;
    ctx.strokeStyle = 'rgba(49, 255, 126, 0.02)';
    ctx.lineWidth = 1;

    // Background Micro Grid Layout Loop
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // Dynamic Tracking Laser Crosshairs
    if (mouseX > 0 && mouseY > 0) {
        ctx.save();
        ctx.strokeStyle = 'rgba(49, 255, 126, 0.12)';
        ctx.lineWidth = 0.5;
        
        // Horizontal vector sweep
        ctx.beginPath();
        ctx.moveTo(0, mouseY);
        ctx.lineTo(canvas.width, mouseY);
        ctx.stroke();

        // Vertical vector sweep
        ctx.beginPath();
        ctx.moveTo(mouseX, 0);
        ctx.lineTo(mouseX, canvas.height);
        ctx.stroke();

        // Minimalist Target Ring Bounds Tracker
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 20, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(49, 255, 126, 0.25)';
        ctx.stroke();
        
        ctx.restore();
    }

    requestAnimationFrame(drawTargetMatrix);
}

drawTargetMatrix();
