(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-navigation");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open", !expanded);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    }));
  }

  document.querySelectorAll("[data-listing]").forEach(listing => {
    const search = listing.querySelector("[data-search]");
    const tagFilter = listing.querySelector("[data-tag-filter]");
    const sortSelect = listing.querySelector("[data-sort]");
    const grid = listing.querySelector("[data-card-grid]");
    const count = listing.querySelector("[data-results-count]");
    const noResults = listing.querySelector("[data-no-results]");
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll(".content-card"));

    const update = () => {
      const query = (search?.value || "").trim().toLowerCase();
      const selectedTag = (tagFilter?.value || "").toLowerCase();
      let visible = cards.filter(card => {
        const matchesQuery = `${card.dataset.title || ""} ${card.dataset.description || ""} ${card.dataset.tags || ""}`.includes(query);
        const tags = (card.dataset.tags || "").split(",").map(tag => tag.trim());
        const matchesTag = !selectedTag || tags.includes(selectedTag);
        card.hidden = !(matchesQuery && matchesTag);
        return !card.hidden;
      });

      const sortMode = sortSelect?.value || "newest";
      visible.sort((a, b) => {
        if (sortMode === "title") return (a.dataset.title || "").localeCompare(b.dataset.title || "");
        const dateA = a.dataset.date || "";
        const dateB = b.dataset.date || "";
        return sortMode === "oldest" ? dateA.localeCompare(dateB) : dateB.localeCompare(dateA);
      });
      visible.forEach(card => grid.appendChild(card));
      if (count) count.textContent = `${visible.length} ${visible.length === 1 ? "result" : "results"}`;
      if (noResults) noResults.hidden = visible.length !== 0;
    };

    [search, tagFilter, sortSelect].filter(Boolean).forEach(control => {
      control.addEventListener(control === search ? "input" : "change", update);
    });
    update();
  });

  // Generate a table of contents from article headings without requiring a plugin.
  const article = document.querySelector("#article-content");
  const toc = document.querySelector("#table-of-contents");
  if (article && toc) {
    const headings = Array.from(article.querySelectorAll("h2, h3"));
    if (headings.length === 0) {
      toc.innerHTML = '<p class="muted">No headings in this article.</p>';
    } else {
      const list = document.createElement("ul");
      list.className = "toc-list";
      headings.forEach((heading, index) => {
        if (!heading.id) {
          heading.id = heading.textContent.trim().toLowerCase()
            .replace(/[^\w\s-]/g, "").replace(/\s+/g, "-") || `section-${index + 1}`;
        }
        const item = document.createElement("li");
        if (heading.tagName === "H3") item.className = "toc-subitem";
        const link = document.createElement("a");
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        item.appendChild(link);
        list.appendChild(item);
      });
      toc.replaceChildren(list);
    }
  }
})();