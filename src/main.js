import './styles/main.css';
import './styles/home.css';
import './styles/about.css';
import './styles/services.css';
import './styles/projects.css';
import './styles/led_screen.css';
import './styles/contact.css';
import './styles/booking.css';
import './styles/dashboard.css';

import { initHomeAnimation } from './scripts/animation.js';
import { initCarousel } from './scripts/carousel.js';
import { initServices } from './scripts/services.js';
import { initProjectsAnimation } from './scripts/projects.js';
import { initLedScreen } from './scripts/led_screen.js';
import { initContactForm } from './scripts/contact.js';

import { initAuth, showPage } from './scripts/auth.js';
import { initDiscovery } from './scripts/discovery.js';
import { initBookingWizard } from './scripts/bookingWizard.js';
import { initDashboard } from './scripts/dashboard.js';
import { initCareers, loadCareers } from './scripts/careers.js';

// Expose showPage to window object for inline click handlers
window.showPage = function(pageId) {
  showPage(pageId);
  if (pageId === 'careers') loadCareers();
};

document.addEventListener('DOMContentLoaded', () => {
  // Initialize existing animation & menu scripts
  initHomeAnimation();
  initCarousel();
  initServices();
  initProjectsAnimation();
  initLedScreen();
  initContactForm();

  // Initialize Billboard Booking System Modules
  initAuth();
  initDiscovery();
  initBookingWizard();
  initDashboard();

  // careers section
  initCareers();

  // Navigation link active states observer
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-item');

  const observerOptions = {
    root: null,
    threshold: 0.3
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navItems.forEach(item => {
          const link = item.querySelector('a');
          if (link && link.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });

        if (id === 'about' || id === 'contact') {
          document.body.classList.add('dark-header');
        } else {
          document.body.classList.remove('dark-header');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // Disable automatic scroll restoration on load
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // Initial page view check based on URL hash
  const initialHash = window.location.hash ? window.location.hash.replace('#', '') : 'home';
  if (initialHash && ['discoverySection', 'authSection', 'dashboardSection'].includes(initialHash)) {
    showPage(initialHash);
  } else {
    window.scrollTo(0, 0);
  }

  // Listen to browser hash change event
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash ? window.location.hash.replace('#', '') : 'home';
    if (hash) {
      showPage(hash);
    }
  });
});
