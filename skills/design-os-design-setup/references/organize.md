Organizing a Figma working area so a designer can find their way around it. Shared: `design-os-design-setup` uses it after the workspace review (brief mode), and `design-os-prototype-to-figma` uses it on a freshly ported section (tidy mode). The `design-workspace-review` agent runs it where subagents are available; otherwise follow it yourself.

The goal is a page that reads like a well-kept designer's file: things in the order you'd work through them, named for what they are, with enough labels that someone new knows where to start.

## Scope

Organize only inside the agreed scope, because anything outside it may be someone else's work:

- **Setup (brief mode):** the WIP page you built. Never the team's original pages.
- **Prototype to Figma (tidy mode):** the new `· from code ·` section. Never existing layers elsewhere on the page.
- **Anything else:** the page or section the person names.

## What good organisation looks like

- **Order follows the work.** Left to right, then top to bottom, in the order a person moves through the product: the flow for a journey, or entry point → detail → result for a surface. States sit under the screen they belong to.
- **One home per thing.** Every frame is in exactly one group. Nothing floats loose on the canvas.
- **Groups are sections, named for what they hold.** `<n> · <journey or surface>` in setup; `<Screen>` columns under one section in a port. Old milestone names are kept only as a "from: Milestone 2" note.
- **Names say what a frame is.** `<Screen> · <State>` for screens; `<ID> · <screen · state>` for boards; no `Frame 4961`, no `Copy of`.
- **Labels where a newcomer needs them.** A header on each section (what it is, its source, a link back), a Start here or section header on the page, and flow arrows or "→ next" labels where the order isn't obvious. In a port, the port note is the section header: add to it (starting screen, links back), never a second header beside it.
- **Even rhythm.** Consistent gaps between groups and between frames; report cards and stickies don't overlap their neighbours; sections are resized to fit their contents.
- **Leftovers parked, not deleted.** Anything that doesn't fit goes to a final `Parking lot` section with a note on why.

## How to do it

1. **Read the scope** read-only: sections, top-level frames, their names, positions and sizes, and (in a port) the prototype flow's starting point and reactions. Keep returns small.
2. **Compare with good.** List what's out of order, unnamed, loose, overlapping, unlabeled or in two places.
3. **Propose one plan:** the new group list in order (before and after as two short lists), renames, labels to add, and what goes to the parking lot. Say what won't change.
4. **Get a yes, then apply it.** In setup, ask the person. In prototype to Figma, the plan approval in step 3 already covers tidying inside the new section, so apply without asking again, and list the changes in the receipt.
5. **Apply in small steps,** checking with a screenshot after each: move and reorder frames and sections; rename; add section headers and flow labels; fix spacing; resize sections; restack sections with even gaps.
6. **Report** what moved, what was renamed, what was added, and what went to the parking lot, with links.

## What you never do while organizing

- **Change what a frame contains:** no edits to instances, text, styles or layout inside a screen. Organizing is arrangement, labels and names only.
- **Clone-and-delete to move something.** Move the node itself, so prototype links, comments and links from Linear or Notion keep pointing at it.
- **Delete.** Park instead.
- **Rename components or frames other files link to** without saying so: list them, because their names may be referenced elsewhere.
- **Work outside the scope above.**
