# Getting started with Design OS

Design OS is a plugin for Claude that adds design skills: coded prototypes built from Alloy, Figma audits, realistic mock data, edge-case stress tests, pattern research, eng handoff prep, and a "what needs my attention" digest.

Setup takes about 15 minutes. You don't need to know git or use a terminal.

## What you need

- The Claude desktop app, signed in with your Clarity work account
- A GitHub account. No account yet? Sign up free at [github.com/signup](https://github.com/signup)
- Your usual Figma, Linear, Notion and Slack accounts

## How the repo works

[brodowski-hiive/clarity-design-os](https://github.com/brodowski-hiive/clarity-design-os) is the source of truth for every skill. The copy installed in Claude is read-only, so changes go through a pull request: edit on a branch, the Design OS owner reviews and merges, and the version is bumped. You get the change when you click **Update** in Claude.

## Step 1: Get access to the repo

The repo is public, so anyone can install the plugin. Access lets you propose changes to skills.

1. Don't have a GitHub account? Create one at [github.com/signup](https://github.com/signup), then verify your email.
2. Send your GitHub username to the Design OS owner (listed in the Notion Product Team Directory).
3. You'll get an email: *"… invited you to collaborate on brodowski-hiive/clarity-design-os"*. Click **View invitation**, then **Accept invitation**.
4. No email? Go to [github.com/notifications](https://github.com/notifications) or check spam. Invites expire after 7 days; ask for a new one if it lapses.

## Step 2: Install the plugin in Claude

1. Open the Claude desktop app and go to **Customize** → **Plugins**.
2. Click **+** next to **Personal plugins**, then **Add marketplace**.
3. Choose to add from a repository and paste:
   ```
   brodowski-hiive/clarity-design-os
   ```
   If Claude warns that the plugins aren't controlled by Anthropic, that's expected. This one is ours.
4. Find **clarity-design-os** in the list and click **Install**.
5. Quit and reopen Claude, then start a new chat.

Using Claude Code instead? Run these two commands:

```
/plugin marketplace add brodowski-hiive/clarity-design-os
/plugin install clarity-design-os@clarity-design-os
```

## Step 3: Connect your tools

The skills read from Figma, Linear, Notion and Slack. In Claude, open **Connectors** (under Customize or Settings) and connect each one you use. Figma matters most. `design-os-placeholder-copy` also reads a Google Doc, so connect Google Drive if you write copy.

## Step 4: Try it

Start a new chat and type one of these:

| Type this | What you get |
|---|---|
| `design ping` | A ranked list of what needs your attention across Slack, Linear and Notion |
| `audit my frame` + a Figma frame link | A report card of where the frame drifts from Alloy, with fixes |
| `fill in mock data` + a Figma frame link | Placeholder text replaced with realistic Clarity data |
| `stress test this screen` + a Figma link | Edge cases: long names, huge numbers, empty states |
| `how do competitors handle a data room?` | Pattern research across 15+ products, with links |
| `build a prototype of this` + a Figma link or brief | A clickable prototype built from real Alloy components |

The [README](README.md) lists every skill.

## Staying up to date

When a new version ships, **Customize** → **Plugins** shows an **Update** button on clarity-design-os. Click it, restart Claude, and start a new chat.

## Remove old personal copies

If you added design skills to Claude yourself before, delete them under **Customize** → **Skills**, or two copies will compete. Old names to look for: `design-edge-cases`, `design-mock-data`, `design-eng-handoff`, `design-pattern-research`, `design-prototype`, `design-os-alloy-prototype`.

## Want to change a skill? (optional)

You can do this entirely on github.com:

1. Open the skill's file, for example `skills/design-os-ping/SKILL.md`.
2. Click the pencil icon (**Edit this file**) and make your change.
3. Click **Commit changes…**, choose **Create a new branch for this commit and start a pull request**, then **Propose changes**.
4. On the next page, say what you changed and why, then click **Create pull request**. The Design OS owner reviews and merges it.

Not sure how to word the change? Ask Claude to draft it with you first. The house rules are in [CONTRIBUTING.md](CONTRIBUTING.md).

## If something goes wrong

- **"Check the repository URL" when adding the marketplace:** paste exactly `brodowski-hiive/clarity-design-os`, or the full link `https://github.com/brodowski-hiive/clarity-design-os`.
- **Skills don't show up:** quit and reopen Claude, then start a new chat.
- **A skill says it can't reach Figma (or Linear, Notion, Slack):** connect that tool in step 3.
- **Still stuck:** ask in the design channel.
