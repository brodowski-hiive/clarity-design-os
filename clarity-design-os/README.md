# clarity-design-os

The design operating system for Clarity, packaged as a Claude plugin for Clarity designers. Sister plugin to [clarity-pm-os](https://github.com/josh-m-kramer/clarity-pm-os).

Each folder under `skills/` is one skill: a `SKILL.md`, plus `references/` when needed and `evals/` (`evals.json` and `trigger-evals.json`). Each file under `agents/` is one subagent. The plugin manifest lives in `.claude-plugin/`.

## Skills

_None yet._ `clarity-pm-os` already calls these as optional companions, so they are the first to build:

| Skill | What it does | Status |
|---|---|---|
| `design-os-create-mocks` | Turns a brief and Design Spec into mocks or a prototype on Alloy | Planned |
| `design-os-review-design-work` | Critiques a drafted mock or flow | Planned |
| `design-os-audit-design-system` | Design-system drift and coverage audits | Planned |

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

## Updating

- This repo is the source of truth. Plugin skills are read-only for users; never edit an installed copy.
- Change a skill through a pull request. Follow [CONTRIBUTING.md](CONTRIBUTING.md).
- Every merged change bumps `version` in `.claude-plugin/plugin.json` (semver). Users only receive changes when the version is bumped.
- In Claude Code, run `/plugin marketplace update clarity-design-os`. In Claude desktop, click Update on the plugin, then restart Claude and start a new chat.

## Evergreen rule

Plugin content names roles, never people. Who holds each role lives in the Notion Product Team Directory. When someone changes roles, update the directory, not the plugin.
