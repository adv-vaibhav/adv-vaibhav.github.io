import { profile } from '../../data/profileData.js';

export function renderFooter() {
  const location = profile.location.replace(' · ', ', ');
  return `<footer class="site-footer"><a class="footer-brand" href="/" aria-label="Home">KV</a><p>Adv. ${profile.name} <span>·</span> ${location}</p><a href="/">Home ↑</a><small>© <span id="year"></span> ${profile.name}</small></footer>`;
}
