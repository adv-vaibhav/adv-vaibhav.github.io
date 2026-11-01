import { profile } from '../../data/profileData.js';

export function renderHeader(pathname = '/') {
  const activeHref = pathname.startsWith('/blogs/') ? '/blogs/' : pathname;
  const navLink = (href, label, className = '') => {
    const classes = [className, activeHref === href ? 'is-active' : ''].filter(Boolean).join(' ');
    return `<a${classes ? ` class="${classes}"` : ''} href="${href}"${activeHref === href ? ' aria-current="page"' : ''}>${label}</a>`;
  };
  return `<header class="site-header"><a class="brand" href="/" aria-label="${profile.name}, home"><span class="brand-mark"><img src="${profile.photoUrl}" alt="" /></span><span class="brand-name">${profile.name}<span class="brand-caption">ADVOCATE · LEGAL &amp; COMPLIANCE</span></span></a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation"><span></span><span></span></button>
    <nav class="site-nav" id="site-nav" aria-label="Main navigation">${navLink('/blogs/', 'Writing')}${navLink('/about/', 'About')}${navLink('/focus/', 'Focus')}${navLink('/experience/', 'Experience')}${navLink('/education/', 'Education')}${navLink('/contact/', 'Contact <span aria-hidden="true">↗</span>', 'nav-contact')}</nav>
  </header>`;
}
