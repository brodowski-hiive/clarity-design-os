---
name: "design-os-alloy-prototype"
description: "Build coded prototypes from real Alloy components (@hiivemarkets/alloy), add a standard playground panel with stress-test controls, and check the code is on-system. Use for \"build a prototype\", \"prototype this flow\", \"add a playground\", \"turn this Figma frame into code\", \"which Alloy component for X?\". Not for: auditing Figma files (design-os-audit-design-system), changing Alloy itself (packages/alloy AGENTS.md), or production app work (the frontend repo's design-system skill)."
---

# Design OS: Alloy prototype

Prototypes should look and behave like Clarity because they're built from the same components Clarity ships. This skill keeps every coded prototype on `@hiivemarkets/alloy`, looked up live, and checks the result before handing it over.

## Rules

1. **Alloy components only.** UI comes from `@hiivemarkets/alloy` subpath imports. Not `@hiivemarkets/ui` (the retired pre-Alloy package, still in the ai-prototypes scaffold), not shadcn, not raw Radix, not hand-built controls.
2. **Look it up in the installed package, every time.** Read `COMPONENTS.md` and `TOKENS.md` from the installed `@hiivemarkets/alloy` (`node_modules/@hiivemarkets/alloy/dist/design/`) before writing UI. They match the exact version in use; memory and older skills don't.
3. **Tokens, not values.** Colors, borders, text treatment, and focus come from Alloy semantic utilities in `TOKENS.md`. No hex, `rgb()`, or arbitrary color classes.
4. **Gaps are reported, not hidden.** If Alloy lacks a component, variant, or token, say so before building anything custom, keep the custom part token-based, and list it in the receipt.

## Where you are

- **ai-prototypes:** its CLAUDE.md governs running commands, scaffolding, and PRs; follow it. But its scaffold installs `@hiivemarkets/ui`, so swap every new or touched app to Alloy first (`references/setup.md`).
- **frontend monorepo:** production work belongs to that repo's own `design-system` skill and `packages/alloy/AGENTS.md`. Hand off to them.
- **Anywhere else:** install `@hiivemarkets/alloy` and set it up (`references/setup.md`). For a plain HTML file with no build step, use the Alloy CSS and the plain-HTML examples in `TOKENS.md`, and note in the receipt that components are approximated.

## Build

1. Set up or swap to Alloy (`references/setup.md`).
2. Open `COMPONENTS.md` at the Quick Decision Guide, choose a component for each piece of UI, and read its entry (import, gotchas, example).
3. Build. Page padding, width, and right rails come from `PageContainer`, `PageSection`, and `CenteredPageSection`. Numbers use the dedicated inputs (`MoneyInput`, `SharesInput`, `PercentInput`, `DecimalInput`, `NumericInput`). Icons are one import per icon from `@hiivemarkets/alloy-icons/<icon-slug>`.
4. If there's a Figma source, map each Figma element to the Alloy component of the same name first. Treat visual differences as possible gaps, not a reason to hardcode styles.
5. Run the self-check in `references/self-check.md` and fix what it finds.
6. Render it and look: page loads, zero console errors, Alloy styles visibly applied.

Prototype-only extras (animations, demo controls) are fine. Keep them in their own clearly named files and list them as Custom.

## Playground

When the designer asks for a playground, tweaks, or test controls, add the standard panel from `references/playground.md`: propose stress-test settings first, get a yes, then install the shared files unchanged and write only the prototype's config. After any build with lists, forms, numbers, or loading data, offer one in a line ("Want a playground so testers can try empty, many, long text, and error states?").

## Alloy receipt

End every build with:

- **Used:** Alloy components (import paths) and token utilities.
- **Custom:** anything not from Alloy, and why.
- **Gaps:** what Alloy is missing, worded so it can be pasted into #support-alloy-design-system.
- **Self-check:** passed, or what's left and why.
- **Playground:** the controls added, if any.

## Reference files

- `references/setup.md`: read when creating an app, adding Alloy to a project, or touching an ai-prototypes app. CSS setup, theme, and the `@hiivemarkets/ui` swap.
- `references/self-check.md`: read before saying a prototype is done, or when asked whether a prototype uses Alloy.
- `references/playground.md`: read when adding or changing a playground. The plan, stress-test catalog, and install steps.
- `assets/playground/`: the shared playground files (`engine.ts`, `provider.tsx`, `panel.tsx`, `playground.css`) and `config.example.ts`. Copy, don't rewrite.

## Lessons logged

- **Oct 9, 2026 (setup):** ai-prototypes scaffold and CLAUDE.md still install `@hiivemarkets/ui` (15 of 16 apps) → swap to `@hiivemarkets/alloy`; `apps/fund-offerings` is the working example.
- **Oct 9, 2026 (playground):** Panel pinned bottom-right jumped as its content height changed → fixed window height and reserved hint lines; keep them when editing the shared files.
- **Oct 9, 2026 (playground):** A lone backtick key hint read as a stray dot → the title bar says "~ opens and closes" instead.
