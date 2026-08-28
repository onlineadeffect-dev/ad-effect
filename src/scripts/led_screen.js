/**
 * LED Screen Interactive Scroll Animation
 * Controls the pinned sticky view and seamless letter scroll transition
 * between the introduction slide and the pricing details slide.
 */

export function initLedScreen() {
  const section = document.getElementById('led-screen');
  const page1 = document.getElementById('ledPage1');
  const page2 = document.getElementById('ledPage2');

  if (!section || !page1 || !page2) return;

  let ticking = false;

  function updateScroll() {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScrollableDistance = section.offsetHeight - windowHeight;

    if (totalScrollableDistance <= 0) {
      ticking = false;
      return;
    }

    // Calculate progress between 0 and 1
    const scrolled = -rect.top;
    let progress = scrolled / totalScrollableDistance;
    progress = Math.max(0, Math.min(1, progress));

    // Page 1 moves up from 0vh to -100vh
    const page1OffsetY = -progress * 100;
    // Page 2 moves up from 100vh to 0vh
    const page2OffsetY = (1 - progress) * 100;

    page1.style.transform = `translate3d(0, ${page1OffsetY}vh, 0)`;
    page2.style.transform = `translate3d(0, ${page2OffsetY}vh, 0)`;

    // Subtle opacity transition near boundaries
    page1.style.opacity = progress > 0.85 ? (1 - progress) / 0.15 : 1;
    page2.style.opacity = progress < 0.15 ? progress / 0.15 : 1;

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // Initial calculation
  updateScroll();
}
