---
# SAMPLE CONTENT - replace or delete this file when you write your own posts.
title: "Learning Wireshark: The Display Filters Worth Memorising First"
description: "Learning notes on the handful of Wireshark display filters that cover most day-to-day traffic analysis, and the difference between capture and display filters."
date: 2026-10-27
tags: [Wireshark, Networking, Learning Notes]
sample: true
published: true
---

## Introduction

When starting with Wireshark, the number of protocols and fields can feel
overwhelming. These sample notes collect a small set of display filters that
cover most beginner analysis tasks.

## Capture filters vs display filters

Wireshark has two filter languages, and mixing them up is a common mistake:

| | Capture filter | Display filter |
|---|---|---|
| Applied | While capturing | After capturing |
| Syntax | BPF (same as `tcpdump`) | Wireshark's own field syntax |
| Example | `host 192.168.56.20 and port 80` | `ip.addr == 192.168.56.20 && tcp.port == 80` |
| Discards data? | Yes, unmatched packets are never saved | No, it only hides them |

> **Tip:** When in doubt, capture broadly and narrow down with display
> filters. You can't analyse packets you didn't capture.

## Filters I use most

### By address and port

```text
ip.addr == 192.168.56.20
ip.src == 192.168.56.10 && ip.dst == 192.168.56.20
tcp.port == 443
udp.port == 53
```

### By protocol behaviour

```text
tcp.flags.syn == 1 && tcp.flags.ack == 0    # new connection attempts
tcp.analysis.retransmission                  # packets that had to be re-sent
dns.flags.rcode == 3                          # failed DNS lookups (NXDOMAIN)
http.request.method == "POST"                 # HTTP form submissions / uploads
```

### Excluding noise

```text
!(arp || mdns || ssdp)
```

## Key takeaways

1. Capture filters drop data permanently; display filters don't.
2. `==` compares a field; `contains` and `matches` search inside it.
3. Right-click any field in the packet details pane and choose
   **Apply as Filter** to learn the field name.

## References

- [Wireshark display filter documentation](https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html)
- [Display filter field reference](https://www.wireshark.org/docs/dfref/)
- [pcap-filter(7): capture filter syntax](https://www.tcpdump.org/manpages/pcap-filter.7.html)
