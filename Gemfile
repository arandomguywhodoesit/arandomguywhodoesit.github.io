# Dependencies for building the site locally.
#
# The `github-pages` gem pins Jekyll and every plugin to the exact versions
# GitHub Pages uses in production, so what you see locally matches what gets
# deployed. See https://pages.github.com/versions/
source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins

# Plugins used by this site. All of them are on the GitHub Pages allow-list
# and are already bundled with `github-pages`; listing them here documents
# what the site depends on.
group :jekyll_plugins do
  gem "jekyll-seo-tag"
  gem "jekyll-feed"
  gem "jekyll-sitemap"
end

# Ruby 3+ no longer ships these as default gems, but Jekyll 3.x needs them.
gem "webrick", "~> 1.8"
gem "csv"
gem "base64"
gem "bigdecimal"
gem "logger"

# Windows and JRuby do not include zoneinfo files.
platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Lets `jekyll serve` watch files efficiently on Windows.
gem "wdm", "~> 0.1", platforms: [:windows]
