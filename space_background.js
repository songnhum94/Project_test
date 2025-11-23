const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;

// Resize canvas
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resize);
resize();

// --- Classes ---

class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2;
        this.speed = Math.random() * 0.5 + 0.1;
        this.opacity = Math.random();
        this.fadeDir = Math.random() > 0.5 ? 0.01 : -0.01;
        this.color = this.getRandomColor();
    }

    getRandomColor() {
        const colors = ['#ffffff', '#00f2ff', '#bc13fe', '#ffd700'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speed;
        if (this.y > height) {
            this.y = 0;
            this.x = Math.random() * width;
        }

        // Twinkle effect
        this.opacity += this.fadeDir;
        if (this.opacity > 1 || this.opacity < 0.2) {
            this.fadeDir = -this.fadeDir;
        }
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

class Comet {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = -100;
        this.length = Math.random() * 80 + 20;
        this.speed = Math.random() * 5 + 3;
        this.angle = Math.PI / 4; // 45 degrees
        this.active = false;
        this.nextSpawn = Math.random() * 200 + 100; // Frames until spawn
    }

    update() {
        if (!this.active) {
            this.nextSpawn--;
            if (this.nextSpawn <= 0) {
                this.active = true;
                this.x = Math.random() * width;
                this.y = -100;
            }
            return;
        }

        this.x -= this.speed; // Move left
        this.y += this.speed; // Move down

        if (this.x < -100 || this.y > height + 100) {
            this.active = false;
            this.nextSpawn = Math.random() * 300 + 200;
        }
    }

    draw() {
        if (!this.active) return;

        const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.length, this.y - this.length);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.length, this.y - this.length);
        ctx.stroke();
    }
}

class Meteor {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 20 + 10;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.color = '#333';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.x < -50) this.x = width + 50;
        if (this.x > width + 50) this.x = -50;
        if (this.y < -50) this.y = height + 50;
        if (this.y > height + 50) this.y = -50;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = 'rgba(50, 50, 60, 0.8)';
        // Draw irregular shape
        ctx.beginPath();
        ctx.moveTo(this.size, 0);
        ctx.lineTo(this.size * 0.5, this.size * 0.8);
        ctx.lineTo(-this.size * 0.5, this.size * 0.6);
        ctx.lineTo(-this.size, -this.size * 0.2);
        ctx.lineTo(-this.size * 0.2, -this.size);
        ctx.lineTo(this.size * 0.6, -this.size * 0.8);
        ctx.closePath();
        ctx.fill();
        // Add some detail/shading
        ctx.strokeStyle = 'rgba(80, 80, 100, 0.5)';
        ctx.stroke();
        ctx.restore();
    }
}

class Rocket {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = -100;
        this.y = Math.random() * (height - 200) + 100;
        this.speed = 3;
        this.active = false;
        this.nextSpawn = 100; // Start soon
        this.wobble = 0;
    }

    update() {
        if (!this.active) {
            this.nextSpawn--;
            if (this.nextSpawn <= 0) {
                this.active = true;
                this.y = Math.random() * (height * 0.8) + height * 0.1;
                this.x = -100;
            }
            return;
        }

        this.x += this.speed;
        this.wobble += 0.1;
        this.y += Math.sin(this.wobble) * 0.5; // Gentle up/down movement

        if (this.x > width + 100) {
            this.active = false;
            this.nextSpawn = Math.random() * 500 + 300; // Wait a while before next pass
        }
    }

    draw() {
        if (!this.active) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.PI / 2); // Rotate to face right

        // Rocket Body
        ctx.fillStyle = '#e0e0e0'; // Silver/White
        ctx.beginPath();
        ctx.ellipse(0, 0, 15, 40, 0, 0, Math.PI * 2);
        ctx.fill();

        // Cockpit window
        ctx.fillStyle = '#00f2ff'; // Cyan
        ctx.beginPath();
        ctx.arc(0, -10, 8, 0, Math.PI * 2);
        ctx.fill();

        // Fins
        ctx.fillStyle = '#ff0055'; // Red
        ctx.beginPath();
        ctx.moveTo(-15, 20);
        ctx.lineTo(-25, 40);
        ctx.lineTo(-10, 35);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(15, 20);
        ctx.lineTo(25, 40);
        ctx.lineTo(10, 35);
        ctx.fill();

        // Flame
        ctx.fillStyle = `rgba(255, 100, 0, ${Math.random() * 0.5 + 0.5})`;
        ctx.beginPath();
        ctx.moveTo(-10, 40);
        ctx.lineTo(0, 60 + Math.random() * 20);
        ctx.lineTo(10, 40);
        ctx.fill();

        ctx.restore();
    }
}

// --- Init ---

const stars = Array(150).fill().map(() => new Star());
const comets = Array(3).fill().map(() => new Comet());
const meteors = Array(5).fill().map(() => new Meteor());
const rocket = new Rocket();

// --- Animation Loop ---

function animate() {
    // Clear with trail effect
    ctx.fillStyle = 'rgba(5, 5, 16, 0.3)'; // Dark blue/black with transparency
    ctx.fillRect(0, 0, width, height);

    // Draw Stars
    stars.forEach(star => {
        star.update();
        star.draw();
    });

    // Draw Meteors (behind rocket)
    meteors.forEach(meteor => {
        meteor.update();
        meteor.draw();
    });

    // Draw Comets
    comets.forEach(comet => {
        comet.update();
        comet.draw();
    });

    // Draw Rocket
    rocket.update();
    rocket.draw();

    requestAnimationFrame(animate);
}

animate();
