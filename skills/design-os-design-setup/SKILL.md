---
name: "design-os-design-setup"
description: "Turn a design-impact readout into a ready-to-work design workspace: a Figma page built from the team's prior frames with notes, stickies, paste-ins and empty boards; a coded baseline; or a Notion/FigJam workspace. Then review it as a designer. Use for \"set up the Figma for this\", \"start the designer route\", \"pull in the old frames\", \"prep a working page\". Not for: deciding the route (design-os-design-impact), the Design Spec (pm-os-write-spec), Alloy audits (design-os-audit-design-system)."
---

# Design OS: design setup

A designer picking up new work loses the first day finding what already exists: old explorations, the screen as it ships, the questions nobody answered. This skill does that day for them. It takes the readout from `design-os-design-impact` and builds a workspace where every screen to design sits next to the work it starts from, with the changes, open questions and links beside it.

Good looks like: a designer opens one link and can start designing within minutes. Every group says what to keep, change and drop. Anything that couldn't be brought in has a placeholder saying where to get it. Nothing the owning team relies on was changed.

## Rules

1. **Start from the richest existing work, not the frames someone happened to link.** Linear and spec links point at single frames, and their node IDs go stale. Read the owning team's files page by page before deciding what exists, because the best prior work is often unlinked (a whole earlier milestone of the same feature).
2. **Copy, never move.** Clone prior frames into the working area. The originals stay where they are, because they're the team's record of what was decided and shipped.
3. **Ask once where to work, then label what you add.** Adding a page to a team's file is a change to their file: ask first, name the page `<flag/emoji> <feature> · <year> — WIP`, and say on it who added it and why. See `references/figma.md` for the three places to work.
4. **Everything you can't bring in gets a placeholder where it's needed.** You can't copy frames across Figma files or duplicate files through the Figma MCP server. Put an orange paste-in frame next to the board that needs the asset, with the link and the copy-paste steps, so the gap is visible and one action from closed.
5. **Notes travel with the work.** Every group has a notes frame (keep, change, drop, owner, sign-off, links), stickies under each copied design, and empty NEW boards beside it. A designer should never need to leave the canvas to know what a frame is for.
6. **Confirm before every write** to Figma, Notion, Linear or a repo, and show what you'll create and where.
7. **Review, then organize, before handing over.** Run the workspace review (`references/review.md`), show its findings and organisation plan, and on a yes follow through (`references/organize.md`). Organizing moves, renames and labels; it never changes what a screen contains.

## Inputs

- **The readout** from `design-os-design-impact`: work line and links, affected-screens table (page, owner, change, path, current reference with source and confidence), route, open questions, map suggestions. If there's no readout, run `design-os-design-impact` first, because setup without it guesses at scope.
- **The route** the person said yes to.
- **The brief** (fetch it fresh) for open questions and decisions.

## Steps

1. **Confirm the route and the workspace type.** Figma for the Figma and Designer routes; coded for Coded wires and Coded hi-fi; Notion or FigJam when the person wants no Figma file or the Figma MCP server isn't available. No design → hand to `pm-os-ticket-brief`; there's nothing to set up.
2. **Find the prior work.** For each affected page, search the owning team's Figma space and files (`references/figma.md`, Finding prior work): list pages and sections read-only, open candidates, screenshot them. Also check the Design team's Linear projects for the feature and ai-prototypes for a coded version. Record each find as a group: what it is, which screens it informs, how current it is (shipped, ready for dev, exploration, superseded by a decision).
3. **Plan the groups.** Group by the work to be done (usually a user journey or a surface), not by the old file's milestones. For each group list: boards to design (from the readout's rows and any Maybes), prior frames to copy, assets to paste in, stickies (keep, change, drop, check, maybe, open question), owner and sign-off, links. Show the plan as a short table and ask for one yes, including where to work.
4. **Build the workspace** for the type:
   - Figma: `references/figma.md`.
   - Coded: `references/coded.md`.
   - Notion or FigJam: `references/notion-figjam.md`.
5. **Write the handoff** when the route is Designer (`references/handoff.md`): a Notion page linking the workspace as the primary place to work.
6. **Review and organize the workspace** (`references/review.md`, then `references/organize.md`). Where a subagent is available, run the `design-workspace-review` agent in brief mode for a fresh pair of eyes; otherwise do it yourself, deliberately as a designer seeing it cold. Show the gaps, organisation plan and fixes, get one yes, then apply what was agreed.
7. **Hand over.** Show the links, what the review found and changed, and what's still manual (paste-ins, owners to confirm).

## Output

End with:

- **Workspace:** the link (Figma page, prototype app, Notion page or FigJam board), and where it lives.
- **What's in it:** groups, with counts of copied frames, NEW boards, stickies and paste-ins.
- **Still manual:** each paste-in, with its link; any owner or Design lead to confirm.
- **Review:** the gaps from step 6, and what the organisation pass moved, renamed, labelled or parked.
- **Handoff:** the Notion link, if written.
- **Heads-up:** if you added a page to a team's file, one line the person can send that team.

## Reference files

- `references/figma.md`: read at steps 2 and 4 for Figma. Where to work, finding prior work, the group layout, notes frames, stickies, paste-ins, NEW boards, Start here, and Figma MCP limits.
- `references/coded.md`: read at step 4 for the coded routes. The as-is baseline, the Today/Proposed switch, hand-off to `design-os-prototype`.
- `references/notion-figjam.md`: read at step 4 when there's no Figma file. The Notion workspace and the FigJam board.
- `references/handoff.md`: read at step 5. The Design lead lookup and the handoff package.
- `references/review.md`: read at step 6. What the workspace review checks, how it reports, and the one yes before following through.
- `references/organize.md`: read at step 6, after the review. What good organisation looks like, scope, how to apply a plan, and what organizing never touches. Also used by `design-os-prototype-to-figma`.

## Lessons logged

- **Oct 16, 2026 (new):** split out of `design-os-design-impact` after a Designer-route run found only linked frames and missed a whole earlier milestone in the team's file → read the team file's pages first; build in the file that holds the prior work; placeholders for anything cross-file.
