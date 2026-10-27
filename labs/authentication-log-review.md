# Lab 03: Authentication Log Review

**Status:** Starter template — use sample data or a lab machine you are authorized to inspect.

## Objective
Recognize authentication patterns that may warrant investigation without treating every failed login as an attack.

## Data and environment
- Log source: [Windows Security log / provided sample]
- Time range: [fill in]
- Host: [use a lab host; sanitize before publishing]

## Method
1. Identify relevant login success and failure events.
2. Record timestamps, account names (use placeholders), source addresses, logon type, and status/substatus where available.
3. Look for repeated failures, multiple accounts targeted from one source, or a success following failures.
4. Compare with expected user behaviour and approved maintenance or testing.
5. Record what additional evidence is needed.

## Observations
| Time | Event | Account (sanitized) | Source (sanitized) | Notes |
|---|---|---|---|---|
| [time] | [event] | [user-A] | [source-A] | [observation] |

## Analysis
Consider legitimate explanations such as an outdated saved password, service account misconfiguration, or a user mistyping a password. Correlate with endpoint, VPN, identity-provider, and network evidence where available.

## Findings
- Severity: [low / medium / high with rationale]
- False-positive checks: [fill in]
- Evidence gaps: [fill in]
- Recommended next steps: [fill in]

## Lessons learned
[Fill in]
