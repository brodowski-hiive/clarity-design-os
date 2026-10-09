How to find and import Alloy components, variables, and text styles. Read before the first library search, and before applying fixes.

## The Alloy library

| | Value |
|---|---|
| Library | 🤖 Alloy - DS ([open in Figma](https://www.figma.com/design/HWpJKqcHvI0zLuEnhmuhx6/%F0%9F%A4%96-Alloy---DS?node-id=19173-9427)) |
| File key | `HWpJKqcHvI0zLuEnhmuhx6` |
| Library key | `lk-039b0273191fbe2e2cb9cd34476872b4970e79b6e71388f1e156b75443d070a20cbbf6067572e4df51784d19b9515f1ad3a086bd6bebf674af27e3f19190abc3` |
| Assets (illustrations, logos) | 🤖 Alloy - Assets, file `F6jclPa06HczPzMwYLfI2S`. A separate library, not the source for components or tokens |

If a search scoped to this key returns nothing for things Alloy clearly has (Button, Card), the key may have changed. Run `get_libraries` on the target file, find "🤖 Alloy - DS", use its key, and log the change in Lessons logged.

## 1. Find

Search with `search_design_system`:

- `fileKey`: the file you're working in, or the Alloy file key.
- `includeLibraryKeys`: `[<Alloy library key>]`. Always. Without it, results mix in non-Alloy libraries with the same names.
- `disableCodeConnect: true`, and a handful of specific queries per call (about 5). A 13-query batch overflowed the tool's output limit.
- One query per asset (`{"entity":"component","query":"Drawer"}`, `{"entity":"variable","query":"colors/text"}`, `{"entity":"style","query":"Body Default"}`).

From the results, keep `componentSetKey` or `componentKey`, variable `key`, and style keys. Read each component's `description`. Many hold the real spec (behavior, sizing, when not to use it, open DS issues), and some say a desktop pattern becomes a different component on mobile (for example, mobile dialogs are `Drawer / Mobile`; display-only tables use `Table / Head`, not `Data Table / Head`).

Skip internal parts: components whose names start with `_` (like `_Drawer Footer`) are building blocks used inside other components. Place the parent unless the description says otherwise.

## Variables

| Collection | Holds | Use |
|---|---|---|
| `1. Primitives` | Raw scales: palette, Tailwind colors, spacing, radius | Spacing and radius binding; never for color when a semantic exists |
| `2. Clarity` | Semantic colors: `colors/foreground`, `colors/background`, `colors/inverse`, `colors/text/*`, `colors/border-*`, `colors/chart/*` | First choice for every color |
| `3. Responsive Type` | Type values behind the text styles | Through text styles, not directly |

To compare a hex against tokens, import each candidate with `figma.variables.importVariableByKeyAsync(key)`, read `valuesByMode` for the collection's default mode, and follow `VARIABLE_ALIAS` chains to the final color. Include `colors/chart/*`; chart colors often match exactly.

## Text styles

Designers use the styles under `Responsive Type/*`: Display, Screen Title, Subscreen Title, Section Title, Subsection Title, Subtitle, Body Title, Body Default, Body Default Bold, Body Small, Body Small Bold, Label Default, Label Default Medium, Label Small. Styles under `DS team use only/*` are not for designers; never apply them. Alloy fonts are Roobert and Roobert SemiMono.

## 2. Import and apply (fix copy and report card only)

Load the `figma-use` skill, then in `use_figma`:

- Import by key: `figma.importComponentSetByKeyAsync(key)` for component sets, `figma.importComponentByKeyAsync(key)` for single components. Create an instance from the right variant, then set variants and properties with `setProperties`. Never copy-paste from another file or detach.
- Variables: `figma.variables.importVariableByKeyAsync(key)`, then bind fills, strokes, spacing, and radius with bound variables. Never type a hex or a pixel value when a variable exists.
- Text: import Alloy text styles and apply them. Name text layers for their role (Title, Body, Field Label), not their style.
- Layout: keep the designer's structure. Only add or change auto layout when the fix needs it, and bind gaps and padding to Alloy spacing variables.
- Icons: use the icon components in the Alloy library (search by icon name, scoped to Alloy).

Work in batches, take a screenshot after each batch, and compare against the component descriptions.

## Things that go wrong

- **Lookalike library hit:** a result's `libraryName` isn't "🤖 Alloy - DS". Discard it, even if it's a better match.
- **Missing variant:** the variant you need doesn't exist. Don't detach and edit; use the closest variant, mark the finding Needs designer, and note the gap.
- **Description says "not in code yet":** fine to use in Figma, but note it on the finding so engineering knows.
- **Rate limits:** Figma rate-limits large reads. Fetch only what this screen needs, and say if anything was skipped.
