Building a prototype at wires fidelity: a greyscale wireframe look on real Alloy components. Read when someone asks for wires, a wireframe, mid-fi, or a greyscale prototype, or when `design-os-design-impact` routes here with "wires fidelity".

## When wires fit

Wires answer flow and interaction questions: what's on each screen, what order things happen in, what people can do. Color, imagery and polish would pull the reaction toward visual detail that isn't decided yet. Typical moments:

- An early concept, before anyone has picked a visual direction.
- A scope review with a brief only, where the question is "is this the right flow?" rather than "is this the right design?".
- A flow with several branches, where people need to walk it, not judge it.

If the question is about layout or visual direction, wires are the wrong tool: build hi-fi, or hand off to Figma.

## What stays and what changes

- **Stays:** real Alloy components, imports, spacing, type, and every rule in the self-check except the raw-color one for `wires.css`. A wire built from Alloy shows engineering the same cost as a hi-fi one, and switching to hi-fi later is one attribute.
- **Changes:** every Alloy color goes grey (`assets/wires/wires.css` redefines Alloy's `--ds-*` variables). Images, video, canvas, iframes and Recharts charts render as flat grey blocks. A fixed "Wireframe" label sits bottom-left so a screenshot can't be mistaken for the final design.

## Install

1. Copy `assets/wires/wires.css` into the app at `src/wires/wires.css`, unchanged. If it already exists, compare and update to the skill's version.
2. Import it from `src/styles.css` after the Alloy imports, with no `layer()`: `@import "./wires/wires.css";`. It has to stay unlayered to win over Alloy's `@layer base` theme.
3. Add `data-fidelity="wires"` to `<html>` in the worker's SSR shell, next to `data-theme="clarity"`.
4. Mark any other visual that should be a placeholder (an SVG chart, an illustration) with `data-wire="placeholder"`. Icons and the Clarity wordmark stay as they are.
5. Check in the browser: the page is grey, the label shows, placeholders are flat blocks, and nothing is invisible (white text on a white fill means a variable was missed; report it).

To go hi-fi later, remove the attribute. Keep the file, so the same app can show both.

## Scope

- **Build the happy path,** plus only the states the question needs (an error the flow branches on, an empty state people land in). Everything else waits for hi-fi.
- **No playground unless asked.** Wires are walked, not stress-tested. If the person asks for one, follow `references/playground.md` as usual.
- **Copy is still real copy,** marked draft where the brief doesn't give it. Lorem ipsum makes a wire harder to judge, not easier.

## Receipt

Add `Fidelity: wires` to the Alloy receipt, with the states built and the ones left for hi-fi. Under Custom, list `src/wires/wires.css` as the wire layer (not a gap).
