Building a Figma working area. Read at step 2 (finding prior work) and step 4 (building). Load the Figma `figma-use` guidance before any `use_figma` call.

## What the Figma MCP server can and can't do

Knowing the limits up front saves a dead end mid-build.

- **Can:** read any file you have access to; create a blank file; create pages, sections and frames; clone nodes within one file; add text with hyperlinks.
- **Can't:** duplicate a file, or copy frames from one file into another. A browser may not help either: figma.com can be blocked by org policy. Plan for cross-file assets to arrive by paste-in.
- **No stickies in design files.** FigJam stickies aren't available in design mode, so use frames styled as stickies (below).
- **`get_metadata` with no node ID** may list only the first page. To see every page and section, run a read-only `use_figma` script that walks `figma.root.children` with `setCurrentPageAsync`, and return names and IDs only.
- **Return values are capped (about 20 KB).** Return names, IDs and sizes, trimmed; never whole trees. A script that errors makes no changes, so fix and rerun.
- **Linked node IDs go stale.** A Linear embed's node may be deleted or moved. When it 404s, list the file's pages and find the frame by name.

## Where to work

Ask once, offering these in order:

1. **A new page in the team file that holds the prior work.** Best, because cloning within one file brings the real frames, components and all. It changes the team's file, so get the person's yes, put the page right after the cover, name it `<flag/emoji> <feature> · <year> (Clarity) — WIP`, and add a line to Start here: who added it, when, why, and that the team's Design lead should confirm.
2. **The person's duplicate of that file.** Same result, zero change to the team's file, one click from them: file name → Duplicate, then paste the link. You can't do the duplicate yourself.
3. **A new file in the person's drafts.** Only when there's no prior work, or neither of the above is acceptable. Everything from other files becomes paste-ins.

## Finding prior work

For each affected page in the readout:

1. Start from the readout's current references and the owning team's Figma space (`pm-os-clarity-context` team file → Figma). Also check files named after the feature, and the Design team's Linear projects for the feature (their issues often link the working file).
2. In each candidate file, list pages and top-level sections read-only. Page and section names usually say the milestone, audience and status ("Milestone 2: existing customers", "Graveyard", "Final", a green dot).
3. Screenshot the candidate sections at low resolution to see what's in them before cloning.
4. Rate each: **shipped** (matches what's live), **ready for dev**, **exploration**, **superseded** (built for a flow the brief has since dropped: say what changed), **graveyard**. Superseded work is still the best starting point when it covers the same screens; the notes say what to drop.
5. Note which other files hold the current styling (for example a reskin file); those become paste-ins.

## The page layout

Top to bottom:

1. **👋 Start here** (a section with one wide frame): title; one paragraph on what the page is; links to the brief, the handoff page, the Linear item, the System Map card; **What changed since this file was designed** (bullets); **Groups on this page** (numbered, with board IDs); **Open questions** (the top five, full list in the handoff); **Still to paste in by hand** (each with its link); the who-added-this line.
2. **One section per group**, stacked with generous gaps, named `<n> · <what the group is about>`.

Inside each group section, left to right:

- **Notes + links frame** (wide, white): group title; Boards to design (IDs and names); Keep; Change; Drop; Owner / sign-off ("needs <team> sign-off" for other teams' screens); Links (ticket, brief section, map card, source frames).
- **Copied prior frames**, cloned from their original pages, in flow order.
- **Stickies** in a row under each copied frame (below).
- **NEW · design here →** label, then empty boards in a 2-column grid. Board name `<ID> · <screen · state>`; dashed outline; blue for must-do, purple and "(maybe)" for Maybes. Size to the target: 1440×900 desktop, 390×844 mobile, 600 wide for email; scale the board up if the copied sections around it are huge, so it doesn't vanish when zoomed out.
- **Paste-ins and same-file references** below the NEW boards (below).

Scale text to the canvas. Copied milestone sections can be 10,000+ px wide, so notes and stickies need 30–40 px type or they're unreadable at the zoom a designer uses to navigate.

## Stickies

Frames styled as stickies, about 1100 wide, 40 px type, a bold kind label on top, a soft shadow. Put them under the frame they're about, so the note sits next to the screen. Kinds and colours:

- **KEEP** (green): what carries over unchanged.
- **CHANGE** (yellow): what the brief changes, with the board ID it feeds (→ D3).
- **DROP** (red): what the brief removed (a deadline, a mandatory page).
- **CHECK** (yellow): something to verify against a source (a permutations sheet, copy with Compliance).
- **MAYBE** (purple): might be needed; says what decides it.
- **OPEN QUESTION** (blue): a design question the brief leaves open, with who answers it.

Write them from the readout's Change column, the brief's decisions and open questions, and what you saw in the copied frames. Keep each to two or three lines.

## Paste-ins

For every asset that lives in another file (current Clarity styling, another team's screen), or that has no frame at all, put an orange dashed frame where it's needed, roughly the asset's size:

- Title: `📋 PASTE IN · <what>`.
- Why it's needed and which board it informs.
- The steps: open the link → select the frame → Copy → come back, select this frame → Paste → delete the placeholder.
- The link. For another team's screen with no frame found, link the System Map card and say "ask the <team> Design lead".

Before making a paste-in, check whether the asset is in the same file (a shipped banner on another page, say). If it is, clone it instead and label it ("Shipped today — copied from this file").

## Build order

Small steps, each verified with a screenshot:

1. Create the page and clone every prior section onto it (return clone IDs).
2. Build Start here, then each group: section, notes frame, move clones in, NEW boards.
3. Add stickies and paste-ins; clone same-file references.
4. Resize every section to fit its children and restack them with even gaps.
5. Screenshot Start here and two groups; fix clipped text or overlaps.
6. If you also made a scratch file earlier, mark it superseded with a link to the working page.
