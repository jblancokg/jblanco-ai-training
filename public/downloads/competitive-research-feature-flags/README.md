# Competitive Research: Feature Flagging Tools for Canadian Banking

## Research Brief
- **Goal:** Inform build-vs-buy decision for feature flagging capability; understand competitive landscape for positioning
- **Competitors:** LaunchDarkly, Split.io (Harness), Flagsmith, Unleash, CloudBees, Statsig, DevCycle
- **Key Dimensions:** Pricing, deployment model (cloud vs self-hosted), compliance certifications (SOC 2, ISO 27001), Canadian data residency, SDK support, audit logging, financial services suitability
- **Audience:** Product and engineering leadership
- **Requested Deliverables:** Comparison matrix + executive summary
- **Date Started:** 2026-02-27
- **Last Updated:** 2026-02-27
- **Status:** Complete

## Methodology
- Primary research via web search of official sites, documentation, and pricing pages
- Third-party validation via review platforms (G2, Capterra) and tech publications
- All sources cited inline and indexed in each competitor's sources.md
- Specific attention to Canadian banking requirements: data residency, compliance certifications, self-hosted options

## Scope and Boundaries
- **Included:** Feature flagging/management tools with enterprise capabilities suitable for regulated financial services. Pricing, compliance, deployment options, SDK support, and Canadian banking suitability.
- **Excluded:** General A/B testing tools without feature flag capabilities; internal platform engineering tools; tools with no enterprise tier.

## File Index
- `competitors/launchdarkly/` -- Market leader research
- `competitors/split-io-harness/` -- Split.io (acquired by Harness) research
- `competitors/flagsmith/` -- Open-source with self-hosted option
- `competitors/unleash/` -- Open-source with self-hosted option
- `competitors/cloudbees/` -- Enterprise CI/CD vendor with feature management
- `competitors/statsig/` -- Usage-based experimentation platform
- `competitors/devcycle/` -- Canadian-headquartered feature flag platform
- `analysis/comparison-matrix.md` -- Side-by-side comparison
- `analysis/key-findings.md` -- Cross-competitor insights
- `deliverables/executive-summary.md` -- Leadership-ready summary
- `deliverables/comparison-matrix.csv` -- Importable comparison data

## Open Questions
- Exact enterprise pricing for LaunchDarkly, CloudBees, and Statsig (requires sales contact)
- Whether LaunchDarkly or others plan to add a Canada-specific hosting region
- Specific Canadian bank customer references (most vendors do not publicly disclose banking clients)
- OSFI (Office of the Superintendent of Financial Institutions) specific requirements for third-party cloud services used by Canadian banks
