# Security Alert Summary (Python)

**Status:** Starter project — add your own implementation and test evidence.

## Goal
Write a small Python script that reads a list of sample security alerts and summarizes alert counts by category and severity, plus repeated source addresses.

## Suggested sample data
Use fictional addresses and clearly label all data as simulated.

```python
alerts = [
    {"id": "A001", "type": "Brute Force", "severity": "High", "source_ip": "192.0.2.10"},
    {"id": "A002", "type": "Phishing", "severity": "Medium", "source_ip": "192.0.2.20"},
    {"id": "A003", "type": "Brute Force", "severity": "High", "source_ip": "192.0.2.10"},
]
```

The `192.0.2.0/24` range is reserved for documentation examples.

## Requirements
- Count alerts by type.
- Count alerts by severity.
- Identify repeated source addresses.
- Print a readable summary.
- Explain any assumptions and limitations.

## Test cases
- Empty alert list.
- One alert.
- Repeated category and source address.
- Different severity values.

## Reflection
- Which data structure did you use and why?
- What happens if a field is missing?
- How could this read a sanitized CSV log later?
