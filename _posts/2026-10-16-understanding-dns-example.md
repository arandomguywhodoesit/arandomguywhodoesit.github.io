---
title: "Understanding DNS: From Name to Address"
description: "Example explainer of how DNS helps clients locate services by domain name."
date: 2026-10-16
tags: [dns, networking, fundamentals]
published: true
---

> **Portfolio example:** Review and personalize this sample article before treating it as your own published writing.

## Introduction
People usually visit services using domain names, while network communication relies on IP addresses. The Domain Name System (DNS) helps connect those two worlds.

## Background
DNS is a distributed naming system. A client commonly asks a recursive resolver to find records for a domain.

## Main Content
For a typical lookup, the resolver may answer from cache. If it does not have a usable answer, it can query other DNS servers to find the requested record. An A record maps a name to an IPv4 address; an AAAA record maps a name to an IPv6 address.

## Examples
Try `nslookup example.com` in a terminal. Enter the domain name only—do not include `https://`, because that scheme is not part of the DNS name.

## Key Takeaways
- DNS resolves names to records, often including IP addresses.
- A response may be served from cache.
- DNS results alone do not prove a website is trustworthy.

## Conclusion
Understanding DNS is useful when troubleshooting connectivity and when investigating network activity. Always interpret DNS observations alongside other evidence.

## References
- [Cloudflare: What is DNS?](https://www.cloudflare.com/learning/dns/what-is-dns/)
