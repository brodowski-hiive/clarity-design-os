---
name: "design-os-design-impact"
description: "Read a brief, Linear item, or idea, find the Clarity screens it affects, call each Fix, Compose, or Extend, and recommend one design route (none, coded wires or hi-fi, Figma, or a designer), then start from those screens on a yes. Use for \"what screens does this touch\", \"how should we design this\", \"design impact of TRA-123\", \"does this need a designer\". Not for: system map placement (design-os-system-map), building a prototype (design-os-prototype), or lane and risk (pm-os-triage-lane)."
---

# Design OS: design impact

Before anyone designs, two things decide whether the work goes well: knowing which screens it really changes, and picking the right way to design it. This skill reads the work, finds each affected screen as it ships today, says how big each change is, and recommends one route. On one yes, it starts from those current screens, so whoever builds next reacts to the change and not to a remembered layout.

Good looks like: a brief goes in; a short table of real screens with their sources, one route with reasons, and a single question come out. After the yes, the next skill starts from the product as it is.

## Rules

1. **Start from what ships.** Every route begins with the current screen, found from a real source and cited. A layout from memory presented as the current one misleads everyone downstream, so if you can't find a screen, say so.
2. **One route for the whole brief, set by its hardest screen.** Splitting routes per screen scatters the work across people and tools. Any Extend screen sends the whole brief to a designer, even if the rest is Compose.
3. **One yes before anything starts.** The readout is a proposal. Build nothing and write nothing until the person says yes to the route, and ask again before each write to Linear, Notion, or Figma.
4. **Never edit a team's Figma file.** Changes happen in the person's own duplicate, because the owning team's file is their record of what ships.
5. **People come from the directory, fresh.** The owning team's Design lead is looked up in the Product Team Directory through `pm-os-clarity-context` People lookup on every run, never from memory or an earlier chat, because roles move.

## Where you are

- **Figma connector available:** read the System Map and the owning team's Figma files for current screens.
- **No Figma connector:** use the other screen sources (`references/screens.md`), mark Figma sources "not checked", and lower confidence.
- **Shell and ai-prototypes available:** the coded routes can start here.
- **No shell (for example the `design-impact` agent):** give the readout and the route only. Name the next step and who runs it; never build.

## Steps

1. **Get the work into one line:** who does what, where.
   - A brief (Notion): fetch it, note its Doc Stage and last-edited date.
   - A Linear issue or project: fetch it and follow its Resources to the brief.
   - An idea: restate it in one line and confirm it.
   - Then read the Design Spec (`Design Spec: <Feature>`, from the brief's Resources) and the initiative record (`pm-os-initiative-record`) if they exist. Newer decisions in the record win over the brief.
2. **Place it.** Run `design-os-system-map` if it's installed (it's org-managed, so check first) and ask for the readout without a FigJam unless the person wants one. If it isn't installed, read `pm-os-clarity-context` `infra/client-app-map` and the System Map Figma file (`HwRkyV2rsMJUKeItVdiSoG`) yourself. Keep: the affected pages and items, what's new versus not on the map, owning teams, whether it's cross-team, and confidence.
3. **Find the current screen for each page.** Follow `references/screens.md`: Design Spec links, then the brief's Appendix, then the owning team's Figma files, then an ai-prototypes app, then a production screenshot, else "none found". Record the source and confidence for each. End with a `Map suggestion: link <page> card to <frame>` line for the design lead for each frame you matched.
4. **Classify each screen** in these words:
   - **Fix:** no visible change.
   - **Compose:** existing Alloy components and patterns.
   - **Extend:** a new pattern, an Alloy gap, a new section, or a non-web channel.
5. **Recommend one route** with reasons and confidence (`references/routes.md`): No design, Coded wires, Coded hi-fi, Figma, or Designer.
6. **Show the readout** (Output, below) and ask for one yes.
7. **On yes, start from the current screens** (Start, below), then hand off.

## Start

What happens after the yes depends on the route.

- **No design:** offer `pm-os-ticket-brief` with the affected screens and the Fix rows as its evidence.
- **Coded wires or coded hi-fi:**
  1. In ai-prototypes, rebuild each affected screen as it ships, with `design-os-prototype`: From Figma when a frame was found, otherwise from the reference you recorded.
  2. Commit that as-is baseline before applying any of the brief, so the diff and the history show exactly what changed.
  3. Add a playground Design choice, "Version", with **Today** and **Proposed** (`design-os-prototype` `references/playground.md`), so reviewers can flip between the shipped screen and the change.
  4. Hand off to `design-os-prototype` From a brief to apply the change, at wires fidelity for the wires route.
- **Figma:**
  1. Ask the person to duplicate the owning team's file into their own drafts, because Figma can't copy frames across files through the MCP server. Wait for the link to their copy.
  2. In the copy, clone the affected frames onto a new page named `<feature> · design impact`, and annotate each with what changes (the readout's Change column). Confirm before this write.
  3. Hand off to `design-os-create-mocks` if it's installed, otherwise to the Figma skills, working in the copy.
- **Designer:** write the handoff package (`references/handoff.md`) for the owning team's Design lead. Offer it as a Linear comment on the item or a Notion page on the initiative record, and write it only after a yes. No Slack draft.

Another team's screen, on any route: rebuild or clone it as it ships, and mark every change to it "needs <team> sign-off" in the readout, the plan, and the handoff.

## Output

The readout, in this order:

- **Work:** the one line, with the source (brief link and Doc Stage, Linear link, or "idea").
- **Affected screens:**

  | Page | Owner | Change | Path | Current reference (source, confidence) |
  |---|---|---|---|---|
  | Company page | <owning team> | Compose: add a floor price row under market depth | Dashboard → Company page | Frame link (team Figma, ready for dev; high) |

  Owners are teams, inferred ones marked. Cross-team changes say "needs <team> sign-off".
- **New to the map:** new pages or items, or "Nothing new". Separately, anything that ships but isn't on the map.
- **Route:** the one route, why (the screens and signals that decided it), and confidence. If a stricter route was close, name it and what would tip it.
- **What happens next:** what a yes starts, who does it, and the skill it hands to.
- **Map suggestions:** one `Map suggestion:` line per matched frame, for the design lead.

End with one question: "Start the <route> route?" Offer the next-stricter route as the alternative when confidence is medium or low.

## Reference files

- `references/screens.md`: read at step 3. The screen sources in order, how to search a team's Figma files, matching frames to map pages, confidence, and the Map suggestion line.
- `references/routes.md`: read at step 5. The five routes, the signals for each, how to break ties, confidence, and cross-team and Controlled work.
- `references/handoff.md`: read when the route is Designer. The Design lead lookup, the package's sections, and where to post it.

## Lessons logged

- **Oct 16, 2026 (new):** built to answer the Software Factory's open "Fix, Compose, or Extend" router step → one route per brief, set by its hardest screen, and every route starts from the screen as it ships.
