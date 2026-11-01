import './styles/global.css';
import './components/header/header.css';
import './components/hero/hero.css';
import './components/about/about.css';
import './components/blogs/blogs.css';
import './components/focus/focus.css';
import './components/experience/experience.css';
import './components/education/education.css';
import './components/contact/contact.css';
import './components/footer/footer.css';
import './styles/responsive.css';

import { renderHeader } from './components/header/header.js';
import { renderHero } from './components/hero/hero.js';
import { renderAbout } from './components/about/about.js';
import { renderBlogs, setupBlogs } from './components/blogs/blogs.js';
import { renderFocus } from './components/focus/focus.js';
import { renderExperience } from './components/experience/experience.js';
import { renderEducation } from './components/education/education.js';
import { renderContact } from './components/contact/contact.js';
import { renderFooter } from './components/footer/footer.js';

const app = document.querySelector('#app');
const routes = {
  '/': { title: 'Home', content: renderHero() },
  '/blogs/': { title: 'Writing', content: renderBlogs() },
  '/about/': { title: 'About', content: renderAbout() },
  '/focus/': { title: 'Areas of Focus', content: renderFocus() },
  '/experience/': { title: 'Experience', content: renderExperience() },
  '/education/': { title: 'Education', content: renderEducation() },
  '/contact/': { title: 'Contact', content: renderContact() },
};
const pathname = window.location.pathname.endsWith('/') ? window.location.pathname : `${window.location.pathname}/`;
const route = routes[pathname] ?? (pathname.startsWith('/blogs/') ? { title: 'Writing', content: renderBlogs() } : routes['/']);
document.title = `${route.title} | Adv. Kumar Vaibhav`;
app.innerHTML = [renderHeader(), `<main class="page-content" id="main-content">${route.content}</main>`, renderFooter()].join('\n');

const profilePhoto = document.querySelector('.profile-photo img');
profilePhoto?.addEventListener('error', () => {
  const photoLink = profilePhoto.closest('.profile-photo');
  photoLink.classList.add('is-unavailable');
  photoLink.textContent = 'KV';
});

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  siteNav?.classList.toggle('is-open', !isOpen);
});
siteNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open navigation');
  siteNav.classList.remove('is-open');
}));
document.querySelector('#year').textContent = new Date().getFullYear();
setupBlogs();
