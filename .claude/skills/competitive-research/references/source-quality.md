# Source Quality Guide

## Source Tier Ranking

Use this hierarchy when multiple sources conflict or when deciding which to cite:

### Tier 1: Primary Sources (Highest confidence)
- Official company website (product pages, about page, pricing page)
- Official documentation and API references
- SEC filings, annual reports, investor presentations
- Press releases from the company itself
- Published pricing pages with specific numbers

These are the company's own words. They may be biased toward positive framing, but the factual claims (pricing, features, integrations) are authoritative.

### Tier 2: Verified Third-Party Sources
- Major review platforms with verified users (G2, Capterra, TrustRadius, Gartner Peer Insights)
- Analyst reports from recognized firms (Gartner, Forrester, IDC)
- Established tech publications (TechCrunch, The Verge, Ars Technica, The Information)
- Crunchbase (for funding, employee count, founding date)
- LinkedIn company pages (employee count ballpark)

These sources have editorial or verification processes. They carry weight but still reflect a particular perspective.

### Tier 3: Secondary Sources (Use with caution)
- Blog posts from industry practitioners
- Conference talks and presentations
- Community forums (Reddit, Hacker News, Stack Overflow)
- Comparison articles from non-analyst sites
- Social media posts from company employees

Useful for sentiment, user experience, and discovering angles, but verify specific claims through Tier 1 or 2 sources before including them in deliverables.

### Tier 4: Weak Sources (Flag explicitly)
- Undated content with no author attribution
- SEO-optimized "Top 10 [Product] Alternatives" listicles
- Affiliate marketing content (check for disclosure)
- AI training data recall with no web search verification

If you must cite a Tier 4 source, mark it: `[WEAK SOURCE - verify independently]`.

## How to Cite

### Inline citations (in overview.md, features.md, etc.)
Use markdown links directly in the text:

```markdown
The product supports up to 50 integrations including Salesforce, HubSpot, and Slack
([Integrations page](https://example.com/integrations), accessed 2025-01-15).
```

For claims from multiple sources:
```markdown
The company raised a $40M Series C in March 2024
([Crunchbase](https://crunchbase.com/org/example),
[TechCrunch coverage](https://techcrunch.com/2024/03/example)).
```

### sources.md format

```markdown
# Sources: [Competitor Name]

## Official Sources
- [Pricing page](https://example.com/pricing) -- Tier breakdown, per-seat pricing, enterprise contact form. Accessed 2025-01-15.
- [Product documentation](https://docs.example.com) -- Feature details, API reference, integration list. Accessed 2025-01-15.
- [About page](https://example.com/about) -- Company history, mission, team size. Accessed 2025-01-15.

## Third-Party Sources
- [G2 Reviews](https://g2.com/products/example/reviews) -- 4.2/5 from 340 reviews. Key themes: easy onboarding, limited reporting. Accessed 2025-01-15.
- [TechCrunch: Example raises $40M](https://techcrunch.com/2024/03/example) -- Series C details, investor list, stated growth metrics. Accessed 2025-01-15.

## Weak/Unverified Sources
- [Reddit discussion](https://reddit.com/r/saas/example) -- Anecdotal user reports of pricing changes. Not confirmed by official sources.
```

## Common Source Pitfalls

1. **Stale pricing.** Pricing pages change frequently. Always note the access date and flag that pricing should be re-verified before making purchasing decisions.

2. **Feature pages vs. reality.** Marketing pages list features; they do not always reflect the current state of the product. Cross-reference with documentation, user reviews, and changelogs.

3. **Employee count estimates.** LinkedIn shows "200-500 employees" but this includes contractors and is self-reported. Crunchbase pulls from LinkedIn. Neither is exact. State the range and source, do not present it as precise.

4. **Funding vs. valuation.** "Raised $50M" and "valued at $500M" are different claims. Be precise about which is sourced.

5. **Comparison articles with hidden bias.** Many "X vs Y" articles are published by X or funded by X. Check who wrote and published the piece.

6. **Outdated reviews.** A 2-star review from 2021 may reflect a product that has changed substantially. Note the date range of reviews you reference.

## When You Cannot Find a Source

This happens. Here is how to handle it:

- **No pricing publicly available:** State "Pricing is not publicly listed; contact sales required" and link to the pricing/contact page. Do not guess.
- **Feature exists but details are sparse:** State what you know, cite the best source you found, and note "detailed documentation not publicly available."
- **Conflicting information:** Present both claims with their sources and flag the conflict: "Source A reports X, while Source B reports Y. This discrepancy was not resolved."
- **Information from training data only:** Mark it `[BASED ON TRAINING DATA - VERIFY]`. Do a web search to try to confirm before including it. If you cannot confirm, either drop it or keep the flag.
