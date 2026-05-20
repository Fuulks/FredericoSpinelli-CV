(function() {
 var saved = localStorage.getItem('theme');
 if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

document.addEventListener('click', function(e) {
 if (e.target.id === 'theme-toggle') {
 var current = document.documentElement.getAttribute('data-theme') || 'dark';
 var next = current === 'dark' ? 'light' : 'dark';
 document.documentElement.setAttribute('data-theme', next);
 localStorage.setItem('theme', next);
 e.target.textContent = next === 'dark' ? '🌙' : '☀️';
 }
});

class SiteHeader extends HTMLElement {
 connectedCallback() {
 this.innerHTML = '<header><div class="header-content"><div class="header-text"><h1>Frederico Spinelli</h1><p class="subtitle">IT Support Engineer @ Contentsquare</p></div><div class="header-contact"><a href="mailto:fredericospinelli@contentsquare.com">fredericospinelli@contentsquare.com</a></div></div></header>';
 }
}

class SiteNav extends HTMLElement {
 connectedCallback() {
 var path = location.pathname.split('/').pop() || 'index.html';
 var items = [
 ['index.html', 'Profile'],
 ['experiences.html', 'Experience'],
 ['competences.html', 'Skills'],
 ['softskills.html', 'Soft Skills'],
 ['portfolio.html', 'Projects'],
 ['blog.html', 'Blog']
 ];
 var html = '';
 for (var i = 0; i < items.length; i++) {
 var cls = items[i][0] === path ? ' class="active"' : '';
 html += '<a href="' + items[i][0] + '"' + cls + '>' + items[i][1] + '</a>';
 }
 var contactCls = path === 'contact.html' ? 'contact-btn active' : 'contact-btn';
 html += '<a href="contact.html" class="' + contactCls + '">Contact</a>';
 var theme = document.documentElement.getAttribute('data-theme') || 'dark';
 html += '<button id="theme-toggle" aria-label="Toggle theme" style="background:none;border:none;color:var(--text-secondary);cursor:pointer;padding:8px 12px;font-size:1.25rem;">' + (theme === 'dark' ? '🌙' : '☀️') + '</button>';
 this.innerHTML = '<nav><div class="nav-inner">' + html + '</div></nav>';
 }
}

class SiteFooter extends HTMLElement {
 connectedCallback() {
 this.innerHTML = '<footer><p>&copy; ' + new Date().getFullYear() + ' Frederico Spinelli — IT Support Engineer @ Contentsquare</p></footer>';
 }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-nav', SiteNav);
customElements.define('site-footer', SiteFooter);
