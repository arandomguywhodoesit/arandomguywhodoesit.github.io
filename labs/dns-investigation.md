# Lab 02: DNS Query Investigation

**Status:** Starter template — add your own results after completing the lab.

## Objective
Observe how a domain name is resolved and identify DNS queries and responses.

## Environment
- OS: [fill in]
- Tools: `nslookup`, Wireshark
- Domain tested: [fill in]

## Method
1. Run `nslookup example.com` in a terminal. Do not include `https://` in the hostname.
2. Capture traffic while repeating the lookup, or clear the relevant cache if appropriate for your environment.
3. Use the Wireshark display filter `dns`.
4. Inspect the query name, record type, response code, and returned answer records.

## Observations
- Resolver used: [fill in; consider sanitizing private details]
- Query type: [A / AAAA / other]
- Response code: [fill in]
- Answers: [fill in]
- Screenshot: [add sanitized evidence]

## Analysis
Explain the difference between A (IPv4) and AAAA (IPv6) records. Note whether the capture shows a direct DNS response or another mechanism, such as encrypted DNS, that may limit visibility.

## Findings and limitations
[Summarize what the evidence shows. A DNS response alone does not establish whether a domain is malicious.]

## Lessons learned
[Fill in]

## References
- [Cloudflare: What is DNS?](https://www.cloudflare.com/learning/dns/what-is-dns/)
