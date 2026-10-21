---
name: "design-os-prototype"
description: "Build coded Clarity prototypes from Alloy components, from a brief or Design Spec or by porting Figma screens, add a playground, keep the ai-prototypes listing current, and check it's on-system. Use for \"build a prototype\", \"prototype this brief\", \"make this Figma page clickable\", \"add a playground\", \"share my prototype\". Not for: Figma audits (design-os-audit-design-system), prototype to Figma (design-os-prototype-to-figma), or changing Alloy (packages/alloy AGENTS.md)."
---

# Design OS: prototype

A prototype exists to get a reaction. Two things make that reaction worth having:

- **It looks and behaves like Clarity,** so people react to the idea and not to off-brand UI. That's why it's built from the same Alloy components Clarity ships, looked up live, and checked before handing it over.
- **People can find it again next week,** so it can't live only as a Slack link. That's why every prototype lives in ai-prototypes, where the Clarity Design directory lists it, with a short listing that fills its card.

## Rules

1. **Alloy components only.** UI comes from `@hiivemarkets/alloy` subpath imports. Not `@hiivemarkets/ui` (the retired pre-Alloy package, still in the ai-prototypes scaffold), not shadcn, not raw Radix, not hand-built controls.
2. **Look it up in the installed package, every time.** Read `COMPONENTS.md` and `TOKENS.md` from the installed `@hiivemarkets/alloy` (`node_modules/@hiivemarkets/alloy/dist/design/`) before writing UI. They match the exact version in use; memory and older skills don't.
3. **Tokens, not values.** Colors, borders, text treatment, and focus come from Alloy semantic utilities in `TOKENS.md`. No hex, `rgb()`, or arbitrary color classes.
4. **Gaps are reported, not hidden.** If Alloy lacks a component, variant, or token, say so before building anything custom, keep the custom part token-based, and list it in the receipt.
5. **New prototypes go in ai-prototypes, with a current `prototype.json`.** The directory lists every app in the repo's `apps/` on `main`, and nothing else by default. Write the listing and keep it accurate without being asked (`references/listing.md`).

## Where you are

- **ai-prototypes:** its agent instructions file (`AGENTS.md`, or `CLAUDE.md` where that's what it has) governs running commands, scaffolding, and PRs; follow it. New apps come from `mise run new`; older apps may still need the swap to Alloy (`references/setup.md`). Keep the listing current (`references/listing.md`).
- **frontend monorepo:** production work belongs to that repo's own `design-system` skill and `packages/alloy/AGENTS.md`. Hand off to them.
- **Anywhere else, new prototype:** build it in ai-prototypes so it reaches the directory. Use the person's clone, or clone `hiivemarkets/ai-prototypes` if they have none, then follow the repo's instructions. If they can't use the repo, or want a throwaway file, build where they are and say it won't appear in the directory until it's moved in.
- **Anywhere else, existing work:** offer to move it into ai-prototypes (`references/listing.md`, Prototype built outside the repo). Otherwise install `@hiivemarkets/alloy` and set it up (`references/setup.md`). For a plain HTML file with no build step, use the Alloy CSS and the plain-HTML examples in `TOKENS.md`, and note in the receipt that components are approximated.

## Brand

- **Name:** write Clarity, not Hiive, in titles, copy, and the page `<title>`. Keep Hiive only where `pm-os-clarity-context` Clarity naming allows, or where it's the real name of an existing thing.
- **Logo:** Alloy doesn't ship one. Use `assets/clarity-logo.svg`, the wordmark from the production nav. It uses `currentColor`, so color it with a text token. It's 86px wide in nav (`w-21.5`). Don't redraw, stretch, or recolor it with a raw value.
- **Dark mode:** Alloy's Clarity theme has none. Say so and report it as a gap. If the designer still wants it, build a layer that redefines Alloy's own `--ds-*` variables under `data-mode="dark"`, from Alloy primitives, and list it as Custom.

## Build

1. **Set up.** In ai-prototypes, check `apps/` for an existing app first, then `mise run new <name>` (or swap an older app to Alloy, `references/setup.md`), and fill in `prototype.json` from what was asked for.
2. **Pick components.** Open `COMPONENTS.md` at the Quick Decision Guide, choose a component for each piece of UI, and read its entry (import, gotchas, example).
3. **Build.**
   - Page padding, width, and right rails come from `PageContainer`, `PageSection`, and `CenteredPageSection`.
   - Numbers use the dedicated inputs (`MoneyInput`, `SharesInput`, `PercentInput`, `DecimalInput`, `NumericInput`).
   - Icons are one import per icon from `@hiivemarkets/alloy-icons/<icon-slug>`.
4. **If there's a source,** plan from it before writing UI:
   - A Figma frame, section, or page: run **From Figma** (below) and build from the component map and flow map the designer confirmed.
   - A brief or Design Spec: run **From a brief** (below) and build from the plan the person confirmed.
5. **Self-check.** Run `references/self-check.md` and fix what it finds.
6. **Render it and look:** page loads, zero console errors, Alloy styles visibly applied.
7. **Share (ai-prototypes).** Update `prototype.json` to match what was built (`in-review`, plus any Figma, brief or Linear link), offer a directory screenshot, then open the PR per the repo's agent instructions file. Give the person the PR link and a one-line listing preview to correct, and say it appears in the directory once the PR merges.

Prototype-only extras (animations, demo controls) are fine. Keep them in their own clearly named files and list them as Custom.

## Fidelity

Prototypes are hi-fi by default. Build at **wires** fidelity when the question is about flow or interaction rather than visual design (an early concept, or a scope review with a brief only), or when asked for wires, a wireframe, or mid-fi. Follow `references/wires.md`:

1. Copy `assets/wires/wires.css` into the app unchanged and set `data-fidelity="wires"` on `<html>`. It turns Alloy grey by redefining its own variables, so the components stay real.
2. Build the happy path plus only the states the question needs. No playground unless asked.

## From Figma

When the source is a Figma frame, section, or page, follow `references/from-figma.md`. In short:

1. **Match components** in this order: Code Connect mapping, then a linked Alloy instance, then a proposed Alloy swap for anything hand-built (with reason and confidence), then a gap. Build custom only for gaps.
2. **Map the flow** when there are several screens.
   - Use wired prototype links as-is; infer the rest from arrows, frame names, button labels, and reading order.
   - Group near-duplicate frames as states of one screen, and pull repeated chrome into one shared layout.
3. **Confirm in chat** before building: the component map and flow map, uncertain rows first. The designer corrects in plain language.
4. **Build and compare:** every link works, and each screen is checked against its Figma screenshot.
5. **From a ported section** (frames made by `design-os-prototype-to-figma`): update the app in the section's `source` rather than starting a new one, change only what the designer changed, then offer a re-port.

Read-only on Figma. If the designer wants their file fixed, hand off to `design-os-audit-design-system`.

## From a brief

When the source is a Product Brief, with or without a Design Spec, follow `references/from-brief.md`. In short:

1. **Gather the brief,** the Design Spec if one exists, and the initiative record. Revise an existing prototype rather than starting a rival one.
2. **Name the question** the prototype answers. If there isn't one, say the work needs more brief first.
3. **Start from the screen as it ships today.** Key interactions stay where they are.
4. **Plan it:** screens and flow per persona, states from the scenario matrix (or derived from the brief and marked so), Alloy components, and the spec's worked example as the data. Anything neither document settles goes under Assumed.
5. **Confirm the plan,** then build. Check that every Must-demonstrate state is reachable.

Controlled work gets a prototype only, never production code. Regulated copy is marked for `compliance-review`.

## Playground

When the designer asks for a playground, tweaks, or test controls, add the standard panel from `references/playground.md`:

1. Propose stress-test settings and get a yes.
2. Install the shared files unchanged, in the default style unless the designer names another.
3. Write only the prototype's config.

After any build with lists, forms, numbers, or loading data, offer one in a line ("Want a playground so testers can try empty, many, long text, and error states?").

## Alloy receipt

End every build with:

- **Fidelity:** hi-fi, or wires with the states left for hi-fi.
- **Used:** Alloy components (import paths) and token utilities.
- **Custom:** anything not from Alloy, and why.
- **Gaps:** what Alloy is missing, worded so it can be pasted into #support-alloy-design-system.
- **Self-check:** passed, or what's left and why.
- **Playground:** the style and controls added, if any.
- **Listing:** the name, description, team and status as the directory card will show them, anything still missing, and when it appears (after the PR merges). Outside the repo: "Not in the directory yet" and how to move it in.

From a Figma source, also include:

- **Match rate:** elements matched by Code Connect, linked instance, proposed swap, or gap.
- **Flow:** routes or steps built, links wired vs. inferred, and links the designer corrected.
- **Assumed:** proposals built without the designer confirming them.

From a brief, also include:

- **Source:** the brief (with Doc Stage and last-edited date) and the Design Spec, or "brief only".
- **Testing:** the question the prototype answers.
- **Coverage:** Must-demonstrate states built and how to reach each one; Must-specify rules followed; deferrals carried forward unchanged. Brief only: derived states marked as such.
- **New patterns:** anything the spec called new or Alloy lacked, for design to pick up. Offer in one line to propose each as a guideline with `design-os-design-decisions`.
- **Assumed:** guesses beyond the documents, quoting any brief Open item you guessed at.

## Reference files

- `references/setup.md`: read when creating an app, adding Alloy to a project, or touching an ai-prototypes app. CSS setup, theme, the `@hiivemarkets/ui` swap, and plain-HTML mocks.
- `references/listing.md`: read whenever you're in ai-prototypes or sharing a prototype. What the directory lists, the `prototype.json` fields it accepts, the share preview, screenshots, and moving outside work into the repo.
- `references/from-figma.md`: read when the source is a Figma frame, section, or page. Component matching, flow mapping, the confirm step, and bringing a ported section back into its prototype.
- `references/from-brief.md`: read when the source is a Product Brief or Design Spec. Sources, the question, reference state, the plan, coverage, and Controlled work.
- `references/self-check.md`: read before saying a prototype is done, or when asked whether a prototype uses Alloy.
- `references/wires.md`: read when building at wires fidelity (a wireframe, mid-fi, or greyscale prototype). When wires fit, install, scope, and the receipt line.
- `references/playground.md`: read when adding or changing a playground. The plan, stress-test catalog, and install steps.
- `references/playground-styles.md`: read when the designer names a playground style, asks for a different look, or wants to save their own as a style. The styles, installing one, and adding one.
- `references/lessons-archive.md`: older lessons; read when changing setup or the playground files.
- `assets/playground/`: the shared playground files (`engine.ts`, `provider.tsx`, `panel.tsx`, `playground.css`) and `config.example.ts`; other styles' `panel.tsx` and `playground.css` in `styles/<name>/`. Copy, don't rewrite.
- `assets/wires/wires.css`: the greyscale wire layer. Copy, don't rewrite.
- `assets/clarity-logo.svg`: the Clarity wordmark, `currentColor`.

## Lessons logged

- **Oct 9, 2026 (rename):** replaced `design-os-alloy-prototype`; added the `prototype.json` listing, the Clarity wordmark, and the share step.
- **Oct 9, 2026 (playground):** Panel pinned bottom-right jumped as its content height changed → fixed window height and reserved hint lines; keep them when editing the shared files.
- **Oct 9, 2026 (playground):** A lone backtick key hint read as a stray dot → the title bar says "~ opens and closes" instead.
