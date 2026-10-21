# The design guidelines log

Read before the first read or write.

## Where it lives

- **Notion database:** Design guidelines, https://app.notion.com/p/4c1f7117a5804ae8af5e2335bbdd882e.
- **Data source:** `collection://051b8e49-13a0-4f29-a640-d98c381f3cd1`. Query it through the Notion MCP server. If your agent defers tool loading, search for the Notion tools first.
- **If the link fails,** search Notion for the title "Design guidelines" under Alloy Design System. If that also fails, fall back to `guidelines-snapshot.md` and say so.

## Fields

| Field | Type | What goes in it |
|---|---|---|
| Guideline | Title | The rule in one sentence, as an instruction: "Use a ghost button for secondary actions in dialogs." |
| ID | Unique ID, prefix `DG` | Cite as `DG-14`. Notion assigns it. |
| Status | Select | `Proposed` (awaiting its review level), `Active`, `Superseded`, `Retired` |
| Area | Select | `Component usage`, `Pattern`, `Layout & spacing`, `States`, `Data & formatting`, `Copy`, `Accessibility`, `Motion`, `Visual style`, `Navigation & IA` |
| Scope | Select | `System`, `Surface`, `Feature` |
| Surface or feature | Text | For Surface or Feature scope: the product area or initiative name |
| Why | Text | The reason: the constraint, tradeoff, or evidence. One to three sentences. |
| Applies when | Text | Where it holds, and the known exceptions |
| Alternatives considered | Text | What else was on the table and why it lost |
| Alloy components | Multi-select | Alloy component names as published (`Dialog`, `Button`, `Select`) |
| Review level | Select | `Designer`, `Lead designer`, `Working council`, `DOPE council` (see `making-a-call.md`) |
| Decided by | Person | Who made the call. Never the agent. |
| Decided on | Date | When the call was made, not when it was logged |
| Sources | Text (links) | Figma node, Slack thread, sync notes, Linear issue, prototype, research |
| Initiative record | URL | For Feature scope, when a record exists |
| Supersedes | Relation (self) | The entry this one replaces. Its counterpart, Superseded by, is filled automatically. |
| Alloy gap | Text | The matching `known-gaps.md` line or #support-alloy-design-system thread, if the call is a workaround |

## Searching

- Search the title and Why for the subject's keywords, then filter by Area and Alloy components. Many calls are filed under a component, not a topic: "dismiss button" lives under `Alert`.
- By default, return only `Active` and `Proposed` entries. Include `Superseded` when the question is "why did we change this?".
- A Surface or Feature entry only binds within that area. Check whether a System entry covers the same question; the narrower one is the exception.

## Writing

1. Preview the entry as a short block (Guideline, Status, Area, Scope, Why, Review level, Sources) and ask: "Log this as Active?" or "Log as Proposed for <review level>?"
2. On a yes, create the page and fill every field you can. Leave a field empty rather than guess.
3. When it supersedes an entry, set Supersedes and change the old entry's Status to `Superseded` in the same confirmed write.
4. Reply with the new ID and link.

## Review queue

"What's waiting on council?" means `Status = Proposed`, grouped by Review level, oldest first. Each line gives the ID, guideline, how long it has waited, and the source link. Offer to draft the agenda list for the next working council. Don't post it anywhere without a yes.

## Backfill from the DS Changelog

The weekly DS Changelog pages (DOPE → DS Changelog) have a Key Decisions section, and the DS LT sync notes have Key Outcomes. To seed the log:

1. Read the pages the designer names, or the last four weeks by default.
2. Extract each design call as a candidate entry. Skip engineering-only items (tooling, PR mechanics) and anything still marked as open or under discussion.
3. Check every candidate against the log for duplicates.
4. Show the candidates as a numbered list (guideline, area, scope, source) and log only the numbers the designer confirms. Use the date the call was made, credit whoever the source says made it, and link the source page.
