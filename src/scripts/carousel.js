/* INFINITE HORIZONTAL EXPANDING CAROUSEL */
export function initCarousel() {
  const track = document.getElementById('carouselTrack');
  if (!track) return;

  // Duplicate items for infinite seamless scroll
  const originalItems = Array.from(track.children);
  originalItems.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  let scrollPos = 0;
  const speed = 1.2; // Smooth scrolling speed
  const singleTrackWidth = track.scrollWidth / 2;

  function animateCarousel() {
    scrollPos += speed;
    if (scrollPos >= singleTrackWidth) {
      scrollPos = 0;
    }

    track.style.transform = `translateX(-${scrollPos}px)`;

    // Check center collision to expand the middle item
    const windowCenterX = window.innerWidth / 2;
    const items = track.querySelectorAll('.carousel-item');
    
    let closestItem = null;
    let minDistance = Infinity;

    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const distance = Math.abs(windowCenterX - itemCenterX);

      item.classList.remove('active-center');

      if (distance < minDistance) {
        minDistance = distance;
        closestItem = item;
      }
    });

    if (closestItem && minDistance < 220) {
      closestItem.classList.add('active-center');
    }

    requestAnimationFrame(animateCarousel);
  }

  requestAnimationFrame(animateCarousel);
}
