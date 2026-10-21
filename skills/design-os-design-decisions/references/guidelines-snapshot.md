# Design guidelines snapshot

Active guidelines exported from the Design guidelines log on 2026-10-21: 17 entries. The log is the source of truth; read it live when you can (references/log.md).

## Component usage

- **DG-1** Cap the Step Tracker at six steps, and keep its titles and descriptions short. *Why:* The responsive stress test showed six steps hold without switching to the vertical layout; short copy keeps truncation rare. *Scope:* System. [Log](https://app.notion.com/p/400e1c9ca19081169c86f0a012626f30)
- **DG-2** On web, Step Tracker titles are one line with the description beneath, both truncating; on mobile the title may wrap to two lines, then truncate. *Why:* Removes the gap above the bars on web while keeping titles readable on narrow screens. Reverses the Sept 30 change that made titles wrap on web. *Scope:* System. [Log](https://app.notion.com/p/400e1c9ca19081d19d50e6417f222af9)
- **DG-3** Checkbox and radio fields can put short text such as "Required" in the title-row labelAside at any width; use contentAside for labelled data. *Why:* Keeps short qualifiers beside the title on mobile; contentAside stays reserved for data such as the Quantity Stat. *Scope:* System. [Log](https://app.notion.com/p/400e1c9ca19081cb953bcc07a5046b5b)
- **DG-4** Give an Empty State at most two actions, primary on top when they stack; Dialogs follow the same rule. *Why:* One clear next step plus an alternative; matches the Dialog rule so the two behave alike. *Scope:* System. [Log](https://app.notion.com/p/400e1c9ca19081ebade1d958b57fbb9b)
- **DG-6** Alerts aren't dismissible by default; dismissal is opt-in and available on all four alert types. *Why:* Keeps important alerts from being hidden by accident while giving one consistent pattern where dismissal makes sense. *Scope:* System. [Log](https://app.notion.com/p/400e1c9ca190816fadc2fef7773dcb78)

## Pattern

- **DG-11** Don't build lists with the Table component; use Table only for tabular data. *Why:* Faking lists with a styled Table breaks semantics for assistive tech and spreads custom styling. *Scope:* System. [Log](https://app.notion.com/p/400e1c9ca19081dab806d577e3719a09)
- **DG-12** Alloy comes first; any deviation from it is a deliberate, documented exception. *Why:* Drift from Alloy should be a choice someone made and can explain, logged here with its reason. *Scope:* System. [Log](https://app.notion.com/p/400e1c9ca190810ca50ef3cfcb46d190)
- **DG-13** Explain the four-company limit with an H2 or an alert above the "Enter holding" input, not inside the menu. *Why:* A short-term fix inside the system with no Alloy change; a fixed menu footer is being explored separately. *Scope:* Feature (Seller holdings: Enter holding). [Log](https://app.notion.com/p/400e1c9ca19081b485b9ca0abb1d0689)

## Layout & spacing

- **DG-5** Card footer buttons wrap only when they don't fit on one row. *Why:* Keeps footers compact in the common case; stress tests showed footers breaking when buttons were forced to stack or overflow. *Scope:* System. [Log](https://app.notion.com/p/400e1c9ca190814cb4f0e23b419c6035)
- **DG-9** Centre Pagination by default. *Why:* The component audit found it inconsistent across consumers; one default removes per-page alignment choices. *Scope:* System. [Log](https://app.notion.com/p/400e1c9ca1908179a41ddecceceae371)
- **DG-10** Centre the headers of icon-only and lock columns in tables; numeric alignment overrides align on numeric columns. *Why:* Icon-only columns read as centred content; numeric columns stay right-aligned for comparison. *Scope:* System. [Log](https://app.notion.com/p/400e1c9ca19081329fdce7fe42fc19fd)

## Data & formatting

- **DG-17** Write US and Canadian phone numbers as period-separated groups with no country code or brackets, and other numbers as +country.groups. *Why:* Matches the updated Clarity style guide; Alloy's phone formatter follows it. *Scope:* System. [Log](https://app.notion.com/p/400e1c9ca190817a9b5bd30a534f253f)

## Copy

- **DG-7** Keep Tab labels to three words or fewer. *Why:* Short labels keep the tab row scannable and reduce horizontal scrolling on mobile. *Scope:* System. [Log](https://app.notion.com/p/400e1c9ca19081239c6aef710026d741)

## Accessibility

- **DG-14** When an alert is dismissed, don't move focus; hiding it keeps the tab order. *Why:* The underlying primitives already handle focus, and hiding the element preserves tab order. *Scope:* System. [Log](https://app.notion.com/p/400e1c9ca190811b84e8fc73c65ebd1f)
- **DG-15** Don't make the ⓘ info tooltip beside a field label its own tab stop. *Why:* A tabbable tooltip adds a stop before every such field. *Scope:* System. [Log](https://app.notion.com/p/400e1c9ca19081b480c2dabfa0faa58a)
- **DG-16** On desktop, show a truncated form label's full text on hover. *Why:* Truncated labels otherwise hide meaning with no way to recover it. *Scope:* System. *Applies when:* Desktop only; the touch alternative is still for design to decide. [Log](https://app.notion.com/p/400e1c9ca1908141a524f3f88e0a3235)

## Visual style

- **DG-8** Destructive alerts use the circle icon; Warning alerts use the triangle. *Why:* Follows Carbon's convention so severity reads consistently. *Scope:* System. [Log](https://app.notion.com/p/400e1c9ca19081c7926bc9d0ee5c69a3)
