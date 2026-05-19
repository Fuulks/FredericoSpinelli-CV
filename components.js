// ===== Theme Toggle =====
(function() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', theme);
})();

document.addEventListener('click', (e) => {
  if (e.target.id === 'theme-toggle') {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    e.target.textContent = next === 'dark' ? '🌙' : '☀️';
  }
});
// ===== Custom Elements =====

class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="header-content">
        <div class="header-text">
          <h1>Frederico Spinelli</h1>
          <p class="subtitle">IT Support Engineer @ Contentsquare</p>
        </div>
        <div class="header-contact">
          <a href="mailto:fredericospinelli@contentsquare.com">fredericospinelli@contentsquare.com</a>
        </div>
      </div>
    `;
  }
}

class SiteNav extends HTMLElement {
  connectedCallback() {
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    const links = [
      { href: 'index.html', label: 'Profile' },
      { href: 'experiences.html', label: 'Experience' },
      { href: 'competences.html', label: 'Skills' },
      { href: 'softskills.html', label: 'Soft Skills' },
      { href: 'portfolio.html', label: 'Projects' },
      { href: 'blog.html', label: 'Blog' },
      { href: 'contact.html', label: 'Contact', className: 'contact-btn' }
    ];
    
    const navLinks = links.map(link => {
      const isActive = link.href === currentPage;
      const className = link.className ? `${link.className}${isActive ? '' : ''}` : (isActive ? 'active' : '');
      const activeClass = isActive ? ' class="' + className + '"' : (link.className ? ' class="' + link.className + '"' : '');
      return `<a href="${link.href}"${activeClass}>${link.label}</a>`;
    }).join('');
    
    this.innerHTML = `
      <div class="nav-inner">
        ${navLinks}
        <button id="theme-toggle" aria-label="Toggle theme" style="background:none;border:none;color:var(--text-secondary);cursor:pointer;padding:8px 12px;font-size:1.25rem;">🌙</button>
      </div>
    `;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    this.innerHTML = `
      <p>&copy; ${year} Frederico Spinelli — IT Support Engineer @ Contentsquare</p>
    `;
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-nav', SiteNav);
customElements.define('site-footer', SiteFooter);
// ===== Scroll Reveal Fallback (Firefox) =====
if (!CSS.supports || !CSS.supports('animation-timeline', 'view()')) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!prefersReduced.matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
}

// ===== Spotlight Effect =====
document.addEventListener('mousemove', (e) => {
  document.body.style.setProperty('--mx', e.clientX + 'px');
  document.body.style.setProperty('--my', e.clientY + 'px');
});
