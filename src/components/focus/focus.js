import { areasOfFocus } from '../../data/profileData.js';
import { sectionIndex, sectionHeading } from '../shared.js';

export function renderFocus() {
  const cards = areasOfFocus.map((area, index) => `<article class="focus-card"><span class="card-number">${String(index + 1).padStart(2, '0')}</span><div class="focus-icon" aria-hidden="true">${area.icon}</div><h3>${area.title}</h3><p>${area.description}</p></article>`).join('');
  return `<section class="focus section-shell section-tinted" id="focus">${sectionIndex('03', 'AREAS OF FOCUS')}${sectionHeading('LEGAL WORK, SEEN FROM BOTH SIDES', 'Experience across<br /><em>connected disciplines.</em>')}<div class="focus-grid">${cards}</div></section>`;
}
