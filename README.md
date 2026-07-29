# sec-gate-demo

Intentionally vulnerable demo repository for the **bureau.id PR security gate** proposal.

> Every "secret", CVE, and misconfiguration in this repo (and its PR branches) is **fabricated for demonstration**. Nothing here is a real credential and no Bureau data is present. This repo is throwaway and will be deleted after the demo.

## What this demonstrates

Every pull request runs one workflow — `.github/workflows/security-gate.yml` — with four parallel open-source scan jobs and a single aggregating gate:

| Gate | Tool | License cost |
|---|---|---|
| Secrets | [gitleaks](https://github.com/gitleaks/gitleaks) (CLI) | $0 |
| SAST | [Semgrep](https://github.com/semgrep/semgrep) `p/default` + local rules | $0 |
| Dependencies | [Trivy](https://github.com/aquasecurity/trivy) `fs --scanners vuln` | $0 |
| IaC | [Trivy](https://github.com/aquasecurity/trivy) `config` | $0 |

The `security-gate` job aggregates all four, posts **one** sticky PR comment, publishes a machine-readable check-run ("Security Gate") that a live dashboard polls, and is the single **required status check** that blocks merge on any HIGH/CRITICAL finding, detected secret, or scanner error (fail-closed).

See `docs/proposal.md` for the full rollout proposal.
