import { experience, earlierExperience } from '../../data/profileData.js';
import { sectionIndex, sectionHeading } from '../shared.js';

function renderTimelineItem(item) {
  const current = item.current ? '<span class="current-badge">CURRENT</span>' : '';
  const location = item.location ? ` <span>· ${item.location}</span>` : '';
  return `<article class="timeline-item${item.current ? ' current' : ''}"><span class="timeline-dot"></span><p class="timeline-date">${item.date} ${current}</p><h3>${item.role}</h3><p class="timeline-org">${item.organization}${location}</p><p>${item.description}</p></article>`;
}

function renderEarlierItem(item) {
  return `<p><strong>${item.role}</strong> · ${item.organization}<span>${item.date}</span></p>`;
}

export function renderExperience() {
  const heading = sectionHeading('A CAREER IN PRACTICE', 'Experience with<br /><em>purpose and range.</em>', 'experience-heading');
  const headingWithLede = heading.replace('</div>', '<p class="section-lede">A progression from legal research and court practice to in-house legal operations.</p></div>');
  return `<section class="experience section-shell" id="experience">${sectionIndex('03', 'EXPERIENCE')}<div class="experience-main">${headingWithLede}<div class="timeline">${experience.map(renderTimelineItem).join('')}<details class="earlier-work"><summary>Earlier experience <span aria-hidden="true">＋</span></summary><div class="earlier-list">${earlierExperience.map(renderEarlierItem).join('')}</div></details></div></div></section>`;
}
