# Unleash Features

## Core Feature Flags
- Boolean and multivariate flags
- Activation strategies (gradual rollout, user IDs, IPs, hostnames)
- Kill switches
- User segmentation
- Feature flag dependencies

## Experimentation
- Basic A/B testing via activation strategies
- Less mature than LaunchDarkly or Split.io for experimentation

## Compliance and Governance (Enterprise Only)
- **Audit logging:** Event logs for all configuration changes, required by SOC 2, FedRAMP, and ISO 27001 ([Unleash compliance overview](https://docs.getunleash.io/privacy-and-compliance/compliance-overview), accessed 2026-02-27)
- **RBAC:** Role-based access control (Enterprise)
- **Change requests:** Approval workflows before changes reach production (Enterprise)
- **SSO/SAML:** Enterprise authentication (Enterprise)
- **Service accounts:** For machine-to-machine access control

## SDK Support
- Server-side: Node.js, Java, Go, Ruby, Python, .NET, PHP, Rust
- Client-side: JavaScript, React, iOS, Android, Flutter
- Proxy: Unleash Proxy for client-side evaluation

## Integrations
- CI/CD: GitHub Actions, GitLab
- Observability: Datadog
- Collaboration: Slack, Microsoft Teams, Jira

## Deployment Options
- **Cloud SaaS** -- Unleash-hosted
- **Self-hosted Enterprise** -- Run on your own infrastructure with enterprise features
- **Self-hosted Open Source** -- Free, community edition
- **Single-tenant private instance** -- No end-user data leaves your environment
- Available on AWS Marketplace

## Strengths
- Strongest compliance documentation of any tool researched
- Flexible self-hosted with enterprise features available
- Simple, transparent pricing
- Focused on core feature flagging (not trying to be everything)
- AWS Marketplace availability simplifies procurement

## Gaps
- Enterprise compliance features locked behind paid tier (free OSS lacks RBAC, change requests)
- Experimentation capabilities basic compared to Split.io or LaunchDarkly
- Fewer integrations than Flagsmith or LaunchDarkly
- Company certification status (whether Unleash itself holds SOC 2 vs. helps you meet SOC 2) unclear
