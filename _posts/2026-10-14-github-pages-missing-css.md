---
# SAMPLE CONTENT - replace or delete this file when you write your own posts.
title: "Troubleshooting: GitHub Pages Site Loads Without CSS"
description: "Why a Jekyll site can look fine locally but appear unstyled on GitHub Pages, and how baseurl and relative_url fix it."
date: 2026-10-14
tags: [Troubleshooting, GitHub Pages, Web Development]
sample: true
published: true
---

## Symptom

The site looks correct at `http://127.0.0.1:4000/` but, once deployed to
`https://username.github.io/repository-name/`, every page is plain unstyled
text and links lead to 404 pages.

## Cause

A project site lives under a **sub-path** (`/repository-name/`). A link
written as `/assets/css/style.css` points to the root of the domain,
`https://username.github.io/assets/css/style.css`, which doesn't exist.

## Fix

**1. Tell Jekyll about the sub-path** in `_config.yml`:

```yaml
url: "https://username.github.io"
baseurl: "/repository-name"   # no trailing slash
```

**2. Build every internal link with the `relative_url` filter**, which adds the
`baseurl` automatically:

{% raw %}
```liquid
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">
<a href="{{ '/labs/' | relative_url }}">Labs</a>
```
{% endraw %}

**3. Restart the local server** after editing `_config.yml`. Jekyll only reads
it at start-up:

```bash
bundle exec jekyll serve
```

The local site is now served at `http://127.0.0.1:4000/repository-name/`,
which matches production, so this class of bug shows up before deploying.

## Checklist

- [ ] `baseurl` matches the repository name exactly (it is case-sensitive).
- [ ] No hard-coded `href="/..."` or `src="/..."` in layouts or posts.
- [ ] The local server was restarted after changing `_config.yml`.

## References

- [Jekyll docs: Liquid filters (`relative_url`)](https://jekyllrb.com/docs/liquid/filters/)
- [GitHub Docs: About GitHub Pages and Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll)
