Playground styles: the looks the playground panel comes in, how to install one, and how to add a new one. Read when the designer names a style, asks for a different-looking playground, or wants to save their own panel as a style.

## What a style is

A style is only the panel's look: a `panel.tsx` and a `playground.css`. Every style runs on the same `engine.ts` and `provider.tsx`, so it reads the same `config.ts`, keeps settings in the URL, and has presets, locks, Copy link, Reset, `?playground=off` and the ~ key. Switching styles never touches the prototype's config or components.

## Styles

| Style | Files | Look | Extra install |
|---|---|---|---|
| Default | `assets/playground/panel.tsx`, `assets/playground/playground.css` | Onyx, monospace dev-tool window in Clarity colors | None |
| dopetycoon | `assets/playground/styles/dopetycoon/` | Retro pixel "Playground.exe" window: pastel option groups on a grid, pixel fonts, draggable, resizable from any edge or corner, maximize, option groups flow into columns when the window is wide | `@fontsource/press-start-2p` and `@fontsource/vt323` |

Use Default unless the designer names another style or asks for a different look. If they ask what's available, show this table.

## Install a style

1. Follow the install in `references/playground.md`, with one change to step 1: copy `engine.ts` and `provider.tsx` from `assets/playground/`, then `panel.tsx` and `playground.css` from the style's folder. Copy them unchanged.
2. Add the style's extra packages, if any, to the prototype (in ai-prototypes: `pnpm --filter "./apps/<name>" add <packages>` from the repo root).
3. Verify as usual, plus anything the style adds (for dopetycoon: drag an edge, maximize and restore).

To switch an existing prototype to another style, replace only `src/playground/panel.tsx` and `src/playground/playground.css`.

## Add a style

When a designer wants their own look ("a playground like dopetycoon, but…", "save my panel as a style"):

1. **Name it.** Short, lowercase, hyphenated. Create `assets/playground/styles/<name>/`.
2. **Start from a style** (usually Default or dopetycoon): copy its `panel.tsx` and `playground.css`, then change the look. To save a panel the designer already built in a prototype, start from that prototype's files.
3. **Keep the contract**, so any prototype can switch to it:
   - `panel.tsx` exports `PlaygroundPanel` with no props and reads everything through `usePlaygroundState()` from `./provider`.
   - It renders all three option types (choice, toggle, range), presets, lock notes, Copy link with its "Link copied" message, and Reset; it handles the ~ key; it stays out of the way of `?playground=off` (the provider handles that).
   - All CSS is scoped under one class and sits above the page (`position: fixed`, a very high `z-index`). No Alloy components or classes: the panel must never look like part of the design.
   - The window keeps a fixed height, so it doesn't jump as notes appear (see Lessons logged in `SKILL.md`).
   - The header comment says it's copied verbatim by `design-os-prototype` and names the style.
4. **Test it** in a prototype with the example config (`assets/playground/config.example.ts`): every control changes the settings, presets apply, Copy link and Reset work, ~ opens and closes, and the console is clean.
5. **List it** in the Styles table above, with any extra packages.
