import { sectionIndex } from '../shared.js';

const markdownFiles = import.meta.glob('../../../blogs/*.md', { query: '?raw', import: 'default', eager: true });

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function inlineMarkdown(value) {
  let text = escapeHtml(value);
  text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return text;
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/^---\n[\s\S]*?\n---\n/, '').replace(/\r/g, '').split('\n');
  const blocks = [];
  let paragraph = [];
  let list = [];
  let listType = 'ul';
  let code = null;
  const flushParagraph = () => {
    if (paragraph.length) blocks.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (list.length) blocks.push(`<${listType}>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</${listType}>`);
    list = [];
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      flushParagraph(); flushList();
      if (code === null) code = [];
      else { blocks.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`); code = null; }
      continue;
    }
    if (code !== null) { code.push(line); continue; }
    if (!trimmed) { flushParagraph(); flushList(); continue; }
    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    const bullet = trimmed.match(/^[-*+]\s+(.+)$/);
    const numbered = trimmed.match(/^\d+[.)]\s+(.+)$/);
    const quote = trimmed.match(/^>\s?(.*)$/);
    const tableSeparator = lines[index + 1]?.trim().match(/^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/);
    if (trimmed.includes('|') && tableSeparator) {
      flushParagraph(); flushList();
      const row = (value) => value.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim());
      const headers = row(trimmed);
      index += 1;
      const rows = [];
      while (index + 1 < lines.length && lines[index + 1].includes('|') && lines[index + 1].trim()) {
        index += 1;
        rows.push(row(lines[index]));
      }
      blocks.push(`<div class="blog-table-wrap"><table><thead><tr>${headers.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join('')}</tr></thead><tbody>${rows.map((cells) => `<tr>${headers.map((_, cellIndex) => `<td>${inlineMarkdown(cells[cellIndex] ?? '')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }
    if (heading) {
      flushParagraph(); flushList();
      const level = Math.min(heading[1].length + 1, 5);
      blocks.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
    } else if (bullet) {
      flushParagraph();
      if (list.length && listType !== 'ul') flushList();
      listType = 'ul'; list.push(bullet[1]);
    } else if (numbered) {
      flushParagraph();
      if (list.length && listType !== 'ol') flushList();
      listType = 'ol'; list.push(numbered[1]);
    } else if (quote) {
      flushParagraph(); flushList(); blocks.push(`<blockquote><p>${inlineMarkdown(quote[1])}</p></blockquote>`);
    } else if (/^([-*_])\1\1+$/.test(trimmed)) {
      flushParagraph(); flushList(); blocks.push('<hr />');
    } else {
      flushList(); paragraph.push(trimmed);
    }
  }
  if (code !== null) blocks.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
  flushParagraph(); flushList();
  return blocks.join('\n');
}

function titleFrom(markdown, filename) {
  const heading = markdown.match(/^#\s+(.+)$/m);
  if (heading) return heading[1].trim();
  return filename.replace(/^\d+-/, '').replace(/\.md$/i, '').replace(/[-_]/g, ' ');
}

function slugFrom(filename) {
  return filename.replace(/^\d+-/, '').replace(/\.md$/i, '').toLowerCase();
}

const posts = Object.entries(markdownFiles)
  .map(([path, markdown]) => {
    const filename = path.split('/').pop();
    const number = Number(filename.match(/^(\d+)-/)?.[1] ?? 0);
    return { filename, number, markdown, title: titleFrom(markdown, filename), slug: slugFrom(filename) };
  })
  .sort((a, b) => b.number - a.number);

function renderList(activeFilename = posts[0]?.filename) {
  if (!posts.length) return '<p class="blog-empty">New writing will appear here soon.</p>';
  return `<ol class="blog-list">${posts.map((post, index) => `<li><a class="blog-list-item${post.filename === activeFilename ? ' is-active' : ''}" href="/blogs/${encodeURIComponent(post.slug)}/" data-blog="${escapeHtml(post.filename)}"${post.filename === activeFilename ? ' aria-current="page"' : ''}><span class="blog-list-number">${String(index + 1).padStart(2, '0')}</span><span class="blog-list-title">${escapeHtml(post.title)}</span><span class="blog-list-arrow" aria-hidden="true">↗</span></a></li>`).join('')}</ol>`;
}

function renderPost(post) {
  if (!post) return '<div class="blog-reader-empty"><span class="blog-reader-mark">KV</span><p>Select an article to begin reading.</p></div>';
  const date = post.markdown.match(/^date:\s*["']?(.+?)["']?\s*$/m)?.[1];
  const body = post.markdown.replace(/^#\s+(.+)\n+/, (heading) => heading.trim().slice(2).trim() === post.title ? '' : heading);
  return `<article class="blog-article"><p class="eyebrow eyebrow-dark">${date ? escapeHtml(date) : 'NOTES &amp; PERSPECTIVES'}</p><h2>${escapeHtml(post.title)}</h2><div class="blog-prose">${markdownToHtml(body)}</div></article>`;
}

export function renderBlogs() {
  const slug = decodeURIComponent(window.location.pathname.split('/').filter(Boolean)[1] ?? '');
  const current = posts.find((post) => post.slug === slug) ?? posts[0];
  return `<section class="blogs section-shell" id="blogs">${sectionIndex('01', 'WRITING')}<div class="blogs-heading"><p class="eyebrow eyebrow-dark">NOTES &amp; PERSPECTIVES</p><h2>Thoughts on <em>the law.</em></h2><p class="blogs-lede">Observations on legal practice, regulation, and the ideas shaping the profession.</p></div><div class="blogs-layout"><aside class="blog-sidebar" aria-label="Article list"><p class="column-label">THE JOURNAL <span>${String(posts.length).padStart(2, '0')} ARTICLES</span></p><div class="blog-list-wrap">${renderList(current?.filename)}</div></aside><div class="blog-reader" aria-live="polite">${renderPost(current)}</div></div><button class="blog-back" type="button" aria-label="Back to article list"><span aria-hidden="true">←</span> All articles</button></section>`;
}

export function setupBlogs() {
  const section = document.querySelector('.blogs');
  if (!section) return;
  const sidebar = section.querySelector('.blog-sidebar');
  const reader = section.querySelector('.blog-reader');
  const back = section.querySelector('.blog-back');
  const syncCurrentPost = (post, { scrollItem = false } = {}) => {
    if (!post) return;
    section.querySelectorAll('[data-blog]').forEach((item) => {
      const active = item.dataset.blog === post.filename;
      item.classList.toggle('is-active', active);
      if (active) item.setAttribute('aria-current', 'page');
      else item.removeAttribute('aria-current');
    });
    reader.innerHTML = renderPost(post);
    section.classList.toggle('is-reading', window.matchMedia('(max-width: 700px)').matches);
    reader.scrollTop = 0;
    if (scrollItem) section.querySelector(`[data-blog="${CSS.escape(post.filename)}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    document.title = `${post.title} | Adv. Kumar Vaibhav`;
  };
  section.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-blog]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const post = posts.find((item) => item.filename === link.dataset.blog);
    if (!post) return;
    event.preventDefault();
    history.pushState({}, '', link.href);
    syncCurrentPost(post);
  });
  window.addEventListener('popstate', () => {
    const slug = decodeURIComponent(window.location.pathname.split('/').filter(Boolean)[1] ?? '');
    syncCurrentPost(posts.find((post) => post.slug === slug) ?? posts[0], { scrollItem: true });
  });
  const initialSlug = decodeURIComponent(window.location.pathname.split('/').filter(Boolean)[1] ?? '');
  const initialPost = posts.find((post) => post.slug === initialSlug) ?? posts[0];
  section.classList.toggle('is-reading', Boolean(initialSlug) && window.matchMedia('(max-width: 700px)').matches);
  if (initialSlug && initialPost) document.title = `${initialPost.title} | Adv. Kumar Vaibhav`;
  if (initialSlug && initialPost) requestAnimationFrame(() => section.querySelector(`[data-blog="${CSS.escape(initialPost.filename)}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
  back.addEventListener('click', () => {
    section.classList.remove('is-reading');
    history.pushState({}, '', '/blogs/');
    document.title = 'Writing | Adv. Kumar Vaibhav';
    sidebar.querySelector('[data-blog]')?.focus();
  });
}
