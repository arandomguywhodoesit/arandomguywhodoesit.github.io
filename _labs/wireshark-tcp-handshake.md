---
# SAMPLE CONTENT - replace or delete this file when you add your own labs.
title: "Analysing the TCP Three-Way Handshake with Wireshark"
description: "Capture and dissect a TCP connection setup in Wireshark, compare a successful handshake with a connection to a closed port, and practise display filters."
date: 2026-10-20
last_updated: 2026-10-26
tags: [Networking, Wireshark, TCP/IP]
difficulty: Beginner
estimated_time: "45 minutes"
status: completed
sample: true
published: true
---

## Overview

This sample lab walks through capturing a TCP connection between two virtual
machines and identifying each packet of the **three-way handshake** in
Wireshark. It then compares that with what happens when a client tries to
connect to a port that has no service listening.

Understanding normal connection setup is a baseline skill for SOC work: port
scans, failed connections and many network-based detections are easier to
recognise once you know what "normal" looks like.

## Objectives

- Capture TCP traffic between a client and a web server.
- Identify the SYN, SYN-ACK and ACK packets and their sequence numbers.
- Recognise the response to a connection attempt on a closed port.
- Practise Wireshark display filters and `tshark` field extraction.

## Environment and Tools

| Component | Details |
|-----------|---------|
| Hypervisor | VirtualBox, host-only network `192.168.56.0/24` |
| Client VM | Linux, `192.168.56.10` |
| Server VM | Linux running a web server on port 80, `192.168.56.20` |
| Capture tools | Wireshark, `tcpdump`, `tshark` |
| Traffic generator | `curl` |

## Prerequisites

- Two VMs on the same isolated network that can reach each other.
- Wireshark installed on the client (or a way to copy the capture to a machine
  that has it).
- Basic familiarity with IP addresses and ports.

> **Safety note:** Only capture traffic on networks and systems you own or are
> explicitly authorised to monitor.

## Lab Setup

1. Confirm the VMs can reach each other:

   ```bash
   ping -c 3 192.168.56.20
   ```

2. On the server, confirm something is listening on port 80:

   ```bash
   sudo ss -tlnp | grep ':80'
   ```

3. On the client, start a capture limited to traffic with the server:

   ```bash
   sudo tcpdump -i eth0 -w handshake.pcap host 192.168.56.20
   ```

{% include figure.html
   src="/assets/images/samples/tcp-handshake.svg"
   alt="Diagram of the TCP three-way handshake: client sends SYN, server replies SYN-ACK, client sends ACK"
   caption="Figure 1: The three packets that open a TCP connection." %}

## Methodology

The approach is to generate one known-good connection and one known-failed
connection, then compare them packet by packet. Keeping the capture small
(a single host filter and only two requests) makes each packet easy to account
for.

## Step-by-Step Execution

### Step 1: Generate a successful connection

With the capture running, request the server's home page from the client:

```bash
curl -I http://192.168.56.20/
```

### Step 2: Generate a failed connection

Now try a port where nothing is listening:

```bash
curl -I http://192.168.56.20:8081/
```

On a Windows client, the same check can be done with PowerShell:

```powershell
Test-NetConnection -ComputerName 192.168.56.20 -Port 8081
```

Stop `tcpdump` with <kbd>Ctrl</kbd> + <kbd>C</kbd> and open `handshake.pcap` in
Wireshark.

### Step 3: Isolate the handshake packets

Use these display filters in Wireshark:

```text
tcp.flags.syn == 1 && tcp.flags.ack == 0    # initial SYN packets
tcp.flags.syn == 1 && tcp.flags.ack == 1    # SYN-ACK replies
tcp.flags.reset == 1                         # resets (e.g. closed ports)
tcp.stream eq 0                              # the whole first conversation
```

### Step 4: Extract fields with tshark

`tshark` gives the same information in a form that is easy to paste into
notes:

```bash
tshark -r handshake.pcap -Y "tcp.flags.syn == 1 || tcp.flags.reset == 1" \
  -T fields -e frame.number -e ip.src -e tcp.srcport \
  -e ip.dst -e tcp.dstport -e tcp.flags.str
```

## Evidence and Observations

{% include figure.html
   src="/assets/images/samples/placeholder-screenshot.svg"
   alt="Placeholder for a Wireshark screenshot of the handshake packets"
   caption="Figure 2: Placeholder. A real lab would show the Wireshark packet list here." %}

| # | Direction | Flags | Relative seq / ack | Meaning |
|---|-----------|-------|--------------------|---------|
| 1 | Client → Server :80 | `SYN` | seq=0 | Client requests a connection |
| 2 | Server → Client | `SYN, ACK` | seq=0, ack=1 | Server accepts and acknowledges |
| 3 | Client → Server :80 | `ACK` | seq=1, ack=1 | Connection established |
| 4 | Client → Server :8081 | `SYN` | seq=0 | Connection attempt to closed port |
| 5 | Server → Client | `RST, ACK` | seq=1, ack=1 | Server refuses: nothing listening |

Observations:

- Wireshark shows **relative** sequence numbers by default. The real values
  are in the `tcp.seq_raw` field.
- The closed-port attempt never completes a handshake. The server answers the
  SYN immediately with `RST, ACK`.

## Analysis and Findings

**Finding 1: A normal connection always starts with SYN → SYN-ACK → ACK.**
Any data exchanged before this sequence completes would be abnormal.

**Finding 2: A closed port produces SYN → RST.** Many SYNs from one source to
many ports, each answered with RST, is the classic signature of a port scan.

**Finding 3: No reply at all is different from a reset.** If a firewall
silently drops packets, the client retransmits the SYN instead of receiving an
RST. Telling "refused" apart from "filtered" is useful when troubleshooting.

## Troubleshooting

| Problem | Likely cause | Fix |
|---------|--------------|-----|
| Capture file is empty | Wrong interface name | List interfaces with `ip link` or `tcpdump -D` |
| `curl` hangs instead of failing fast | A firewall is dropping packets | Check the server firewall rules |
| `Permission denied` from tcpdump | Capturing needs elevated rights | Run with `sudo` |

## Lessons Learned

- [x] Practise display filters on a small, known capture first.
- [x] Note sequence numbers in raw form when comparing captures.
- [ ] Repeat the lab with a firewall that drops instead of rejects.

## Conclusion

Capturing a single known connection and a single known failure makes the TCP
handshake easy to see and gives a reference point for spotting scans and
connectivity problems in larger captures.

---

## References

- [Wireshark User's Guide](https://www.wireshark.org/docs/wsug_html_chunked/)
- [Wireshark display filter reference: TCP](https://www.wireshark.org/docs/dfref/t/tcp.html)
- [RFC 9293: Transmission Control Protocol](https://www.rfc-editor.org/rfc/rfc9293)
- Related lab on this site: [Investigating DNS Traffic]({{ '/labs/dns-analysis/' | relative_url }})
