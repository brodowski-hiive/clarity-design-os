How to build, save, and update the report card. Read before creating or updating one.

## Placement and name

- A new top-level frame on the same page, to the right of the audited frame with an 80px gap, top edges aligned. If something already sits there, place it further right where there's space. Never overlap the designer's work.
- Name: `Alloy report card · <frame name>`.
- Build it from Alloy: Card, Badge for severity, `Responsive Type/*` text styles, `2. Clarity` colors. About 480px wide, vertical auto layout, hugging its content. Set severity Badges to hug width; a fixed width truncates "Medium".

## Contents, in order

1. **Title and date:** "Alloy report card", the audited frame's name (linked), and the audit date.
2. **Coverage:** "Alloy coverage 82% · 3 high · 5 medium · 2 low".
3. **Alloy gaps · send to the DS team:** on a subtle surface (for example `colors/background-dark` with a `colors/border-secondary` stroke). One line saying these aren't designer mistakes, then one bullet per gap: what's missing, the finding IDs in parentheses, and a short detail.
4. **Findings,** one row per finding, highest severity first: ID (linked to the layer), severity Badge, what's wrong in one line, suggested fix in one line, and status. Name each row's status text layer `Status` so updates can find it. Once fixed, link the status to the fixed layer in the copy.
5. **Reply instructions:** "Reply in chat: fix A1, A4 · fix all high · fix all". Add "Fixes go into a copy of this frame. Your original isn't changed."

With more than 25 findings, show all high ones, then group the rest by kind with counts ("12 × Unbound spacing"); every finding is still in the saved data.

## Links

Node-type hyperlinks fail in `use_figma` ("Invalid hyperlink target"). Use URL links: `setRangeHyperlink(start, end, { type: "URL", value: "https://www.figma.com/design/<fileKey>/<fileName>?node-id=<id with : replaced by ->" })`.

## Saved data

`setPluginData` isn't supported in `use_figma`. Use `setSharedPluginData("designos", key, value)`:

| Node | Key | Value |
|---|---|---|
| Report card | `kind` | `report-card` |
| Report card | `reportFor` | audited frame's node ID |
| Report card | `findings` | JSON, below |
| Report card | `gaps` | JSON `[{"gap", "seenIn": ["A3"], "detail"}]` |
| Each finding row | `findingId` | `A3` |
| Fix copy | `kind` | `fix-copy` |
| Fix copy | `fixFor` | audited frame's node ID |

```json
{
  "version": 1,
  "frame": "123:456",
  "audited": "2026-10-09",
  "library": "<Alloy library key>",
  "coverage": 0.82,
  "fixCopy": null,
  "findings": [
    {"id": "A1", "sev": "high", "conf": "high", "title": "Hand-built button",
     "node": "123:789", "detail": "Frame named Button with raw fill and text",
     "fix": "Swap for Button, Variant=Secondary", "status": "open",
     "fixedNode": null, "note": null, "updated": "2026-10-09"}
  ]
}
```

## Updating

- Find an existing card by looking on the page for a node whose `reportFor` matches the audited frame's ID; find the copy by `fixFor`.
- After every audit or fix, rebuild the rows and the gaps callout from the saved data, so the card and the data always match.
- Never delete a card or a fix copy. If the designer wants them gone, they can delete them.
