// ===== Custom Elements FOUC Prevention =====
(function() {
  // Add loading class immediately to prevent FOUC
  const style = document.createElement('style');
  style.textContent = `
    site-nav, site-footer, site-header, site-nav *, site-footer *, site-header * {
      display: block !important;
    }
    body.wc-loading { opacity: 0 !important; transition: opacity 0.3s ease !important; }
  `;
  document.head.appendChild(style);
  
  // Mark as loading
  document.body.classList.add('wc-loading');
  
  // Wait for custom elements to be defined
  const waitForElements = () => {
    const undefinedEls = [...document.querySelectorAll(':not(:defined)')];
    if (undefinedEls.length === 0) {
      document.body.classList.remove('wc-loading');
    } else {
      Promise.allSettled(
        undefinedEls.map(el => customElements.whenDefined(el.localName))
      ).then(() => {
        document.body.classList.remove('wc-loading');
      });
      // Fallback timeout
      setTimeout(() => document.body.classList.remove('wc-loading'), 500);
    }
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForElements);
  } else {
    waitForElements();
  }
})();
