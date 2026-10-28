/*
 * Site JavaScript. Everything here is progressive enhancement: the site is
 * fully readable and navigable without it.
 *
 *   1. Mobile navigation toggle
 *   2. Listing pages: search, tag filtering, sorting
 *   3. Article pages: table of contents behaviour
 *   4. Code blocks: copy button, keyboard scrolling
 *   5. Footer year
 */
(function () {
  'use strict';

  /* 1. Mobile navigation --------------------------------------------------- */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.getElementById('primary-menu');
    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Reset the menu when the viewport grows past the mobile breakpoint.
    var desktop = window.matchMedia('(min-width: 48rem)');
    var onChange = function (e) { if (e.matches) setOpen(false); };
    if (desktop.addEventListener) desktop.addEventListener('change', onChange);
    else if (desktop.addListener) desktop.addListener(onChange);
  }

  /* 2. Listing pages ------------------------------------------------------- */
  /*
   * Cards are rendered by Jekyll at build time with data attributes:
   *   data-search  lower-cased title + description + tags
   *   data-tags    lower-cased tags separated by "|"
   *   data-date    publication date as a Unix timestamp
   * This script only shows/hides and reorders those existing cards, so new
   * Markdown files work automatically. Filter state is mirrored in the URL
   * (?q=...&tag=...&sort=oldest) so filtered views can be bookmarked and
   * tag links from other pages (e.g. /labs/?tag=DNS) work.
   */
  function initListing(root) {
    var controls = root.querySelector('[data-listing-controls]');
    var grid = root.querySelector('[data-listing-grid]');
    var search = root.querySelector('[data-listing-search]');
    var sort = root.querySelector('[data-listing-sort]');
    var countEl = root.querySelector('[data-listing-count]');
    var emptyEl = root.querySelector('[data-listing-empty]');
    var clearBtn = root.querySelector('[data-listing-clear]');
    var tagButtons = Array.prototype.slice.call(root.querySelectorAll('[data-filter-tag]'));
    if (!controls || !grid) return;
    var cards = Array.prototype.slice.call(grid.querySelectorAll('[data-card]'));
    if (!cards.length) return;

    cards.forEach(function (card, index) {
      card._index = index; // original (newest-first) order, used as a tie-breaker
      card._tags = (card.getAttribute('data-tags') || '').split('|').filter(Boolean);
      card._search = card.getAttribute('data-search') || '';
      card._date = Number(card.getAttribute('data-date')) || 0;
    });

    var state = { query: '', tags: [], sort: 'newest' };

    // Read initial state from the URL.
    var params = new URLSearchParams(window.location.search);
    state.query = params.get('q') || '';
    state.tags = params.getAll('tag').map(function (t) { return t.toLowerCase(); });
    state.sort = params.get('sort') === 'oldest' ? 'oldest' : 'newest';

    if (search) search.value = state.query;
    if (sort) sort.value = state.sort;
    controls.hidden = false;

    function matches(card) {
      var words = state.query.toLowerCase().split(/\s+/).filter(Boolean);
      var textMatch = words.every(function (word) { return card._search.indexOf(word) !== -1; });
      var tagMatch = !state.tags.length || state.tags.some(function (tag) {
        return card._tags.indexOf(tag) !== -1;
      });
      return textMatch && tagMatch;
    }

    function updateUrl() {
      var p = new URLSearchParams();
      if (state.query) p.set('q', state.query);
      state.tags.forEach(function (t) { p.append('tag', t); });
      if (state.sort !== 'newest') p.set('sort', state.sort);
      var qs = p.toString();
      var url = window.location.pathname + (qs ? '?' + qs : '') + window.location.hash;
      window.history.replaceState(null, '', url);
    }

    function render() {
      var sorted = cards.slice().sort(function (a, b) {
        var diff = state.sort === 'oldest' ? a._date - b._date : b._date - a._date;
        return diff || a._index - b._index;
      });

      var visible = 0;
      sorted.forEach(function (card) {
        var show = matches(card);
        card.hidden = !show;
        if (show) visible++;
        grid.appendChild(card); // re-appending moves the node into sorted order
      });

      tagButtons.forEach(function (btn) {
        var active = state.tags.indexOf(btn.getAttribute('data-filter-tag')) !== -1;
        btn.setAttribute('aria-pressed', String(active));
      });

      var filtered = state.query !== '' || state.tags.length > 0;
      countEl.textContent = filtered
        ? 'Showing ' + visible + ' of ' + cards.length + (cards.length === 1 ? ' item' : ' items')
        : cards.length + (cards.length === 1 ? ' item' : ' items');
      emptyEl.hidden = visible !== 0;
      clearBtn.hidden = !filtered;
      updateUrl();
    }

    if (search) {
      search.addEventListener('input', function () {
        state.query = search.value.trim();
        render();
      });
    }

    if (sort) {
      sort.addEventListener('change', function () {
        state.sort = sort.value;
        render();
      });
    }

    tagButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tag = btn.getAttribute('data-filter-tag');
        var i = state.tags.indexOf(tag);
        if (i === -1) state.tags.push(tag);
        else state.tags.splice(i, 1);
        render();
      });
    });

    // Tag links inside cards point to "?tag=X" on this same page; handle them
    // in place instead of reloading.
    grid.addEventListener('click', function (event) {
      var link = event.target.closest('a[data-tag]');
      if (!link) return;
      var target = new URL(link.href, window.location.href);
      if (target.pathname !== window.location.pathname) return;
      event.preventDefault();
      state.tags = [link.getAttribute('data-tag').toLowerCase()];
      render();
      controls.scrollIntoView({ block: 'start' });
    });

    clearBtn.addEventListener('click', function () {
      state.query = '';
      state.tags = [];
      if (search) search.value = '';
      render();
      if (search) search.focus();
    });

    render();
  }

  /* 3. Table of contents --------------------------------------------------- */
  function initToc() {
    var toc = document.querySelector('[data-toc]');
    if (!toc) return;

    // The TOC is open by default (useful without JS). On small screens, start
    // it collapsed so the article content is visible straight away.
    var details = toc.querySelector('details');
    var wide = window.matchMedia('(min-width: 68rem)');
    if (details && !wide.matches) details.open = false;

    // Highlight the section currently being read.
    if (!('IntersectionObserver' in window)) return;
    var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
    var byId = {};
    var headings = links.map(function (link) {
      var id = decodeURIComponent(link.getAttribute('href').slice(1));
      byId[id] = link;
      return document.getElementById(id);
    }).filter(Boolean);

    var current = null;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        if (current) current.classList.remove('is-current');
        current = byId[entry.target.id];
        if (current) current.classList.add('is-current');
      });
    }, { rootMargin: '0px 0px -70% 0px' });

    headings.forEach(function (h) { observer.observe(h); });
  }

  /* 4. Code blocks --------------------------------------------------------- */
  function initCodeBlocks() {
    var blocks = document.querySelectorAll('.prose div.highlighter-rouge, .prose figure.highlight');
    var canCopy = !!(navigator.clipboard && window.isSecureContext);

    Array.prototype.forEach.call(blocks, function (block) {
      var pre = block.querySelector('pre');
      if (!pre) return;

      // Let keyboard users scroll long lines horizontally.
      if (pre.scrollWidth > pre.clientWidth) {
        pre.setAttribute('tabindex', '0');
      }

      if (!canCopy) return;
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'code-copy';
      button.textContent = 'Copy';
      button.setAttribute('aria-label', 'Copy code to clipboard');
      button.addEventListener('click', function () {
        var code = pre.querySelector('code') || pre;
        navigator.clipboard.writeText(code.innerText.replace(/\n$/, '')).then(function () {
          button.textContent = 'Copied';
          button.setAttribute('data-copied', '');
          setTimeout(function () {
            button.textContent = 'Copy';
            button.removeAttribute('data-copied');
          }, 2000);
        });
      });
      block.appendChild(button);
    });

    // Wide tables scroll horizontally; make them keyboard-focusable too.
    Array.prototype.forEach.call(document.querySelectorAll('.prose table'), function (table) {
      if (table.scrollWidth > table.clientWidth) table.setAttribute('tabindex', '0');
    });
  }

  /* 5. Footer year ---------------------------------------------------------- */
  // The year is also rendered at build time; this keeps it current even if
  // the site hasn't been rebuilt since the new year.
  function initYear() {
    var el = document.querySelector('[data-current-year]');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function init() {
    initNav();
    Array.prototype.forEach.call(document.querySelectorAll('[data-listing]'), initListing);
    initToc();
    initCodeBlocks();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
