---
name: "design-os-audit-design-system"
description: "Audit a Figma frame for Alloy coverage: missing or detached components, non-Alloy libraries, raw colors, off-system type. Adds a report card with fix IDs and Alloy gaps beside the frame, then fixes chosen IDs in a duplicate, never the original. Use for \"audit my frame\", \"am I using Alloy?\", \"find detached components\", \"fix A3\". Not for: auditing the Alloy library itself (alloy-figma-audit), coded prototypes (design-os-alloy-prototype), or UX critique (design-os-review-design-work)."
---

# Design OS: Audit design system

Check a designer's Figma work against the live Alloy library, show what isn't Alloy on a report card beside the frame, and fix what they pick in a copy. The designer's original frame is never edited.

## Rules

1. **Never write to the original.** The only writes are: the report card (a new frame beside the original), the fix copy (a duplicate of the original), and edits inside those two. Before every write, check that the target node is the report card, the copy, or inside one of them. If not, stop.
2. **Alloy only, looked up live.** Compare against the 🤖 Alloy - DS library, scoping every search to its library key (`references/alloy-library.md`). Never compare against memory, shadcn, or other Hiive libraries, which show up in unscoped searches.
3. **Read before judging.** Read each Alloy component's description before calling something a lookalike or suggesting a swap. The description often decides it (for example, mobile dialogs are `Drawer / Mobile`).
4. **Suggest; the designer decides.** Lookalike detection is a judgment call. Give a confidence level, and never fix a finding the designer hasn't picked.
5. **Exact first, closest only when asked.** Bind colors and apply text styles only on exact matches. Otherwise mark the finding Needs designer and offer "use the closest". If the closest option visibly changes the design (a heading changes size or weight, or two styles are equally close), ask which one with a short multiple-choice question instead of picking.

Load the `figma-use` skill before the first `use_figma` call.

## 1. Scope

Audit what the designer points to: a Figma link with `node-id`, or their current selection. With neither, ask which frame. A whole page is fine if they ask, but say it will be slower and may hit Figma rate limits. Skip hidden layers and anything already marked as a report card or fix copy.

## 2. Audit (read-only)

Walk the frame, collect the components, variables, and styles it should be using, and look them up in small scoped `search_design_system` batches. Find what isn't Alloy using `references/findings.md`. Two checks go wrong most often: a remote instance isn't necessarily Alloy (match keys), and a hex isn't "no token" until every `2. Clarity` color, including `colors/chart/*`, has been resolved. Give each finding an ID: `A1`, `A2`, and so on, highest severity first.

Work out **Alloy coverage**: of the elements that should be Alloy (controls, surfaces, text, color, spacing), the share that is. Report it as a percentage with high, medium, and low counts.

Collect **Alloy gaps**: things the frame needed that Alloy doesn't provide (no component, style, or token, or a component a description references but that isn't published). These aren't designer mistakes. Record each with the finding IDs where it showed up. `references/known-gaps.md` lists gaps already seen; confirm each is still missing before reporting it.

## 3. Report card

Ask once per frame before adding it ("I'll add a report card to the right of Checkout. OK?"). Then build it as in `references/report-card.md`: beside the original, made from Alloy, with the gaps callout, each ID linked to its layer, and the findings saved in the file so a later chat can pick them up.

In chat, give a short version: coverage, counts, the top findings with IDs, the gaps in one line, and how to reply ("fix A1, A4", "fix all high", "fix all").

If a report card already exists for the frame, update it instead of adding another. Keep IDs for findings that still exist, mark resolved ones as such, and number new findings after the highest existing ID.

## 4. Fix (only on request)

When the designer names IDs:

1. Read the findings saved on the report card (resolve IDs from there, not from memory).
2. If the frame has no fix copy yet, duplicate the original, name it `<frame name> · Alloy fixes`, and place it below the original with an 80px gap. Reuse the same copy for later fixes.
3. Map each finding's node to its counterpart in the copy (same index path in the layer tree) and apply the fix there, using the fix notes in `references/findings.md`. Screenshot the affected section after each batch, and the whole copy at the end.
4. Update each finding's status on the report card: **Fixed in copy** (linked to the fixed layer), **Partly fixed in copy · Needs designer**, **Needs designer** (with the specific choice to make), or **Couldn't fix** (with the reason). "Fix all <severity>" includes findings that need a decision; mark them, don't skip them silently. Add any gaps found while fixing to the callout.
5. In chat, list what changed and what didn't, and remind them the original is untouched. They keep whichever version they want.

## Reference files

- `references/alloy-library.md`: read before the first library search. Library key, search limits, variable collections, text styles, importing.
- `references/findings.md`: read during the audit and before fixing. What to flag, severity, confidence, and fix notes per component.
- `references/report-card.md`: read before creating or updating a report card. Layout, gaps callout, links, and the saved-data format.
- `references/known-gaps.md`: read when collecting Alloy gaps. Gaps already seen, to confirm and reuse wording.
- `references/lessons-archive.md`: older lessons. Read when a correction seems familiar or before changing a standard.

## Lessons logged

- **Oct 9, 2026 (colors):** Called #0ea8cc "no token" when `colors/chart/chart-blue` matched exactly → resolve all `2. Clarity` colors before judging.
- **Oct 9, 2026 (type choices):** Headings had no exact match; designer chose Subscreen Title over Section Title → ask when "closest" changes the design.
- **Oct 9, 2026 (report card):** Designer asked to see Alloy gaps on the card → added the gaps callout.
