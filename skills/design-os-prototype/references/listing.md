Getting a prototype into the Clarity Design directory and keeping its card accurate. Read whenever you're in ai-prototypes, and before sharing any prototype.

Prototypes shared only as Slack links get lost. The directory (`apps/clarity-design` in ai-prototypes) lists every app in `apps/` on `main`, so a prototype shows up once it's an app in the repo and its PR has merged. `prototype.json` decides how its card reads. Write it and keep it current. The person should barely notice beyond a one-line preview when they share.

## What the directory lists

- **Every app in `apps/` with a `wrangler.jsonc`,** which means anything made with `mise run new`. A folder copied in by hand without the scaffold doesn't show up.
- **From `main` only.** A prototype appears after its PR merges, not while the PR is open. A PR preview URL is for review, not for the directory.
- **How each card is filled,** best source first: `apps/<name>/prototype.json`, then drafted listings in the directory's `src/drafts.ts`, then the app's README (title and first paragraph) and git history. Without a listing, the owner is whoever committed first, and the status is guessed from activity.
- **Edits made in the directory win.** Anyone can change status and team from a card, and those edits override `prototype.json`. If the card disagrees with the file, the directory is showing someone's edit, so don't fight it from the file.
- **Added by link:** work hosted outside the repo can be added in the directory by its URL. It gets line art instead of a screenshot and no code link. Treat this as the fallback, not the default.

## The file

```json
{
  "name": "Sell order",
  "description": "The seller's view of an open sell order, built to test accept, counter, and withdraw before the trading workshop.",
  "owner": "<person>@hiive.com",
  "status": "in-review",
  "team": "Trading",
  "tags": ["sell-side", "bids"],
  "links": { "figma": "https://www.figma.com/design/…", "linear": "https://linear.app/…", "docs": "https://www.notion.so/…" }
}
```

| Field | Required | How to fill it |
| --- | --- | --- |
| `name` | yes | Plain title, 60 characters max. "Offer approvals", not `offer-approvals`. |
| `description` | yes | One or two sentences, 300 characters max: what it shows and what question it tests, in the person's words. Draft it and check with them. |
| `owner` | yes | A real email for the person to ask about it, usually the person you're working with (`git config user.email`). The directory ignores anything that isn't an email. |
| `status` | yes | One of the four below, spelled exactly. |
| `team` | no | A pod name from the directory's `apps/clarity-design/src/org.ts` (`TEAM_NAMES`), or `Cross-team`. Any other value is ignored, and the card falls back to the owner's pod. Ask if unsure. |
| `tags` | no | A few search keywords. |
| `links` | no | Full `https` URLs only, and only these keys: `linear`, `figma`, `slack`, `docs`. Any other key is dropped. |

Status values the directory accepts:

- `exploring`: being built.
- `in-review`: shared for feedback.
- `in-development`: moved into real product work.
- `archived`: kept for reference.

Leave optional fields out rather than guessing. Never invent a link, owner, or team.

## When to update it

| Moment | Update |
| --- | --- |
| Right after `mise run new` | `name`, `description`, `owner`, `status: exploring`, and `team` if known |
| Ported from Figma | `links.figma` set to the frame or page URL the person gave |
| Built from a brief | `links.docs` set to the brief, and `links.linear` to its project or issue |
| A Linear issue or Slack thread comes up | Add it to `links` |
| Before opening a PR | Make the description match what was built; `in-review` if sharing for feedback |
| The person says it moved to engineering, or it's dead | `in-development` or `archived` |

## The share preview

When you share the PR link, add one line the person can correct, and say when it will appear:

> Listed as **Offer approvals** under Trading: "Approve or reject incoming offers in bulk, testing whether a queue beats the per-offer page." It shows up in the Clarity Design directory once this PR merges. Say if anything's off.

If they correct it, update the file and push to the same branch.

## Screenshot (optional)

Cards show a screenshot from `apps/clarity-design/public/previews/<name>.jpg`, or line art when there's none. After the app runs locally, offer to capture one: `pnpm previews <name>` from `apps/clarity-design`. That changes a second app, so put it in its own commit and say so in the PR. Skip it if the person doesn't want it; line art is fine.

## Checking it

Before calling a prototype done, confirm:

- `apps/<name>/wrangler.jsonc` exists, so the directory will list the app.
- `prototype.json` is valid JSON, and `status` and `team` are values from the lists above.
- Every link is a full URL.

If the repo later adds a listing check to `mise run validate`, run it and clear its warnings too.

## Prototype built outside the repo

Something built in another folder, a plain HTML file, or a Claude, Figma Make or Vercel link isn't in the directory. When one comes up, offer to move it in:

1. Check `apps/` first. If it's already there, update that app instead of making a copy.
2. `mise run new <name>`, bring the code into `apps/<name>`, and keep how it looks and works. Swap in Alloy only where that doesn't change the design.
3. Remove real customer data, keys and passwords. Visible text says Clarity.
4. Write `prototype.json`, run it, check it loads with no errors, and open the PR per the repo's agent instructions file.

If the person can't use the repo (no access yet), say so and point them to the directory's **Add prototype → Add a link** as a stopgap.

## Someone else's listing

For "update the prototype listing for X":

1. Read the app's `README.md` and `src/components/`.
2. Draft `name` and `description` from what the prototype actually does, and show the draft before saving.
3. If you don't know the owner, ask rather than guessing.
