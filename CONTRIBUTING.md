# Contributing to clarity-design-os

These conventions match [clarity-pm-os CONTRIBUTING](https://github.com/josh-m-kramer/clarity-pm-os/blob/main/CONTRIBUTING.md) so the two plugins work together. Where this file is silent, follow that one. Every change goes through a pull request and ships with a version bump.

## 1. How skills load

The description triggers the skill; the body runs it; references load on demand. Routing goes in the description, the workflow in SKILL.md, depth in references.

## 2. Package layout

```
skills/<name>/
  SKILL.md              required
  references/           optional, one topic per file
  assets/               optional, templates used in outputs
  evals/
    evals.json          required, task evals
    trigger-evals.json  required, should/shouldn't trigger queries
agents/<name>.md        optional, one subagent per file
```

No README or CHANGES.md inside a skill folder. Describe changes in the pull request.

## 3. SKILL.md

- **Name:** prefix with `design-os-` (matches the names `clarity-pm-os` already calls). `name` matches the folder and never changes without a major version bump.
- **Frontmatter, exactly:**
  ```
  ---
  name: "<name>"
  description: "<description>"
  ---
  ```
- **Description:** 500 characters or fewer (hard max 1024). One sentence on what it does; "Use for/when ..." with 3 to 6 trigger phrases; "Not for:" naming at most 3 neighbouring skills, including `pm-os-*` ones.
- **Under 500 lines.** Move depth into `references/`.
- **Imperative voice, with the reason.**
- **Reference files section** listing every file in `references/` and when to read it.
- **Lessons logged** is the last section: at most 3 one-line entries, older ones in `references/lessons-archive.md`.

## 4. Design-specific rules

- **Alloy is the design system.** Point to the Alloy Figma library and `pm-os-clarity-context` `infra/design-system`; don't copy tokens or component specs into a skill.
- **Confirm before every write** to Figma, Linear, Notion, or Slack.
- **Links, not content.** Link Figma files, Notion pages, and Linear issues; don't paste their rules.
- **Teams, owners, and Figma spaces** come from `pm-os-clarity-context` by node key. Never list them in a skill.
- **Write Clarity, not Hiive**, except where `pm-os-clarity-context` Clarity naming allows.

## 5. Roles, not names

Name roles ("the design lead", "the owning PM"), never people, in skills, references, agents, and evals.

## 6. Evals

- `evals/evals.json`: 3 to 5 evals in `skill-creator`'s schema covering the main path, one hard case, and one boundary case.
- `evals/trigger-evals.json`: 8 to 12 queries, about half should trigger; should-nots are near misses from neighbouring skills.

## 7. Versioning

Bump `version` in `.claude-plugin/plugin.json` on every PR that touches `skills/` or `agents/`: patch for fixes, minor for new skills or behavior, major for renaming or removing a skill.

## 8. Checks before merge

- [ ] Version bumped at the right level.
- [ ] Valid frontmatter, `name` matches folder, under 500 lines, all references listed.
- [ ] Description ≤ 500 characters with "Not for:".
- [ ] Writes to Figma, Linear, Notion, or Slack ask first.
- [ ] No person's name; roles only.
- [ ] Both eval files present and valid JSON.
