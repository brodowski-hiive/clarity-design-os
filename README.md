# clarity-design-os

The design operating system for Clarity: agent-agnostic skills for Clarity designers that run in Claude (as a plugin) and Codex. Sister plugin to [clarity-pm-os](https://github.com/josh-m-kramer/clarity-pm-os).

> **New to Design OS? Start with [ONBOARDING.md](ONBOARDING.md).** It walks you through getting repo access, installing the plugin in Claude, connecting Figma, Linear, Notion and Slack, and the first skills to try. About 15 minutes, no git or terminal needed.
>
> **Need help?** Ask in the design channel, or contact the Design OS owner (listed in the Notion Product Team Directory).

## Skills

| Skill | What it does | Status | Last edited |
|---|---|---|---|
| `design-os-audit-design-system` | Audits a Figma frame for Alloy coverage, adds a report card with fix IDs, and fixes chosen IDs in a copy of the frame | Live | Adam Brodowski (via Claude), Oct 21, 2026 |
| `design-os-design-impact` | Finds every existing screen a brief affects, calls each Fix, Compose, or Extend, recommends one design route, and hands off to `design-os-design-setup` on a yes | Live | Adam Brodowski (via Claude), Oct 21, 2026 |
| `design-os-design-setup` | Turns a design-impact readout into a ready-to-work workspace: a Figma page cloned from the team's prior frames with notes, stickies, paste-in placeholders and empty boards; a coded as-is baseline; or a Notion/FigJam workspace. Then reviews and organizes it as a designer | Live | Adam Brodowski (via Claude), Oct 21, 2026 |
| `design-os-prototype` | Builds coded prototypes from `@hiivemarkets/alloy` components, from a brief or Design Spec or by porting Figma flows, at hi-fi or wires fidelity, adds a playground panel for stress testing (in the default or another style), keeps each ai-prototypes app's `prototype.json` listing current, and checks the code is on-system | Live | Daniel Stein (via Claude), Oct 21, 2026 |
| `dopetycoon` (playground style in `design-os-prototype`) | Styles your playground like a vintage video game, making it stand out from Clarity UI. Not the default: ask for it by name, e.g. "add a dopetycoon playground to my prototype" | Live | Daniel Stein (via Claude), Oct 21, 2026 |
| `design-os-prototype-to-figma` | Ports a coded prototype into Figma as a version-stamped working copy (Alloy screens in auto layout, flow wired) for detailed review while code stays canonical, audits it with `design-os-audit-design-system`, fixes findings in place, tidies the section into flow order, and supersedes old ports on a re-port | Live | Adam Brodowski (via Claude), Oct 16, 2026 |
| `design-os-ping` | Ranked digest of what needs a designer's attention across Slack, Linear, and their Notion task list | Live | Adam Brodowski (via Claude), Oct 21, 2026 |
| `design-os-stress-test-design` | Stress-tests a design for edge cases (long text, high volume, extreme numbers, missing states) and builds data permutations to design against | Live | Adam Brodowski (via Claude), Oct 21, 2026; created by Ernie |
| `design-os-fill-mock-data` | Replaces placeholder content in a Figma frame with realistic, reconciled Clarity mock data, section by section after approval | Live | Adam Brodowski (via Claude), Oct 21, 2026; created by Ernie |
| `design-os-prep-eng-handoff` | Gets ahead of eng handoff: the questions engineers will ask and the backend, permission, and data work the design implies | Live | Adam Brodowski (via Claude), Oct 21, 2026; created by Ernie |
| `design-os-research-patterns` | Researches how 15+ competitors and cross-industry products handle a screen or feature, with tradeoffs and source links | Live | Adam Brodowski (via Claude), Oct 21, 2026; created by Ernie |
| `design-os-design-decisions` | Makes design calls with the designer (checks the guidelines log and Alloy, recommends one option with its reason and review level), logs confirmed calls to the Design guidelines log in Notion with IDs, answers "what did we decide?", and ships an Active-guidelines snapshot with each release | Live | Adam Brodowski (via Claude), Oct 21, 2026 |
| `design-os-write-skill` | Writes or revises a design-os skill so it changes what an agent does: decides whether a rule belongs in a new skill or an existing one, turns a designer's notes into steps with reasons, cuts what doesn't change behavior, and tests it against a baseline. Principles adapted from Emil Kowalski's guidance on writing skills | Live | Ellen Pennock (via Claude), Oct 22, 2026 |
| `design-os-create-mocks` | Turns a brief and Design Spec into Figma mocks on Alloy (coded prototypes from a brief: `design-os-prototype`) | Planned | — |
| `design-os-review-design-work` | Critiques a drafted mock or flow | Planned | — |

`design-os-create-mocks`, `design-os-review-design-work`, and `design-os-audit-design-system` are called by `clarity-pm-os` as optional companions.

## Agents

Agents are Claude only. Each file under `agents/` is one subagent.

| Agent | What it does | Last edited |
|---|---|---|
| `design-impact` | Runs `design-os-design-impact` on a Linear issue or project and posts the readout and recommended route as one comment, prefixed `**design-impact · proposal, not a decision**`, in the AI Software Factory Tests project only. Never builds; names the next step, `design-os-design-setup`, and who runs it | Adam Brodowski (via Claude), Oct 16, 2026 |
| `design-setup` | Runs `design-os-design-setup` after the route and place to work are agreed: finds prior work, clones it into a labelled working page, adds notes, stickies, paste-ins and NEW boards. Never changes the team's original pages | Adam Brodowski (via Claude), Oct 16, 2026 |
| `design-workspace-review` | Opens a Figma page or section cold as a Clarity designer. Brief mode checks flow coverage and states against the brief, then organizes on a yes; tidy mode organizes a ported prototype section. Never changes what a screen contains | Adam Brodowski (via Claude), Oct 16, 2026 |

## Install

New to Design OS? Start with [ONBOARDING.md](ONBOARDING.md).

**Cowork / Claude (desktop and web)**

- Recommended: an org admin syncs this repo under **Organization settings → Plugins**, so every Clarity designer gets it.
- Or add the marketplace yourself from this GitHub repo (`brodowski-hiive/clarity-design-os`) and install the `clarity-design-os` plugin.

**Claude Code**

```
/plugin marketplace add brodowski-hiive/clarity-design-os
/plugin install clarity-design-os@clarity-design-os
```

**Codex**

Working inside this repo, Codex finds the skills on its own through `.agents/skills/`. To use them in any project, clone the repo once and link each skill into your user skills folder:

```
git clone https://github.com/brodowski-hiive/clarity-design-os ~/clarity-design-os
mkdir -p ~/.agents/skills
for d in ~/clarity-design-os/skills/*/; do ln -s "${d%/}" ~/.agents/skills/; done
```

Restart Codex, then ask for a skill by name (for example `$design-os-prototype`) or describe the task. If your Codex version reads skills from `~/.codex/skills` instead, link them there. The skills call the Figma, Linear, Notion, and Slack MCP servers; add the ones you need to Codex's MCP config.

Other agents that read `SKILL.md` (Cursor and others) can link the same `skills/` folders into their own skills directory.

## Repo layout

Each folder under `skills/` is one skill: a `SKILL.md`, plus `references/` when needed and `evals/` (`evals.json` and `trigger-evals.json`). Each file under `agents/` is one subagent (Claude only). The Claude plugin manifest lives in `.claude-plugin/`; `.agents/skills/` links to `skills/` so Codex finds them. Agent instructions for working in this repo are in [AGENTS.md](AGENTS.md); `CLAUDE.md` just imports it for Claude Code.

## What's new

**1.10.0 (Oct 22, 2026)**
- New `design-os-write-skill`: how to write a design-os skill that changes what an agent does. It decides first whether a rule belongs in a new skill, an existing skill, its references, or the design guidelines log. Then it sorts a designer's notes into rules, reasons, stories and values, and asks about any value nobody gave rather than inventing one. Figma and Alloy names are checked live, and every check names what the agent reads to answer it. Finally it tests the skill against a baseline run. The six writing principles are adapted from Emil Kowalski's guidance. AGENTS.md now points contributors to it.

**1.9.0 (Oct 21, 2026)**
- `design-os-prototype` playgrounds come in styles. Every style runs on the same engine and config, so a prototype can switch looks by swapping two files. The first new one is dopetycoon, a retro pixel "Playground.exe" window from the fund offerings prototype: draggable, resizable from any edge or corner, with maximize, and its option groups flow into columns when it's wide. Default stays the onyx panel. `references/playground-styles.md` lists the styles and explains how to add your own.

**1.8.0 (Oct 21, 2026)**
- New `design-os-design-decisions`: the design team's guidelines log. It checks the Design guidelines log in Notion and Alloy's docs, recommends one call with its reason, alternatives and review level (designer, lead designer, working council, DOPE council), and logs it only after the designer confirms. Entries get `DG-` IDs, a scope (System, Surface, or Feature) and are superseded rather than edited. It also answers "what did we decide about X", checks a frame against the guidelines, lists what's waiting on council, and can seed the log from the weekly DS Changelog. `references/guidelines-snapshot.md` keeps a copy of the Active guidelines in git for agents without Notion, refreshed before each release.
- Other skills read the log before they judge: the audit (an allowed exception isn't a finding), prep-eng-handoff, stress-test (truncation, states, formats) and fill-mock-data (formatting). The audit, prototype receipt (New patterns) and research-patterns offer to log calls once the designer makes them.
- Trigger fixes from a skill audit: impact no longer claims "what screens does this touch" (system map's phrase), setup's and research-patterns' `Not for` point at skills that exist, prep-eng-handoff drops "eng review" (it caught PR reviews), research-patterns drops "inspiration for this screen" (Mobbin's), and ping drops "what am I missing" and the missing `design-dragnet`. Each gets a near-miss trigger eval.

**1.7.0 (Oct 16, 2026)**
- `design-os-prototype-to-figma` treats the Figma port as a working copy for detailed review, with code as the source of truth. Each section is stamped with the source commit and date and carries a port note, which the tidy pass keeps as the section header. Re-porting builds a new section, says how many commits the code has moved, and marks the old one superseded without deleting it or its comments.
- `design-os-prototype` brings a ported section back into its existing app: it finds what the designer changed by comparing frames with the running prototype, then offers a re-port.
- `design-os-audit-design-system` won't fix frames from a superseded port, in place or in a copy, and points to the current section instead.

**1.6.0 (Oct 16, 2026)**
- New `design-os-design-setup`: takes a design-impact readout and builds the workspace for the route. For Figma it reads the team's files page by page to find earlier design work, asks once where to work (a labelled page in the team file, your duplicate, or a drafts file), clones prior frames into one section per group with a notes-and-links frame, sticky notes (keep, change, drop, check, maybe, open question), empty NEW boards, and orange paste-in placeholders for anything in another file. Coded routes get the as-is baseline with a Today/Proposed switch and per-screen notes; teams without a Figma file get a Notion workspace or a FigJam board. Ends with a designer's review that, on a yes, reorganizes the page.
- `design-os-design-impact` now only assesses: it reports earlier design work, lists a team file's pages before saying "not found", and hands to setup on a yes. The handoff package moved to setup.
- `design-os-prototype-to-figma` tidies its section after the audit: columns in flow order, a header with the source and links, flow labels, Needs designer stickies, no overlapping report cards.
- New agents (Claude only): `design-setup` builds the workspace; `design-workspace-review` reviews it cold and follows through on organisation (brief mode), or tidies a ported section (tidy mode).

**1.5.0 (Oct 16, 2026)**
- New `design-os-design-impact`: reads a brief, Linear item, or idea, finds every existing Clarity screen it affects (with the source and confidence for each), calls each change Fix, Compose, or Extend, and recommends one design route: no design, coded wires, coded hi-fi, Figma, or a designer. On one yes it starts from the screens as they ship: a committed as-is baseline with a Today/Proposed switch for the coded routes, an annotated `<feature> · design impact` page in a copy of the team's file for Figma, or a handoff package for the owning team's Design lead.
- New agent `design-impact` (Claude only) runs the skill on a Linear issue or project and posts the readout and route as one proposal comment in the factory test project. It never builds. A note for the VP Product: pm-os's orchestrator and design-specialist could call it first in the design stage.
- `design-os-prototype` has a wires fidelity: `assets/wires/wires.css` turns Alloy greyscale by redefining its own `--ds-*` variables, renders images and charts as placeholder blocks, and labels the page "Wireframe", while the components stay real Alloy. The receipt adds a Fidelity line, and the self-check exempts `wires.css` from the raw-color rule.
- `design-os-prototype` setup fix: in ai-prototypes, keep the scaffold's `@source "../node_modules/@hiivemarkets/alloy/dist"` line, as the repo's agent instructions require. Elsewhere, follow the package's own setup.

**1.4.0 (Oct 16, 2026)**
- `design-os-prototype` builds from a Product Brief, with or without a Design Spec. It names the question the prototype answers, starts from the screen as it ships today, and plans states from the spec's scenario matrix (or derives them from the brief and marks them derived). The plan is confirmed before building. The receipt adds Source, Testing, Coverage and New patterns.
- Covers PMs bringing a clickable prototype to the M and L scope review before a Design Spec exists. Controlled work gets a prototype only, never production code.
- New prototypes go in ai-prototypes so the Clarity Design directory (`apps/clarity-design`) lists them once their PR merges. Work built elsewhere gets an offer to move it in, with the directory's Add a link as the fallback. The listing guide now matches the fields the directory reads: statuses are `exploring`, `in-review`, `in-development` and `archived`, and team is a pod name from the directory's list. Sharing offers a card screenshot.
- `design-os-create-mocks` stays planned and is now described as Figma mocks only; coded prototypes from a brief belong to `design-os-prototype`.

**1.3.0 (Oct 16, 2026)**
- Skills are agent-agnostic, so Codex can run them too: tool names are examples per client with a plain-text fallback, Figma tools are named by their MCP server, and pointers to another repo's `CLAUDE.md` now read "its agent instructions file (`AGENTS.md`, or `CLAUDE.md`)".
- New `AGENTS.md` for any coding agent working in this repo (`CLAUDE.md` is a one-line import of it, so Claude Code reads the same file), and `.agents/skills/` so Codex picks up the skills here. Install steps for Codex below.
- CONTRIBUTING has a new section 5, Agent-agnostic, and a matching merge check.

**1.2.0 (Oct 15, 2026)**
- Four skills created by Ernie join the plugin, renamed to the `design-os-` convention: `design-os-stress-test-design`, `design-os-fill-mock-data`, `design-os-prep-eng-handoff`, and `design-os-research-patterns`. Uninstall any personal copies under the old names (see Migrating below).
- `design-os-stress-test-design` can turn its permutations into playground controls for coded prototypes, through `design-os-prototype`.
- `design-os-prep-eng-handoff` reads the initiative record and the architecture docs in `pm-os-clarity-context` first, so it only asks what's still open.
- All four pass their trigger evals ([#4](https://github.com/brodowski-hiive/clarity-design-os/pull/4)).

**1.1.0 (Oct 15, 2026)**
- New `design-os-prototype-to-figma`: ports a coded prototype back into Figma as Alloy screens with the flow wired, then audits and fixes them.
- `design-os-audit-design-system` fixes ported prototype frames in place.

**1.0.0 (Oct 9, 2026)**
- `design-os-alloy-prototype` renamed to `design-os-prototype`, with Figma-to-prototype porting and the playground panel.
- Earlier 0.x releases added `design-os-ping` and `design-os-audit-design-system`.

## Companions

| Skill / plugin | Used for |
|---|---|
| `clarity-pm-os` | Briefs, Design Specs, and context (`pm-os-clarity-context`) that design skills read |
| `hiive-brand` | Clarity naming, voice, deck and document styling |
| `compliance-review` | Any client- or public-facing copy in mocks |
| `design-os-system-map` | Org-managed. Places work on the Clarity system map; `design-os-design-impact` reads its readout to find affected pages |

## Migrating from personal copies

If you installed any of these skills as personal skills (in Claude, or copied into `~/.agents/skills` or `~/.codex/skills` for Codex), uninstall those copies after installing the plugin. Otherwise two copies compete to trigger.

Four skills were renamed when they joined the plugin in 1.2.0. Remove any personal copy of the old name: `design-edge-cases` (now `design-os-stress-test-design`), `design-mock-data` (now `design-os-fill-mock-data`), `design-eng-handoff` (now `design-os-prep-eng-handoff`), and `design-pattern-research` (now `design-os-research-patterns`).

`design-os-alloy-prototype` was renamed to `design-os-prototype` in 1.0.0. Remove any personal copy of either name, including `design-prototype` or `design-os-prototype` installed from a `.skill` file.

## Updating

- This repo is the source of truth. Plugin skills are read-only for users; never edit an installed copy.
- Change a skill through a pull request. Follow [CONTRIBUTING.md](CONTRIBUTING.md).
- Every merged change bumps `version` in `.claude-plugin/plugin.json` (semver). Users only receive changes when the version is bumped.
- In Claude Code, run `/plugin marketplace update clarity-design-os`. In Claude desktop, click Update on the plugin, then restart Claude and start a new chat. In Codex, run `git -C ~/clarity-design-os pull` and restart Codex.

## Evergreen rule

Skills, references, agents, and evals name roles, never people. Who holds each role lives in the Notion Product Team Directory. When someone changes roles, update the directory, not the plugin.

The one exception is this README: the What's new notes and the Last edited column record who did the work. Skills never read them.
