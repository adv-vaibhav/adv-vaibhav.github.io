import { profile } from '../../data/profileData.js';

export function renderHeader() {
  return `<header class="site-header"><a class="brand" href="/" aria-label="${profile.name}, home"><span class="brand-mark">KV</span><span class="brand-name">${profile.name}<span class="brand-caption">ADVOCATE · LEGAL &amp; COMPLIANCE</span></span></a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation"><span></span><span></span></button>
    <nav class="site-nav" id="site-nav" aria-label="Main navigation"><a href="/about/">About</a><a href="/focus/">Focus</a><a href="/experience/">Experience</a><a href="/education/">Education</a><a class="nav-contact" href="/contact/">Contact <span aria-hidden="true">↗</span></a></nav>
  </header>`;
}
