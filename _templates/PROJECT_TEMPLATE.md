---
# =============================================================================
# PROJECT TEMPLATE
#
# How to use:
#   1. Copy this file into the _projects/ folder.
#   2. Rename it to a short, lowercase, hyphenated name. The file name becomes
#      the URL:  _projects/python-log-analyzer.md  ->  /projects/python-log-analyzer/
#   3. Fill in the front matter below and write up the project.
#   4. Set `published: true` when it's ready to go live.
#
# Works for anything from a 50-line script to a multi-component tool: delete
# the sections you don't need.
# =============================================================================

# ----- REQUIRED --------------------------------------------------------------
title: "Project Title Goes Here"
description: "One or two sentences summarising the project. Shown on cards, in search results and in link previews."
date: 2026-10-28                     # Publication date, YYYY-MM-DD. Used for sorting.
tags: [Python, Security Automation]  # Any tags; new ones appear in the filters automatically.

# ----- PUBLISHING ------------------------------------------------------------
published: false                     # Change to true to publish.

# ----- OPTIONAL (delete or leave empty if not needed) ------------------------
last_updated:                        # YYYY-MM-DD
status: in-progress                  # completed | in-progress | planned
github_url:                          # e.g. https://github.com/your-username/your-repo (adds a "View source" button)
demo_url:                            # e.g. a live demo URL (adds a "View live demo" button)

# ----- ADVANCED (usually leave as is) ----------------------------------------
layout: article                      # Already the default for projects; safe to delete.
# permalink: /projects/custom-url/   # Uncomment only to use a URL different from the file name.
# toc: false                         # Uncomment to hide the table of contents.
# image: /assets/images/projects/your-project-slug/preview.png   # Optional social preview image.
---

<!--
  WRITING GUIDE (this comment is not shown on the page; delete it when done)

  - Use "## " for sections and "### " for sub-sections; they appear in the
    table of contents. Don't use "# " (the title is already the H1).
  - Every section is optional. Delete what doesn't apply.
  - Images and diagrams go in assets/images/projects/<your-project-slug>/.
  - Never paste secrets (API keys, tokens, passwords) into code snippets.
-->

## Project Overview

What the project is, in two or three sentences.

## Problem Statement

What problem does it solve, and for whom?

## Objectives

- Objective one.
- Objective two.

## Features

- Feature one.
- Feature two.

## Technologies Used

| Technology | Purpose |
|------------|---------|
| Python 3 | Main language |
| Library name | What it's used for |

## Architecture and Design

Explain how the parts fit together. Add a diagram if it helps:

{% include figure.html
   src="/assets/images/samples/placeholder-screenshot.svg"
   alt="Describe the diagram for screen readers"
   caption="Figure 1: High-level architecture." %}

## Implementation

Highlight the interesting parts of the code. Link to the full source rather
than pasting everything:

```python
def example(value: str) -> str:
    """Explain what this function does."""
    return value.strip().lower()
```

Full source: [`src/example.py`](https://github.com/your-username/your-repo/blob/main/src/example.py)

## How to Run

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3 main.py --help
```

## Usage Examples

```console
$ python3 main.py --input sample.log
Example output
```

Configuration or output formats can be shown with `yaml` or `json` blocks:

```yaml
threshold: 5
output: json
```

```json
{
  "status": "ok",
  "results": []
}
```

## Testing and Validation

Describe how you tested it and what the results were. Only report tests you
actually ran.

```bash
python3 -m pytest
```

## Challenges and Solutions

| Challenge | Solution |
|-----------|----------|
| What was hard | How you solved it |

## Results

What the project achieved, with evidence (screenshots, numbers, output).

## Limitations

- Known limitation one.

## Future Improvements

- [ ] Planned improvement one.
- [ ] Planned improvement two.

## Lessons Learned

- What you would do differently next time.

## References

- [Descriptive link text](https://example.com/)
