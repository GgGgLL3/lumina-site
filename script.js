const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    glow.style.width = '60px';
    glow.style.height = '60px';
});
document.addEventListener('mouseup', () => {
    glow.style.width = '30px';
    glow.style.height = '30px';
});

document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.85) {
        createParticle(e.clientX, e.clientY);
    }
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 3;
    let opacity = 0.8;
    let size = 6;

    const animate = () => {
        opacity -= 0.02;
        size -= 0.1;
        particle.style.opacity = opacity;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = (parseFloat(particle.style.left) + Math.cos(angle) * speed) + 'px';
        particle.style.top = (parseFloat(particle.style.top) + Math.sin(angle) * speed) + 'px';

        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    };
    animate();
}

document.addEventListener('keydown', (e) => {
    // Пробел — вспышка
    if (e.code === 'Space') {
        e.preventDefault();
        document.body.style.transition = 'background 0.3s';
        document.body.style.background = '#1a1030';
        setTimeout(() => {
            document.body.style.background = '#0a0a0f';
        }, 300);
    }

    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        const body = document.body;
        body.style.transition = 'transform 0.2s';
        if (e.code === 'ArrowUp') body.style.transform = 'translateY(-8px)';
        if (e.code === 'ArrowDown') body.style.transform = 'translateY(8px)';
        if (e.code === 'ArrowLeft') body.style.transform = 'translateX(-8px)';
        if (e.code === 'ArrowRight') body.style.transform = 'translateX(8px)';
        
        setTimeout(() => {
            body.style.transform = 'translate(0, 0)';
        }, 200);
    }

    if (e.key.toLowerCase() === 'a') {
        showKeyboardHint('Клавиша A нажата! Попробуй пробел и стрелки');
    }
});

function showKeyboardHint(text) {
    let hint = document.querySelector('.hint');
    if (!hint) {
        hint = document.createElement('div');
        hint.className = 'hint';
        document.body.appendChild(hint);
    }
    hint.textContent = text;
    hint.style.opacity = '1';
    setTimeout(() => {
        hint.style.opacity = '0';
    }, 2000);
}

window.addEventListener('load', () => {
    showKeyboardHint('Попробуй: мышь • Пробел • стрелки • клавиша A');
});
