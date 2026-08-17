/* PROJECTS POP-IN ANIMATION CONTROLLER */
export function initProjectsAnimation() {
  const projectCards = document.querySelectorAll('.project-card');
  const projectsSection = document.getElementById('projects');

  if (!projectsSection || !projectCards.length) return;

  const observerOptions = {
    root: null,
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        projectCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('pop-in');
          }, index * 120); // Staggered pop delay
        });
      }
    });
  }, observerOptions);

  observer.observe(projectsSection);
}
