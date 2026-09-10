const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const year = document.querySelector('#year');
const rotator = document.querySelector('#roleRotator');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 16);
});

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

year.textContent = new Date().getFullYear();

const phrases = [
  'complex programs into clear execution.',
  'blockers into decisions and action.',
  'data into priorities.',
  'cross-functional teams into delivery.'
];
let phraseIndex = 0;
setInterval(() => {
  phraseIndex = (phraseIndex + 1) % phrases.length;
  rotator.animate(
    [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-7px)' }],
    { duration: 220, easing: 'ease', fill: 'forwards' }
  ).onfinish = () => {
    rotator.textContent = phrases[phraseIndex];
    rotator.animate(
      [{ opacity: 0, transform: 'translateY(7px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 320, easing: 'ease', fill: 'forwards' }
    );
  };
}, 2700);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
