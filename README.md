# clarity-design-os

The design operating system for Clarity, packaged as a Claude plugin for Clarity designers. Sister plugin to [clarity-pm-os](https://github.com/josh-m-kramer/clarity-pm-os).

Each folder under `skills/` is one skill: a `SKILL.md`, plus `references/` when needed and `evals/` (`evals.json` and `trigger-evals.json`). Each file under `agents/` is one subagent. The plugin manifest lives in `.claude-plugin/`.

## What's new

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
| `design-os-audit-design-system` | Audits a Figma frame for Alloy coverage, adds a report card with fix IDs, and fixes chosen IDs in a copy of the frame | Live | Adam Brodowski, Oct 15, 2026 |
| `design-os-prototype` | Builds coded prototypes from `@hiivemarkets/alloy` components, ports Figma flows, adds a standard playground panel for stress testing, keeps each ai-prototypes app's `prototype.json` listing current, and checks the code is on-system | Live | Adam Brodowski (via Claude), Oct 15, 2026 |
| `design-os-prototype-to-figma` | Ports a coded prototype back into Figma as Alloy screens in auto layout with its flow wired, then audits them with `design-os-audit-design-system` and fixes findings in place | Live | Adam Brodowski, Oct 15, 2026 |
| `design-os-ping` | Ranked digest of what needs a designer's attention across Slack, Linear, and their Notion task list | Live | Adam Brodowski, Oct 9, 2026 |
| `design-os-stress-test-design` | Stress-tests a design for edge cases (long text, high volume, extreme numbers, missing states) and builds data permutations to design against | Live | Adam Brodowski (via Claude), Oct 15, 2026; created by Ernie |
| `design-os-fill-mock-data` | Replaces placeholder content in a Figma frame with realistic, reconciled Clarity mock data, section by section after approval | Live | Adam Brodowski (via Claude), Oct 15, 2026; created by Ernie |
| `design-os-prep-eng-handoff` | Gets ahead of eng handoff: the questions engineers will ask and the backend, permission, and data work the design implies | Live | Adam Brodowski (via Claude), Oct 15, 2026; created by Ernie |
| `design-os-research-patterns` | Researches how 15+ competitors and cross-industry products handle a screen or feature, with tradeoffs and source links | Live | Adam Brodowski (via Claude), Oct 15, 2026; created by Ernie |
| `design-os-create-mocks` | Turns a brief and Design Spec into mocks or a prototype on Alloy | Planned | — |
| `design-os-review-design-work` | Critiques a drafted mock or flow | Planned | — |

`design-os-create-mocks`, `design-os-review-design-work`, and `design-os-audit-design-system` are called by `clarity-pm-os` as optional companions.

## Agents

_None yet._

## Install

**Cowork / Claude (desktop and web)**

- Recommended: an org admin syncs this repo under **Organization settings → Plugins**, so every Clarity designer gets it.
- Or add the marketplace yourself from this GitHub repo (`brodowski-hiive/clarity-design-os`) and install the `clarity-design-os` plugin.

**Claude Code**

```
/plugin marketplace add brodowski-hiive/clarity-design-os
/plugin install clarity-design-os@clarity-design-os
```

## Companions

| Skill / plugin | Used for |
|---|---|
| `clarity-pm-os` | Briefs, Design Specs, and context (`pm-os-clarity-context`) that design skills read |
| `hiive-brand` | Clarity naming, voice, deck and document styling |
| `compliance-review` | Any client- or public-facing copy in mocks |

## Migrating from personal copies

If you installed any of these skills as personal skills, uninstall those copies after installing the plugin. Otherwise two copies compete to trigger.

Four skills were renamed when they joined the plugin in 1.2.0. Remove any personal copy of the old name: `design-edge-cases` (now `design-os-stress-test-design`), `design-mock-data` (now `design-os-fill-mock-data`), `design-eng-handoff` (now `design-os-prep-eng-handoff`), and `design-pattern-research` (now `design-os-research-patterns`).

`design-os-alloy-prototype` was renamed to `design-os-prototype` in 1.0.0. Remove any personal copy of either name, including `design-prototype` or `design-os-prototype` installed from a `.skill` file.

## Updating

- This repo is the source of truth. Plugin skills are read-only for users; never edit an installed copy.
- Change a skill through a pull request. Follow [CONTRIBUTING.md](CONTRIBUTING.md).
- Every merged change bumps `version` in `.claude-plugin/plugin.json` (semver). Users only receive changes when the version is bumped.
- In Claude Code, run `/plugin marketplace update clarity-design-os`. In Claude desktop, click Update on the plugin, then restart Claude and start a new chat.

## Evergreen rule

Skills, references, agents, and evals name roles, never people. Who holds each role lives in the Notion Product Team Directory. When someone changes roles, update the directory, not the plugin.

The one exception is this README: the What's new notes and the Last edited column record who did the work. Skills never read them.
