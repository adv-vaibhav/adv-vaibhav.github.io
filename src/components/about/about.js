import { profile } from '../../data/profileData.js';
import { sectionIndex } from '../shared.js';

const interests = ['Corporate governance', 'Financial regulation', 'Legal research', 'Compliance'];

export function renderAbout() {
  return `<section class="intro section-shell" id="about">${sectionIndex('01', 'ABOUT')}<div class="intro-copy">
    <p class="eyebrow eyebrow-dark">A PRACTICE BUILT ON PERSPECTIVE</p><h2>From the courtroom<br />to <em>corporate counsel.</em></h2>
    <p class="body-large">A legal professional with experience across advocacy, financial services, and corporate legal operations.</p>
    <p>Vaibhav began his career in litigation, appearing in civil and commercial matters before the District &amp; Sessions Court, Gaya and the Patna High Court. He has since brought that practical foundation into in-house legal and compliance roles, supporting sound decisions through careful research, drafting, negotiation, and risk awareness.</p>
    <p>His work reflects a continuing interest in corporate law, financial regulation, human rights, and clear legal writing.</p><a class="inline-link" href="${profile.linkedIn}" target="_blank" rel="noreferrer">Connect on LinkedIn <span aria-hidden="true">↗</span></a>
  </div><aside class="profile-card"><div class="profile-emblem" aria-hidden="true">§</div><p class="profile-label">CURRENT ROLE</p><h3>Assistant Manager<br /><em>(Legal)</em></h3><p class="profile-org">KFin Technologies Ltd.</p><div class="profile-divider"></div><p class="profile-label">PROFESSIONAL INTERESTS</p><div class="interest-tags">${interests.map((item) => `<span>${item}</span>`).join('')}</div></aside></section>`;
}
