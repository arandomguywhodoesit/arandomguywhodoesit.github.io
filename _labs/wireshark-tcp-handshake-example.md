---
title: "Inspecting a TCP Three-Way Handshake"
description: "Example lab documenting how to identify SYN, SYN-ACK, and ACK packets in Wireshark."
date: 2026-10-20
tags: [wireshark, tcp, networking]
difficulty: Beginner
published: true
---

> **Portfolio example:** This is sample content to demonstrate the layout. Replace it with your own evidence and observations before presenting it as completed work.

## Overview
This example demonstrates how a TCP connection is established and how to locate the handshake in a packet capture.

## Objectives
- Identify the TCP SYN, SYN-ACK, and ACK packets.
- Relate packet flags to the connection-establishment process.
- Practice filtering a capture in Wireshark.

## Environment and Tools
- Wireshark
- A browser or `curl`
- A network connection

## Methodology
Capture traffic while initiating a new TCP connection, then inspect the relevant stream.

## Step-by-Step Execution
1. Start a capture on the active network interface.
2. In a terminal, run `curl https://example.com`.
3. Stop the capture after the page responds.
4. Filter for SYN packets using `tcp.flags.syn == 1`.
5. Inspect the packet details and follow the same TCP stream.

## Evidence and Observations
A typical handshake consists of a client SYN, a server SYN-ACK, and a client ACK. Actual captures may contain retransmissions or additional traffic.

## Analysis and Findings
The SYN initiates connection establishment. The SYN-ACK acknowledges the client's SYN and proposes the server's initial sequence number. The final ACK acknowledges the server's SYN. A single packet flag should be interpreted in context rather than treated as suspicious by itself.

## Troubleshooting
If the filter returns too much traffic, identify the connection's IP addresses and ports, then use `tcp.stream eq N` for the relevant stream.

## Lessons Learned
- TCP connection setup is visible at the transport layer.
- Filters narrow the capture but do not replace packet-by-packet validation.
- A handshake is not, by itself, evidence that an application is safe or malicious.

## Conclusion
This example provides a repeatable workflow for locating and interpreting the TCP three-way handshake.

## References
- [Wireshark Display Filter Reference](https://www.wireshark.org/docs/dfref/t/tcp.html)
