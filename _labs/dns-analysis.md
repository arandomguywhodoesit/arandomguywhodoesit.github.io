---
# SAMPLE CONTENT - replace or delete this file when you add your own labs.
title: "Investigating DNS Traffic"
description: "Generate DNS lookups with command-line tools, inspect the queries and responses in Wireshark, and identify patterns worth investigating."
date: 2026-10-25
tags: [Networking, DNS, Wireshark, Threat Hunting]
difficulty: Beginner
estimated_time: "1 hour"
status: in-progress
sample: true
published: true
---

## Overview

DNS is involved in almost every connection a host makes, which makes DNS logs
and captures one of the most useful data sources for an investigation. This
sample lab generates a few lookups, examines them in Wireshark, and looks at
what unusual DNS activity can look like.

## Objectives

- Generate DNS queries for different record types.
- Read the query and response fields in Wireshark.
- Recognise failed lookups (`NXDOMAIN`).
- Write display filters that highlight unusual queries.

## Environment and Tools

- Linux VM with `dig` and `nslookup`
- Windows VM with PowerShell (optional)
- Wireshark

## Step-by-Step Execution

### Generate lookups

```bash
dig example.com A
dig example.com MX +short
dig @1.1.1.1 example.com AAAA
dig doesnotexist.example.com      # expected: NXDOMAIN
```

On Windows:

```powershell
Resolve-DnsName -Name example.com -Type A
Resolve-DnsName -Name example.com -Type MX
```

### Filter the capture

```text
dns                                  # all DNS traffic
dns.flags.response == 0              # queries only
dns.flags.rcode == 3                 # NXDOMAIN responses
dns.qry.type == 15                   # MX queries
len(dns.qry.name) > 50               # unusually long names
```

## Evidence and Observations

| Query | Type | Response code | Notes |
|-------|------|---------------|-------|
| `example.com` | A | `NOERROR` | One IPv4 address returned |
| `example.com` | MX | `NOERROR` | Mail exchanger record |
| `doesnotexist.example.com` | A | `NXDOMAIN` | Name does not exist |

> **Observation:** Each query and its response share the same **transaction
> ID** (`dns.id`), which is how Wireshark pairs them together.

## Analysis and Findings

Patterns that would justify a closer look in a real environment:

1. **Many `NXDOMAIN` responses from one host**, which can indicate malware
   trying algorithmically generated domains.
2. **Very long or random-looking subdomains**, which can be a sign of data
   being tunnelled out over DNS.
3. **DNS traffic to an unexpected resolver**, bypassing the organisation's
   DNS servers.

None of these is malicious on its own; each is a lead to investigate with more
context.

## Lessons Learned

- [x] Filter on response codes, not just names.
- [ ] Add a follow-up lab on DNS over HTTPS and what it hides from the network.

## References

- [RFC 1035: Domain Names, Implementation and Specification](https://www.rfc-editor.org/rfc/rfc1035)
- [Wireshark display filter reference: DNS](https://www.wireshark.org/docs/dfref/d/dns.html)
- [MITRE ATT&CK T1071.004: Application Layer Protocol: DNS](https://attack.mitre.org/techniques/T1071/004/)
