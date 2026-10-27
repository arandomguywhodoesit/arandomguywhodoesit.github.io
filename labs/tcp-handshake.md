# Lab 01: TCP Three-Way Handshake and Traffic Analysis

**Status:** Starter template — complete the exercise and replace this note with your own observations.

## Objective
Identify the TCP three-way handshake in a packet capture and explain how it establishes a connection.

## Environment and tools
- Operating system: [fill in]
- Tool: Wireshark
- Test destination: a system or website you are authorized to access
- Capture date: [fill in]

## Method
1. Start a packet capture on the correct network interface.
2. Generate a test connection, for example by visiting a website or running `curl https://example.com`.
3. Stop the capture.
4. Apply a display filter such as `tcp.flags.syn == 1`.
5. Select a connection and inspect its SYN, SYN-ACK, and ACK packets. Use `tcp.stream eq N` to isolate the relevant stream.

## Expected protocol sequence
1. **SYN:** The client requests to establish a TCP connection.
2. **SYN-ACK:** The server acknowledges the request and provides its own initial sequence number.
3. **ACK:** The client acknowledges the server's sequence number. The connection can then carry application data.

## Observations
- Client IP and port: [fill in; sanitize before publishing]
- Server IP and port: [fill in]
- SYN frame number: [fill in]
- SYN-ACK frame number: [fill in]
- ACK frame number: [fill in]
- Evidence screenshot: [add sanitized screenshot]

## Analysis
Explain how you identified the same TCP stream and how the flags and sequence/acknowledgement numbers support your interpretation.

## Findings and limitations
[Write what the capture supports. Do not assume that a TCP handshake alone proves an application is safe or malicious.]

## Lessons learned
[What was difficult? What filter or packet field helped most?]

## References
- [Wireshark User's Guide](https://www.wireshark.org/docs/wsug_html_chunked/)
