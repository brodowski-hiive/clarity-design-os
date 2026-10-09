Keeping a prototype findable. Read whenever you're working in ai-prototypes.

Prototypes get shared as Slack links and then lost. Every app in ai-prototypes carries a short listing, `apps/<name>/prototype.json`, which `mise run prototypes` reads today and the prototype directory will read later. Write it and keep it current. The designer should barely notice, beyond a one-line preview when they share.

## The file

The schema lives in the repo at `packages/validate-worker/prototype.schema.json`.

```json
{
  "$schema": "../../packages/validate-worker/prototype.schema.json",
  "name": "Sell order",
  "description": "The seller's view of an open sell order, built to test accept, counter, and withdraw before the trading workshop.",
  "owner": "<designer>@hiive.com",
  "status": "in-review",
  "team": "<team from pm-os-clarity-context>",
  "tags": ["sell-side", "bids"],
  "links": { "figma": "https://www.figma.com/design/…", "linear": "https://linear.app/…" }
}
```

| Field | Required | How to fill it |
| --- | --- | --- |
| `name` | yes | Plain title, 60 characters max. "Offer approvals", not `offer-approvals`. |
| `description` | yes | One or two sentences, 300 characters max: what it shows and what question it's testing, in the designer's words. |
| `owner` | yes | Email of the person to ask about it. The scaffold fills it from `git config user.email`. |
| `status` | yes | One of the four below. |
| `team` | no | The team name as `pm-os-clarity-context` has it. Leave it out if unsure. |
| `tags` | no | A few search keywords. |
| `links` | no | Full URLs only: `linear`, `figma`, `slack`, `docs`. |

Status values:

- `exploring`: being built.
- `in-review`: shared for feedback.
- `graduated`: moved into real product work.
- `archived`: kept for reference.

Leave optional fields out rather than guessing. Never invent a link, owner, or team.

## When to update it

| Moment | Update |
| --- | --- |
| Right after scaffolding | `name` and `description` from the request |
| Ported from Figma | `links.figma` set to the frame or page URL the designer gave |
| A Linear issue or Slack thread comes up | Add it to `links` |
| Before opening a PR | Make the description match what was built; `in-review` if sharing for feedback |
| The designer says it shipped, moved to engineering, or is dead | `graduated` or `archived` |

## The share preview

When you share the PR link, add one line the designer can correct:

> Listed as **Offer approvals**: "Approve or reject incoming offers in bulk, testing whether a queue beats the per-offer page." Say if anything's off.

If they correct it, update the file and push to the same branch.

## Checking it

`mise run validate <name>` checks the listing.

- **Warnings (don't block CI):** a missing file, TODO fields, over-length text, unknown fields, or bad links.
- **Failures:** invalid JSON or an unknown status.

Clear the warnings before you call a prototype done.

If the repo doesn't have `prototype.schema.json` yet, the listing change hasn't merged there. Still write `prototype.json` in this shape. Don't touch the validator, scaffold, or root CLAUDE.md from a prototype PR; those belong to the platform owners.

## Someone else's listing

For "update the prototype listing for X":

1. Read the app's `README.md` and `src/components/`.
2. Draft `name` and `description` from what the prototype actually does, and show the draft before saving.
3. If `owner` is TODO, ask who owns it rather than guessing.
