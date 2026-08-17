/* HOME INTRO ANIMATION CONTROLLER */
export function initHomeAnimation() {
  const dotsContainer = document.getElementById('dotsContainer');
  const dots = document.querySelectorAll('.dot');
  const logoText = document.getElementById('logoText');
  const sloganText = document.getElementById('sloganText');
  const brandAssembly = document.getElementById('brandAssembly');
  const billboardsStage = document.getElementById('billboardsStage');
  const ctaButtons = document.getElementById('ctaButtons');
  const replayBtn = document.getElementById('replayBtn');

  function runAnimationSequence() {
    // Reset all elements
    dotsContainer.classList.remove('vertical');
    logoText.classList.remove('show');
    sloganText.classList.remove('typing');
    brandAssembly.classList.remove('shifted-up');
    billboardsStage.classList.remove('show');
    ctaButtons.classList.remove('show');

    dots.forEach(d => {
      d.classList.remove('pop-1', 'pop-2', 'pop-3');
      d.style.opacity = '0';
      d.style.transform = 'scale(0)';
    });

    // Step 1: Pop 3 dots horizontally one by one (0ms - 500ms)
    setTimeout(() => {
      dots[0].classList.add('pop-1');
      dots[1].classList.add('pop-2');
      dots[2].classList.add('pop-3');
    }, 100);

    // Step 2: Move dots into vertical stack & reveal logo text & type slogan (650ms)
    setTimeout(() => {
      dotsContainer.classList.add('vertical');
      logoText.classList.add('show');
      sloganText.classList.add('typing');
    }, 750);

    // Step 3: Shift entire logo assembly upward & slide up billboards + show buttons (1500ms)
    setTimeout(() => {
      brandAssembly.classList.add('shifted-up');
      billboardsStage.classList.add('show');
      ctaButtons.classList.add('show');
    }, 1550);
  }

  // Initial auto run
  runAnimationSequence();

  // Replay handler
  if (replayBtn) {
    replayBtn.addEventListener('click', runAnimationSequence);
  }
}
