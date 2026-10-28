(function () {
  "use strict";

  var root = document.documentElement;
  var themeButton = document.getElementById("theme-toggle");
  var themeIcon = document.querySelector(".theme-icon");
  var savedTheme = null;

  try { savedTheme = localStorage.getItem("portfolio-theme"); } catch (e) {}
  if (savedTheme === "light" || savedTheme === "dark") {
    root.setAttribute("data-theme", savedTheme);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
    root.setAttribute("data-theme", "light");
  }

  function updateThemeButton() {
    var isLight = root.getAttribute("data-theme") === "light";
    if (themeIcon) themeIcon.textContent = isLight ? "☾" : "☼";
    if (themeButton) themeButton.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  }
  updateThemeButton();

  if (themeButton) {
    themeButton.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("portfolio-theme", next); } catch (e) {}
      updateThemeButton();
    });
  }

  var menuButton = document.querySelector(".mobile-menu-button");
  var nav = document.getElementById("primary-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      var expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open", !expanded);
    });
  }

  // Listing-page instant search: titles, summaries, and tags are indexed in each card.
  var search = document.getElementById("content-search");
  var grid = document.getElementById("content-grid");
  var count = document.getElementById("result-count");
  var noResults = document.getElementById("no-results");

  if (search && grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".content-card"));
    function filterCards() {
      var query = search.value.trim().toLocaleLowerCase();
      var visible = 0;
      cards.forEach(function (card) {
        var text = (card.getAttribute("data-searchable") || card.textContent).toLocaleLowerCase();
        var match = !query || text.indexOf(query) !== -1;
        card.hidden = !match;
        if (match) visible += 1;
      });
      if (count) count.textContent = visible + (visible === 1 ? " entry" : " entries");
      if (noResults) noResults.hidden = visible !== 0;
    }
    search.addEventListener("input", filterCards);
    filterCards();

    document.addEventListener("keydown", function (event) {
      if (event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey) {
        var target = event.target;
        var typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
        if (!typing) {
          event.preventDefault();
          search.focus();
        }
      }
      if (event.key === "Escape" && document.activeElement === search) {
        search.value = "";
        filterCards();
        search.blur();
      }
    });
  }

  // Build a table of contents from article headings and track the active section.
  var articleBody = document.getElementById("article-body");
  var toc = document.getElementById("table-of-contents");
  if (articleBody && toc) {
    var headings = Array.prototype.slice.call(articleBody.querySelectorAll("h2, h3"));
    if (headings.length === 0) {
      var sidebar = toc.closest(".toc-sidebar");
      if (sidebar) sidebar.hidden = true;
    } else {
      toc.textContent = "";
      var usedIds = {};
      headings.forEach(function (heading, index) {
        if (!heading.id) {
          var base = heading.textContent.trim().toLowerCase()
            .replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-") || "section";
          var id = base;
          var suffix = 2;
          while (document.getElementById(id) || usedIds[id]) {
            id = base + "-" + suffix;
            suffix += 1;
          }
          heading.id = id;
          usedIds[id] = true;
        }
        var link = document.createElement("a");
        link.className = "toc-link" + (heading.tagName === "H3" ? " toc-h3" : "");
        link.href = "#" + heading.id;
        link.textContent = heading.textContent.trim();
        link.dataset.target = heading.id;
        toc.appendChild(link);

        var anchor = document.createElement("a");
        anchor.className = "anchor-link";
        anchor.href = "#" + heading.id;
        anchor.setAttribute("aria-label", "Link to " + heading.textContent.trim());
        anchor.textContent = "#";
        heading.appendChild(anchor);
      });

      var tocLinks = Array.prototype.slice.call(toc.querySelectorAll(".toc-link"));
      function activate(id) {
        tocLinks.forEach(function (link) {
          var active = link.dataset.target === id;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }
      if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
          var visible = entries.filter(function (entry) { return entry.isIntersecting; })
            .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
          if (visible.length) activate(visible[0].target.id);
        }, { rootMargin: "-12% 0px -72% 0px", threshold: 0 });
        headings.forEach(function (heading) { observer.observe(heading); });
      } else {
        activate(headings[0].id);
      }
      tocLinks.forEach(function (link) {
        link.addEventListener("click", function () { activate(link.dataset.target); });
      });
    }
  }
})();
