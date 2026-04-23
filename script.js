/**
 * THE TIFA EXPERIENCE ENGINE v5.2
 */

"use strict";

document.addEventListener('DOMContentLoaded', () => {

    // 1. PRELOADER ENGINE
    const fill = document.getElementById('fill');
    const loader = document.getElementById('loader');
    let progress = 0;

    const loadingInterval = setInterval(() => {
        progress += Math.random() * 25;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 1500);
            }, 600);
        }
        fill.style.width = progress + '%';
    }, 180);

    // 2. SMOOTH SCROLL REVEAL
    const scenes = document.querySelectorAll('.scene');
    
    scenes.forEach(s => {
        s.style.opacity = '0';
        s.style.transform = 'translateY(40px)';
        s.style.transition = 'opacity 1.2s ease-out, transform 1.2s ease-out';
    });

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight / 5 * 4.2;
        scenes.forEach(scene => {
            const sceneTop = scene.getBoundingClientRect().top;
            if (sceneTop < triggerBottom) {
                scene.style.opacity = '1';
                scene.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // 3. SURPRISE MODAL LOGIC
    const btnActivate = document.getElementById('activate-msg');
    const modal = document.getElementById('modal-overlay');
    const btnClose = document.getElementById('close-modal');
    const typeArea = document.getElementById('typewriter-area');

    // Pesan yang lebih personal
    const loveLetter = "Tifa, makasih ya buat satu bulan ini. Aku beneran bahagia banget bisa ada di samping kamu sekarang. Ternyata bener ya, duniaku jadi jauh lebih berwarna sejak ada kamu di dalamnya. Kamu lebih berharga dari segalanya. Happy 1st Mensive, Tifa sayangnya Adit! ❤️";

    let charIndex = 0;
    let isTyping = false;

    const runTypewriter = () => {
        if (charIndex < loveLetter.length && isTyping) {
            typeArea.innerHTML += loveLetter.charAt(charIndex);
            charIndex++;
            setTimeout(runTypewriter, 55);
        } else {
            isTyping = false;
        }
    };

    btnActivate.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        if (!isTyping && charIndex === 0) {
            isTyping = true;
            typeArea.innerHTML = "";
            setTimeout(runTypewriter, 800);
            spawnHearts();
        }
    });

    btnClose.addEventListener('click', (e) => {
        e.stopPropagation();
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // 4. HEART PARTICLE SYSTEM
    function spawnHearts() {
        for (let i = 0; i < 25; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                const symbols = ['❤️', '💖', '✨'];
                heart.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
                heart.style.position = 'fixed';
                heart.style.left = '50%';
                heart.style.top = '50%';
                heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '12001'; 
                
                const angle = Math.random() * Math.PI * 2;
                const velocity = 6 + Math.random() * 12;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                document.body.appendChild(heart);
                
                let posX = 0;
                let posY = 0;
                let opacity = 1;
                
                const animateHeart = () => {
                    posX += vx;
                    posY += vy;
                    opacity -= 0.015;
                    heart.style.transform = `translate(${posX}px, ${posY}px) rotate(${posX * 0.5}deg)`;
                    heart.style.opacity = opacity;
                    
                    if (opacity > 0) {
                        requestAnimationFrame(animateHeart);
                    } else {
                        heart.remove();
                    }
                };
                requestAnimationFrame(animateHeart);
            }, i * 50);
        }
    }

    // 5. INTERACTIVE NAV & PARALLAX
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.navbar');
        const scrollY = window.scrollY;
        
        if (scrollY > 60) {
            header.style.padding = '18px 5%';
            header.style.background = 'rgba(0,0,0,0.85)';
        } else {
            header.style.padding = '30px 5%';
            header.style.background = 'rgba(0,0,0,0.3)';
        }

        const nebula = document.querySelector('.nebula-bg');
        nebula.style.transform = `translateY(${scrollY * 0.2}px)`;
    });
});