# Cybersecurity Portfolio — Jekyll + GitHub Pages

A responsive dark-green cybersecurity blog and portfolio built with Jekyll, Liquid, Markdown, CSS, and vanilla JavaScript.

## Features

- Home page with About Me, three recent projects, and three recent labs
- Separate Labs, Projects, and Blog listing pages
- Reusable Markdown-driven article layout
- Breadcrumbs on individual articles
- Right-side sticky table of contents generated from `h2` and `h3` headings
- Instant listing search across titles, summaries, and tags
- Dark/light theme toggle (preference is stored locally in the browser)
- Tags, publication dates, and estimated reading time
- Responsive mobile navigation and accessible focus styles

## Repository structure

```text
.
├── _config.yml
├── _layouts/
│   ├── default.html
│   ├── listing.html
│   └── article.html
├── _includes/
│   └── content-card.html
├── _labs/
├── _projects/
├── _posts/
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── favicon.svg
├── index.html
├── labs.html
├── projects.html
├── blog.html
└── Gemfile
```

## Publish with GitHub Pages

1. Create a GitHub repository. For a user site, name it `YOUR-USERNAME.github.io`. A project site can use any repository name.
2. Upload or push the contents of this folder to the repository's default branch (commonly `main`).
3. Open **Settings → Pages** in the repository.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then save.
6. Wait for the GitHub Pages deployment to finish. The published URL will appear in Settings → Pages.

### Configure the base URL for a project site

For a user site at `https://YOUR-USERNAME.github.io`, keep `baseurl: ""`.

For a project site at `https://YOUR-USERNAME.github.io/REPOSITORY`, set `_config.yml` like this:

```yaml
url: "https://YOUR-USERNAME.github.io"
baseurl: "/REPOSITORY"
```

The templates use Jekyll's `relative_url` filter so internal links and assets work with a project-site base URL.

## Optional local preview

Install a Ruby version supported by GitHub Pages, then run:

```bash
bundle install
bundle exec jekyll serve
```

Open the local URL printed by Jekyll (usually `http://127.0.0.1:4000`).

GitHub Pages builds the site in its own environment. You do not need to commit the generated `_site/` folder.

## Add a lab

Create a Markdown file under `_labs/`, for example `_labs/dns-investigation.md`:

```markdown
---
title: "DNS Investigation with Wireshark"
date: 2026-11-01
description: "Inspect DNS queries and responses in a packet capture."
tags: [Networking, DNS, Wireshark]
category: Network Analysis
---

## Objective

State what you are trying to learn.

## Environment

List your tools and setup.

## Procedure

Describe reproducible steps.

## Evidence

Add screenshots, command output, or packet details.

## Findings

Explain what the evidence supports.

## What I learned

Record lessons and follow-up questions.
```

Commit the file. Jekyll generates its article page and adds it to the Labs listing and recent-labs section automatically.

## Add a project

Create a Markdown file under `_projects/` using the same front matter structure. Jekyll automatically publishes it to the Projects listing and homepage cards.

## Add a blog post

Create a file in `_posts/` with this filename format:

`YYYY-MM-DD-your-post-title.md`

Add `title`, `date`, `description`, and `tags` in YAML front matter. Posts are automatically listed under Blog.

## Writing notes

- Use `##` and `###` headings; they are added to the article's table of contents.
- Put screenshots in a folder such as `assets/images/` and reference them with `![Description]({{ '/assets/images/example.png' | relative_url }})` in a Liquid-enabled page, or use a root-relative path appropriate to your deployment.
- Do not include secrets, credentials, private customer data, or sensitive information in public lab notes.
- The listing search filters loaded cards; it does not search inside the full body of every article.
- The reading-time display is an estimate based on the rendered article word count.
