import './styles/main.css';
import './styles/home.css';
import './styles/about.css';
import './styles/services.css';
import './styles/projects.css';
import './styles/contact.css';

import { initHomeAnimation } from './scripts/animation.js';
import { initCarousel } from './scripts/carousel.js';
import { initServices } from './scripts/services.js';
import { initProjectsAnimation } from './scripts/projects.js';
import { initContactForm } from './scripts/contact.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize module scripts
  initHomeAnimation();
  initCarousel();
  initServices();
  initProjectsAnimation();
  initContactForm();

  // Manage Navigation Active State & Navbar Background on Scroll
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-item');

  const observerOptions = {
    root: null,
    threshold: 0.4
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Update nav active link
        navItems.forEach(item => {
          const link = item.querySelector('a');
          if (link.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });

        // Toggle dark header styling when on red sections (About Us & Contact)
        if (id === 'about' || id === 'contact') {
          document.body.classList.add('dark-header');
        } else {
          document.body.classList.remove('dark-header');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));
});
