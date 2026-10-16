---
name: "design-os-design-impact"
description: "Read a brief, Linear item, or idea, find the Clarity screens it affects, call each Fix, Compose, or Extend, and recommend one design route (none, coded wires or hi-fi, Figma, or a designer), then hand off to setup on a yes. Use for \"what screens does this touch\", \"how should we design this\", \"design impact of TRA-123\", \"does this need a designer\". Not for: setting up the workspace (design-os-design-setup), system map placement (design-os-system-map), or lane and risk (pm-os-triage-lane)."
---

# Design OS: design impact

Before anyone designs, two things decide whether the work goes well: knowing which screens it really changes, and picking the right way to design it. This skill reads the work, finds each affected screen as it ships today, says how big each change is, and recommends one route. On one yes it hands the readout to `design-os-design-setup`, which builds the workspace.

Good looks like: a brief goes in; a short table of real screens with their sources, one route with reasons, and a single question come out.

## Rules

1. **Start from what ships.** Every route begins with the current screen, found from a real source and cited. A layout from memory presented as the current one misleads everyone downstream, so if you can't find a screen, say so.
2. **Look at the whole file before saying "not found".** Linked frames are a fraction of what a team's file holds, and linked node IDs go stale. List the owning team's file pages before concluding a screen or earlier design doesn't exist (`references/screens.md`).
3. **One route for the whole brief, set by its hardest screen.** Splitting routes per screen scatters the work across people and tools. Any Extend screen sends the whole brief to a designer, even if the rest is Compose.
4. **Read, never write.** This skill assesses. Building, writing handoffs and touching Figma files belong to `design-os-design-setup`, after a yes.
5. **People come from the directory, fresh.** The owning team's Design lead is looked up in the Product Team Directory through `pm-os-clarity-context` People lookup on every run, never from memory or an earlier chat, because roles move.

## Where you are

- **Figma MCP server available:** read the System Map and the owning team's Figma files for current screens.
- **No Figma MCP server:** use the other screen sources (`references/screens.md`), mark Figma sources "not checked", and lower confidence.
- **No shell (for example the `design-impact` agent):** give the readout and the route only, and name the next step and who runs it.

## Steps

1. **Get the work into one line:** who does what, where.
   - A brief (Notion): fetch it, note its Doc Stage and last-edited date.
   - A Linear issue or project: fetch it and follow its Resources to the brief.
   - An idea: restate it in one line and confirm it.
   - Then read the Design Spec (`Design Spec: <Feature>`, from the brief's Resources) and the initiative record (`pm-os-initiative-record`) if they exist. Newer decisions in the record win over the brief.
2. **Place it.** Run `design-os-system-map` if it's installed (it's org-managed, so check first) and ask for the readout without a FigJam unless the person wants one. If it isn't installed, read `pm-os-clarity-context` `infra/client-app-map` and the System Map Figma file (`HwRkyV2rsMJUKeItVdiSoG`) yourself. Keep: the affected pages and items, what's new versus not on the map, owning teams, whether it's cross-team, and confidence.
3. **Find the current screen for each page,** and any earlier design of this feature, by `references/screens.md`. Record the source and confidence for each. End with a `Map suggestion: link <page> card to <frame>` line for the design lead for each frame you matched.
4. **Classify each screen** in these words:
   - **Fix:** no visible change.
   - **Compose:** existing Alloy components and patterns.
   - **Extend:** a new pattern, an Alloy gap, a new section, or a non-web channel.
5. **Recommend one route** with reasons and confidence (`references/routes.md`): No design, Coded wires, Coded hi-fi, Figma, or Designer.
6. **Show the readout** (Output, below) and ask for one yes.
7. **On yes, hand off.**
   - No design: offer `pm-os-ticket-brief` with the affected screens and the Fix rows as its evidence.
   - Any other route: run `design-os-design-setup` with the readout and the route. Pass the readout as-is; it's setup's input.

## Output

The readout, in this order:

- **Work:** the one line, with the source (brief link and Doc Stage, Linear link, or "idea").
- **Affected screens:**

  | Page | Owner | Change | Path | Current reference (source, confidence) |
  |---|---|---|---|---|
  | Company page | <owning team> | Compose: add a floor price row under market depth | Dashboard → Company page | Frame link (team Figma, ready for dev; high) |

  Owners are teams, inferred ones marked. Cross-team changes say "needs <team> sign-off".
- **Earlier design work:** any prior design of this feature found in step 3 (file, page or section, status: shipped, ready for dev, exploration, superseded), or "None found" with what you checked.
- **New to the map:** new pages or items, or "Nothing new". Separately, anything that ships but isn't on the map.
- **Route:** the one route, why (the screens and signals that decided it), and confidence. If a stricter route was close, name it and what would tip it.
- **Open questions:** the brief's open items that change the design.
- **What happens next:** what a yes starts (`design-os-design-setup` builds the workspace for this route), and who picks it up.
- **Map suggestions:** one `Map suggestion:` line per matched frame, for the design lead.

End with one question: "Start the <route> route?" Offer the next-stricter route as the alternative when confidence is medium or low.

## Reference files

- `references/screens.md`: read at step 3. The screen sources in order, reading a team's whole Figma file, matching frames to map pages, earlier design work, confidence, and the Map suggestion line.
- `references/routes.md`: read at step 5. The five routes, the signals for each, how to break ties, confidence, and cross-team and Controlled work.

## Lessons logged

- **Oct 16, 2026 (iteration 1):** a run reported "no reference" for screens a whole earlier milestone in the team's file already covered, because it only opened Linear-linked frames → list the file's pages first; report earlier design work in the readout.
- **Oct 16, 2026 (iteration 1):** the Start section grew into workspace building (Figma pages, paste-ins, handoffs) → moved to `design-os-design-setup`; this skill only assesses and hands off.
- **Oct 16, 2026 (new):** built to answer the Software Factory's open "Fix, Compose, or Extend" router step → one route per brief, set by its hardest screen, and every route starts from the screen as it ships.
