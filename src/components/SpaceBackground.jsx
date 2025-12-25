import React, { useEffect, useRef } from 'react';

const SpaceBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // --- Star Class ---
        class Star {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.z = Math.random() * 2 + 0.5; // Depth factor
                this.size = Math.random() * 1.5;
                this.opacity = Math.random();
                this.fadeSpeed = Math.random() * 0.02 + 0.005;
                // Neon colors
                const colors = ['#00f2ff', '#bc13fe', '#ffffff'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                // Parallax effect: stars move slower if they are "further away" (smaller z)
                this.y += 0.2 * this.z;

                // Twinkle effect
                this.opacity += this.fadeSpeed;
                if (this.opacity > 1 || this.opacity < 0) {
                    this.fadeSpeed = -this.fadeSpeed;
                }

                // Reset if off screen
                if (this.y > canvas.height) {
                    this.y = 0;
                    this.x = Math.random() * canvas.width;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = Math.abs(this.opacity);
                ctx.fill();
                ctx.globalAlpha = 1.0;
            }
        }

        // --- Comet Class ---
        class Comet {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height * 0.5; // Start in upper half
                this.length = Math.random() * 80 + 20;
                this.speed = Math.random() * 5 + 2;
                this.angle = Math.PI / 4; // 45 degrees
                this.opacity = 0;
                this.active = false;

                // Random activation
                setTimeout(() => { this.active = true; this.opacity = 1; }, Math.random() * 5000);
            }

            update() {
                if (!this.active) return;

                this.x += this.speed;
                this.y += this.speed;
                this.opacity -= 0.01;

                if (this.x > canvas.width || this.y > canvas.height || this.opacity <= 0) {
                    this.reset();
                }
            }

            draw() {
                if (!this.active) return;

                const endX = this.x - this.length * Math.cos(this.angle);
                const endY = this.y - this.length * Math.sin(this.angle);

                const gradient = ctx.createLinearGradient(this.x, this.y, endX, endY);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
                gradient.addColorStop(1, 'rgba(0, 242, 255, 0)');

                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(endX, endY);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

        // --- Rocket Class (Modified) ---
        class Rocket {
            constructor() {
                this.reset();
            }

            reset() {
                // Randomize spawn edge: 0=top, 1=right, 2=bottom, 3=left
                const edge = Math.floor(Math.random() * 4);

                if (edge === 0) { // Top
                    this.x = Math.random() * canvas.width;
                    this.y = -50;
                    this.angle = Math.PI / 2 + (Math.random() - 0.5); // Downwards-ish
                } else if (edge === 1) { // Right
                    this.x = canvas.width + 50;
                    this.y = Math.random() * canvas.height;
                    this.angle = Math.PI + (Math.random() - 0.5); // Leftwards-ish
                } else if (edge === 2) { // Bottom
                    this.x = Math.random() * canvas.width;
                    this.y = canvas.height + 50;
                    this.angle = -Math.PI / 2 + (Math.random() - 0.5); // Upwards-ish
                } else { // Left
                    this.x = -50;
                    this.y = Math.random() * canvas.height;
                    this.angle = 0 + (Math.random() - 0.5); // Rightwards-ish
                }

                this.speed = Math.random() * 3 + 1; // Random speed
                this.size = Math.random() * 0.5 + 0.5; // Random size
            }

            update() {
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;

                // Reset if far off screen
                if (this.x < -100 || this.x > canvas.width + 100 ||
                    this.y < -100 || this.y > canvas.height + 100) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle + Math.PI / 2); // Point forward (assuming rocket sprite points UP)
                ctx.scale(this.size, this.size);

                // Rocket Body
                ctx.fillStyle = '#e2e8f0';
                ctx.beginPath();
                ctx.ellipse(0, 0, 10, 30, 0, 0, Math.PI * 2);
                ctx.fill();

                // Rocket Window
                ctx.fillStyle = '#38bdf8';
                ctx.beginPath();
                ctx.arc(0, -5, 5, 0, Math.PI * 2);
                ctx.fill();

                // Fins
                ctx.fillStyle = '#ef4444';
                ctx.beginPath();
                ctx.moveTo(-10, 10);
                ctx.lineTo(-20, 30);
                ctx.lineTo(-5, 25);
                ctx.moveTo(10, 10);
                ctx.lineTo(20, 30);
                ctx.lineTo(5, 25);
                ctx.fill();

                // Flame
                ctx.fillStyle = `rgba(255, ${Math.random() * 100 + 100}, 0, 0.8)`;
                ctx.beginPath();
                ctx.moveTo(-5, 25);
                ctx.lineTo(5, 25);
                ctx.lineTo(0, 45 + Math.random() * 15);
                ctx.fill();

                ctx.restore();
            }
        }

        // Initialize Objects
        const stars = Array.from({ length: 150 }, () => new Star());
        const comets = Array.from({ length: 3 }, () => new Comet());
        // Create 5 rockets
        const rockets = Array.from({ length: 5 }, () => new Rocket());

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Background Gradient (Deep Space)
            const bgGradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, canvas.width
            );
            bgGradient.addColorStop(0, '#0b0d17');
            bgGradient.addColorStop(1, '#050510');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                star.update();
                star.draw();
            });

            comets.forEach(comet => {
                comet.update();
                comet.draw();
            });

            rockets.forEach(rocket => {
                rocket.update();
                rocket.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default SpaceBackground;
