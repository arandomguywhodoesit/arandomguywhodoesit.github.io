# Cybersecurity Portfolio

A responsive portfolio built with Jekyll, Markdown, HTML, CSS, and JavaScript for GitHub Pages.

## 1. Set up and deploy

1. Create a GitHub repository. For a user site, name it `YOUR_GITHUB_USERNAME.github.io`; for a project site, use any repository name.
2. Upload this project's files to the repository root.
3. Edit `_config.yml`:
   - For a user site, set `url` to `https://YOUR_GITHUB_USERNAME.github.io` and leave `baseurl` empty.
   - For a project site, set `url` to `https://YOUR_GITHUB_USERNAME.github.io` and `baseurl` to `/YOUR_REPOSITORY_NAME`.
   - Replace `YOUR_GITHUB_USERNAME` and the LinkedIn placeholder with your real profile details. The footer intentionally hides unconfigured links.
4. In GitHub, open **Settings → Pages** and choose **Deploy from a branch**, then select the branch (usually `main`) and `/(root)`.
5. Save and wait for GitHub Pages to build the site. Review the Actions tab if deployment fails.

GitHub Pages builds Jekyll sites automatically. The `github-pages` gem is included for optional local testing.

### Local preview (optional)

Install Ruby and Bundler, then run:

```bash
bundle install
bundle exec jekyll serve
```

Open the local address printed by Jekyll. If you change `baseurl` for local preview, remember to restore the intended production value before deployment.

## 2. Add a new lab

1. Copy `LAB_TEMPLATE.md`.
2. Save the copy in `_labs/` with a descriptive filename, e.g. `_labs/dns-investigation.md`.
3. Fill in the YAML front matter and sections.
4. Set `published: true` when ready. Keep it `false` while drafting.
5. Commit and push. The page URL will be `/labs/dns-investigation/` and it will appear automatically in the Labs listing and recent-labs section.

## 3. Add a new project

1. Copy `PROJECT_TEMPLATE.md` into `_projects/`, e.g. `_projects/python-log-analyzer.md`.
2. Complete the front matter and project documentation.
3. Set `published: true` only when ready.
4. Commit and push. The page will be available at `/projects/python-log-analyzer/`.

## 4. Publish a blog post

1. Copy `BLOG_TEMPLATE.md`.
2. Save it under `_posts/` using Jekyll's required filename format: `YYYY-MM-DD-title-with-hyphens.md`.
3. Set the `date` to the intended publication date and `published: true`.
4. Commit and push. The post appears on the Blog listing.

## 5. Add images and screenshots

1. Put image files in `assets/images/`, using descriptive names such as `tcp-handshake.png`.
2. Reference them in Markdown using a baseurl-safe path:

   ```markdown
   ![TCP handshake capture]({{ '/assets/images/tcp-handshake.png' | relative_url }})
   ```

   If your Markdown processor does not evaluate Liquid inside Markdown on your chosen setup, use a root-relative path adjusted for your configured base URL or configure the image URL in the page front matter. Test the rendered image on the deployed site.
3. Add meaningful alt text. Crop or redact tokens, email addresses, usernames, public IPs where sensitive, and other identifying information before publishing.

## 6. Customize the website

- **Colors, typography, layout:** edit `assets/css/style.css`.
- **Mobile navigation, search, sorting, tag filters, table of contents:** edit `assets/js/main.js`.
- **Profile links and site settings:** edit `_config.yml`.
- **Navigation and footer:** edit `_includes/navbar.html` and `_includes/footer.html`.
- **Page layouts:** edit `_layouts/default.html` and `_layouts/article.html`.
- **Home content:** edit `index.html`.

## Front matter reference

```yaml
---
title: "Your article title"
description: "A short summary shown on cards and search."
date: 2026-10-28
last_updated:
tags: [networking, security]
published: false
---
```

Use `published: false` for drafts. The homepage and listing pages explicitly filter for `published: true`. Blog filenames must include the date prefix. Dates are displayed using the configured Singapore timezone.

## Notes

- Example lab, project, and blog content is marked as example material. Replace it with your own work and evidence.
- Never publish credentials, API keys, tokens, private company information, or unredacted sensitive screenshots.
- GitHub Pages supports a limited set of plugins. This implementation uses GitHub Pages-compatible plugins and client-side JavaScript rather than requiring a custom server.
- The article table of contents is generated in the browser from each page's `h2` and `h3` headings.
