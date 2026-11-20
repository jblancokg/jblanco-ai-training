# Feature Flag Tools: Comparison Matrix

*Last updated: 2026-02-27*

## Deployment and Data Residency

| Criteria | LaunchDarkly | Split.io (Harness) | Flagsmith | Unleash | CloudBees | Statsig | DevCycle |
|---|---|---|---|---|---|---|---|
| **Cloud SaaS** | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| **Self-hosted** | No | No | Yes (free OSS) | Yes (free OSS) | Unclear | No | No |
| **Private cloud** | No | No | Yes | Yes (single-tenant) | Unclear | No | No |
| **Canadian data residency** | No (US + EU only) | No | Yes (self-hosted) | Yes (self-hosted) | Unclear | No | Unverified |
| **Canadian HQ** | No (Oakland, CA) | No (San Francisco, CA) | No (London, UK) | No (Oslo, Norway) | No (San Jose, CA) | No (Seattle, WA) | **Yes (Toronto, ON)** |

## Compliance and Security

| Criteria | LaunchDarkly | Split.io (Harness) | Flagsmith | Unleash | CloudBees | Statsig | DevCycle |
|---|---|---|---|---|---|---|---|
| **SOC 2 Type II** | Yes | Yes | Yes | Aligns* | Yes | Unverified | Yes |
| **ISO 27001** | Yes | Yes | Unverified | Aligns* | Yes | Unverified | Unverified |
| **FedRAMP** | Yes (first in category) | No | No | Aligns* | Aligns | No | No |
| **HIPAA** | Yes | No | No | No | No | No | No |
| **Audit logging** | Yes | Yes | Yes | Yes (Enterprise) | Yes | Unverified | Unverified |
| **RBAC** | Yes (custom roles on Enterprise) | Yes | Yes | Yes (Enterprise) | Yes | Unverified | Unverified |
| **Change approvals** | Yes | Unverified | Yes | Yes (Enterprise) | Yes | Unverified | Unverified |
| **SSO/SAML** | Yes (Enterprise) | Yes | Yes (Enterprise) | Yes (Enterprise) | Yes | Yes (Enterprise) | Unverified |

*Unleash documents how its features help customers meet SOC 2/ISO 27001/FedRAMP requirements, but whether Unleash the company itself holds these certifications was not confirmed.

## Pricing

| Criteria | LaunchDarkly | Split.io (Harness) | Flagsmith | Unleash | CloudBees | Statsig | DevCycle |
|---|---|---|---|---|---|---|---|
| **Pricing model** | Per seat | Per seat | Usage (requests) | Per seat | Per MAU (client) | Usage (events) | Usage (MAU + requests) |
| **Free tier** | Yes (limited) | Yes (10 users) | Yes (50K req/mo) | Yes (OSS) | Yes (Community Ed.) | Yes (2M events/mo) | Yes |
| **Entry paid price** | $10/seat/mo | $33/user/mo | $45/mo | $75/seat/mo | Custom | Usage-based | Usage-based |
| **Enterprise range** | $20K-$120K+/yr | Custom | Custom | ~$4.5K-$18K+/yr | Custom | Custom | Custom |
| **Transparent pricing** | Partial | Yes | Partial | Yes | No | Partial | Partial |

## Features

| Criteria | LaunchDarkly | Split.io (Harness) | Flagsmith | Unleash | CloudBees | Statsig | DevCycle |
|---|---|---|---|---|---|---|---|
| **Feature flags** | Excellent | Good | Good | Good | Good | Good | Good |
| **Experimentation** | Strong | Excellent | Basic | Basic | Basic | Excellent | Basic |
| **Remote config** | Yes | Yes | Yes | Limited | Yes | Yes (dynamic configs) | Unverified |
| **SDK breadth** | Excellent (widest) | Good | Good | Good | Moderate | Good | Good (OpenFeature) |
| **Integrations** | Excellent (most) | Good (Harness ecosystem) | Good | Moderate | Good (CloudBees ecosystem) | Moderate | Good |
| **Edge evaluation** | Yes | Unverified | Unverified | Via proxy | Unverified | Unverified | Yes (native) |
| **OpenFeature support** | Unverified | Unverified | Unverified | Unverified | Unverified | Unverified | Native (first) |

## Market Presence

| Criteria | LaunchDarkly | Split.io (Harness) | Flagsmith | Unleash | CloudBees | Statsig | DevCycle |
|---|---|---|---|---|---|---|---|
| **G2 rating** | 4.7/5 | N/A (transitioning) | 4.8/5 | 4.7/5 | Limited reviews | N/A | Limited reviews |
| **G2 review count** | 615 | N/A | 37 | 117 | Low | N/A | Low |
| **Market position** | Leader | Acquired/transitioning | Growing challenger | Established OSS | Niche (CI/CD add-on) | Growing | Small/emerging |
| **Financial services focus** | Yes (dedicated page) | No specific focus | Yes (dedicated page) | Yes (compliance docs) | Yes (DORA support) | No | No |

## Canadian Banking Suitability Score

Weighted assessment for a Canadian bank's needs (data residency, compliance, self-hosted, maturity):

| Tool | Score | Rationale |
|---|---|---|
| **Flagsmith** | High | Self-hosted + SOC 2 + explicit banking focus + data sovereignty |
| **Unleash** | High | Self-hosted + strong compliance docs + transparent pricing |
| **LaunchDarkly** | Medium-High | Best compliance certs + maturity, but no self-hosted or Canadian residency |
| **DevCycle** | Medium | Canadian HQ + SOC 2, but no self-hosted and small team |
| **CloudBees** | Medium | Good compliance tooling, but niche and opaque |
| **Split.io (Harness)** | Medium-Low | Good certs but cloud-only + acquisition uncertainty |
| **Statsig** | Low | No self-hosted, no banking focus, compliance unclear |
