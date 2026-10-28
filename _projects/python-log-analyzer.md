---
# SAMPLE CONTENT - replace or delete this file when you add your own projects.
title: "Python SSH Log Analyzer"
description: "A small Python command-line tool that parses Linux authentication logs and flags IP addresses with repeated failed SSH logins."
date: 2026-10-22
tags: [Python, Log Analysis, Security Automation, Threat Detection]
status: completed
sample: true
published: true
# github_url: "https://github.com/your-github-username/python-log-analyzer"
# demo_url: ""
---

## Project Overview

This sample project is a single-file Python script that reads an
`auth.log`-style file, extracts failed SSH password attempts, and reports
source IP addresses that cross a configurable threshold. It uses only the
Python standard library.

## Problem Statement

Servers exposed to the internet receive constant automated SSH login
attempts. Reading raw logs to spot which sources are the most persistent is
slow and error-prone. A small script can summarise the activity in seconds.

## Objectives

- Parse failed SSH logins from standard OpenSSH log lines.
- Count attempts per source IP and record which usernames were tried.
- Flag sources at or above a threshold.
- Output either a readable table or JSON for other tools.

## Features

- No third-party dependencies.
- Handles both `Failed password for <user>` and
  `Failed password for invalid user <user>` lines.
- Configurable threshold with `--threshold`.
- `--json` output for piping into other tools.

## Technologies Used

| Technology | Purpose |
|------------|---------|
| Python 3 | Script language |
| `re` | Parsing log lines |
| `collections.Counter` | Counting attempts per IP |
| `argparse` | Command-line interface |

## Architecture and Design

{% include figure.html
   src="/assets/images/samples/log-analyzer-architecture.svg"
   alt="Architecture diagram: auth.log is read by the parser, parsed events go to threshold detection rules, and results are written to a report"
   caption="Figure 1: Data flow through the analyzer." %}

The design deliberately separates **parsing** (turning text into events) from
**detection** (deciding which events matter), so new detection rules can be
added without touching the parser.

## Implementation

The core of the parser is one regular expression:

```python
FAILED_LOGIN = re.compile(
    r"Failed password for (?:invalid user )?(?P<user>\S+) "
    r"from (?P<ip>\d{1,3}(?:\.\d{1,3}){3}) port \d+"
)


def parse_failed_logins(lines):
    """Yield (source_ip, username) for every failed SSH password attempt."""
    for line in lines:
        match = FAILED_LOGIN.search(line)
        if match:
            yield match.group("ip"), match.group("user")
```

Detection counts attempts per IP and keeps the set of usernames tried:

```python
def find_brute_force(lines, threshold=5):
    """Return {ip: {"attempts": n, "users": [...]}} for IPs at or above threshold."""
    attempts = Counter()
    users = {}
    for ip, user in parse_failed_logins(lines):
        attempts[ip] += 1
        users.setdefault(ip, set()).add(user)
    return {
        ip: {"attempts": count, "users": sorted(users[ip])}
        for ip, count in attempts.most_common()
        if count >= threshold
    }
```

## How to Run

```bash
python3 log_analyzer.py sample_auth.log
python3 log_analyzer.py sample_auth.log --threshold 6 --json
```

## Usage Examples

Given a sample log containing lines such as:

```text
Oct 27 10:15:30 lab-server sshd[2211]: Failed password for invalid user admin from 203.0.113.45 port 52344 ssh2
Oct 27 10:17:09 lab-server sshd[2290]: Accepted password for alice from 198.51.100.7 port 40030 ssh2
```

The default table output:

```console
$ python3 log_analyzer.py sample_auth.log
Source IP        Attempts  Usernames tried
203.0.113.45            6  admin, oracle, test
192.0.2.99              5  root
```

The JSON output with a higher threshold:

```json
{
  "203.0.113.45": {
    "attempts": 6,
    "users": [
      "admin",
      "oracle",
      "test"
    ]
  }
}
```

## Testing and Validation

Unit tests use small inline samples so expected results are obvious:

```python
from log_analyzer import find_brute_force

SAMPLE = [
    "sshd[1]: Failed password for invalid user admin from 203.0.113.45 port 50000 ssh2",
    "sshd[1]: Failed password for root from 203.0.113.45 port 50001 ssh2",
    "sshd[2]: Accepted password for alice from 198.51.100.7 port 40030 ssh2",
]


def test_flags_ip_at_threshold():
    result = find_brute_force(SAMPLE, threshold=2)
    assert result == {"203.0.113.45": {"attempts": 2, "users": ["admin", "root"]}}


def test_ignores_successful_logins():
    assert "198.51.100.7" not in find_brute_force(SAMPLE, threshold=1)
```

A quick sanity check against the raw log with standard tools:

```bash
grep -c "Failed password" sample_auth.log
```

## Challenges and Solutions

| Challenge | Solution |
|-----------|----------|
| Two different "failed password" line formats | Made `invalid user ` an optional, non-capturing group |
| Log files with odd characters | Opened files with `errors="replace"` so one bad byte doesn't stop the run |

## Results

The sample log contains 13 failed attempts from three IP addresses; the
script correctly flags the two sources at or above the default threshold and
ignores the successful login.

## Limitations

- IPv4 only; IPv6 source addresses are not matched.
- No time window: ten attempts over a month count the same as ten in a minute.
- Only password failures are parsed, not other authentication methods.

## Future Improvements

- Add a sliding time window to detection.
- Support IPv6 addresses.
- Store events in SQLite so they can be queried later, for example:

```sql
SELECT src_ip, COUNT(*) AS attempts
FROM failed_logins
GROUP BY src_ip
HAVING COUNT(*) >= 5
ORDER BY attempts DESC;
```

## Lessons Learned

- Separating parsing from detection keeps each part small and testable.
- Using documentation IP ranges (`192.0.2.0/24`, `198.51.100.0/24`,
  `203.0.113.0/24`) in sample data avoids publishing real addresses.

## References

- [Python `re` module documentation](https://docs.python.org/3/library/re.html)
- [Python `argparse` tutorial](https://docs.python.org/3/howto/argparse.html)
- [RFC 5737: IPv4 Address Blocks Reserved for Documentation](https://www.rfc-editor.org/rfc/rfc5737)
