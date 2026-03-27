const html = document.documentElement;
const btn = document.getElementById('themeToggle');
const iconSun = document.getElementById('iconSun');
const iconMoon = document.getElementById('iconMoon');

const saved = localStorage.getItem('theme');
if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
    iconSun.classList.remove('hidden');
    iconMoon.classList.add('hidden');
}

btn.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    iconSun.classList.toggle('hidden', !isDark);
    iconMoon.classList.toggle('hidden', isDark);
});

/*------Cursor personalizado------*/

const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;

if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.left = mx - 4 + 'px';
        dot.style.top = my - 4 + 'px';
    });

    function animateRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx - 16 + 'px';
        ring.style.top = ry - 16 + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', () => {
            ring.style.width = '48px';
            ring.style.height = '48px';
            ring.style.opacity = '0.8';
        });
        el.addEventListener('mouseleave', () => {
            ring.style.width = '32px';
            ring.style.height = '32px';
            ring.style.opacity = '0.5';
        });
    });
} else {
    dot.style.display = 'none';
    ring.style.display = 'none';
}
