// ...existing code...
import React, { useEffect, useRef } from 'react';

const featuresData = [
    {
        title: 'Flashmoon Platform',
        image: '/image/Platform.png',
        desc: 'The ultimate decentralized platform for seamless crypto transactions and interactions.',
        link: 'https://flashmoon.io/tutorial',
        linkText: 'Launch App',
        color: 'text-[var(--color-neon-blue)]',
        linkColor: 'text-white'
    },
    {
        title: 'Flash Moon Chart',
        image: '/image/FM Chart.jpeg',
        desc: 'Real-time analytics and charting tools to keep you ahead of the market trends.',
        link: 'https://www.geckoterminal.com/bsc/pools/0x9232056b89896429a0fa8fb5f84dde78afb43c57?utm_source=coingecko&utm_medium=referral&utm_campaign=searchresults',
        linkText: 'View Chart',
        color: 'text-[var(--color-neon-purple)]',
        linkColor: 'text-[var(--color-neon-purple)]'
    },
    {
        title: 'Flash Moon Swap',
        image: '/image/FM Coin.jpeg',
        desc: 'Instant, low-fee token swaps powered by our advanced liquidity protocol.',
        link: 'https://pancakeswap.finance/swap?chain=bsc&inputCurrency=0x55d398326f99059fF775485246999027B3197955&outputCurrency=0x7fEd362090f9ce6C68C7D95c9d5DFE29f511D5a9',
        linkText: 'Swap Now',
        color: 'text-[var(--color-neon-green)]',
        linkColor: 'text-[var(--color-neon-green)]'
    },
    {
        title: 'Flashmoon Card',
        image: '/image/CRYPTO CARDS.png',
        desc: 'An easy way to get your crypto spending power. Seamlessly convert and spend your assets worldwide.',
        link: 'https://flashmoon.io/Flashmoonshop',
        linkText: 'Get Card',
        color: 'text-[#ff00a3]',
        linkColor: 'text-[#ff00a3]'
    },
    {
        title: 'Staking Mode',
        image: '/image/Staking Mode.png',
        desc: 'Let your assets work for you. Secure staking pools with attractive APY rewards for holders.',
        link: 'https://flashmoon.io/flashmoon-staking',
        linkText: 'Start Staking',
        color: 'text-[var(--color-neon-green)]',
        linkColor: 'text-[var(--color-neon-green)]'
    },
    {
        title: 'Gacha & NFT',
        image: '/image/Gacha.png',
        desc: 'Try your luck with our unique Gacha system. Win rare NFTs and exclusive rewards.',
        link: 'https://flashmoon.io/flashmoon-gacha',
        linkText: 'Play Now',
        color: 'text-[var(--color-neon-gold)]',
        linkColor: 'text-[var(--color-neon-gold)]',
        target: '_blank'
    },
    {
        title: 'Flash Moon +',
        image: '/image/FM+.png',
        desc: 'Enhanced features for premium users. Unlock exclusive benefits and tools.',
        link: 'https://flashmoon.io/flashmoon-defi/plus/1/1/1',
        linkText: 'Learn More',
        color: 'text-[var(--color-neon-blue)]',
        linkColor: 'text-white'
    },
    {
        title: 'Flash Moon Super Plus',
        image: '/image/Super.jpeg',
        desc: 'The ultimate tier for serious investors. Maximum rewards and priority support.',
        link: 'https://flashmoon.io/flashmoon-defi/superplus/1/1/1',
        linkText: 'Upgrade Now',
        color: 'text-[var(--color-neon-purple)]',
        linkColor: 'text-[var(--color-neon-purple)]'
    },
    {
        title: 'WeB.30 DeFi',
        image: '/image/Web3.jpeg',
        desc: 'Comprehensive guides and tutorials to help you navigate the Flashmoon ecosystem.',
        link: 'https://flashmoon.io/flashmoon-defi',
        linkText: 'Read Guide',
        color: 'text-[var(--color-neon-green)]',
        linkColor: 'text-[var(--color-neon-green)]'
    }
];

const Features = () => {
    const sceneRef = useRef(null);
    const carouselRef = useRef(null);
    const cardRefs = useRef([]);
    const animRef = useRef(null);
    const angleRef = useRef(0);
    const starsContainerRef = useRef(null);
    const rocketsRef = useRef([]);

    // click / double-tap control
    const movedRef = useRef(false);
    const lastTapRef = useRef(0);
    const DOUBLE_TAP_MS = 400;

    // Generate random stars
    const generateStars = () => {
        const stars = [];
        for (let i = 0; i < 60; i++) {
            stars.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 2.5 + 0.5,
                opacity: Math.random() * 0.7 + 0.3,
                duration: Math.random() * 3 + 2
            });
        }
        return stars;
    };

    // Generate asteroids
    const generateAsteroids = () => {
        const asteroids = [];
        for (let i = 0; i < 8; i++) {
            asteroids.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 15 + 8,
                duration: Math.random() * 20 + 15,
                delay: Math.random() * 5
            });
        }
        return asteroids;
    };

    // Generate rockets
    const generateRockets = () => {
        const rockets = [];
        for (let i = 0; i < 3; i++) {
            rockets.push({
                id: i,
                delay: i * 4
            });
        }
        return rockets;
    };

    const stars = generateStars();
    const asteroids = generateAsteroids();

    useEffect(() => {
        const carousel = carouselRef.current;
        const scene = sceneRef.current;
        const cards = cardRefs.current.filter(Boolean);
        const cellCount = cards.length;
        if (!carousel || cellCount === 0 || !scene) return;

        // compute card width and dynamic radius for nicer spacing
        const cardWidth = cards[0].offsetWidth || 190;
        const radius = Math.round((cardWidth / 2) / Math.tan(Math.PI / cellCount)) + 100;

        const theta = 360 / cellCount;

        cards.forEach((card, i) => {
            const angle = theta * i;
            card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        });

        // automatic rotation
        let currentAngle = 0;
        let autoRotate = true;
        function autoRotateFrame() {
            if (autoRotate) {
                currentAngle -= 0.18;
                angleRef.current = currentAngle;
                carousel.style.transform = `translateZ(-${radius}px) rotateY(${currentAngle}deg)`;
            }
            animRef.current = requestAnimationFrame(autoRotateFrame);
        }
        animRef.current = requestAnimationFrame(autoRotateFrame);

        // Drag / pointer interaction with simple inertia
        let isDragging = false;
        let startX = 0;
        let lastX = 0;
        let lastTime = 0;
        let velocity = 0;
        const sensitivity = 0.35;
        const MOVE_THRESHOLD = 6;

        function updateCarouselByAngle(angle) {
            carousel.style.transform = `translateZ(-${radius}px) rotateY(${angle}deg)`;
        }

        function onPointerDown(e) {
            isDragging = true;
            movedRef.current = false;
            autoRotate = false;
            cancelAnimationFrame(animRef.current);
            startX = e.clientX;
            lastX = startX;
            lastTime = performance.now();
            velocity = 0;
            try { e.target.setPointerCapture && e.target.setPointerCapture(e.pointerId); } catch {}
            scene.style.cursor = 'grabbing';
        }

        function onPointerMove(e) {
            if (!isDragging) return;
            const x = e.clientX;
            const now = performance.now();
            const dx = x - lastX;
            const dt = Math.max(1, now - lastTime);
            velocity = dx / dt;
            lastX = x;
            lastTime = now;

            if (Math.abs(x - startX) > MOVE_THRESHOLD) movedRef.current = true;

            currentAngle = angleRef.current + dx * sensitivity;
            angleRef.current = currentAngle;
            updateCarouselByAngle(currentAngle);
        }

        function startInertia() {
            let v = velocity;
            const decay = 0.95;
            function step() {
                v *= decay;
                if (Math.abs(v) < 0.0005) {
                    autoRotate = true;
                    animRef.current = requestAnimationFrame(autoRotateFrame);
                    return;
                }
                const dx = v * 16;
                currentAngle = angleRef.current + dx * sensitivity;
                angleRef.current = currentAngle;
                updateCarouselByAngle(currentAngle);
                requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        }

        function onPointerUp(e) {
            if (!isDragging) return;
            isDragging = false;
            try { e.target.releasePointerCapture && e.target.releasePointerCapture(e.pointerId); } catch {}
            scene.style.cursor = 'grab';
            startInertia();
        }

        function onPointerCancel() {
            if (!isDragging) return;
            isDragging = false;
            scene.style.cursor = 'grab';
            startInertia();
        }

        scene.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerCancel);

        scene.style.cursor = 'grab';

        const onEnter = () => { autoRotate = false; };
        const onLeave = () => { autoRotate = true; };

        scene.addEventListener('mouseenter', onEnter);
        scene.addEventListener('mouseleave', onLeave);

        return () => {
            cancelAnimationFrame(animRef.current);
            scene.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointercancel', onPointerCancel);
            scene.removeEventListener('mouseenter', onEnter);
            scene.removeEventListener('mouseleave', onLeave);
        };
    }, []);

    // click handler: require double click / double tap to open link
    function handleCardClick(e, feature) {
        e.stopPropagation();
        const now = performance.now();
        // ignore clicks that followed a drag
        if (movedRef.current) {
            return;
        }
        if (now - lastTapRef.current <= DOUBLE_TAP_MS) {
            // double tap detected
            window.open(feature.link, feature.target || '_self');
            lastTapRef.current = 0;
        } else {
            // first tap - set timestamp and ignore (wait for second tap)
            lastTapRef.current = now;
            // optional: provide small visual feedback here if desired
        }
    }

    return (
        <section className="py-10 pb-24 px-0 relative z-10 flex justify-center overflow-hidden">
            {/* Background Stars */}
            <div className="stars-background" ref={starsContainerRef}>
                {stars.map(star => (
                    <div
                        key={`star-${star.id}`}
                        className="star"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            opacity: star.opacity,
                            animation: `twinkle ${star.duration}s infinite`
                        }}
                    />
                ))}
            </div>

            {/* Asteroids */}
            {asteroids.map(asteroid => (
                <div
                    key={`asteroid-${asteroid.id}`}
                    className="asteroid"
                    style={{
                        width: `${asteroid.size}px`,
                        height: `${asteroid.size}px`,
                        animation: `floatAsteroid ${asteroid.duration}s infinite linear`,
                        animationDelay: `${asteroid.delay}s`
                    }}
                />
            ))}

            {/* Carousel */}
            <div style={{ width: 260 }} className="scene" ref={sceneRef}>
                <div className="carousel" ref={carouselRef}>
                    {featuresData.map((feature, i) => (
                        <div
                            key={i}
                            className="card"
                            ref={el => (cardRefs.current[i] = el)}
                            role="button"
                            tabIndex={0}
                            onClick={(e) => handleCardClick(e, feature)}
                            onDoubleClick={() => window.open(feature.link, feature.target || '_self')}
                            onKeyDown={(e) => { if (e.key === 'Enter') window.open(feature.link, feature.target || '_self'); }}
                        >
                            <img src={feature.image} alt={feature.title} className="card-image" />
                            <div className="card-meta">
                                <h3 className={`card-title ${feature.color}`}>{feature.title}</h3>
                                <p className="card-desc">{feature.desc}</p>
                                <a
                                    href={feature.link}
                                    target={feature.target || '_self'}
                                    rel={feature.target === '_blank' ? 'noreferrer noopener' : undefined}
                                    className={`card-link ${feature.linkColor}`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {feature.linkText} →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.9; }
                }

                @keyframes floatAsteroid {
                    0% {
                        transform: translateX(-150vw) translateY(${Math.random() * 100}vh) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateX(150vw) translateY(${Math.random() * 100}vh) rotate(360deg);
                        opacity: 0;
                    }
                }

                @keyframes flyRocket {
                    0% {
                        left: -100px;
                        top: 20%;
                        opacity: 0;
                        transform: rotate(25deg);
                    }
                    5% {
                        opacity: 1;
                    }
                    95% {
                        opacity: 1;
                    }
                    100% {
                        left: 110vw;
                        top: -50px;
                        opacity: 0;
                        transform: rotate(25deg);
                    }
                }

                .stars-background {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 1;
                }

                .star {
                    position: absolute;
                    background: radial-gradient(circle, #fff, #fff8dc);
                    border-radius: 50%;
                    box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
                }

                .asteroid {
                    position: fixed;
                    border-radius: 50%;
                    background: radial-gradient(circle at 30% 30%, #8b8b7a, #3a3a2a);
                    box-shadow: inset -2px -2px 5px rgba(0,0,0,0.5), 0 0 15px rgba(139, 139, 122, 0.3);
                    z-index: 2;
                    pointer-events: none;
                }

                .rocket {
                    position: fixed;
                    font-size: 40px;
                    z-index: 3;
                    pointer-events: none;
                    filter: drop-shadow(0 0 10px rgba(255, 150, 0, 0.6));
                }

                .scene {
                    width: 260px;
                    height: 360px;
                    perspective: 1200px;
                    position: relative;
                    z-index: 10;
                }

                .carousel {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    transform-style: preserve-3d;
                    transition: transform 0.2s;
                    left: 0;
                    top: 0;
                }

                .card {
                    position: absolute;
                    width: 220px;
                    height: 320px;
                    left: 20px;
                    top: 20px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 16px;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    color: #fff;
                    box-shadow: 0 6px 30px rgba(0,0,0,0.6);
                    backdrop-filter: blur(6px);
                    cursor: pointer;
                    transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
                    -webkit-user-select: none;
                    user-select: none;
                }
                .card:hover {
                    transform: translateY(-6px) scale(1.02);
                    box-shadow: 0 12px 40px rgba(0,0,0,0.8);
                    border-color: rgba(255,255,255,0.12);
                }
                .card-image {
                    width: 100%;
                    height: 160px;
                    object-fit: cover;
                    display: block;
                    background: rgba(0,0,0,0.2);
                }
                .card-meta {
                    padding: 12px;tyle>
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    flex-grow: 1;
                }export default Features;
                .card-title {                    font-size: 1rem;
                    font-weight: 700;
                    margin: 0;
                }
                .card-desc {
                    font-size: 0.85rem;
                    color: #d8d8d8;
                    line-height: 1.1;
                    flex-grow: 1;
                }
                .card-link {
                    font-weight: 700;
                    font-size: 0.9rem;
                    text-decoration: none;
                }

                @media (max-width: 480px) {
                    .scene { width: 200px; height: 300px; }
                    .card { width: 180px; height: 260px; left: 10px; top: 10px; }
                    .card-image { height: 130px; }
                    .rocket { font-size: 30px; }
                    .rocket { font-size: 30px; }
                }
            `}</style>
        </section>
    );
};

export default Features;
// ...existing code...