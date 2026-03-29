'use strict';

// === THEME ===
const themeToggle = document.getElementById('theme-toggle');

function setTheme(isDark) {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '🌙' : '☀️';
}

const saved = localStorage.getItem('theme');
const prefDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(saved === 'dark' || (!saved && prefDark));

themeToggle?.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  setTheme(!isDark);
});

// === GOOGLE ANALYTICS CONSENT ===
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied'
});

gtag('js', new Date());

const cookieBanner = document.getElementById('cookie-banner');
const cookieAccept = document.getElementById('cookie-accept');
const cookieDecline = document.getElementById('cookie-decline');
const analyticsCheckbox = document.getElementById('analytics-consent');

const existingConsent = localStorage.getItem('analytics-consent');

function saveConsent(analyticsEnabled) {
  if (analyticsEnabled) {
    localStorage.setItem('analytics-consent', 'true');
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G_XXXXXXXXXXXXX';
    document.head.appendChild(script);
    gtag('consent', 'update', {'analytics_storage': 'granted'});
    gtag('config', 'G_XXXXXXXXXXXXX');
  } else {
    localStorage.setItem('analytics-consent', 'false');
    gtag('consent', 'update', {'analytics_storage': 'denied'});
  }
  cookieBanner?.classList.add('hidden');
}

cookieAccept?.addEventListener('click', () => {
  const analyticsConsent = analyticsCheckbox?.checked || false;
  saveConsent(analyticsConsent);
});

cookieDecline?.addEventListener('click', () => {
  saveConsent(false);
});

if (existingConsent !== null) {
  saveConsent(existingConsent === 'true');
}

// === NAVBAR ===
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = mobileMenu?.querySelectorAll('a');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
}, { passive: true });

menuToggle?.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  menuToggle.classList.toggle('open');
});

mobileLinks?.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle.classList.remove('open');
  });
});

// === SCROLL TOP ===
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn?.classList.add('show');
  } else {
    scrollTopBtn?.classList.remove('show');
  }
}, { passive: true });

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === CONTACT FORM ===
const formSubmit = document.getElementById('form-submit');
const formReset = document.getElementById('form-reset');
const contactForm = document.getElementById('contact-form');

formSubmit?.addEventListener('click', () => {
  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const subject = document.getElementById('subject')?.value.trim();
  const message = document.getElementById('message')?.value.trim();

  if (!name || !email || !subject || !message) {
    alert('Bitte füllen Sie alle erforderlichen Felder aus!');
    return;
  }

  const company = document.getElementById('company')?.value.trim();
  const companyLine = company ? ` (${company})` : '';
  
  const mailSubject = encodeURIComponent(subject);
  const mailBody = encodeURIComponent(
    `Hallo Ahmed,\n\nmein Name ist ${name}${companyLine}.\nMeine E-Mail: ${email}\n\n${message}\n\nMit freundlichen Grüßen,\n${name}`
  );

  window.location.href = `mailto:ahmedhasan@mail.de?subject=${mailSubject}&body=${mailBody}`;
});

formReset?.addEventListener('click', () => {
  contactForm.reset();
});

// === FOOTER YEAR ===
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

console.log('✅ Portfolio geladen - Mobile optimiert, kein Horizontal Scroll');
