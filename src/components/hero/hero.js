import { profile } from '../../data/profileData.js';

export function renderHero() {
  return `<section class="hero" id="home" aria-labelledby="hero-title"><div class="hero-shade"></div><div class="hero-content">
    <p class="eyebrow"><span class="eyebrow-line"></span> ${profile.location.toUpperCase()}</p><h1 id="hero-title">Adv. Kumar<br /><em>Vaibhav</em></h1>
    <p class="hero-role">${profile.title} <span class="role-separator">·</span> ${profile.qualification}</p><p class="hero-intro">${profile.introduction}</p>
    <div class="hero-actions"><a class="button button-gold" href="/about/">Explore profile <span aria-hidden="true">→</span></a><a class="text-link" href="/contact/">Get in touch <span aria-hidden="true">↗</span></a></div>
  </div><div class="hero-note"><span class="note-rule"></span><span>Law grounded in clarity,<br />preparation and perspective.</span></div><a class="scroll-cue" href="/about/" aria-label="Explore the about page"><span></span> DISCOVER PROFILE</a></section>`;
}
