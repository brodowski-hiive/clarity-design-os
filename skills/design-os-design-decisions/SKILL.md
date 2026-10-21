---
name: "design-os-design-decisions"
description: "Make and log Clarity design calls as the team's design guidelines: check the log and Alloy, recommend a call with its reason, and record it once the designer confirms. Use for \"make a call on X\", \"log this decision\", \"what did we decide about X\", \"is there a guideline for X\", \"does this break our guidelines\". Not for: a feature's product decisions (pm-os-initiative-record), DACI calls (pm-os-make-product-decision), or Alloy coverage audits (design-os-audit-design-system)."
---

# Design OS: Design decisions

Every call design makes (which button goes where, how a state behaves, how a number is formatted) is a guideline the next screen should follow. This skill makes those calls well, writes them down while the reason is fresh, and answers "what did we decide?" with a citation instead of a guess.

## Rules

1. **Recommend; the designer decides.** Propose one call with its reason and the alternatives, then wait for a yes before logging it Active. A model's guess shouldn't become team policy by default.
2. **Look before you call.** Search the log and Alloy's docs before recommending anything. Two guidelines that contradict each other are worse than none.
3. **One rule per entry, with its reason and scope.** People cite guidelines one at a time, and the reason is what lets them judge an edge case the rule didn't foresee.
4. **Usage, not specs.** Record how the team uses Alloy, not Alloy itself: link components, never copy tokens or props (CONTRIBUTING section 4). If the call needs Alloy to change, log the interim guideline and route the change to the Alloy contribution process.
5. **Supersede; never rewrite.** A changed call is a new entry that supersedes the old one, which stays in the log with its reason. The history is what answers "why did we stop doing that?"
6. **Confirm before every write** to the log, an initiative record, or Slack, and show the entry first.

## Where you are

- **The log is reachable** (the Notion MCP server is connected): read and write it live. It is the source of truth. Location and schema: `references/log.md`.
- **No Notion access:** read `references/guidelines-snapshot.md`, the Active guidelines as of the last plugin release. Say how old it is, and give any new call as a ready-to-paste entry instead of logging it.
- **Working in the clarity-design-os repo:** you can also refresh the snapshot (`references/snapshot.md`).

## Modes

Pick from the request. Mixed requests run in this order.

1. **Look up** ("what did we decide about X", "is there a guideline for X"). Search the log by area, Alloy component, and keywords. Answer with the matching guidelines and their IDs (`DG-14`), newest Active first. Mention superseded entries only when they explain the current one. If nothing matches, say so and offer to make the call.
2. **Make a call** ("make a call on X", "which should we use here?"). Follow `references/making-a-call.md`: frame the question, check precedent, recommend one option with 1–2 alternatives, and name the review level the call needs. Never log it without a yes.
3. **Log a call already made** ("log this decision", "we decided X in the sync"). Check the log for a conflict or duplicate first. Then preview the entry and log it on a yes. Credit whoever made the call, not the agent.
4. **Check against the guidelines** ("does this break our guidelines?"). Read the Figma frame (Figma MCP server: `get_screenshot`, `get_design_context`), the prototype, or the description. List each guideline it follows or breaks, with IDs. Read-only. Alloy coverage belongs to `design-os-audit-design-system`, so point there once if you spot detached or non-Alloy components.
5. **Maintain** ("what's waiting on council?", "seed the log from the changelog", "refresh the snapshot"). Use `references/log.md` for the review queue and backfill, and `references/snapshot.md` for the snapshot.

## Scope and neighbours

- **Scope** is System (all of Clarity), Surface (one product area), or Feature (one initiative). Log feature calls here too, with the initiative linked. When a feature call starts showing up elsewhere, offer to widen its scope.
- **Initiative record** (`pm-os-initiative-record`): holds a feature's product decisions. When you log a Feature-scope guideline and the initiative has a record, offer one line linking it from the record's Decisions. It's that skill's write, so confirm first.
- **Alloy gaps** (`design-os-audit-design-system`'s `references/known-gaps.md`) list what Alloy lacks. A guideline says what to do meanwhile and links to the gap.

## Output

End every run with:

- **Call:** the guideline sentence, "No call needed" (with the Alloy doc or guideline that already covers it), or "Open" with what's blocking.
- **Status:** Proposed, Active, or not logged, plus the review level for anything not Active.
- **Why:** one line.
- **Cites or conflicts:** the related guideline IDs, or "none found".
- **Logged:** the entry link, or "not logged" and why.

## Reference files

- `references/log.md`: read before the first log read or write. Where the log lives, its fields and allowed values, search tips, the review queue, and the changelog backfill.
- `references/making-a-call.md`: read in Make a call mode. How to frame, find precedent, weigh options, and pick a review level.
- `references/snapshot.md`: read when refreshing the snapshot or when Notion isn't available.
- `references/guidelines-snapshot.md`: the Active guidelines at the last release. Read only when the live log isn't reachable.

## Lessons logged

- **Oct 21, 2026 (origin):** Design calls were scattered across sync notes, Slack threads, and weekly changelog pages → one log with IDs, read by the other design-os skills before they judge.
