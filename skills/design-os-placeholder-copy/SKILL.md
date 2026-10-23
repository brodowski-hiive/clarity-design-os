---
name: "design-os-placeholder-copy"
description: "Write first-draft Clarity UX copy (buttons, headings, errors, empty states, modals, emails) to the style guide, A to Z, and leadership log, paste-ready or filled into Figma after a yes. Use for \"write placeholder copy\", \"replace the lorem ipsum\", \"what should this button say\", \"clean up the copy\", \"get this ready for copy review\". Not for: mock data values (design-os-fill-mock-data), compliance sign-off (compliance-review), or long-text stress tests (design-os-stress-test-design)."
---

# Placeholder copy

Put good first-draft copy into a Clarity design before the designer hands it to content review. The content designer reviews and polishes everything afterward, so the goal is copy that is accurate, on-terminology, on-style, and the right length for its component: the review becomes refinement rather than a rewrite. It is not final copy, and nothing here replaces content or compliance review.

The flow is always: identify the audience → load the sources → read the design → write the copy → deliver it (paste-ready, or filled in after a yes) → hand off.

Designs arrive as a Figma link, a design canvas (for example Claude Design), or a screenshot. The steps are the same everywhere; what changes is which tools you have for reading the sources and editing the design. Use the Notion, Google Drive, and Figma MCP servers your agent has connected (in Claude chat and Cowork these are connectors in settings). If your agent defers tool loading, search for them first.

## 1. Identify the audience

Clarity writes for two audience modes. Pick one before writing anything, because it changes how much you explain.

- **Sophisticated users**: institutional investors, accredited and qualified purchasers, issuers, and Clarity Investments fund investors. Screens and flows owned by the **3PF, Issuers, and Investing** teams use this mode. Read `references/sophisticated-audience.md`.
- **General users**: everyone else, including restricted sellers and people newer to secondaries trading. All other teams' screens use this mode. Read `references/general-audience.md`.

Infer the mode from the owning team (`pm-os-clarity-context` has team files, if it's installed), the flow, or the content of the frame. If you can't tell, ask the designer one short question (which team owns this, or who the user is). If it's still ambiguous, use general mode. Never assume an expert audience when in doubt.

## 2. Load the sources

The Clarity style guide, the Clarity A to Z, and the Leadership Copy Preferences log are living documents and the sources of truth. Fetch all three fresh at the start of every task through the designer's own Notion and Google Drive access; don't rely on an earlier read, because they change often. `references/sources.md` has the links, which server reads each one, the precedence rules when they disagree, and the pages to fetch only when the copy needs them (legal entities, fund names, disclaimers, notifications).

If a source won't load, tell the designer which one failed and the likely fix: connect the Notion or Google Drive MCP server (a connector in Claude chat or Cowork), or ask for view access to the page. Then offer to continue using only the core rules in this file. If they continue, say clearly in the handoff that the copy wasn't checked against the missing source. Never quietly skip a source.

## 3. Read the design

Work only from what is actually in the design. Reference only text layers and UI elements you can confirm from the Figma data, the canvas, or the screenshot. Treat each frame as independent, and don't carry assumptions over from another frame.

Before writing, make sure you understand what the screen does: what the user is trying to accomplish, what state they're in, and what happens after each action. If a missing detail would change the copy (for example, whether a bid can be withdrawn, or what an error actually means), ask one question. If it wouldn't, write your best version and flag the assumption in the handoff instead of blocking.

How to read and edit each kind of input is in `references/design-tools.md`. Read it before reading a Figma file or editing any design.

## 4. Write the copy

Apply the fetched style guide, A to Z, and leadership log in full. The core rules below always apply; the audience reference adds mode-specific rules on top. Where `design-os-design-decisions` has an Active guideline on copy or content patterns, follow it too.

Write one recommended version per element by default. This is placeholder copy going into a design, so a single clear answer is more useful than a menu. Give alternatives only when the designer asks, or when two approaches are both valid and the choice changes the design (note it in the handoff).

Fit the component. Respect the space the design gives each text layer; a button stays a button. If the right message genuinely won't fit, write it correctly anyway and flag the layout issue rather than cutting meaning.

Replace lorem ipsum, "Title goes here," and obvious filler completely. For draft copy the designer already wrote, keep what works and improve it. Replace it only when it doesn't serve the user, uses the wrong terminology, or misstates how the product works.

Copy only. Realistic data values (names, amounts, dates, totals that reconcile) belong to `design-os-fill-mock-data`; mention it if the frame needs both.

### Core rules (always apply, both modes)

1. Clarity, not Hiive. Never use Hiive in product copy, never an @hiive.com address, and never a Hiive-era product, index, or legal entity name.
2. Avoid internal language. Use common-language equivalents, and define terms the reader wouldn't know (how much to define depends on the audience mode).
3. Precision over vagueness. When something has a specific meaning, use the specific term.
4. Active voice with a named actor. Clarity owns its actions ("We'll review your bid," not "Your bid will be reviewed"). Use passive only when the actor genuinely can't be named, and flag it.
5. Say less when you can't say it precisely. A short accurate statement beats a vague or padded one.
6. Instruction over restriction. Tell the user what to do ("To place a bid, enter the full listing amount"), not what they're forbidden from doing.
7. Non-adversarial framing. Clarity doesn't reject users. Prefer "If we can't approve your bid" or "If your bid is ineligible" over "If we reject your bid."
8. No editorial justification. Cut "for simplicity," "for clarity," and similar. Let the fact stand.
9. Price is per unit. Amount is the total. Never interchangeable.
10. Securing an allocation in a Clarity Investments fund is an "order" that gets "confirmed." Never "bid" or "accepted" there. Bid and accepted apply only to negotiable transactions, which include fund resales.
11. Label data accurately. A figure showing remaining units says "remaining," not "total." Say what is rounded and to what precision. Never say "fractional amounts."
12. No marketing copy in the product. The register is clear, precise, and transactional. Human and encouraging is fine; pitching is not.
13. Don't give Clarity Investments funds the cautionary framing used for funds managed by a Clarity partner. Clarity validates the holdings and controls the experience.
14. Confirm every significant action. Signing, submitting, or completing a step gets a confirmation state. Errors and statuses are specific and human.
15. Lead with what the reader can do. Announce the feature, state the conditions for access, then say what to do next. Don't open by telling the user what they are or aren't eligible for.
16. Plain, natural phrasing. "Trade less frequently," not "exhibit fewer transactions." Use contractions.
17. Issuer, never "issuing company" or "issuer company."

These come from the leadership log and past copy projects. When the fetched sources say something more specific or more current, follow the sources.

### Formatting

- Dynamic values use curly-brace variables: {company_name}, {price_per_unit}, {units}, {total_amount}. When price per unit and units appear together, include the total amount.
- If the frame already shows realistic sample data (a real-looking company name or dollar figure), keep the sample data in the design and list the matching variables in the handoff. Use variables in the design only where the frame already uses them or has no value yet.

### Compliance

Compliance flags what copy can't do; it doesn't set copy direction. For all product UI copy, apply these standing rules:

- No absolute guarantees. "Won't," not "never." Outside Clarity Investments funds, use "initiated," not "confirmed," for transaction states.
- No urgency or fear-of-missing-out language.
- No performance predictions or implied returns.
- Outcome-neutral language in review and approval flows. Always acknowledge that a review can end without approval.

Load the `compliance-review` skill (its SKILL.md plus `references/compliance-guide.md` and `references/disclosures.md`) when the copy touches regulated territory: performance, returns, or valuation figures; Clarity Price or index references; a specific offering, fund, or company being promoted; banners or announcements that invite users to invest or trade; eligibility, accreditation, or suitability statements; disclaimers, footers, or "member FINRA/SIPC" lines; or testimonials. If it isn't installed, apply the standing rules above and flag in the handoff that compliance wasn't checked.

`compliance-review` hasn't been through the rebrand and still names Hiive entities and products. Take requirements and structure from it, never names. Take legal entity names from the Clarity Corporate Cheat Sheet (see `references/sources.md`), and flag any disclosure you write so Compliance can confirm the current entity name.

### Content isn't a product fix

If a screen's problem is a product or UX problem that copy can only paper over (a missing confirmation state, a confusing flow, a number that can't be labeled accurately), still write the best copy you can, and flag the product issue in the handoff. Always include this flag.

## 5. Deliver the copy

Designers get the copy one of two ways: they paste it in themselves, or you fill it in for them. If they asked only for copy, or didn't say, deliver it paste-ready and offer to fill it in when you can edit the design.

**Always show the copy first.** Start with the paste-ready block: one element per line, in the order the elements appear on screen, in a fenced code block so it copies cleanly.

```
Heading: ...
Body: ...
Primary button: ...
Secondary button: ...
```

For paste delivery, that block is the deliverable. Note which elements already had acceptable copy and were left alone, so the designer doesn't hunt for changes that aren't there.

**Filling it in.** Confirm before writing: after the block, ask one yes/no question naming the frame and the number of layers you'll change (use your agent's question tool if it has one, for example `AskUserQuestion` in Claude Code; otherwise ask in plain text and wait). Mention once that Figma's version history can restore the previous state. On a yes, write the copy into the design following `references/design-tools.md`. Change text content only. Never restyle, move, resize, or delete layers, and never detach components. Two cases need their own yes, named in that question: editing text in a main component (it changes every instance) and layers with mixed styling inside them (the edit can flatten it). After writing, report anything that failed.

If you can't edit the design (a screenshot, no design tool connected, or no edit access), say why in one line and deliver the paste-ready block.

## 6. Hand off

End every task with a brief handoff the designer can pass to content review. Keep it short and in this order:

1. **Mode and sources**: audience mode used, and which sources were fetched live. Name any source that failed or any check that was skipped.
2. **What changed** (fill-in only): element, previous text, new text, so any edit can be reverted.
3. **Notes for content review**: only real flags, one line each. Assumptions about how the product works, terminology judgment calls where the sources are silent, compliance concerns, product-fix flags, layout issues, and variables standing behind sample data. If there are no flags, say so in one line.

Make clear to the designer that this is placeholder copy for content review, not approved copy.

## Reference files

- `references/sources.md`: links to the style guide, A to Z, and leadership log, how to use the log's sections, pages to fetch only when needed, and precedence when sources disagree. Read in step 2.
- `references/general-audience.md`: general users mode. Read in step 1 when the screen isn't owned by 3PF, Issuers, or Investing, or the audience is unclear.
- `references/sophisticated-audience.md`: sophisticated users mode, including fund transaction and issuer rules. Read in step 1 for 3PF, Issuers, and Investing screens.
- `references/design-tools.md`: reading and editing Figma links, design canvases, and screenshots. Read in step 3, before reading a Figma file or editing any design.

## Lessons logged

None yet.
