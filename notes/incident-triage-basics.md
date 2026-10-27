# Basic Security Alert Triage Framework

Use this framework as a practice checklist. Follow your organization's procedures and escalation paths in real environments.

1. **Validate the alert:** Confirm what detection fired, when, and on which entity.
2. **Assess potential impact:** Consider privilege, criticality, scope, and possible business impact.
3. **Collect evidence:** Review relevant authentication, endpoint, network, and identity logs.
4. **Test benign explanations:** Check known administrative activity, expected software behaviour, and common configuration errors.
5. **Determine confidence:** Separate observed facts from assumptions and identify evidence gaps.
6. **Escalate appropriately:** Follow the incident-response playbook and notify the right team.
7. **Recommend authorized action:** Do not independently isolate hosts, disable accounts, or delete files unless authorized.
8. **Document:** Record timestamps, indicators, analysis, decisions, and next steps.

A suspicious alert is not automatically a confirmed incident. State what you know, why it matters, and what evidence is still needed.
