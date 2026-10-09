---
name: "design-os-prototype"
description: "Build coded Clarity prototypes from real Alloy components, port Figma screens and flows into clickable code, add a playground, keep the ai-prototypes listing current, and check it's on-system. Use for \"build a prototype\", \"make this Figma page clickable\", \"add a playground\", \"share my prototype\", \"update the prototype listing\", \"which Alloy component for X?\". Not for: auditing Figma files (design-os-audit-design-system), changing Alloy itself (packages/alloy AGENTS.md), or production app work."
---

# Design OS: prototype

A prototype exists to get a reaction. Two things make that reaction worth having:

- **It looks and behaves like Clarity,** so people react to the idea and not to off-brand UI. That's why it's built from the same Alloy components Clarity ships, looked up live, and checked before handing it over.
- **People can find it again next week,** so it can't live only as a Slack link. That's why every ai-prototypes app keeps a short listing.

## Rules

1. **Alloy components only.** UI comes from `@hiivemarkets/alloy` subpath imports. Not `@hiivemarkets/ui` (the retired pre-Alloy package, still in the ai-prototypes scaffold), not shadcn, not raw Radix, not hand-built controls.
2. **Look it up in the installed package, every time.** Read `COMPONENTS.md` and `TOKENS.md` from the installed `@hiivemarkets/alloy` (`node_modules/@hiivemarkets/alloy/dist/design/`) before writing UI. They match the exact version in use; memory and older skills don't.
3. **Tokens, not values.** Colors, borders, text treatment, and focus come from Alloy semantic utilities in `TOKENS.md`. No hex, `rgb()`, or arbitrary color classes.
4. **Gaps are reported, not hidden.** If Alloy lacks a component, variant, or token, say so before building anything custom, keep the custom part token-based, and list it in the receipt.
5. **Every ai-prototypes app has a current `prototype.json`.** Write it and keep it accurate without being asked (`references/listing.md`). It's how the prototype gets found later.

## Where you are

- **ai-prototypes:** its CLAUDE.md governs running commands, scaffolding, and PRs; follow it. Its scaffold installs `@hiivemarkets/ui`, so swap every new or touched app to Alloy first (`references/setup.md`). Keep the listing current (`references/listing.md`).
- **frontend monorepo:** production work belongs to that repo's own `design-system` skill and `packages/alloy/AGENTS.md`. Hand off to them.
- **Anywhere else:** install `@hiivemarkets/alloy` and set it up (`references/setup.md`). For a plain HTML file with no build step, use the Alloy CSS and the plain-HTML examples in `TOKENS.md`, and note in the receipt that components are approximated.

## Brand

- **Name:** write Clarity, not Hiive, in titles, copy, and the page `<title>`. Keep Hiive only where `pm-os-clarity-context` Clarity naming allows, or where it's the real name of an existing thing.
- **Logo:** Alloy doesn't ship one. Use `assets/clarity-logo.svg`, the wordmark from the production nav. It uses `currentColor`, so color it with a text token. It's 86px wide in nav (`w-21.5`). Don't redraw, stretch, or recolor it with a raw value.
- **Dark mode:** Alloy's Clarity theme has none. Say so and report it as a gap. If the designer still wants it, build a layer that redefines Alloy's own `--ds-*` variables under `data-mode="dark"`, from Alloy primitives, and list it as Custom.

## Build

1. **Set up.** Scaffold or swap to Alloy (`references/setup.md`). In ai-prototypes, fill in `prototype.json` from what the designer asked for.
2. **Pick components.** Open `COMPONENTS.md` at the Quick Decision Guide, choose a component for each piece of UI, and read its entry (import, gotchas, example).
3. **Build.**
   - Page padding, width, and right rails come from `PageContainer`, `PageSection`, and `CenteredPageSection`.
   - Numbers use the dedicated inputs (`MoneyInput`, `SharesInput`, `PercentInput`, `DecimalInput`, `NumericInput`).
   - Icons are one import per icon from `@hiivemarkets/alloy-icons/<icon-slug>`.
4. **If there's a Figma source,** run **From Figma** (below) before writing UI, and build from the component map and flow map the designer confirmed.
5. **Self-check.** Run `references/self-check.md` and fix what it finds.
6. **Render it and look:** page loads, zero console errors, Alloy styles visibly applied.
7. **Share (ai-prototypes).** Update `prototype.json` to match what was built (`in-review`, plus the Figma link if there is one), then open the PR per the repo's CLAUDE.md. Give the designer the PR link and a one-line preview of the listing to correct.

Prototype-only extras (animations, demo controls) are fine. Keep them in their own clearly named files and list them as Custom.

## From Figma

When the source is a Figma frame, section, or page, follow `references/from-figma.md`. In short:

1. **Match components** in this order: Code Connect mapping, then a linked Alloy instance, then a proposed Alloy swap for anything hand-built (with reason and confidence), then a gap. Build custom only for gaps.
2. **Map the flow** when there are several screens.
   - Use wired prototype links as-is; infer the rest from arrows, frame names, button labels, and reading order.
   - Group near-duplicate frames as states of one screen, and pull repeated chrome into one shared layout.
3. **Confirm in chat** before building: the component map and flow map, uncertain rows first. The designer corrects in plain language.
4. **Build and compare:** every link works, and each screen is checked against its Figma screenshot.

Read-only on Figma. If the designer wants their file fixed, hand off to `design-os-audit-design-system`.

## Playground

When the designer asks for a playground, tweaks, or test controls, add the standard panel from `references/playground.md`:

1. Propose stress-test settings and get a yes.
2. Install the shared files unchanged.
3. Write only the prototype's config.

After any build with lists, forms, numbers, or loading data, offer one in a line ("Want a playground so testers can try empty, many, long text, and error states?").

## Alloy receipt

End every build with:

- **Used:** Alloy components (import paths) and token utilities.
- **Custom:** anything not from Alloy, and why.
- **Gaps:** what Alloy is missing, worded so it can be pasted into #support-alloy-design-system.
- **Self-check:** passed, or what's left and why.
- **Playground:** the controls added, if any.
- **Listing:** in ai-prototypes, the name and description as they'll appear, and anything still TODO.

From a Figma source, also include:

- **Match rate:** elements matched by Code Connect, linked instance, proposed swap, or gap.
- **Flow:** routes or steps built, links wired vs. inferred, and links the designer corrected.
- **Assumed:** proposals built without the designer confirming them.

## Reference files

- `references/setup.md`: read when creating an app, adding Alloy to a project, or touching an ai-prototypes app. CSS setup, theme, the `@hiivemarkets/ui` swap, and plain-HTML mocks.
- `references/listing.md`: read whenever you're in ai-prototypes. The `prototype.json` fields, when to update them, and the share preview.
- `references/from-figma.md`: read when the source is a Figma frame, section, or page. Component matching, flow mapping, and the confirm step.
- `references/self-check.md`: read before saying a prototype is done, or when asked whether a prototype uses Alloy.
- `references/playground.md`: read when adding or changing a playground. The plan, stress-test catalog, and install steps.
- `references/lessons-archive.md`: older lessons; read when changing setup or the playground files.
- `assets/playground/`: the shared playground files (`engine.ts`, `provider.tsx`, `panel.tsx`, `playground.css`) and `config.example.ts`. Copy, don't rewrite.
- `assets/clarity-logo.svg`: the Clarity wordmark, `currentColor`.

## Lessons logged

- **Oct 9, 2026 (rename):** replaced `design-os-alloy-prototype`; added the `prototype.json` listing, the Clarity wordmark, and the share step.
- **Oct 9, 2026 (playground):** Panel pinned bottom-right jumped as its content height changed → fixed window height and reserved hint lines; keep them when editing the shared files.
- **Oct 9, 2026 (playground):** A lone backtick key hint read as a stray dot → the title bar says "~ opens and closes" instead.
