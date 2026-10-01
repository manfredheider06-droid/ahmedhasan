const header = document.querySelector('.site-header');
const cursorGlow = document.querySelector('.cursor-glow');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

let countersStarted = false;
const counterObserver = new IntersectionObserver((entries, currentObserver) => {
    if (!entries.some((entry) => entry.isIntersecting) || countersStarted) return;
    countersStarted = true;
    document.querySelectorAll('.counter').forEach((counter) => {
        const target = Number(counter.dataset.target);
        const duration = 1300;
        const start = performance.now();
        const update = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            counter.textContent = Math.floor(progress * target);
            if (progress < 1) requestAnimationFrame(update);
            else counter.textContent = target;
        };
        requestAnimationFrame(update);
    });
    currentObserver.disconnect();
}, { threshold: 0.35 });

const numbersSection = document.querySelector('.numbers-section');
if (numbersSection) counterObserver.observe(numbersSection);

if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', (event) => {
        cursorGlow.style.opacity = '1';
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    }, { passive: true });
}
