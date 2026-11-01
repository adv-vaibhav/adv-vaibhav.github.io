import { profile } from '../../data/profileData.js';
import { sectionIndex } from '../shared.js';

export function renderContact() {
  return `<section class="contact section-shell" id="contact">${sectionIndex('06', 'CONTACT')}<div class="contact-panel"><div class="contact-copy"><p class="eyebrow">LET’S CONNECT</p><h2>Start a<br /><em>conversation.</em></h2><p>For professional enquiries and conversations about legal and compliance work.</p></div>
    <div class="contact-links"><a href="mailto:${profile.email}"><span class="contact-icon" aria-hidden="true">✉</span><span><small>EMAIL</small>${profile.email}</span><b aria-hidden="true">↗</b></a><a href="${profile.linkedIn}" target="_blank" rel="noreferrer"><span class="contact-icon linkedin-icon" aria-hidden="true">in</span><span><small>LINKEDIN</small>Connect with ${profile.name}</span><b aria-hidden="true">↗</b></a></div></div></section>`;
}
