---
title: About
description: About Arrashi Faris Saesarian Libinuko and the purpose of this site.
---
{% comment %}
  EDIT THIS PAGE: replace the placeholder sections below with your own words.
  Keep it honest and specific; only list skills, tools, education and
  certifications you actually have. Delete any section you don't need.
{% endcomment %}

## Hello

I'm **Arrashi Faris Saesarian Libinuko**. I'm building my skills and
experience in cybersecurity and IT, with a particular interest in Security
Operations Center (SOC) analysis and incident response.

I created this site to document my learning in public: the labs I work
through, the projects I build, and the notes I write while figuring things
out. Writing things down helps me understand them properly, and it gives
anyone reviewing my work a clear view of how I approach a problem.

## What I'm focusing on

- Security Operations Center (SOC) analysis
- Incident response
- Network security
- Threat detection and investigation
- Security analysis and troubleshooting

## How I approach problems

> _Placeholder: describe in your own words how you work through a technical
> problem. For example, how you gather evidence, form and test hypotheses,
> and document what you find._

## Tools and technologies I'm learning

> _Placeholder: list the tools and technologies you are actively using in your
> labs and projects. Only include things you have actually worked with._

## Education and certifications

> _Placeholder: add your education, courses and any certifications you hold
> or are working towards. Remove this section if you prefer not to list them._

## Get in touch

{% assign social = site.social %}
{% assign has_github = false %}{% if social.github_username and social.github_username != '' %}{% assign has_github = true %}{% endif %}
{% assign has_linkedin = false %}{% if social.linkedin_url and social.linkedin_url != '' %}{% assign has_linkedin = true %}{% endif %}
{% if has_github or has_linkedin %}
You can find me on:

{% if has_github %}- [GitHub](https://github.com/{{ social.github_username }}){% endif %}
{% if has_linkedin %}- [LinkedIn]({{ social.linkedin_url }}){% endif %}
{% else %}
> _Placeholder: add your GitHub username and LinkedIn URL in `_config.yml`
> (under `social:`) and links will appear here and in the footer._
{% endif %}
