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