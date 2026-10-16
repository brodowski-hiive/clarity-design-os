How to build the ported screens in Figma. Read before the first write, and before a re-port. Library keys, importing by key, and the variable collections are in `design-os-audit-design-system`'s `references/alloy-library.md`; read that too.

## Section and frame layout

- Create one Section on the destination page, named `<prototype name> · from code · <version> · <YYYY-MM-DD>` (`Sell order · from code · a1b2c3d · 2026-10-16`). The version comes from `references/reading-the-prototype.md`, Record the version. Place the section to the right of everything already on the page, with a 400px gap. Never move existing layers.
- Put the port note at the section's top left, above the first column (Port note, below).
- One column per screen, left to right in flow order. Columns are 640px apart, so each frame's report card (480px wide, 80px to its right) fits without overlapping the next column.
- States stack under their screen, 120px apart, in this order: Default, then the rest as in the plan.
- With mobile too, put a second row of columns for 390px frames under the desktop row, 240px below the tallest desktop column.
- Frame names: `<Screen>` for the default state and `<Screen> · <State>` for the rest (`Review · Error`). Mobile frames end in `· Mobile`.
- Frames are 1440px (or 390px) wide with hug height, so they grow with content like the page does.

## Port note

A small note so anyone opening the file knows what this section is and how old it is, without asking.

- Use Alloy's inline alert or banner component if the library has one that fits. Otherwise build a vertical auto layout frame named `Custom / Port note`, with `Responsive Type/*` text and `2. Clarity` colors. It's tooling, not product UI, so don't list it as a gap.
- Its text:
  > **Ported from code.** `<source>` @ `<version>`, `<YYYY-MM-DD>`.
  > Code is canonical: comment and explore here, then bring changes back to code with `design-os-prototype` and re-port.
- When the section is superseded, its first line becomes **Superseded** by `<new section name>`, linked to the new section.

## Auto layout rules

- Every frame that holds content is auto layout, set from the DOM values you read (`references/reading-the-prototype.md`).
- Bind item spacing and padding to `1. Primitives` spacing variables, and corner radius to radius variables. If a computed value has no exact variable, use the closest, note it, and the audit will flag it.
- Set sizing explicitly on every child: fill, hug, or fixed. Defaults are often wrong after you insert an instance.
- Set Alloy instances inside auto layout to fill or hug as the code renders them (a full-width `Button` fills).
- Use absolute position only for overlays that float on purpose. Dialogs and drawers go in an overlay frame above a dimmed copy of the screen, using Alloy's own overlay component if it has one.
- Don't wrap a single child in an extra frame unless it carries padding, fill, or a stroke in the code.

## Fonts first

Load every Roobert weight you might meet (`Roobert` and `Roobert SemiMono`, Regular, Medium, SemiBold, Bold) at the start of each `use_figma` call that places instances. Appending an Alloy instance whose text uses an unloaded font fails the whole call ("unloaded font"), and `Main Nav - Desktop` uses Medium.

## Instances

- Import by key (`importComponentSetByKeyAsync` or `importComponentByKeyAsync`), create an instance of the right variant, and set properties with `setProperties`. Never detach.
- Set text through the component's text properties where it has them, not by editing the nested text layer.
- Use the component's slots for content (for example Card `Variant=Slot`, with your content moved into the `SLOT` node).
- Hide optional parts the code doesn't render, using the component's boolean properties.
- Skip internal components whose names start with `_`. Place the parent.

## Text and color

- Apply a `Responsive Type/*` text style to every text layer you create. Load the font (Roobert or Roobert SemiMono) before setting characters.
- Bind every fill and stroke you create to a `2. Clarity` variable. Text fills use `colors/text/*`.
- Use the code's real content: names, numbers, and dates as rendered. Long text stays long, because the designer needs to see truncation.
- The Clarity wordmark comes from the 🤖 Alloy - Assets library if it's published there. Otherwise, import `design-os-prototype`'s `assets/clarity-logo.svg` as a vector and bind its fill to a text color variable.

## Images and logos

- `createImageAsync` isn't supported in `use_figma`, so PNG and JPG assets can't be placed. Use Alloy `Image Placeholder` at the asset's size and list it in the gaps.
- SVGs can be imported with `figma.createNodeFromSvg(svgString)`. Strip whitespace, comments, and `id` / `style` attributes first. Never round the numbers in path data: compact paths like `.0741.0741` break. Drop `clip-path="url(#…)"` references once the `id`s are gone. Logos and illustrations are content, not UI: leave their fills as they are.
- SVGs over about 5 KB cost a lot to pass inline; use an Image Placeholder and say so.
- Make each logo a local component (`Custom / Logo / <name>`) and expose it on the row component as an instance-swap property, so the designer can swap logos from the instance panel.

## Custom parts

For anything Alloy doesn't have, build it from auto layout, text styles, and variables, and name the top layer `Custom / <what it is>`. If it repeats, make it a local component once. Never draw something that looks like an Alloy component: if Alloy has one and the variant is wrong, use the closest variant and note the gap.

## Naming

Name layers for their role (`Header`, `Bid form`, `Price row`, `Title`), never `Frame 12` or by how they look. Keep names close to the code's component names so engineers can match them.

## Saved data

Mark everything you create so the audit and later runs can find it:

| Node | Key | Value |
|---|---|---|
| Section | `kind` | `prototype-port-section` |
| Section | `source` | the prototype's app name, path, or URL |
| Section | `sourceVersion` | the short commit (with `+local` if uncommitted), or `url` |
| Section | `portedAt` | the date, `YYYY-MM-DD` |
| Section | `status` | `current`, or `superseded` after a re-port |
| Port note | `kind` | `prototype-port-note` |
| Each screen frame | `kind` | `prototype-port`, or `prototype-port-superseded` after a re-port |
| Each screen frame | `route` | the route or step, plus the state (`/review?state=error`) |

Use `setSharedPluginData("designos", key, value)`; `setPluginData` isn't supported in `use_figma`.

## Section size

Sections don't grow with their contents. After the last write (including the report cards), resize the section to fit everything with `resizeWithoutConstraints`.

## Working in batches

Build one screen per `use_figma` call or a few, never the whole prototype at once. After each screen, take a `get_screenshot` and compare it with the code screenshot: structure, order, spacing, and which components are used. Fix a wrong match or a wrong layout value at the source before moving on. Expect small differences in font rendering; don't chase them.

Figma rate-limits large reads and writes. If you're limited, say which screens are done and continue on the designer's go.

## Prototype links

After all screens are built:

- For each link in the confirmed flow, find the source control in the frame (the instance or layer you built for it) and add a reaction: trigger `ON_CLICK`, action `NAVIGATE` to the target frame. Dialogs and drawers use `OVERLAY` with a centered or right-edge position; "Back" and "Cancel" use `BACK`.
- Link from the instance itself, not a layer inside it.
- Set a flow starting point on the first screen's default frame, named after the prototype.
- States aren't linked unless the code navigates between them (a submit that leads to an error state). Note links you couldn't wire, and why, for the receipt.

## Re-porting

A re-port builds a new section from the current code. It never updates the old frames in place, because the old ones may carry comments and the designer's exploration.

1. **Find earlier ports.** On the destination page, look for sections with `kind` = `prototype-port-section` and the same `source`. Read each one's `sourceVersion` and `portedAt`.
2. **Say how far the code has moved.** In a repo, list the commits since the port: `git log --oneline <sourceVersion>..HEAD -- <app path>`. For a `+local` version, drop the suffix, list commits since that base commit, and say the old port also showed uncommitted work. A `url` version can't be compared, so say that and compare screenshots instead. If nothing changed, tell the designer and ask whether a new port is still wanted.
3. **Comments first.** Figma comments stay pinned to the old frames, and you can't move them with the Figma MCP server. Before superseding, ask the designer to resolve open comments or carry them over by hand.
4. **Build the new section** as usual, to the right of the old one.
5. **Mark the old section superseded,** only after the designer says yes:
   - Rename it to `<old name> · superseded`, set `status` = `superseded`, and update its port note to link to the new section.
   - Set each of its frames' `kind` to `prototype-port-superseded`. The audit only fixes frames marked `prototype-port` in place, so this stops later fixes from landing on an old copy.
   - Don't delete or move it. The designer archives it when they're ready.
6. **Update the listing:** offer to point `links.figma` in `prototype.json` at the new section.
