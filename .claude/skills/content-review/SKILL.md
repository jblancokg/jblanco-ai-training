---
name: content-review
description: Review training content for accuracy and recency. Use whenever the user asks to review, audit, fact-check, or update a chapter or page of the training material, or asks whether content is outdated or still reflects current best practice.
---

AI usage in the SDLC is a fast moving space. Training content can go stale in a couple of months, so every review starts from today's date and works backwards.

## Process

1. Check the last updated date of the file via the git log to understand how out of date it may be
2. Read the full page or chapter under review, plus its entry in TRAINING-PLAN.md for the editorial intent.
3. List every claim that can go stale: tool and model names, feature availability, pricing, workflow recommendations, and anything framed as "best practice".
4. Search the web for the current state of each claim. Prefer primary sources (official docs, changelogs, announcements) over blog posts. Check publication dates; anything older than a few months deserves skepticism.
5. Verify any link before recommending it. Fetch it and confirm it says what you think it says. A broken or misattributed link is worse than none.

## Report format

Present findings before making any edits:

- **Outdated**: claims that are no longer accurate, with what changed and a source.
- **Uncertain**: claims you could not confirm either way. Say so plainly rather than guessing.
- **Suggested additions**: new tools, features, or practices worth covering, with sources.
- **Further reading**: articles or videos worth linking from the page.

Do not rewrite content until the user approves the direction. When removing something as outdated, ask whether it should instead stay visible but be marked as outdated, since seeing what changed has training value.

This space is still messy: multiple approaches can be simultaneously valid, and it is fine for the content to hedge and present more than one way of working rather than declaring a single winner.
