---
title: "Analysing a TCP Three-Way Handshake with Wireshark"
date: 2026-10-28
description: "A starter lab for capturing a connection and identifying SYN, SYN/ACK, and ACK packets."
tags: [Networking, Wireshark, TCP]
category: Network Analysis
---

## Objective

Capture a TCP connection and identify the three-way handshake in Wireshark.

## Lab environment

- Operating system: add your operating system
- Tool: Wireshark
- Test destination: `example.com`

## Procedure

1. Open Wireshark and select the active network interface.
2. Start a capture.
3. Generate a request, for example by running `curl https://example.com` in a terminal.
4. Stop the capture after the request completes.
5. Filter for TCP SYN packets using `tcp.flags.syn == 1`.
6. Select a packet and use **Follow → TCP Stream** to inspect the connection.

## Observations

Document the packets you observed:

| Step | Flags | Meaning |
|---|---|---|
| 1 | `[SYN]` | Client requests to establish a TCP connection. |
| 2 | `[SYN, ACK]` | Server acknowledges the SYN and sends its own SYN. |
| 3 | `[ACK]` | Client acknowledges the server's SYN; the handshake is complete. |

## Findings

Add screenshots and describe the source/destination addresses, ports, and packet sequence from your own capture.

## What I learned

- Add the main concept you learned.
- Note any filter or capture issue you resolved.

## References

- [Wireshark User's Guide](https://www.wireshark.org/docs/wsug_html_chunked/)
