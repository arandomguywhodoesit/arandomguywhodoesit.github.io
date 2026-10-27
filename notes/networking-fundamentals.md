# Networking Fundamentals: Quick Notes

These notes are a learning aid. Validate details against packet captures and trusted technical documentation.

## OSI and TCP/IP
The OSI model has seven conceptual layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application. The TCP/IP model is commonly described with four layers: Link, Internet, Transport, and Application.

## TCP vs UDP
- **TCP:** Connection-oriented transport protocol. Uses sequence numbers and acknowledgements to support reliable, ordered delivery, and includes flow and congestion control.
- **UDP:** Connectionless transport protocol with lower protocol overhead. It does not provide TCP-style delivery acknowledgements or retransmissions; applications may implement their own reliability.

## Common protocols and ports
| Protocol | Common port | Purpose |
|---|---:|---|
| DNS | 53 UDP/TCP | Domain-name queries and responses |
| HTTP | 80 TCP | Web traffic without TLS |
| HTTPS | 443 TCP; QUIC commonly uses UDP 443 | Web traffic protected by TLS, or TLS-based HTTP/3 over QUIC |
| SSH | 22 TCP | Secure remote shell and administration |
| SMTP | 25 TCP | Mail transfer between servers; submission commonly uses 587 |
| FTP | 21 TCP control | File transfer protocol; data connection depends on mode |

Ports are conventions, not proof of what an application is doing. Validate using protocol details and context.

## Packet-capture workflow
1. Identify the relevant interface.
2. Capture only authorized traffic.
3. Narrow the capture with display filters.
4. Follow a TCP stream when useful.
5. Correlate timestamps and endpoints.
6. Record evidence and limitations.

## Questions to practise
- What evidence identifies a TCP handshake?
- What is the difference between an IP address and a port?
- Why can DNS return more than one address?
- Why is a large outbound transfer not automatically data exfiltration?
