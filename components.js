// ===== Theme Setup (runs immediately) =====
(function() {
 var saved = localStorage.getItem('theme');
 if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

// ===== Theme Toggle =====
document.addEventListener('click', function(e) {
 if (e.target.id === 'theme-toggle') {
 var current = document.documentElement.getAttribute('data-theme') || 'dark';
 var next = current === 'dark' ? 'light' : 'dark';
 document.documentElement.setAttribute('data-theme', next);
 localStorage.setItem('theme', next);
 e.target.textContent = next === 'dark' ? '🌙' : '☀️';
 }
});

// ===== Custom Elements =====

class SiteHeader extends HTMLElement {
 connectedCallback() {
 this.innerHTML = `
 <header>
 <div class="header-content">
 <div class="header-text">
 <h1>Frederico Spinelli</h1>
 <p class="subtitle">IT Support Engineer @ Contentsquare</p>
 </div>
 <div class="header-contact">
 <a href="mailto:fredericospinelli@contentsquare.com">fredericospinelli@contentsquare.com</a>
 </div>
 </div>
 </header>
 `;
 }
}

class SiteNav extends HTMLElement {
 connectedCallback() {
 var path = location.pathname.split('/').pop() || 'index.html';

 var links = [
 { href: 'index.html', label: 'Profile' },
 { href: 'experiences.html', label: 'Experience' },
 { href: 'competences.html', label: 'Skills' },
 { href: 'softskills.html', label: 'Soft Skills' },
 { href: 'portfolio.html', label: 'Projects' },
 { href: 'blog.html', label: 'Blog' }
 ];

 var html = links.map(function(link) {
 var cls = (link.href === path) ? ' class="active"' : '';
 return '<a href="' + link.href + '"' + cls + '>' + link.label + '</a>';
 }).join('');

 // Contact button (separate, always has contact-btn class)
 var contactCls = (path === 'contact.html') ? 'contact-btn active' : 'contact-btn';
 html += '<a href="contact.html" class="' + contactCls + '">Contact</a>';

 // Theme toggle button
 var currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
 html += '<button id="theme-toggle" aria-label="Toggle theme" style="background:none;border:none;color:var(--text-secondary);cursor:pointer;padding:8px 12px;font-size:1.25rem;">' + (currentTheme === 'dark' ? '🌙' : '☀️') + '</button>';

 this.innerHTML = '<nav><div class="nav-inner">' + html + '</div></nav>';
 }
}

class SiteFooter extends HTMLElement {
 connectedCallback() {
 var year = new Date().getFullYear();
 this.innerHTML = '<footer><p>&copy; ' + year + ' Frederico Spinelli — IT Support Engineer @ Contentsquare</p></footer>';
 }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-nav', SiteNav);
customElements.define('site-footer', SiteFooter);

// ===== Scroll Reveal Fallback (Firefox) =====
if (!CSS.supports || !CSS.supports('animation-timeline', 'view()')) {
 var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
 if (!prefersReduced.matches) {
 var observer = new IntersectionObserver(function(entries) {
 entries.forEach(function(entry) {
 if (entry.isIntersecting) {
 entry.target.classList.add('visible');
 observer.unobserve(entry.target);
 }
 });
 }, { threshold: 0.1 });
 document.querySelectorAll('.reveal-on-scroll').forEach(function(el) { observer.observe(el); });
 } else {
 document.querySelectorAll('.reveal-on-scroll').forEach(function(el) {
 el.style.opacity = '1';
 el.style.transform = 'none';
 });
 }
}

// ===== Spotlight Effect =====
document.addEventListener('mousemove', function(e) {
 document.body.style.setProperty('--mx', e.clientX + 'px');
 document.body.style.setProperty('--my', e.clientY + 'px');
});
