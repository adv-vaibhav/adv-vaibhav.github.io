import test from 'node:test';
import assert from 'node:assert/strict';

import { profile, areasOfFocus, experience, education, credentials } from '../src/data/profileData.js';
import { renderHeader } from '../src/components/header/header.js';
import { renderHero } from '../src/components/hero/hero.js';
import { renderAbout } from '../src/components/about/about.js';
import { renderFocus } from '../src/components/focus/focus.js';
import { renderExperience } from '../src/components/experience/experience.js';
import { renderEducation } from '../src/components/education/education.js';
import { renderContact } from '../src/components/contact/contact.js';
import { renderFooter } from '../src/components/footer/footer.js';

test('all page sections render their landmarks and navigation targets', () => {
  const markup = [
    renderHeader(), renderHero(), renderAbout(), renderFocus(),
    renderExperience(), renderEducation(), renderContact(), renderFooter(),
  ].join('\n');

  for (const id of ['home', 'about', 'focus', 'experience', 'education', 'contact', 'site-nav']) {
    assert.match(markup, new RegExp(`id="${id}"`));
  }
  assert.match(markup, /aria-label="Main navigation"/);
  assert.match(markup, /aria-expanded="false"/);
});

test('profile identity and contact links use the single profile record', () => {
  assert.match(renderHero(), new RegExp(profile.title));
  assert.match(renderHeader(), new RegExp(profile.name));
  assert.match(renderContact(), new RegExp(`mailto:${profile.email}`));
  assert.match(renderContact(), new RegExp(profile.linkedIn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(renderFooter(), new RegExp(profile.location.split(' · ')[0]));
});

test('data driven sections render every focus area, career item, and credential', () => {
  assert.equal((renderFocus().match(/class="focus-card"/g) ?? []).length, areasOfFocus.length);
  assert.equal((renderExperience().match(/class="timeline-item/g) ?? []).length, experience.length);
  assert.equal((renderEducation().match(/class="credential-item"/g) ?? []).length, education.length);
  assert.equal((renderEducation().match(/<li>/g) ?? []).length, credentials.length);
  assert.match(renderExperience(), /KFin Technologies Ltd\./);
  assert.match(renderEducation(), /All India Bar Examination/);
});
