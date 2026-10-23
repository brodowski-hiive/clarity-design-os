---
name: "design-os-prototype-to-figma"
description: "Port a coded Clarity prototype into Figma as Alloy screens in auto layout, flow wired and version-stamped, for detailed review while code stays canonical; then audit and fix them. Use for \"put my prototype in Figma\", \"port this prototype to Figma\", \"turn my Claude or Codex prototype into Figma screens\", \"refresh the Figma copy of my prototype\". Not for: Figma to code (design-os-prototype), auditing a designer's frame (design-os-audit-design-system), or Alloy library audits (out of scope)."
---

# Design OS: prototype to Figma

A coded prototype gets a reaction, then the design work carries on in Figma. This skill brings the prototype back so the designer can keep going without redrawing it. The screens have to be ones a designer would have built by hand on Alloy: real instances, real styles, auto layout throughout. A screenshot pasted into a frame, or a pile of absolutely positioned rectangles, is no help to anyone.

The audit at the end is the proof. The skill builds the screens, then runs `design-os-audit-design-system` on its own output, adds the report card, and fixes what it can. Then it tidies the section, so the designer opens something that reads like a well-kept file rather than a dump of frames.

The code stays the source of truth. The Figma section is a dated working copy for the detailed work a live URL makes hard: pinned comments, markup, and exploring alternatives side by side. Discuss and explore in Figma; change in code. When the Figma work settles, it goes back into the prototype through `design-os-prototype`, and a fresh port replaces the old one. Two copies that both get edited drift apart, and then nobody knows which one is current.

## Rules

1. **Rebuild from code, never capture.** Build every screen from the prototype's Alloy imports. Don't use HTML-to-Figma capture (`html_to_figma`, `send_code_to_figma`): it produces raw frames and text that the audit would flag as hand-built.
2. **Alloy only, looked up live.** Scope every `search_design_system` call to the Alloy library key in `design-os-audit-design-system`'s `references/alloy-library.md`. Import components, variables, and styles by key. Never detach an instance, and never copy one in from another file.
3. **Auto layout everywhere.** Every frame that holds content uses auto layout, with gap and padding bound to `1. Primitives` spacing variables and children set to fill or hug. No absolute positioning, except for overlays that float on purpose (toasts, popovers).
4. **Styles and variables, not values.** Text uses `Responsive Type/*` styles and colors bind to `2. Clarity` variables. Never type a hex value, or a pixel value where a variable exists.
5. **Gaps are reported, not faked.** If Alloy has no Figma component for something the code builds, build it from auto layout, styles, and variables, name it `Custom / <what it is>`, and list it as a gap. Never draw a lookalike of an Alloy component.
6. **Confirm before writing.** No Figma writes until the designer has approved the plan (step 3). That one yes covers the build, the report cards, the in-place fixes, and tidying the new section. It doesn't cover marking an earlier port superseded (rule 7). Ask again before writing anywhere else.
7. **Only write inside the new section.** Never edit or move existing layers in the destination file. The tidy pass in step 7 stays inside the section too. The one exception is marking an earlier port of the same prototype as superseded, and only after the designer says yes (`references/build.md`, Re-porting).
8. **Code stays canonical; stamp every port.** Name the section and its port note with the source version and date, and save both on the section. Then anyone can tell what a comment refers to, and whether the code has moved on since.

Before the first `use_figma` call, load the Figma MCP server's `figma-use` guidance: the `figma-use` skill if your agent has it installed, otherwise the `skill://figma/figma-use/SKILL.md` resource.

## 1. Read the prototype

Read `references/reading-the-prototype.md`. In short:

- The source can be an ai-prototypes app, a local project, or a running URL. Get it running and open it in the browser.
- Record the source version: the short commit, with `+local` if there are uncommitted changes, or `url` for a running URL with no repo.
- List the screens: one per route or wizard step. Then list the states (empty, error, loading, filled) from state toggles and playground presets. Each state becomes its own frame.
- Screenshot every screen and state at 1440px wide, and at 390px too if the designer wants mobile. These are what the Figma frames get compared against.
- Read the layout of each screen from the DOM (direction, gap, padding, alignment, sizing) so auto layout matches the code rather than an eyeballed screenshot.
- Record the navigation: which control goes to which screen, and whether it opens an overlay.

## 2. Map code to Figma

For each Alloy import in the code, find the Figma component, using `references/reading-the-prototype.md`:

1. **Code Connect.** An Alloy Figma component whose mapping points at this import is a confirmed match.
2. **Name match.** Search for the component by its `COMPONENTS.md` name, scoped to Alloy. Read the Figma description before accepting it, because it often names a different component for this use (mobile dialogs are `Drawer / Mobile`).
3. **Props to variants.** Map the props the code sets (`variant`, `size`, `disabled`) to the Figma variant and property names. Note any prop with no matching variant.
4. **Custom code.** Anything the prototype's receipt lists as Custom, or that isn't an Alloy import, is an expected gap.

Map Tailwind token utilities to variables: semantic colors to `2. Clarity`, spacing and radius to `1. Primitives`, and text treatments to `Responsive Type/*` styles. Use exact matches only. Anything else goes on the plan as "closest".

## 3. Confirm the plan

Post one message, putting the rows that need attention first:

- **Destination:** which Figma file and page, and the section name (`<prototype name> · from code · <version> · <date>`). If the prototype's `prototype.json` has a `links.figma`, offer that file. Otherwise ask.
- **Earlier port:** if the page already has a port section from the same source, give its version and date and say how many commits the code has moved since. If nothing has changed, say so and ask whether a new port is still wanted. Otherwise say you'll offer to mark the old section superseded once the new one is built; that's a separate yes, asked after the build (`references/build.md`, Re-porting). Figma comments stay on the old frames, so ask the designer to resolve or carry over open ones first.
- **Screens:** each screen with its states and widths.
- **Component map:** code import → Alloy Figma component → how it matched (Code Connect, name match, or gap). Gaps and props without a matching variant go first.
- **Flow:** one line per link, for example `Review —[Place bid]→ Confirmation  (navigate)`.
- **What happens next:** "I'll build these, wire the links, audit each frame with an Alloy report card, fix findings directly in the new frames, and tidy the section so it reads in flow order. Nothing outside the new section changes."

Apply the designer's corrections, then build. If they say "just build it", use your best guesses and list each unconfirmed one under **Assumed** in the receipt.

## 4. Build

Follow `references/build.md`. In short:

1. Create the section with its port note at the top: source, version, date, and "Code is canonical: comment and explore here, change in code." Save the source, version, and date on the section. Then lay out frames one column per screen in flow order, with states stacked under their screen. Leave room on the right of each frame for its report card.
2. Build shared chrome (nav, header, step indicator) once as a local component and use it on every screen. List it as Custom only if it isn't an Alloy component.
3. Build one screen at a time, from the outside in: page frame, then layout containers, then Alloy instances, then text. Set content from the code's real data, not lorem ipsum.
4. Mark every frame you create with `setSharedPluginData("designos", "kind", "prototype-port")` so the audit knows it may fix the frame in place.
5. After each screen, screenshot it and compare it with the code screenshot. Fix a wrong match or layout before moving on. Never patch a difference with raw values.

## 5. Wire the flow

Add Figma prototype interactions for every link in the confirmed flow (`references/build.md`, Prototype links): on click, navigate to the target frame, or open it as an overlay for dialogs and drawers. Set the first screen as the flow's starting point and name the flow after the prototype.

## 6. Audit and fix

Follow `references/audit-handoff.md`. In short:

1. Run `design-os-audit-design-system` on each built frame. The plan approval covers adding the report cards, so don't ask again per frame.
2. Fix every finding with an exact match directly in the frame (in place, no `· Alloy fixes` copy). Mark findings that need a choice as Needs designer, and add gaps to the callout.
3. Re-run the audit once, so each card shows the final coverage and statuses.

## 7. Tidy the section

Builds drift: columns shift as frames grow, report cards crowd neighbours, and a designer arriving later can't tell where the flow starts. Tidy after the audit, because the report cards are part of the layout.

Where a subagent is available, run the `design-workspace-review` agent in tidy mode, scoped to the new section; otherwise follow `design-os-design-setup`'s `references/organize.md` yourself. Either way:

- Order columns by the wired flow from its starting point; states under their screen; mobile row under desktop.
- Make the port note the section header: keep its source, version and date, and add the flow's starting screen and links back to the app and its `prototype.json`.
- Add a small `→ <next screen> (<control>)` label between columns where the flow isn't obvious, and a `Needs designer` sticky beside each frame with open findings, listing their IDs.
- Check names (`<Screen>`, `<Screen> · <State>`, `· Mobile`), even gaps, and no report card overlapping a neighbour; resize the section to fit.
- Move nodes, never clone-and-delete, so the prototype links stay wired. Don't change anything inside a screen frame.

## After the Figma work

This skill never writes code. When the designer says the Figma work is done ("bring this back to code", "update the prototype from Figma"):

1. **Hand off to `design-os-prototype`, From Figma,** on the frames that changed. Point it at the app in the section's saved `source`, so it updates that app rather than starting a new one (its `references/from-figma.md`, From a ported section).
2. **Re-port once the code change is pushed,** so the Figma copy matches the code again. The new section gets the new version, and the old one is marked superseded (`references/build.md`, Re-porting).

To check a port's freshness ("is my Figma copy current?"), compare the section's saved version with the source's latest commit and list the commits since. Don't build anything.

## Receipt

End with:

- **Built:** the section link, plus screens and states with a link to each frame.
- **Source:** the app and version ported, any earlier section marked superseded, and one line: "Code is canonical. When the Figma work settles, say 'bring this back to code'."
- **Coverage:** Alloy coverage per frame after fixes, and the lowest one called out.
- **Needs designer:** the findings left open, with IDs and the choice to make.
- **Gaps:** what Alloy was missing, worded so it can be pasted into #support-alloy-design-system.
- **Flow:** links wired, and any that couldn't be wired.
- **Organized:** what the tidy pass moved, renamed or labelled.
- **Assumed:** guesses built without the designer confirming them.
- **Listing:** in ai-prototypes, offer to set `links.figma` in `prototype.json` to the new section's link, replacing a superseded one (`design-os-prototype`'s `references/listing.md`). Only write it on a yes.

## Reference files

- `references/reading-the-prototype.md`: read in steps 1 and 2. Running the source, recording its version, finding screens and states, reading layout from the DOM, and mapping imports and tokens to Figma.
- `references/build.md`: read before the first write, and before re-porting. Section layout and port note, auto layout rules, instances, text and color, naming, saved data, prototype links, and re-porting.
- `references/audit-handoff.md`: read before step 6. How to call the audit, what fixing in place changes, and the final re-run.
- `design-os-design-setup`'s `references/organize.md`: read before step 7. What good organisation looks like and what organizing never touches.

## Lessons logged

- **Oct 15, 2026 (first run, fund-offerings):** Main Nav instance failed on an unloaded font → load all Roobert weights before placing instances (`references/build.md`).
- **Oct 15, 2026 (first run):** Code built the nav from NavTabs, Avatar, and search, but Alloy has it whole as `Main Nav - Desktop` → check composite components first (`references/reading-the-prototype.md`).
- **Oct 15, 2026 (first run):** All three audit findings had no exact fix (no 60/68px spacing, 14px internal-only) → in-place fixing can rightly change nothing; report it plainly.
