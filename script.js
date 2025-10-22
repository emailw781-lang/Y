const startDate = new Date('2025-06-23T00:00:00');

function updateTimer() {
    const now = new Date();
    
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    
    if (days < 0) {
        months--;
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    const totalMonths = years * 12 + months;
    
    const dateAfterMonths = new Date(startDate);
    dateAfterMonths.setMonth(startDate.getMonth() + totalMonths);
    
    const remainingTime = now - dateAfterMonths;
    const totalSeconds = Math.floor(remainingTime / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingDays = Math.floor(totalHours / 24);
    
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;
    
    document.getElementById('months').textContent = totalMonths;
    document.getElementById('days').textContent = remainingDays;
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateTimer();
setInterval(updateTimer, 1000);

const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.opacity = Math.random() * 0.5 + 0.3;
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 15 + 10;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 0.5 + 0.3;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = ['#ff006e', '#8338ec', '#ff00ff'][Math.floor(Math.random() * 3)];
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
            this.reset();
        }
    }
    
    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.size}px Arial`;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        
        const hearts = ['❤️', '💜', '💕', '💖'];
        const heart = hearts[Math.floor(Math.random() * hearts.length)];
        ctx.fillText(heart, this.x, this.y);
        
        ctx.restore();
    }
}

const particles = [];
const particleCount = 30;

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animate);
}

animate();

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});
