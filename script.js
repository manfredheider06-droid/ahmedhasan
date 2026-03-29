'use strict';

// ============================================================
//   GOOGLE ANALYTICS NUR BEI ZUSTIMMUNG
// ============================================================

// === GOOGLE ANALYTICS SETUP (Wartet auf Zustimmung) ===

window.dataLayer = window.dataLayer || [];

function gtag(){dataLayer.push(arguments);}

// Standard: Analytics DISABLED
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied'
});

gtag('js', new Date());

// NICHT laden, bis Nutzer zustimmt!
// gtag('config', 'G_XXXXXXXXXXXXX'); // Wird ERST geladen bei Zustimmung

// ============================================================
//   COOKIE CONSENT MANAGEMENT
// ============================================================

const cookieBanner = document.getElementById('cookie-banner');
const cookieAccept = document.getElementById('cookie-accept');
const cookieDecline = document.getElementById('cookie-decline');
const analyticsCheckbox = document.getElementById('analytics-consent');

// Prüfe, ob es bereits eine Zustimmung gibt
const existingConsent = localStorage.getItem('analytics-consent');

function saveConsent(analyticsEnabled) {
  if (analyticsEnabled) {
    console.log('✅ Google Analytics aktiviert');
    localStorage.setItem('analytics-consent', 'true');
    
    // JETZT laden: Google Analytics Script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G_XXXXXXXXXXXXX'; // 🔹 DEINE GA-ID!
    document.head.appendChild(script);
    
    // Gebe Google Analytics Bescheid, dass es jetzt laufen kann
    gtag('consent', 'update', {'analytics_storage': 'granted'});
    gtag('config', 'G_XXXXXXXXXXXXX'); // 🔹 DEINE GA-ID!
    
  } else {
    console.log('❌ Google Analytics NICHT aktiviert');
    localStorage.setItem('analytics-consent', 'false');
    gtag('consent', 'update', {'analytics_storage': 'denied'});
  }
  
  // Cookie Banner verstecken
  cookieBanner?.classList.add('hidden');
}

// Wenn Nutzer "Akzeptieren & weitergehen" klickt
cookieAccept?.addEventListener('click', () => {
  const analyticsConsent = analyticsCheckbox?.checked || false;
  saveConsent(analyticsConsent);
});

// Wenn Nutzer "Nur notwendig" klickt
cookieDecline?.addEventListener('click', () => {
  console.log('⚠️ Nutzer hat nur notwendige Cookies akzeptiert (keine Analytics)');
  saveConsent(false);
});

// Wenn Nutzer bereits eine Wahl getroffen hat
if (existingConsent !== null) {
  const analyticsWasAccepted = existingConsent === 'true';
  saveConsent(analyticsWasAccepted);
}

// ============================================================
//   THEME MANAGEMENT
// ============================================================

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

// ============================================================
//   NAVBAR & MOBILE MENU
// ============================================================

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
});

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

// ============================================================
//   SCROLL TOP BUTTON
// ============================================================

const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn?.classList.add('show');
  } else {
    scrollTopBtn?.classList.remove('show');
  }
});

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
//   CONTACT FORM
// ============================================================

const formSubmit = document.getElementById('form-submit');
const formReset = document.getElementById('form-reset');
const contactForm = document.getElementById('contact-form');

formSubmit?.addEventListener('click', () => {
  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const subject = document.getElementById('subject')?.value.trim();
  const message = document.getElementById('message')?.value.trim();

  if (!name || !email || !subject || !message) {
    alert('❌ Bitte f��llen Sie alle erforderlichen Felder aus!');
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
  alert('↺ Formular zurückgesetzt!');
});

// ============================================================
//   FOOTER YEAR
// ============================================================

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

console.log('✅ Portfolio mit Google Analytics Consent geladen');