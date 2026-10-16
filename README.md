# clarity-design-os

The design operating system for Clarity: agent-agnostic skills for Clarity designers that run in Claude (as a plugin) and Codex. Sister plugin to [clarity-pm-os](https://github.com/josh-m-kramer/clarity-pm-os).

Each folder under `skills/` is one skill: a `SKILL.md`, plus `references/` when needed and `evals/` (`evals.json` and `trigger-evals.json`). Each file under `agents/` is one subagent (Claude only). The Claude plugin manifest lives in `.claude-plugin/`; `.agents/skills/` links to `skills/` so Codex finds them. Agent instructions for working in this repo are in [AGENTS.md](AGENTS.md); `CLAUDE.md` just imports it for Claude Code.

## What's new

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

## Skills

| Skill | What it does | Status | Last edited |
|---|---|---|---|
| `design-os-audit-design-system` | Audits a Figma frame for Alloy coverage, adds a report card with fix IDs, and fixes chosen IDs in a copy of the frame | Live | Adam Brodowski (via Claude), Oct 16, 2026 |
| `design-os-design-impact` | Finds every existing screen a brief affects, calls each Fix, Compose, or Extend, recommends one design route, and starts from the current screens on a yes | Live | Adam Brodowski (via Claude), Oct 16, 2026 |
| `design-os-prototype` | Builds coded prototypes from `@hiivemarkets/alloy` components, from a brief or Design Spec or by porting Figma flows, at hi-fi or wires fidelity, adds a standard playground panel for stress testing, keeps each ai-prototypes app's `prototype.json` listing current, and checks the code is on-system | Live | Adam Brodowski (via Claude), Oct 16, 2026 |
| `design-os-prototype-to-figma` | Ports a coded prototype back into Figma as Alloy screens in auto layout with its flow wired, then audits them with `design-os-audit-design-system` and fixes findings in place | Live | Adam Brodowski (via Claude), Oct 16, 2026 |
| `design-os-ping` | Ranked digest of what needs a designer's attention across Slack, Linear, and their Notion task list | Live | Adam Brodowski (via Claude), Oct 16, 2026 |
| `design-os-stress-test-design` | Stress-tests a design for edge cases (long text, high volume, extreme numbers, missing states) and builds data permutations to design against | Live | Adam Brodowski (via Claude), Oct 16, 2026; created by Ernie |
| `design-os-fill-mock-data` | Replaces placeholder content in a Figma frame with realistic, reconciled Clarity mock data, section by section after approval | Live | Adam Brodowski (via Claude), Oct 16, 2026; created by Ernie |
| `design-os-prep-eng-handoff` | Gets ahead of eng handoff: the questions engineers will ask and the backend, permission, and data work the design implies | Live | Adam Brodowski (via Claude), Oct 16, 2026; created by Ernie |
| `design-os-research-patterns` | Researches how 15+ competitors and cross-industry products handle a screen or feature, with tradeoffs and source links | Live | Adam Brodowski (via Claude), Oct 16, 2026; created by Ernie |
| `design-os-create-mocks` | Turns a brief and Design Spec into Figma mocks on Alloy (coded prototypes from a brief: `design-os-prototype`) | Planned | — |
| `design-os-review-design-work` | Critiques a drafted mock or flow | Planned | — |

`design-os-create-mocks`, `design-os-review-design-work`, and `design-os-audit-design-system` are called by `clarity-pm-os` as optional companions.

## Agents

Agents are Claude only. Each file under `agents/` is one subagent.

| Agent | What it does | Last edited |
|---|---|---|
| `design-impact` | Runs `design-os-design-impact` on a Linear issue or project and posts the readout and recommended route as one comment, prefixed `**design-impact · proposal, not a decision**`, in the AI Software Factory Tests project only. Never builds; names the next step and who runs it | Adam Brodowski (via Claude), Oct 16, 2026 |

## Install

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
