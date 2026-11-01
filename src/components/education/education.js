import { education, credentials } from '../../data/profileData.js';
import { sectionIndex, sectionHeading } from '../shared.js';

function renderEducationItem(item) {
  return `<article class="credential-item"><span class="credential-year">${item.date}</span><div><h3>${item.degree}</h3><p>${item.institution}</p><small>${item.detail}</small></div></article>`;
}

function renderCredential(item) {
  return `<li><span>${item.date}</span>${item.title}<small>${item.organization}</small></li>`;
}

export function renderEducation() {
  return `<section class="credentials section-shell section-tinted" id="education">${sectionIndex('04', 'EDUCATION & CREDENTIALS')}<div class="credentials-layout">${sectionHeading('FOUNDATION & CONTINUING LEARNING', 'Knowledge built<br /><em>over time.</em>')}<div class="credential-column"><p class="column-label">EDUCATION</p>${education.map(renderEducationItem).join('')}<p class="column-label certifications-label">CERTIFICATIONS &amp; RECOGNITION</p><ul class="credential-list">${credentials.map(renderCredential).join('')}</ul></div></div></section>`;
}
