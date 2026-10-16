The check to run on a prototype before calling it done, or when asked whether a prototype uses Alloy. Search the code, fix what you can, and report the rest in the receipt.

| Severity | Look for | Fix |
|---|---|---|
| High | Imports from `@hiivemarkets/ui`, shadcn (`@/components/ui/*`), `@radix-ui/*`, or another UI kit where Alloy has the component | Swap to the Alloy component |
| High | App-local buttons, dialogs, selects, tabs, tooltips, radios, checkboxes, switches, or inputs | Replace with the Alloy component |
| High | Hex, `rgb()`/`hsl()`, or arbitrary color classes (`bg-[#...]`, `text-gray-500`, `border-slate-200`) | Use the Alloy semantic utility from `TOKENS.md` |
| Medium | Hand-rolled page padding (`px-4 md:px-6 lg:px-8`), `max-w-*` page caps, or main-plus-sidebar grids | `PageContainer` / `PageSection` / `CenteredPageSection` |
| Medium | Missing or misordered Alloy CSS imports, no `data-theme="clarity"`, or an `@source` into Alloy outside ai-prototypes (inside it, the scaffold's line is required) | Fix per `references/setup.md` |
| Medium | Plain `Input` for money, shares, percentages, or decimals | The dedicated numeric input |
| Medium | In ai-prototypes: no `prototype.json`, a TODO or scaffold-placeholder description, or a listing that no longer matches what was built | Update per `references/listing.md`, then `mise run validate <name>` |
| Low | Icons from Phosphor, Lucide, Heroicons, or an icon barrel | `@hiivemarkets/alloy-icons/<icon-slug>`, one import per icon |
| Low | "Hiive" in the page title or visible product name, or a redrawn or image logo | Write Clarity; use `assets/clarity-logo.svg` colored with a text token |

`src/playground/` is exempt: it's shared prototype tooling and intentionally not built from Alloy components. Check only that its four shared files match the skill's `assets/playground/` versions. `src/wires/wires.css` is exempt from the color rule: it's the wire layer and holds Alloy's own grey values on purpose. Check only that it matches the skill's `assets/wires/wires.css`. A wires prototype still uses Alloy components everywhere else, and gets every other check. Other prototype-only files you've labelled as Custom (animations, demo extras) are exempt from the color rule, but not from using Alloy components for controls.

When asked to check someone else's prototype rather than your own, report findings grouped by file with line numbers, highest severity first, and ask before changing their code.
