import { fetchBillboards } from './supabaseClient.js';


/* HOME INTRO & SLIDER ANIMATION CONTROLLER */
export function initHomeAnimation() {
  const dotsContainer = document.getElementById('dotsContainer');
  const dots = document.querySelectorAll('.dot');
  const logoText = document.getElementById('logoText');
  const sloganText = document.getElementById('sloganText');
  const brandAssembly = document.getElementById('brandAssembly');
  const billboardsStage = document.getElementById('billboardsStage');
  const ctaButtons = document.getElementById('ctaButtons');
  const heroAnimationStage = document.getElementById('heroAnimationStage');
  const replayBtn = document.getElementById('replayBtn');

  // Slider Elements
  const slides = document.querySelectorAll('.hero-slide');
  const navDots = document.querySelectorAll('.slide-dot');
  const progressFill = document.getElementById('heroProgressFill');

  let currentSlide = 0;
  let slideInterval = null;
  const slideDuration = 4500; // 4.5 seconds per slide loop

  function populateBillboardStreams() {
    const upCol = document.getElementById('billboardStreamUp');
    const downCol = document.getElementById('billboardStreamDown');
    if (!upCol || !downCol) return;

    fetchBillboards().then(billboards => {
      const items = (billboards && billboards.length) ? billboards : [
        { billboard_id: 'U002-A', location: 'Bahsas, Tripoli Entrance', image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80' },
        { billboard_id: 'U002-B', location: 'Dam & Farz Highway', image_url: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80' },
        { billboard_id: 'P003-C', location: 'Mina Road, Tripoli', image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80' }
      ];

      // Cap to 6 items to prevent DOM overload and browser crashes on mobile
      const itemsToRender = items.slice(0, 6);

      // Create stream HTML items without prices
      const renderCard = (b, index) => `
        <div class="stream-card ${index % 2 === 0 ? 'flicker-booking' : ''}">
          <img src="${b.image_url}" alt="${b.billboard_id}" class="stream-card-img" onerror="this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80';" />
          <div class="stream-card-title">${b.billboard_id}</div>
          <div class="stream-card-location">${(b.location || 'Tripoli').split(',')[0]}</div>
        </div>
      `;

      // Build duplicated sets for infinite scroll
      const set1 = itemsToRender.map((b, i) => renderCard(b, i)).join('');
      const set2 = [...itemsToRender].reverse().map((b, i) => renderCard(b, i + 1)).join('');

      upCol.innerHTML = set1 + set1;
      downCol.innerHTML = set2 + set2;
    });
  }

  function runAnimationSequence() {
    // Reset logo & entrance state
    dotsContainer?.classList.remove('vertical');
    logoText?.classList.remove('show');
    sloganText?.classList.remove('typing');
    brandAssembly?.classList.remove('shifted-up');
    billboardsStage?.classList.remove('show');
    ctaButtons?.classList.remove('show');
    heroAnimationStage?.classList.remove('show');

    dots.forEach(d => {
      d.classList.remove('pop-1', 'pop-2', 'pop-3');
      d.style.opacity = '0';
      d.style.transform = 'scale(0)';
    });

    // Step 1: Pop 3 dots horizontally (100ms)
    setTimeout(() => {
      if (dots[0]) dots[0].classList.add('pop-1');
      if (dots[1]) dots[1].classList.add('pop-2');
      if (dots[2]) dots[2].classList.add('pop-3');
    }, 100);

    // Step 2: Stack dots & reveal logo text + slogan typing (750ms)
    setTimeout(() => {
      dotsContainer?.classList.add('vertical');
      logoText?.classList.add('show');
      sloganText?.classList.add('typing');
    }, 750);

    // Step 3: Shift assembly up & reveal billboards stage, CTA buttons, and hero animation stage (1450ms)
    setTimeout(() => {
      brandAssembly?.classList.add('shifted-up');
      billboardsStage?.classList.add('show');
      ctaButtons?.classList.add('show');
      heroAnimationStage?.classList.add('show');
      startSlideLoop();
    }, 1450);
  }

  function goToSlide(index) {
    if (!slides.length) return;
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    navDots.forEach((dot, i) => {
      if (i === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    resetProgressBar();
  }

  function resetProgressBar() {
    if (!progressFill) return;
    progressFill.style.transition = 'none';
    progressFill.style.transform = 'scaleX(0)';
    
    // Force reflow
    void progressFill.offsetWidth;

    progressFill.style.transition = `transform ${slideDuration}ms linear`;
    progressFill.style.transform = 'scaleX(1)';
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function startSlideLoop() {
    stopSlideLoop();
    goToSlide(0);
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  function stopSlideLoop() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Click handler for dot navigation
  navDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-slide-index') || '0', 10);
      stopSlideLoop();
      goToSlide(idx);
      slideInterval = setInterval(nextSlide, slideDuration);
    });
  });

  // Populate stream columns
  populateBillboardStreams();

  // Initial execution
  runAnimationSequence();

  // Replay button handler
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      stopSlideLoop();
      runAnimationSequence();
    });
  }
}


