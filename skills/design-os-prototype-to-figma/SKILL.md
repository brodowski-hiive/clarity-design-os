---
name: "design-os-prototype-to-figma"
description: "Port a coded Clarity prototype back into Figma as editable screens built from Alloy components, text styles, variables, and auto layout, with the flow wired, then audit and fix them with design-os-audit-design-system. Use for \"put my prototype in Figma\", \"port this prototype to Figma\", \"turn my Claude prototype into Figma screens\". Not for: Figma to code (design-os-prototype), auditing a designer's frame (design-os-audit-design-system), or Alloy library audits (alloy-figma-audit)."
---

# Design OS: prototype to Figma

A coded prototype gets a reaction, then the design work carries on in Figma. This skill brings the prototype back so the designer can keep going without redrawing it. The screens have to be ones a designer would have built by hand on Alloy: real instances, real styles, auto layout throughout. A screenshot pasted into a frame, or a pile of absolutely positioned rectangles, is no help to anyone.

The audit at the end is the proof. The skill builds the screens, then runs `design-os-audit-design-system` on its own output, adds the report card, and fixes what it can.

## Rules

1. **Rebuild from code, never capture.** Build every screen from the prototype's Alloy imports. Don't use HTML-to-Figma capture (`html_to_figma`, `send_code_to_figma`): it produces raw frames and text that the audit would flag as hand-built.
2. **Alloy only, looked up live.** Scope every `search_design_system` call to the Alloy library key in `design-os-audit-design-system`'s `references/alloy-library.md`. Import components, variables, and styles by key. Never detach an instance, and never copy one in from another file.
3. **Auto layout everywhere.** Every frame that holds content uses auto layout, with gap and padding bound to `1. Primitives` spacing variables and children set to fill or hug. No absolute positioning, except for overlays that float on purpose (toasts, popovers).
4. **Styles and variables, not values.** Text uses `Responsive Type/*` styles and colors bind to `2. Clarity` variables. Never type a hex value, or a pixel value where a variable exists.
5. **Gaps are reported, not faked.** If Alloy has no Figma component for something the code builds, build it from auto layout, styles, and variables, name it `Custom / <what it is>`, and list it as a gap. Never draw a lookalike of an Alloy component.
6. **Confirm before writing.** No Figma writes until the designer has approved the plan (step 3). That one yes covers the build, the report cards, and the in-place fixes. Ask again before writing anywhere else.
7. **Only write inside the new section.** Never edit or move existing layers in the destination file.

Load the `figma-use` skill before the first `use_figma` call.

## 1. Read the prototype

Read `references/reading-the-prototype.md`. In short:

- The source can be an ai-prototypes app, a local project, or a running URL. Get it running and open it in the browser.
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

- **Destination:** which Figma file and page, and the section name (`<prototype name> · from code · <date>`). If the prototype's `prototype.json` has a `links.figma`, offer that file. Otherwise ask.
- **Screens:** each screen with its states and widths.
- **Component map:** code import → Alloy Figma component → how it matched (Code Connect, name match, or gap). Gaps and props without a matching variant go first.
- **Flow:** one line per link, for example `Review —[Place bid]→ Confirmation  (navigate)`.
- **What happens next:** "I'll build these, wire the links, audit each frame with an Alloy report card, and fix findings directly in the new frames. Nothing outside the new section changes."

Apply the designer's corrections, then build. If they say "just build it", use your best guesses and list each unconfirmed one under **Assumed** in the receipt.

## 4. Build

Follow `references/build.md`. In short:

1. Create the section, then lay out frames one column per screen in flow order, with states stacked under their screen. Leave room on the right of each frame for its report card.
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

## Receipt

End with:

- **Built:** the section link, plus screens and states with a link to each frame.
- **Coverage:** Alloy coverage per frame after fixes, and the lowest one called out.
- **Needs designer:** the findings left open, with IDs and the choice to make.
- **Gaps:** what Alloy was missing, worded so it can be pasted into #support-alloy-design-system.
- **Flow:** links wired, and any that couldn't be wired.
- **Assumed:** guesses built without the designer confirming them.
- **Listing:** in ai-prototypes, offer to add the section link to `prototype.json` as `links.figma` (`design-os-prototype`'s `references/listing.md`). Only write it on a yes.

## Reference files

- `references/reading-the-prototype.md`: read in steps 1 and 2. Running the source, finding screens and states, reading layout from the DOM, and mapping imports and tokens to Figma.
- `references/build.md`: read before the first write. Section layout, auto layout rules, instances, text and color, naming, saved data, and prototype links.
- `references/audit-handoff.md`: read before step 6. How to call the audit, what fixing in place changes, and the final re-run.

## Lessons logged

- **Oct 15, 2026 (first run, fund-offerings):** Main Nav instance failed on an unloaded font → load all Roobert weights before placing instances (`references/build.md`).
- **Oct 15, 2026 (first run):** Code built the nav from NavTabs, Avatar, and search, but Alloy has it whole as `Main Nav - Desktop` → check composite components first (`references/reading-the-prototype.md`).
- **Oct 15, 2026 (first run):** All three audit findings had no exact fix (no 60/68px spacing, 14px internal-only) → in-place fixing can rightly change nothing; report it plainly.
