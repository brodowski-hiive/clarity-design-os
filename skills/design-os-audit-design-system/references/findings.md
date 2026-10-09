What the audit flags, how severe each kind of finding is, and how to fix it in the copy. Read during the audit and before fixing.

## Is this instance from Alloy?

For each instance, get its main component (`getMainComponentAsync()`) and, if it's in a set, the parent component set. It's Alloy only if its key matches a result from a search scoped to the Alloy library key. `remote` only means it comes from some team library: Pill, Dot, Clarity+ Tag, and Fund Offering Cards were all remote and none were Alloy. A matching name isn't enough either, because other libraries reuse names like Button and Card.

## Findings

| Kind | Severity | What it means | Fix in the copy |
|---|---|---|---|
| Off-system font | High | Any family other than Roobert or Roobert SemiMono | Apply the Alloy text style for its role |
| Non-Alloy library | High | Instance from another team library | Swap for the matching Alloy component |
| Hand-built core control or table | High | Button, input, select, toggle, tabs, or table built from raw frames and text | Replace with the Alloy component |
| Local component | Medium | Main component lives in this file, especially several local versions of one thing | Swap for Alloy if it exists; otherwise report a gap |
| Hand-built card | Medium | Card-like frame (fill, radius, padding, stroke) that isn't an Alloy Card | Alloy `Card`, `Variant=Slot`, with the content moved in |
| Raw color | Medium | Fill, stroke, or text color with no variable bound | Bind the exact `2. Clarity` variable |
| Unstyled text | Medium | Text with no Alloy text style | Apply the exact `Responsive Type/*` style |
| Variant by overrides | Medium | Instance overrides that recreate another variant | Switch to that variant and reset overrides |
| Unbound spacing or radius | Low | Gap, padding, or radius not bound to a variable | Bind the matching `1. Primitives` spacing or radius |
| Generic name | Low | Figma default names or names describing looks | Rename for its role |

**Lookalike confidence.** High: name and structure both match (a frame named "Button" with a label, padding, radius, and fill). Medium: structure matches, name doesn't. Low: one or two signals. Don't report low-confidence matches as findings; mention them in one "possible" line at most.

**Raw colors.** Resolve every `2. Clarity` candidate before deciding there's no token (`references/alloy-library.md`). Text fills compare against `colors/text/*`; shape and frame fills against surface and foreground tokens (`colors/foreground`, `colors/background`, `colors/inverse`, `colors/chart/*`). Exact match: suggest binding it. No exact match: Needs designer, with the closest option by RGB distance in the same set and its delta.

**Type.** Compare family, style, size, and text case against the `Responsive Type/*` styles. Exact match: suggest applying it. Otherwise Needs designer with the closest one or two options, and ask when the choice changes the look.

**Don't flag:** content that isn't UI (illustrations, photos, chart drawing, notes), hidden layers, and anything inside an Alloy instance that the component itself owns.

## Statuses

`Open` → `Fixed in copy`, `Partly fixed in copy · Needs designer`, `Needs designer`, or `Couldn't fix`. On a re-run, a finding that no longer appears becomes `Resolved`.

## Fix rules

- Fix only the IDs the designer named. "Fix all high" means every Open high finding; ones that need a decision get Needs designer with the choice spelled out.
- Exact matches only, unless the designer said "use the closest".
- Carry over the designer's content: text, icons, visible states. If a swap changes size or layout noticeably, still do it, and note it on the finding.
- If the right Alloy variant doesn't exist, use the closest one, mark Needs designer, and add the gap.

## Fix notes by component

- **Tables → `Table / Cell`:** set text with `Table Cell Text`; hide description, logo, arrow, star, and rank; turn on `Border bottom`. Right-aligned (numeric) source cells use `Right Text Align=Yes, Numeric=Yes` and the `Numeric Value` property. Numeric cells are 64px tall and text cells 72px, so after swapping set every cell in the table to the same fixed height or rows misalign. Parents may use grid layout; insert at the same index.
- **Toggle Group:** set each trigger's `Toggle Text` and `Active`; hide unused triggers with the `Show Nth Toggle` booleans. Keep the originally active option active.
- **Card:** use `Variant=Slot` and move the existing content into the `SLOT` node. Card padding makes the result larger than the original; say so in the status note.
- **Restyling text:** include text inside instance slots (for example, Card content). A filter that skips everything inside instances misses it.
