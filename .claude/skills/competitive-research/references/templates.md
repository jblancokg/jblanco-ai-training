# Output Templates

These are starting structures. Adapt them to the specific research context -- add sections that matter, remove ones that do not apply.

## Research README Template

```markdown
# Competitive Research: [Topic]

## Research Brief
- **Goal:** [What decision this research informs]
- **Competitors:** [List]
- **Key Dimensions:** [What we are comparing]
- **Audience:** [Who reads this]
- **Requested Deliverables:** [Format(s)]
- **Date Started:** [YYYY-MM-DD]
- **Last Updated:** [YYYY-MM-DD]
- **Status:** [In Progress / Complete / Needs Update]

## Methodology
- Primary research via web search of official sites, documentation, and pricing pages
- Third-party validation via review platforms (G2, Capterra, etc.) and analyst reports
- All sources cited inline and indexed in each competitor's sources.md
- [Any additional methods: user interviews, product trials, etc.]

## Scope and Boundaries
- **Included:** [What is covered]
- **Excluded:** [What is explicitly not covered and why]

## File Index
- `competitors/[name]/` -- Individual competitor research
- `analysis/comparison-matrix.md` -- Side-by-side comparison
- `analysis/key-findings.md` -- Cross-competitor insights
- `deliverables/[type].md` -- Final formatted output

## Open Questions
- [Questions that came up during research and remain unanswered]
```

## Comparison Matrix

### Column Suggestions by Research Type

**Product/Feature comparison:**
| Dimension | Competitor A | Competitor B | Competitor C | Notes |
|---|---|---|---|---|
| Core feature 1 | | | | |
| Core feature 2 | | | | |
| Integration with [X] | | | | |
| API availability | | | | |
| Pricing (per seat/mo) | | | | |
| Free tier | | | | |
| Target company size | | | | |
| Notable limitations | | | | |

**Vendor selection:**
| Criteria | Weight | Vendor A | Vendor B | Vendor C |
|---|---|---|---|---|
| Feature fit | High | | | |
| Pricing | High | | | |
| Integration ease | Medium | | | |
| Support quality | Medium | | | |
| Security/compliance | High | | | |
| Scalability | Medium | | | |
| Vendor stability | Low | | | |

**Market landscape:**
| Company | Founded | Funding | Employees | Target Market | Key Differentiator | Recent News |
|---|---|---|---|---|---|---|

Use checkmarks, X marks, or brief descriptions in cells. Avoid vague ratings like "Good" or "4/5" unless there is a clear rubric behind them.

## SWOT Template

```markdown
# SWOT Analysis: [Subject]

*Relative to: [competitors or market context]*
*Date: [YYYY-MM-DD]*

## Strengths (Internal, Positive)
- **[Strength]:** [Evidence and source]
- ...

## Weaknesses (Internal, Negative)
- **[Weakness]:** [Evidence and source]
- ...

## Opportunities (External, Positive)
- **[Opportunity]:** [Evidence and source]
- ...

## Threats (External, Negative)
- **[Threat]:** [Evidence and source]
- ...

## Key Takeaways
1. [Most important insight]
2. [Second most important]
3. [Third most important]
```

Every SWOT item must be grounded in evidence, not just intuition. Link back to specific competitor findings or market data.

## Battlecard Template

```markdown
# Competitive Battlecard: [Our Product] vs. [Competitor]

*Last updated: [YYYY-MM-DD]*
*For: [Sales / Product / Both]*

## Quick Facts
| | [Our Product] | [Competitor] |
|---|---|---|
| Target market | | |
| Pricing | | |
| Key differentiator | | |

## Where We Win
- **[Advantage 1]:** [Specific evidence, not just "we're better"]
- **[Advantage 2]:** [Specific evidence]

## Where They Win
Be honest here. Sales teams lose credibility if they cannot acknowledge competitor strengths.
- **[Their advantage 1]:** [What it is and how to address it in conversation]
- **[Their advantage 2]:** [What it is and how to address it]

## Common Objections and Responses
**"[Competitor] has [feature] and you don't."**
> [Honest response with context -- not spin, but perspective]

**"[Competitor] is cheaper."**
> [Response grounded in value, not dismissal of price concern]

## Landmines to Set
Questions to ask prospects early that highlight competitor weaknesses:
- "[Question that surfaces a known competitor gap]"
- "[Question about a use case where we excel]"

## Sources
[Links to key sources for anyone who wants to verify or go deeper]
```

## Executive Summary Template

```markdown
# Competitive Research: Executive Summary

*Date: [YYYY-MM-DD]*
*Prepared for: [Audience]*

## Bottom Line
[2-3 sentences: the single most important takeaway and recommended action]

## Competitive Landscape Overview
[Brief paragraph on the market, key players, and how they segment]

## Key Findings
1. **[Finding]:** [One paragraph with evidence]
2. **[Finding]:** [One paragraph with evidence]
3. **[Finding]:** [One paragraph with evidence]

## Competitive Position
[Where does our product/option sit relative to the field? What is our strongest differentiation?]

## Risks and Watch Items
- [Risk or trend to monitor]
- [Risk or trend to monitor]

## Recommended Next Steps
1. [Specific action]
2. [Specific action]

## Methodology and Limitations
[Brief note on how research was conducted and what caveats apply]

*Full research available in: [path to research folder]*
```

## Recommendation Memo Template

```markdown
# Recommendation: [Decision Being Made]

*Date: [YYYY-MM-DD]*
*Prepared for: [Decision maker]*

## Recommendation
[State the recommendation clearly in one sentence]

## Context
[Why this decision matters, what prompted it]

## Options Evaluated
### Option A: [Name]
- **Pros:** ...
- **Cons:** ...
- **Cost:** ...

### Option B: [Name]
- **Pros:** ...
- **Cons:** ...
- **Cost:** ...

[Repeat for each option]

## Evaluation Criteria
[What mattered most and why -- link back to the research brief]

## Why [Recommended Option]
[Specific reasoning grounded in evidence from the research]

## Risks of This Choice
[Be candid about downsides and mitigation strategies]

## Next Steps if Approved
1. [Action]
2. [Action]
```

## Competitor Overview Template

```markdown
# [Competitor Name]

## Company Overview
- **Website:** [URL]
- **Founded:** [Year]
- **Headquarters:** [Location]
- **Funding/Revenue:** [If available]
- **Employee count:** [If available, with source]
- **Key leadership:** [If relevant]

## Positioning
[How they describe themselves. Quote their homepage or about page directly.]

## Target Market
[Who they sell to -- company size, industry, role]

## Product Summary
[What they offer at a high level, in your own words based on research]

## Recent Developments
- [Notable recent events with dates and sources]
```
