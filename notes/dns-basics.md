# DNS Basics

DNS translates names such as `example.com` into records that clients can use to locate services.

## Common record types
- **A:** IPv4 address.
- **AAAA:** IPv6 address.
- **CNAME:** Alias to another DNS name.
- **MX:** Mail exchanger information.
- **TXT:** Text data often used for verification and email-security policies.

## Practical lookup
```bash
nslookup example.com
```
Use a hostname only; `https://example.com` is a URL, not a DNS hostname for `nslookup` input.

## Security perspective
DNS logs can help connect a host to queried names and timestamps. A domain's presence in a log is a lead, not conclusive evidence of compromise. Consider resolver context, endpoint telemetry, reputation, timing, and the surrounding network connection.

## Lab notes
- Date: [fill in]
- Resolver: [fill in; sanitize if needed]
- Query and response: [fill in]
- Interpretation: [fill in]
