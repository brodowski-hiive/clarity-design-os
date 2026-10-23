---
name: "design-os-fill-mock-data"
description: "Replace placeholder content in a Figma frame with realistic, consistent Clarity mock data, applied section by section after the designer approves. Catches bracketed placeholders, lorem ipsum, repeated values, and totals that don't add up. Use for \"fill in mock data\", \"make the data realistic\", \"replace the placeholders\", \"the numbers don't make sense\". Not for: extreme values (design-os-stress-test-design) or detached components (design-os-audit-design-system)."
---

# Fill mock data

Turn placeholder content in a Figma frame into realistic mock data that makes sense together. The user designs Clarity (for the product and its surfaces, read `pm-os-clarity-context` if it's installed), so the data should read like a real issuer's account.

The flow is always: read → propose by section → user approves sections → apply to the original frame → verify.

## 1. Read the frame

1. Take a screenshot with the Figma MCP server's `get_screenshot` so you can see the layout.
2. Before any `use_figma` call, load the Figma MCP server's `figma-use` guidance (the `figma-use` skill if your agent has it installed, otherwise the `skill://figma/figma-use/SKILL.md` resource). It covers API constraints that cause hard-to-debug failures.
3. Use `use_figma` with a read-only script to collect every visible text node under the frame: node id, layer name, current characters, whether it's inside a component instance, and its parent section. Skip hidden layers and anything inside hidden parents.

## 2. Find what to replace

Replace dynamic content only. Leave static UI copy alone: labels, headings, button text, helper copy, disclaimers, and legal text.

Candidates:
- Bracketed or templated placeholders: `[programName]`, `{{name}}`, `<value>`
- Generic filler: lorem ipsum, "John Doe", "Name", "Label", "Date", "XXX", "Company Name"
- Repeated identical values that should vary (every row "500", every date the same)
- Numbers that don't reconcile: totals, remaining amounts, breakdowns, percentages, price × quantity
- Values that contradict each other across the screen (price per share shown two different ways)

If a value is ambiguous (could be static copy or data), include it in the proposal and say so rather than guessing.

## 3. Generate data

Read the Typical values in `references/domain-data.md` for vocabulary, realistic ranges, and formatting. The same file holds the Extremes `design-os-stress-test-design` uses; keep both halves in step when editing it.

Rules:
- **Fresh each run.** Invent new names and values every time; don't reuse a fixed fictional company.
- **Fictional only.** Never use real people, real companies, or real funds. Invented names should sound plausible but not match well-known firms.
- **Consistent across the screen.** The same entity has the same name everywhere. All math reconciles: rows sum to totals, remaining = max − used, price × shares = value, breakdown lines sum to the net figure, percentages add up.
- **Logical over time.** Dates follow the flow (acquired before transferred, deadline after submission).
- **Match existing formatting.** Keep the frame's currency format, decimal places, date style, separators, and casing. Where `design-os-design-decisions` has an Active `Data & formatting` guideline, follow it and flag frames that don't.
- **Typical, not extreme.** Keep lengths close to the original so layouts hold. Stress testing with extreme values belongs to the `design-os-stress-test-design` skill; mention it if the user wants that instead.

## 4. Propose by section

Group replacements by visual section of the screen (use the frame's hierarchy and what the screenshot shows). Present a short checklist per section:

```
**Section name**
- `current` → `proposed`
- `current` → `proposed`
```

Add one line under any section with a note, such as which numbers were changed to reconcile, or a value you weren't sure was data.

Then ask a multi-select question listing the sections so the user picks which ones to apply. Use your agent's multiple-choice question tool if it has one (for example `AskUserQuestion` in Claude Code, `ask_user_input_v0` in Claude chat); otherwise number the sections in plain text and ask them to reply with the numbers. Wait for their answer. If they ask for changes to a section, revise and propose that section again.

## 5. Apply to the original frame

Edit the original frame directly. Mention once, before writing, that Figma's version history can restore the previous state.

With `use_figma`:
- Load each text node's fonts (`figma.loadFontAsync`) before setting `characters`; handle mixed-font text by loading every font in the range.
- Change only the text content. Don't rename layers, restyle text, or touch hidden layers.
- Text inside component instances is set as an override. Deeply nested instance text (IDs with several `;` segments) sometimes isn't returned by `getNodeByIdAsync`. When that happens, get the nearest top-level instance by ID, walk its children to find the text node (match on its current characters or layer name), and edit that node instead. Only skip and report a node if it still can't be found or edited (locked, or not overridable).
- Apply only the approved sections.

## 6. Verify and report

Take a new `get_screenshot` and check for text that now overflows, truncates, or wraps unexpectedly. Then report briefly:

- Sections applied
- Anything skipped and why
- Any layout issues spotted in the new screenshot

## Reference files

- `references/domain-data.md`: the shared Clarity data reference: vocabulary, typical and extreme values, formatting, and the consistency checklist. Read in step 3. Also read by `design-os-stress-test-design` and `design-os-prep-eng-handoff`.

## Lessons logged

None yet.
