export function sectionIndex(number, label) {
  return `<div class="section-index">${number} <span>—</span> ${label}</div>`;
}

export function sectionHeading(eyebrow, title, className = '') {
  return `<div class="section-heading ${className}"><p class="eyebrow eyebrow-dark">${eyebrow}</p><h2>${title}</h2></div>`;
}
