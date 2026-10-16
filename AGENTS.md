# AGENTS.md

Instructions for any coding agent (Codex, Claude Code, Cursor, and others) working in this repo. This is the only agent instructions file. `CLAUDE.md` is a one-line import of this file so Claude Code reads it too; keep it that way and put every instruction here, never in a tool-specific copy.

## What this repo is

The Clarity design operating system: a set of [Agent Skills](https://agentskills.io) for Clarity designers. Each folder under `skills/` is one skill (`SKILL.md`, plus `references/`, `assets/`, and `evals/`). The skills follow the open `SKILL.md` format, so any agent that reads it can use them:

- **Codex** finds them through `.agents/skills/`, a symlink to `skills/`, when working in this repo. To use them elsewhere, see Install in [README.md](README.md).
- **Claude** (Code, desktop, web) installs them as a plugin from `.claude-plugin/`.

`skills/` is the source of truth. Never edit through `.agents/skills/` as if it were a copy, and never add files there.

## Working on a skill

Follow [CONTRIBUTING.md](CONTRIBUTING.md). The rules that trip agents up most:

- **Frontmatter is exactly `name` and `description`.** `name` matches the folder. Description ≤ 500 characters with "Use for" triggers and "Not for:".
- **`SKILL.md` under 500 lines**, with a Reference files section listing every file in `references/`, and Lessons logged last (at most 3 entries).
- **Agent-agnostic wording** (CONTRIBUTING section 5). Write "ask the designer", "fetch the page", "search the web", not one product's tool names. Where a tool name helps, give it as an example for each client ("for example `AskUserQuestion` in Claude Code") and a plain-text fallback.
- **Roles, never people,** in skills, references, and evals.
- **Confirm before every write** to Figma, Linear, Notion, or Slack.
- **Every change bumps `version`** in `.claude-plugin/plugin.json` and adds a What's new entry and Last edited dates in README.md.

## Checks

There is no build. Before finishing, check:

```
# every eval file is valid JSON
for f in skills/*/evals/*.json; do python3 -m json.tool "$f" > /dev/null || echo "bad: $f"; done
# SKILL.md line counts (must be < 500)
wc -l skills/*/SKILL.md
```

Then confirm each skill's description length and that `name` matches its folder.
