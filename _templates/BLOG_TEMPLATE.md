---
# =============================================================================
# BLOG POST TEMPLATE
#
# How to use:
#   1. Copy this file into the _posts/ folder.
#   2. Rename it using EXACTLY this pattern:
#
#        YYYY-MM-DD-short-title.md      e.g. 2026-10-27-learning-wireshark.md
#
#      Jekyll ignores files in _posts/ that don't start with a date.
#      The URL becomes /blog/YYYY/MM/short-title/
#   3. Fill in the front matter and write the post.
#   4. Set `published: true` when it's ready.
#
# Note: posts dated in the future are not published until that date has
# passed AND the site is rebuilt (any new commit triggers a rebuild).
# =============================================================================

# ----- REQUIRED --------------------------------------------------------------
title: "Post Title Goes Here"
description: "One or two sentences summarising the post. Shown on cards, in search results and in link previews."
date: 2026-10-28                     # Should match the date in the file name.
tags: [Learning Notes, Networking]   # Any tags; new ones appear in the filters automatically.

# ----- PUBLISHING ------------------------------------------------------------
published: false                     # Change to true to publish.

# ----- OPTIONAL --------------------------------------------------------------
last_updated:                        # YYYY-MM-DD, shown as "Updated" when set.
# toc: false                         # Uncomment to hide the table of contents (useful for short posts).
# image: /assets/images/blog/your-post-slug/preview.png   # Optional social preview image.
---

<!--
  WRITING GUIDE (not shown on the page; delete when done)

  Suggested structure for different kinds of posts. Delete what you don't need.
  - Tutorial:         Introduction > Background > Steps > Key takeaways > References
  - Learning notes:   Introduction > Main explanation > Examples > Key takeaways
  - Troubleshooting:  Symptom > Cause > Fix > How to verify > References
  - Concept explainer: Introduction > Background > Explanation > Example > Conclusion

  Reading time is calculated automatically.
  Images go in assets/images/blog/<post-slug>/.
-->

## Introduction

What is this post about, and who is it for?

## Background and context

What the reader needs to know first, or why you looked into this.

## Main explanation

The core of the post. Break it into sub-sections with `###` headings.

### A sub-topic

Explain clearly, with short paragraphs. Use **bold** for key terms and
`inline code` for commands, file names and field names.

## Examples or demonstrations

```bash
# Commands the reader can try
dig example.com A +short
```

{% include figure.html
   src="/assets/images/samples/placeholder-screenshot.svg"
   alt="Describe the image for screen readers"
   caption="Figure 1: Caption for the screenshot." %}

## Key takeaways

1. Takeaway one.
2. Takeaway two.
3. Takeaway three.

## Conclusion

Wrap up in a few sentences.

## References

- [Descriptive link text](https://example.com/)
