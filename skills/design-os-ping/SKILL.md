---
name: "design-os-ping"
description: "Sweep Slack, Linear, and the designer's Notion task list for what needs their attention and return one ranked digest, with Figma links carried through. Use for \"/design-ping\", \"design ping\", \"what's on my plate\", \"what am I missing\", \"catch me up on Slack and Linear\", \"check my tickets and Slack\". Not for: team-wide stalled design asks (design-dragnet), Slack-only catch-up for non-designers (ping), or feature status (pm-os-clarity-context)."
---

# Design OS Ping

Give a designer a fast, honest read on what's waiting on them across Slack, Linear, and their Notion task list. Replace checking three tools with one digest where the top few items are the ones that need them, and everything else is clearly marked as handled or FYI.

## Setup

1. Tools may be deferred. Load the Slack, Linear, and Notion tools with `tool_search` before starting (e.g. "slack search", "linear issues notifications", "notion fetch query memory"). If a source's connector isn't available, run the sweep without it and say which source was skipped in the closing line.
2. **Slack user ID:** take it from the Slack tool descriptions ("Current logged in user's user_id is ..."), or find it with `slack_search_users`.
3. **Linear user:** resolve the current user with the Linear user tool (`get_user` with "me", or match by email via `list_users`).
4. **Time window:** default to the last 3 days. Honor "since Monday", "this week", "today", etc. Use the real current date. The window applies to Slack messages and Linear comments/notifications; assigned Linear issues and Notion tasks are checked regardless of window, since they're standing work.

## Notion task page (ask once, remember)

Each designer keeps their tasks in their own Notion page or database. Find it like this:

1. Search Notion memory (`notion-memory-search`, query like "design-ping task page" or "design-os-ping task page" or "my Notion task list") for a saved link. If found, use it.
2. If not found, ask the user for the link to their Notion task page or database. Once they give it, save it to their Notion memory (parent `memory`) as something like "Design Ping: my Notion task list is <URL>", so future runs skip this step. Read `notion://docs/memory` once first if you haven't this conversation. Never claim a save succeeded if it failed.
3. If they say they don't use one, save that preference too ("Design Ping: no Notion task list") and skip Notion on later runs.

To read it: `notion-fetch` the URL. If it's a database, query it for items that aren't done (status not Done/Complete/Archived), and pull title, status, due date, priority, and any assignee. If it's a plain page, read the to-dos/checklists and treat unchecked items as open.

## Gather

Run sources in parallel where possible.

### Slack
Use `slack_search_public_and_private` (the user is asking for a full sweep; narrow to `slack_search_public` only if they say so). Newest first:

1. **Mentions:** `<@USERID>` everywhere.
2. **DMs and group DMs:** `is:dm`, with `include_bots: true` (approvals and requests often come from bots).
3. **Threads they're in:** `is:thread` from or with the user.

If a search returns a full page, fetch one more page before concluding. Use `slack_read_thread` only when an item looks important and context is cut off or resolution is unclear.

### Linear
1. **Assigned to me:** open issues assigned to the user (exclude Done/Canceled). For each, note state, priority, due date, cycle, last updated, and whether it's blocked. Flag: overdue, due within 2 days, in the current cycle and not started, no update in 7+ days, or blocked.
2. **Mentions and comments:** check `get_notifications` for the window (mentions, comments on issues they're assigned/subscribed to, replies). For anything that looks like a question or request aimed at them, check the comment thread (`list_comments`) to see whether they've already replied.

### Notion
Open tasks from their task page, as above. Flag overdue or due-soon items.

### Figma links
Designers live in Figma. When an item references a figma.com link (in a Slack message, Linear description/comment, or Notion task), carry the link into the digest so they can jump straight to the file.

## Triage

For each item work out: what's being asked, of whom, and whether it's already been dealt with. The user replying last, a "shipped"/"merged" message, an issue moved to Done, or a decision being made usually means it's handled.

**Dedupe across sources.** The same work often shows up as a Linear issue, a Slack thread about it, and a Notion task. Merge into one item, lead with the source that has the actionable ask, and note where else it lives (e.g. "also in #design-crit and your Notion list").

Buckets:

- **Needs you:** a direct question or request with no reply from them, a review or decision they're blocking, an approval pending on them, a Linear issue overdue or due today/tomorrow, or a Notion task due today/tomorrow. Most time-sensitive first.
- **Worth a quick follow-through:** things they said they'd do, partly answered asks, Linear issues gone stale (7+ days without update) or blocked, threads likely to come back to them.
- **On your plate:** remaining open assigned Linear issues and Notion tasks with no urgency signal. One line each, grouped by source; keep compact.
- **Open but not urgent:** active threads where they're cc'd or tagged but nothing is asked of them.
- **Handled / FYI:** resolved items and kudos, one line each. This exists so they trust nothing was skipped, so keep it short.

Be honest about uncertainty: if you can't tell whether something was resolved, say so. Don't inflate: if only two things need them, say two.

## Output format

Casual, direct, skimmable. Lead with the bucket that matters. Each item: source and location (Slack channel or DM partner, Linear issue ID and title, or Notion task), what's being asked, and the state in a sentence or two, with a link (Slack permalink, Linear URL, Notion URL, plus any Figma link). Bold the bucket names; bullets are fine since it's a scan-and-act digest.

Write in the user's voice: use `write-like-me` if installed; otherwise a plain, direct voice. Honor stated style preferences (for example, no em-dashes). No intros or recaps.

Close with one line stating what was covered (window; Slack public + private/DMs; Linear assigned + notifications; Notion task list, or which sources were skipped) and one offer: draft replies for any "Needs you" items, or widen the window.

## Judgment calls

- **Read-only by default.** Never send Slack messages, comment on or change Linear issues, or edit Notion tasks unless the user asks. For Slack replies, prefer `slack_send_message_draft`, because the designer should send it themselves. For Linear or Notion changes, confirm the exact change first.
- **Sensitive personal info** (leave, health, HR or performance matters, personal news): don't repeat details. Say "staffing/coverage question" or similar.
- **Bots and automated pings** count only when they need an action (access approvals, review requests). Ignore informational chatter, including Linear status-change noise.
- **Already-acknowledged asks** (they reacted or replied "will do") go in follow-through until there's evidence it was done.

## Reference files

None.

## Lessons logged

- **Oct 9, 2026 (migration):** Moved from personal `design-ping` into clarity-design-os → uninstall personal copies so the two don't compete to trigger.
