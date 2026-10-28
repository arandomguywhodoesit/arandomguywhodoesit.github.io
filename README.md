# Cybersecurity Portfolio & Technical Blog

The source for the personal portfolio of **Arrashi Faris Saesarian Libinuko**:
cybersecurity labs, technical projects and blog posts, built with
[Jekyll](https://jekyllrb.com/) and hosted on
[GitHub Pages](https://pages.github.com/).

All content is plain Markdown. To publish a lab, project or post, you add a
Markdown file. The listings, home page cards, tag filters, table of contents
and related links all update on their own, so you never have to edit the
site's HTML for new content.

---

## Contents

1. [Project overview](#1-project-overview)
2. [Repository structure](#2-repository-structure)
3. [Technology stack](#3-technology-stack)
4. [Local development setup](#4-local-development-setup)
5. [Create a new lab](#5-create-a-new-lab)
6. [Create a new project](#6-create-a-new-project)
7. [Create a new blog post](#7-create-a-new-blog-post)
8. [Add screenshots and images](#8-add-screenshots-and-images)
9. [Add tags](#9-add-tags)
10. [Update the About page and home page](#10-update-the-about-page-and-home-page)
11. [Configure social links](#11-configure-social-links)
12. [Test changes locally](#12-test-changes-locally)
13. [Deploy updates](#13-deploy-updates)
14. [Troubleshooting](#14-troubleshooting)
15. [Customising the design](#15-customising-the-design)
16. [Notes on loading content from other repositories](#16-notes-on-loading-content-from-other-repositories)

---

## 1. Project overview

| Section | URL | Content source |
|---------|-----|----------------|
| Home | `/` | `index.md` (hero text) + latest 3 projects and labs |
| Labs | `/labs/` | Every file in `_labs/` |
| Projects | `/projects/` | Every file in `_projects/` |
| Blog | `/blog/` | Every file in `_posts/` |
| About | `/about/` | `about/index.md` |

Features:

- Persistent (sticky) navigation bar with current-section highlighting and a
  mobile menu.
- Listing pages with search (title, description, tags), tag filters, and
  newest/oldest sorting. Filtered views are reflected in the URL, so
  `/labs/?tag=DNS` can be shared or bookmarked.
- Article pages with an automatic table of contents (sticky on desktop,
  collapsible on mobile), syntax-highlighted code with a copy button,
  responsive tables, figures with captions, task lists and related content.
- Draft support (`published: false`), status badges, difficulty and
  estimated time, "last updated" dates and blog reading time.
- SEO and social sharing tags, an RSS feed (`/feed.xml`) and a sitemap.
- Everything works without JavaScript; JS only adds search/filtering, the
  mobile menu toggle and copy buttons.

### Sample content

The files below are **sample content** to demonstrate the site. They are
marked with `sample: true`, which shows a "Sample content" notice on the page
and a "Sample" badge on cards. Delete them (and the images in
`assets/images/samples/` they use) once you have your own content:

- `_labs/wireshark-tcp-handshake.md`
- `_labs/dns-analysis.md`
- `_projects/python-log-analyzer.md`
- `_posts/2026-10-27-learning-wireshark.md`
- `_posts/2026-10-14-github-pages-missing-css.md`

> Keep `assets/images/samples/placeholder-screenshot.svg`; the templates use it
> as a placeholder image.

---

## 2. Repository structure

```text
cybersecurity-portfolio/
├── _config.yml               # Site settings: name, URLs, social links, collections
├── Gemfile                   # Ruby dependencies for building locally
├── index.md                  # Home page text (hero section)
├── 404.html                  # "Page not found" page
│
├── _data/
│   ├── navigation.yml        # Menu items in the navigation bar
│   └── sections.yml          # Labels/URLs for labs, projects and blog
│
├── _layouts/                 # Page templates
│   ├── default.html          # Base HTML shell: <head>, navbar, footer
│   ├── home.html             # Home page
│   ├── listing.html          # Labs / Projects / Blog listing pages
│   ├── article.html          # Individual lab, project and blog post pages
│   └── page.html             # Simple pages (About, 404)
│
├── _includes/                # Reusable components
│   ├── head.html             # <head> contents, SEO tags
│   ├── navbar.html           # Navigation bar
│   ├── footer.html           # Footer
│   ├── card.html             # Card used for labs, projects and posts
│   ├── table-of-contents.html
│   ├── related.html          # "Related labs/projects/posts"
│   ├── figure.html           # Image with caption (handles base path)
│   ├── tag-list.html, date.html, reading-time.html,
│   └── status-badge.html, sample-notice.html
│
├── _labs/                    # ONE MARKDOWN FILE PER LAB
├── _projects/                # ONE MARKDOWN FILE PER PROJECT
├── _posts/                   # ONE MARKDOWN FILE PER BLOG POST (YYYY-MM-DD-title.md)
├── _templates/               # LAB_TEMPLATE.md, PROJECT_TEMPLATE.md, BLOG_TEMPLATE.md
│
├── labs/index.md             # Labs listing page (title + intro text)
├── projects/index.md         # Projects listing page
├── blog/index.md             # Blog listing page
├── about/index.md            # About page
│
├── assets/
│   ├── css/style.css         # All styles; colours/fonts are CSS variables at the top
│   ├── js/main.js            # Mobile menu, search/filter/sort, TOC, copy buttons
│   └── images/               # Images (see section 8)
│
└── .github/workflows/pages.yml   # Build & deploy to GitHub Pages
```

Folders starting with `_` are not published as-is; Jekyll uses them to build
the site. `_templates/` is ignored completely, so the templates never appear
on the website.

**Changes from the suggested structure:** a single `card.html` replaces
separate `project-card.html` and `lab-card.html`, so all cards share one piece
of markup. A `page.html` layout was added for the About and 404 pages, and
`_data/` holds the menu and section labels so they're edited in one place.

---

## 3. Technology stack

| Part | Choice |
|------|--------|
| Hosting | GitHub Pages |
| Site generator | Jekyll 3.10 (via the `github-pages` gem, same version GitHub uses) |
| Content | Markdown (kramdown, GitHub-Flavoured Markdown) |
| Code highlighting | Rouge (built into Jekyll), runs at build time |
| Styling | One hand-written CSS file with CSS variables; system fonts, no web fonts |
| JavaScript | One small vanilla JS file; no frameworks, no external requests |
| Plugins | `jekyll-seo-tag`, `jekyll-feed`, `jekyll-sitemap` (all supported by GitHub Pages) |

There is no database, backend, API token or third-party service.

---

## 4. Local development setup

You don't *need* to run the site locally. GitHub builds it for you. But a
local preview lets you check posts before publishing.

> **Important:** the `github-pages` gem currently requires **Ruby 3.x**
> (Ruby 3.3 recommended). It does **not** install on Ruby 4. If your system
> Ruby is 4.x, use Option B (Docker) or install Ruby 3.3 with a version
> manager such as `rbenv`, `asdf` or `chruby`.

### Option A: Ruby installed on your computer

1. Install Ruby 3.3:
   - **macOS:** `brew install rbenv ruby-build`, then `rbenv install 3.3.6`
     and `rbenv local 3.3.6` inside the project folder.
   - **Windows:** install "Ruby+Devkit 3.3.x" from
     [rubyinstaller.org](https://rubyinstaller.org/) and tick the MSYS2 option.
   - **Ubuntu/Debian:** see the [Jekyll install guide](https://jekyllrb.com/docs/installation/ubuntu/).
2. Check the version: `ruby -v` (should say 3.x).
3. Install Bundler: `gem install bundler`
4. In the project folder, install the dependencies:

   ```bash
   bundle install
   ```

5. Start the local server:

   ```bash
   bundle exec jekyll serve --livereload
   ```

6. Open **http://127.0.0.1:4000/cybersecurity-portfolio/**. The path
   matches `baseurl` in `_config.yml`. If you change `baseurl`, the local URL
   changes too.

### Option B: Docker (no Ruby install needed)

With [Docker Desktop](https://www.docker.com/products/docker-desktop/)
installed, run this from the project folder:

```bash
docker run --rm -it -p 4000:4000 \
  -v "$PWD":/srv/site -w /srv/site \
  -v jekyll-gems:/usr/local/bundle \
  ruby:3.3 \
  bash -c "bundle install && bundle exec jekyll serve --host 0.0.0.0"
```

Then open **http://localhost:4000/cybersecurity-portfolio/**. The
`jekyll-gems` volume caches the installed gems so later starts are fast.

Stop the server with <kbd>Ctrl</kbd> + <kbd>C</kbd>.

---

## 5. Create a new lab

1. Copy `_templates/LAB_TEMPLATE.md` into `_labs/`.
2. Rename it. Use lowercase words separated by hyphens; this becomes the URL:
   `_labs/active-directory-enumeration.md` → `/labs/active-directory-enumeration/`
3. Edit the front matter (the block between the `---` lines):
   - **Required:** `title`, `description`, `date`, `tags`
   - **Optional:** `last_updated`, `difficulty`, `estimated_time`, `status`,
     `permalink`, `toc`, `image`
4. Write the lab below the front matter. Delete any template sections you
   don't need.
5. Change `published: false` to `published: true`.
6. Commit and push. The lab appears on `/labs/`, and on the home page if it's
   one of the three newest.

**Doing it entirely on GitHub.com:** open the `_labs` folder → **Add file** →
**Create new file**, type the file name (e.g. `dns-tunnelling.md`), paste in the
template, edit it, and click **Commit changes**.

## 6. Create a new project

Same as a lab, using `_templates/PROJECT_TEMPLATE.md` and the `_projects/`
folder. Projects also support:

- `github_url`: adds a **View source on GitHub** button.
- `demo_url`: adds a **View live demo** button.

Leave either empty to hide its button.

## 7. Create a new blog post

1. Copy `_templates/BLOG_TEMPLATE.md` into `_posts/`.
2. Rename it using **exactly** this pattern:

   ```text
   YYYY-MM-DD-short-title.md
   2026-11-03-windows-event-ids-for-soc.md
   ```

   Jekyll **ignores** files in `_posts/` that don't start with a valid date.
   The URL becomes `/blog/2026/11/windows-event-ids-for-soc/`.
3. Fill in `title`, `description`, `date` (same date as the file name) and
   `tags`.
4. Set `published: true`, commit and push.

Reading time is calculated automatically.

### Drafts and scheduled posts

- `published: false` keeps any lab, project or post off the live site. Preview
  drafts locally with `bundle exec jekyll serve --unpublished`.
- Content with a `date` in the future is not published until that date has
  passed **and** the site is rebuilt (any commit triggers a rebuild). Preview
  locally with `--future`.

---

## 8. Add screenshots and images

1. Put images in a folder named after the page they belong to:

   ```text
   assets/images/labs/dns-analysis/query-response.png
   assets/images/projects/python-log-analyzer/output.png
   assets/images/blog/learning-wireshark/filter-bar.png
   ```

   Use lowercase file names without spaces. PNG for screenshots, SVG for
   diagrams, JPG for photos. Try to keep each image under ~500 KB.

2. Insert the image with the **figure include** (recommended):

   ```liquid
   {% include figure.html
      src="/assets/images/labs/dns-analysis/query-response.png"
      alt="Wireshark showing a DNS query and its response"
      caption="Figure 1: DNS query and response for example.com" %}
   ```

   `src` starts with `/assets/...`. The include adds the site's base path
   (e.g. `/cybersecurity-portfolio`) for you, so the image works both locally
   and on GitHub Pages. `caption` is optional and can contain Markdown.

3. Or use plain Markdown, **wrapping the path in `relative_url`**:

   ```liquid
   ![Wireshark showing a DNS query]({{ '/assets/images/labs/dns-analysis/query-response.png' | relative_url }})
   ```

   ⚠️ A bare root path like `![](/assets/images/x.png)` will work locally only
   if `baseurl` is empty, and **will break** on a project site such as
   `username.github.io/cybersecurity-portfolio/`.

Always write meaningful `alt` text (what the image shows), and blur or crop
out anything sensitive: real IPs from an employer, usernames, hostnames,
tokens.

---

## 9. Add tags

Add tags to any file's front matter as a list:

```yaml
tags: [Incident Response, Windows, Event Logs]
```

That's all. New tags automatically appear on cards, in the filter buttons of
that section's listing page, and as links (`/labs/?tag=Windows`). No tag
pages or config changes are needed.

Tips:

- Always use the `[ ... ]` list format. `tags: Incident Response` (without
  brackets) is split into two tags, "Incident" and "Response".
- Keep capitalisation consistent. Filtering ignores case, but "Wireshark" and
  "wireshark" would show up as two separate filter buttons.

---

## 10. Update the About page and home page

- **About page:** edit `about/index.md`. Replace the placeholder sections with
  your own words. Only list skills, education and certifications you actually
  have.
- **Home page hero:** edit `index.md`. The front matter controls the small
  `$ whoami` line, the tagline, the list of interests and the goal statement.
  The paragraph below the front matter is the introduction text.
- **Navigation menu:** edit `_data/navigation.yml`.
- **Site name / brand:** edit `title`, `brand` and `author.name` in
  `_config.yml`.

## 11. Configure social links

In `_config.yml`:

```yaml
social:
  github_username: "your-github-username"
  linkedin_url: "https://www.linkedin.com/in/your-profile/"
  source_repository_url: "https://github.com/your-github-username/cybersecurity-portfolio"
```

Links appear in the footer and on the About page. **Empty values are hidden**,
so the site never shows a link that goes nowhere.

Also set `url` in `_config.yml` (e.g. `https://your-github-username.github.io`)
so social previews, the RSS feed and the sitemap use full URLs.

Restart the local server after editing `_config.yml`; it is only read at
start-up.

---

## 12. Test changes locally

1. Start the server (section 4) and open the local URL.
2. Check:
   - [ ] The new page appears on its listing page and (if recent) the home page.
   - [ ] Its link opens the full page.
   - [ ] Images load and code blocks are highlighted.
   - [ ] The table of contents lists your `##` and `###` headings.
   - [ ] Search and tag filters find it.
   - [ ] It looks right on a narrow window (or your browser's mobile view).
3. To check a build without serving, run `bundle exec jekyll build`. Errors
   are printed in red with the file name.

---

## 13. Deploy updates

### First-time setup

1. Create a repository on GitHub, e.g. `cybersecurity-portfolio`.
2. In `_config.yml`, set:
   - `baseurl: "/cybersecurity-portfolio"` (the repository name, with a
     leading slash). If the repository is named `<username>.github.io`, set
     `baseurl: ""`.
   - `url: "https://<username>.github.io"`
3. Push the code:

   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<username>/cybersecurity-portfolio.git
   git push -u origin main
   ```

4. On GitHub: **Settings → Pages → Build and deployment → Source:
   GitHub Actions**.
5. Open the **Actions** tab and wait for "Deploy site to GitHub Pages" to
   finish (about a minute). The site is then live at
   `https://<username>.github.io/cybersecurity-portfolio/`.

### Every update after that

Commit and push to `main` (or edit files directly on GitHub.com). The workflow
rebuilds and redeploys automatically.

### Alternative: "Deploy from a branch"

You can instead choose **Source: Deploy from a branch → `main` / `(root)`**.
GitHub then builds the site itself with the same Jekyll version and plugins.
In that case delete `.github/workflows/pages.yml` so it doesn't run too. The
Actions workflow is recommended because its logs make build errors easier to
find.

> Both options use GitHub's `github-pages` environment, which only allows
> [these plugins](https://pages.github.com/versions/). This site only uses
> supported plugins. If you ever need an unsupported plugin, you would switch
> the workflow to install Ruby and run `bundle exec jekyll build` yourself;
> that's a larger change and not needed for this site.

### Custom domain (later)

1. Buy a domain and, at your DNS provider, add either:
   - a `CNAME` record for `www` pointing to `<username>.github.io`, or
   - `A` records for the apex domain pointing to GitHub's IPs (listed in
     [GitHub's docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)).
2. **Settings → Pages → Custom domain**: enter the domain and save, then tick
   **Enforce HTTPS** once it becomes available.
3. In `_config.yml`, set `url: "https://www.yourdomain.com"` and
   `baseurl: ""`. A custom domain serves the site from the root.
4. Commit and push.

---

## 14. Troubleshooting

| Problem | Likely cause and fix |
|---------|----------------------|
| Site has **no styling** / links 404 on GitHub Pages | `baseurl` doesn't match the repository name. Fix it in `_config.yml` (case-sensitive, leading slash, no trailing slash). |
| A new **lab/project doesn't appear** | `published: false` is still set; or the file isn't directly in `_labs/` / `_projects/`; or the `date` is in the future; or the file doesn't end in `.md`. |
| A new **blog post doesn't appear** | The file name doesn't start with `YYYY-MM-DD-`; or the date is in the future; or `published: false`. |
| **Image is broken** on the live site but fine locally | The path doesn't use the figure include or `relative_url`. See section 8. Also check the file name's capitalisation: GitHub Pages is case-sensitive, macOS and Windows usually aren't. |
| Build fails with **"YAML Exception"** | Front matter syntax error. Usually an unquoted value containing `:` or `#`. Wrap the value in double quotes. |
| Build fails with **"Liquid Exception"** or `{{ }}` disappears from a code block | Code that contains `{{` or `{%` (e.g. GitHub Actions, Jinja, Ansible) is treated as a template. Wrap the code block in `{% raw %}` and `{% endraw %}` lines. |
| One tag became **two tags** | Use list syntax: `tags: [Incident Response]`. |
| Dates are **one day off** | Dates are interpreted in UTC. Set `timezone:` in `_config.yml` to your [IANA time zone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones), e.g. `Europe/London`. |
| Changes to `_config.yml` **have no effect** locally | Restart `jekyll serve`. |
| `bundle install` fails mentioning **Ruby >= 2.6, < 4.0** | Your Ruby is 4.x. Use Ruby 3.3 or Docker (section 4). |
| Live site **hasn't updated** | Check the Actions tab for a failed run and read its log. Changes can also take a minute or two to show up; hard-refresh the page. |
| Table of contents is **missing** | The page has no `##` or `###` headings, or `toc: false` is set. |

---

## 15. Customising the design

All colours, fonts, spacing and widths are CSS variables at the top of
`assets/css/style.css` (the `:root { ... }` block). For example, to change the
accent colour edit `--color-accent`. Syntax-highlighting colours are in
section 10 of the same file.

Other display options live in `_config.yml`: `date_format`,
`home_recent_count`, `related_count` and `reading_speed_wpm`.

---

## 16. Notes on loading content from other repositories

This site builds pages **only from files stored in this repository**, at build
time. That's deliberate: it's fast, works without JavaScript, needs no API
tokens and is fully indexed by search engines.

If you later want to show content from *other* repositories (for example, a
project's own README), the options are:

| Approach | Trade-offs |
|----------|------------|
| **Link to it** using `github_url` (current approach) | Simplest; nothing can break. Readers leave the site to see the code. |
| **Copy the content** into a project page here | Full control over presentation; you have to update it manually when the source changes. |
| **Fetch at build time** with a scheduled GitHub Actions job that downloads files from public repositories and commits them here | Automatic, still static. Requires writing and maintaining a workflow; private repositories would need a token stored as a repository secret. |
| **Fetch in the browser** with the GitHub REST API | No build step, but needs JavaScript, is subject to API rate limits (60 requests/hour per visitor without a token), is not indexed by search engines, and must never embed a token in the page. |

For a portfolio, linking with `github_url` (plus a short write-up here) is
usually the best balance.
