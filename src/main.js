import './styles/global.css';
import './components/header/header.css';
import './components/hero/hero.css';
import './components/about/about.css';
import './components/focus/focus.css';
import './components/experience/experience.css';
import './components/education/education.css';
import './components/contact/contact.css';
import './components/footer/footer.css';
import './styles/responsive.css';

import { renderHeader } from './components/header/header.js';
import { renderHero } from './components/hero/hero.js';
import { renderAbout } from './components/about/about.js';
import { renderFocus } from './components/focus/focus.js';
import { renderExperience } from './components/experience/experience.js';
import { renderEducation } from './components/education/education.js';
import { renderContact } from './components/contact/contact.js';
import { renderFooter } from './components/footer/footer.js';

const app = document.querySelector('#app');
app.innerHTML = [
  renderHeader(), '<main>', renderHero(), renderAbout(), renderFocus(),
  renderExperience(), renderEducation(), renderContact(), '</main>', renderFooter(),
].join('\n');

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
