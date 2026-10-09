# From Figma

Port a Figma frame, section, or page into an Alloy prototype. Match every element to Alloy before building anything custom, map how the screens connect, and get the designer's confirmation before writing UI.

This is read-only on the Figma file. Never write to it, because the designer's file is theirs. If they want it fixed, hand off to `design-os-audit-design-system`.

## Alloy library

Scope every `search_design_system` call to the 🤖 Alloy - DS library with `includeLibraryKeys`, because unscoped searches return shadcn and other libraries. Get the library key from `pm-os-clarity-context` (`infra/design-system`) or `get_libraries`. Keep each call to a few specific queries so the output doesn't overflow.

## 1. Scope

- One frame is one screen. Several top-level frames on a page or section are a flow.
- Skip hidden layers, report cards, and `· Alloy fixes` copies made by the audit skill.
- Take a `get_screenshot` of each frame. You'll compare the build against these at the end.
- A whole page can be slow and may hit Figma rate limits. Say so before starting.
- Keep the Figma URL the designer gave. In ai-prototypes it goes in `prototype.json` as `links.figma` (`references/listing.md`).

## 2. Match components

Work through every element in this order and record how each one matched.

1. **Code Connect.** Call `get_code_connect_map` for the frame. An instance mapped to `@hiivemarkets/alloy` is a confirmed match: use that import and map its Figma variant props to the component's props.
2. **Linked Alloy instance, no mapping.** Confirm it's Alloy by component set key against a scoped search result. "Remote" alone doesn't prove it, since any team library is remote. Match it to the Alloy component of the same name in `COMPONENTS.md`.
3. **Hand-built or non-Alloy layer.** Find the closest Alloy component before building anything. Read its Figma description and its `COMPONENTS.md` entry, since the description often decides it. Propose it with a one-line reason and a confidence level, for example "frame with border, radius-md, header + body → `Card`, high". Common cases:
   - Rows of raw text cells → `Table`
   - Rectangle + label → `Button`
   - Overlay frame → `Dialog`, or `Drawer / Mobile` at mobile widths
   - Label + box → the matching input; money and share amounts use `MoneyInput` and `SharesInput`
4. **No reasonable match.** Mark it as a gap. Build it custom and token-based, and list it in the receipt.

Map raw colors, type, and spacing to Alloy tokens from `TOKENS.md`. Use exact matches only. Mark anything else "closest token" so the designer sees it in the component map.

## 3. Map the flow

Skip this for a single screen. Otherwise, list screens and links and label each link **wired** or **inferred**.

- **Wired:** Figma prototype interactions, read from node `reactions` (load the `figma-use` skill first). Use them as they are: trigger, destination, and navigate vs. overlay vs. back.
- **Inferred**, strongest signal first:
  1. Arrows or connectors on the canvas between frames
  2. Frame names and numbering ("1. Bid form", "2. Review")
  3. Button and link labels that name a destination ("Review bid" → Review; "Cancel" or "Back" → previous screen)
  4. Reading order, left to right or top to bottom

  Give every inferred link a confidence level.
- **States, not screens:** near-duplicate frames that differ only in content (empty, error, loading, success) are states of one screen. Build one route with a state toggle. If a playground is added later, these become its presets.
- **Shared chrome:** headers, side nav, and step indicators that repeat across screens become one shared layout.

Then choose the structure: separate routes for distinct pages, or a stepper or wizard when the screens are a linear sequence with a step indicator.

## 4. Confirm before building

Post one message with both maps, putting the rows that need attention first.

**Component map:** a table of Figma layer → Alloy component → how it matched (Code Connect, linked, proposed with confidence, or gap). Proposed and gap rows go first.

**Flow map:** one line per link, for example:

```
Review —[Edit]→ Bid form            inferred, low
Bid form —[Continue]→ Review         wired
Review —[Place bid]→ Confirmation    inferred, high
```

Add the detected states, the shared layout, and the routes-vs-stepper call. Low-confidence links go first.

Ask the designer to correct anything in plain language ("Edit goes to step 1", "that card is a Banner"). Apply the corrections, then build. If they say "just build it", use your best guess and list every unconfirmed proposal under **Assumed** in the receipt.

## 5. Build and compare

Build from the confirmed maps using the main Build steps. Every link in the flow map must work in the rendered prototype. Click through the whole flow and compare each screen to its Figma screenshot. Treat differences as possible gaps or wrong matches, never as something to patch with hardcoded styles.
