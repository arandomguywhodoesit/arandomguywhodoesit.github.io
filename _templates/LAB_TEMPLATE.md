---
# =============================================================================
# LAB TEMPLATE
#
# How to use:
#   1. Copy this file into the _labs/ folder.
#   2. Rename it to a short, lowercase, hyphenated name. The file name becomes
#      the URL:  _labs/dns-analysis.md  ->  /labs/dns-analysis/
#   3. Fill in the front matter below and write the lab.
#   4. Set `published: true` when it's ready to go live.
#
# Lines starting with # are comments and are ignored.
# =============================================================================

# ----- REQUIRED --------------------------------------------------------------
title: "Lab Title Goes Here"
description: "One or two sentences summarising the lab. Shown on cards, in search results and in link previews."
date: 2026-10-28                 # Publication date, YYYY-MM-DD. Used for sorting (newest first).
tags: [Networking, Wireshark]    # Any tags you like. New tags appear in the filters automatically.
                                 # Use a list, e.g. [Incident Response, SIEM], not a single string.

# ----- PUBLISHING ------------------------------------------------------------
published: false                 # false = draft (not built on GitHub Pages). Change to true to publish.

# ----- OPTIONAL (delete or leave empty if not needed) ------------------------
last_updated:                    # YYYY-MM-DD, shown as "Updated" when set.
difficulty: Beginner             # Free text, e.g. Beginner | Intermediate | Advanced.
estimated_time: "1 hour"         # Free text, e.g. "45 minutes".
status: completed                # completed | in-progress | planned (free text; shown as a badge).

# ----- ADVANCED (usually leave as is) ----------------------------------------
layout: article                  # Already the default for labs; safe to delete.
# permalink: /labs/custom-url/   # Uncomment only to use a URL different from the file name.
# toc: false                     # Uncomment to hide the table of contents.
# image: /assets/images/labs/your-lab-slug/preview.png   # Optional social preview image.
---

<!--
  WRITING GUIDE (this comment is not shown on the page; delete it when done)

  - Start sections with "## " (H2) and sub-sections with "### " (H3).
    Both appear in the table of contents automatically.
  - Don't add a "# " (H1) heading. The page title is already the H1.
  - Every section below is optional. Delete any that don't apply; the page
    and the table of contents adjust automatically.
  - Screenshots: put image files in assets/images/labs/<your-lab-slug>/ and use
    the figure include shown in "Evidence and Observations" below.
  - Never include real passwords, API keys, private IPs from an employer, or
    other sensitive data in screenshots or logs.
-->

## Overview

Briefly describe what this lab is about and why it matters for security
operations or IT.

## Objectives

- Objective one.
- Objective two.
- Objective three.

## Environment and Tools

| Component | Details |
|-----------|---------|
| Host / hypervisor | e.g. VirtualBox on Windows 11 |
| Target system | e.g. Ubuntu Server 24.04, `192.168.56.20` |
| Tools | e.g. Wireshark, tcpdump |

## Prerequisites

- What needs to be installed or configured first.
- Any knowledge the reader should already have.

## Lab Setup

Describe how the environment was built. Number the steps:

1. First setup step.
2. Second setup step.

## Methodology

Explain the approach: what you planned to test or investigate and why.

## Step-by-Step Execution

### Step 1: Short description

Explain what you did and why. Put commands in fenced code blocks and name the
language after the opening backticks for syntax highlighting
(`bash`, `powershell`, `python`, `json`, `yaml`, `sql`, `text`, ...):

```bash
sudo tcpdump -i eth0 -w capture.pcap
```

```powershell
Get-WinEvent -LogName Security -MaxEvents 10
```

### Step 2: Short description

To show a command together with its output, use a `console` block and start
command lines with `$`:

```console
$ whoami
analyst
```

## Evidence and Observations

Add screenshots with the figure include. The path starts with `/assets/...`;
the include adds the site's base path automatically.

{% include figure.html
   src="/assets/images/samples/placeholder-screenshot.svg"
   alt="Describe what the screenshot shows, for screen readers"
   caption="Figure 1: Short caption explaining the screenshot." %}

Record observations in a table when comparing several data points:

| Time | Source | Event | Notes |
|------|--------|-------|-------|
| 10:15:30 | 192.168.56.10 | Example event | What you noticed |

> **Observation:** Use a blockquote to highlight an important observation.

## Analysis and Findings

**Finding 1: Short, specific statement.**
Explain the evidence that supports it.

**Finding 2: Short, specific statement.**
Explain the evidence that supports it.

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| What went wrong | Why it happened | How you fixed it |

## Lessons Learned

- [x] Something you learned or will do differently.
- [ ] A follow-up task you haven't done yet.

## Conclusion

Summarise what the lab demonstrated in a few sentences.

---

## References

- [Descriptive link text](https://example.com/)
- Link to another page on this site: [My other lab]({{ '/labs/other-lab-slug/' | relative_url }})
