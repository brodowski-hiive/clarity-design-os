The check to run on a prototype before calling it done, or when asked whether a prototype uses Alloy. Search the code, fix what you can, and report the rest in the receipt.

| Severity | Look for | Fix |
|---|---|---|
| High | Imports from `@hiivemarkets/ui`, shadcn (`@/components/ui/*`), `@radix-ui/*`, or another UI kit where Alloy has the component | Swap to the Alloy component |
| High | App-local buttons, dialogs, selects, tabs, tooltips, radios, checkboxes, switches, or inputs | Replace with the Alloy component |
| High | Hex, `rgb()`/`hsl()`, or arbitrary color classes (`bg-[#...]`, `text-gray-500`, `border-slate-200`) | Use the Alloy semantic utility from `TOKENS.md` |
| Medium | Hand-rolled page padding (`px-4 md:px-6 lg:px-8`), `max-w-*` page caps, or main-plus-sidebar grids | `PageContainer` / `PageSection` / `CenteredPageSection` |
| Medium | Missing or misordered Alloy CSS imports, no `data-theme="clarity"`, an `@source` into Alloy | Fix per `references/setup.md` |
| Medium | Plain `Input` for money, shares, percentages, or decimals | The dedicated numeric input |
| Low | Icons from Phosphor, Lucide, Heroicons, or an icon barrel | `@hiivemarkets/alloy-icons/<icon-slug>`, one import per icon |

`src/playground/` is exempt: it's shared prototype tooling and intentionally not built from Alloy components. Check only that its four shared files match the skill's `assets/playground/` versions. Other prototype-only files you've labelled as Custom (animations, demo extras) are exempt from the color rule, but not from using Alloy components for controls.

When asked to check someone else's prototype rather than your own, report findings grouped by file with line numbers, highest severity first, and ask before changing their code.
