---
name: "design-os-research-patterns"
description: "Research how 15+ competitors and cross-industry products handle a screen or feature (data room, transfer modal, cap table), with tradeoffs and source links, to explore or to check a design. Use for \"how do competitors handle X\", \"pattern research\", \"what's out there for X\", \"inspiration for this screen\", \"how does this compare to the market\". Not for: critiquing a mock (design-os-review-design-work), product strategy (pm-os-product-strategy), or stress tests (design-os-stress-test-design)."
---

# Research patterns

Research how existing products handle a screen or feature, so a designer can explore the landscape before sketching or check an existing direction against it. The user is a product designer on Clarity, the issuer-facing portal (formerly called HIP or KITS). They know the domain and the design system, so don't explain either.

## Stance

Stay neutral. Describe patterns and tradeoffs; don't rank approaches or recommend one. The designer decides. Keep the report about design, not compliance or legal commentary.

## 1. Read the input and pick a mode

Input can be any mix of a screen type, a problem or user goal, and a Figma link.

- **Exploration mode**: no existing design. Map the landscape.
- **Validation mode**: a Figma link or a described direction is provided. If there's a Figma link, pull the frame with the Figma connector (`get_screenshot` / `get_design_context`). Research the same way, then add a convergence/divergence table comparing their design to what you found.

If the input is only a bare screen type ("dashboard") with no context, ask one short question about the user's goal before searching. Otherwise proceed and state assumptions in one line.

## 2. Break the screen into patterns

Decompose the screen into 4-8 component patterns before searching. For example, "data room" becomes: where it lives, structure and upload, access model, protection controls, activity tracking, Q&A and requests, notifications. Research per pattern, not per platform. The report is organized by pattern.

## 3. Choose platforms

Read `references/platforms.md` for the fixed tiers. Per run, select the 12-15 most relevant to this screen type, then add:

- **Specialists**: products whose entire business is this exact feature (e.g. DocSend/Datasite for data rooms, DocuSign for signing, Stripe for payments UI). Competitors often keep these screens behind login and don't document them, so specialists frequently produce the best material. Always include this tier.
- **Wildcards**: 3-5 out-of-industry products chosen for this pattern specifically.

Aim for 15+ platforms total with real findings.

## 4. Search

- Search each platform separately; combined queries return shallow results.
- Prefer sources that show the actual UI: help-center articles (step-by-step docs usually include annotated screenshots), changelogs/release notes, product pages with screenshot galleries, app store listings, review sites with screenshot galleries (TrustRadius, G2), embedded walkthrough videos.
- Fetch promising help articles (`WebFetch` in Claude Code, `web_fetch` in Claude chat) to confirm what they show and to find direct image URLs.
- Note the date of sources. Flag anything older than ~2 years as possibly outdated, and be aware of acquisitions that may have changed a product's UI.
- If a platform has nothing public on this feature, record it in Gaps rather than padding.

### Mobbin

If a Mobbin connector is available (tools like `search_screens`, `search_flows`, `search_sections`), use it per pattern and add a Mobbin column/links to the tables. Search the deferred tools for "mobbin" at the start of each run (`ToolSearch` in Claude Code, `tool_search` in Claude chat). If it's not available, fall back to a "Look up in Mobbin" line listing specific apps and flows to search. Don't construct Mobbin URLs; they contain IDs and guesses won't resolve.

## 5. Label honesty

Claude can't see behind logins, so nothing is truly "observed". Where a browser is available (Claude Code ships Chromium with Playwright), open public help pages and screenshot them to confirm what the UI shows; still cite the source URL, never a local screenshot path. In chat, rely on the fetched page. Tag every source by type:

- **[Help]** step-by-step support docs (most reliable for actual UI behavior)
- **[Mktg]** product/marketing pages (describes capability, may overstate)
- **[3P]** third-party write-ups and reviews
- 📷 marks sources with screenshots or video

## 6. Output format

Keep it short. Do the full per-pattern research, but don't print pattern tables by default. Use this structure:

```
**Mode:** Exploration | Validation · **Platforms:** N researched · Mobbin: connected / not connected

**Summary:** 1-2 sentences with the single most important finding. In validation mode, lead with the most significant convergence or divergence from the user's design.

| Platform | Source | Link |
|---|---|---|
| ... | Help / Mktg / 3P | [label](url) |

**Worth checking yourself:**
- Platform: why it's relevant to this ask, and why nothing was found (e.g. behind login, no public docs)

**Mobbin:** links from the connector, or specific searches to run.
```

Rules:
- The platform table lists only platforms whose sources show actual UI (screenshots, galleries, walkthrough videos, direct image URLs). Platforms with text-only sources are left out of the table.
- "Worth checking yourself" lists platforms you couldn't find visuals or info for but that are relevant to this specific ask. Include recommended platforms you didn't get to. Keep each to one line, most relevant first.
- Every link must come from search or fetch results. Direct image URLs are fine when found.
- Stay neutral: the summary states a finding, not a recommendation.

End with one line offering the full pattern breakdown. When asked, give a table per pattern (Pattern | Approaches seen | Tradeoff), plus, in validation mode, a comparison table (Pattern | Your design | Market | Note). If the user asks to expand a single pattern, give a fuller prose write-up of that pattern only.

## Reference files

- `references/platforms.md`: platform tiers, specialists, and wildcards. Read in step 3.

## Lessons logged

- **Oct 15, 2026 (migration):** Moved from personal `design-pattern-research` into clarity-design-os as `design-os-research-patterns` → uninstall personal copies so the two don't compete to trigger.
