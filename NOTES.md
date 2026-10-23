# Notes

Working notes for whoever picks this repo up next. What shipped in each release is in README.md, What's new; this file keeps the reasons behind it and anything left unfinished.

## Sessions

**Oct 23, 2026: 1.10.0**
- `design-os-placeholder-copy` came in as a zip of content design's `clarity-design-tools` repo (plugin `clarity-copy`, skill `clarity-placeholder-copy` 0.1.0). Repackaged to this repo's conventions: `design-os-` name, quoted two-key frontmatter, a 500-character description with Not for, agent-agnostic tool wording, Reference files, Lessons logged, and evals. Behavior is unchanged except one thing: the original treated "fill it in" as the go-ahead to write to Figma; here it asks one yes first, per the confirm-before-every-write rule.
- Content design owns the copy rules. The style guide, A to Z, and leadership log are read live, so most updates don't touch the repo; the 17 core rules and the audience references do. Changes to those should come from content design. The standalone `clarity-design-tools` repo should be retired or point here, so there aren't two copies.

**Oct 23, 2026: 1.9.1**
- A lint pass over every skill for duplicated effort. The mechanical checks all passed; the fixes were overlap. Each kind of check now has one owner the others point to: edge cases and states belong to `design-os-stress-test-design`'s categories, Clarity data and the mock-math checklist to `design-os-fill-mock-data`'s `domain-data.md`. Stress-test, prep-eng-handoff and the playground now depend on files in other skills, the same way prototype-to-figma already reads the audit's `alloy-library.md`.
- Prototype's evals went from 14 to 9, not 5. Getting to 5 would have dropped whole modes (the return path from Figma, the self-check, the shadcn refusal), so CONTRIBUTING now allows one eval per entry mode, up to 10.
- Planned skills: `design-os-create-mocks` should reuse prototype's `from-brief.md` planning and prototype-to-figma's `build.md`, and fill setup's NEW boards. `design-os-review-design-work` should stick to UX critique against the brief and hand Alloy, guidelines and edge cases to their skills; otherwise it becomes the sixth skill checking states.

**Oct 21, 2026: 1.8.0**
- Prompted by Kyle Cooney's AI Design Playbook (decision log, knowledge in files, descriptions as triggers). We departed from its `/decisions/log.json` on purpose: the plugin only reaches designers on a version bump and they can't edit it, so the live log is a Notion database and the repo keeps a release snapshot. The playbook's "add skills to CLAUDE.md" doesn't apply either: this repo's AGENTS.md only loads for agents working on the repo, not in a designer's session, so shared rules have to live somewhere every skill reads at runtime.
- "Recommend; the designer decides" was the design team's choice over letting the agent log small calls on its own.
- A trigger audit found the plugin's own descriptions in good shape; the fixes are in What's new. The bigger risk is outside the repo (loose ends).

**Oct 16, 2026: 1.6.0 and 1.7.0**
- 1.6.0 ([#11](https://github.com/brodowski-hiive/clarity-design-os/pull/11), `fe0b3c4`) applied a change set prepared in a Cowork session that ran `design-os-design-impact` on the Canadian Suitability Refresh PRD. That run found impact only opened Linear-linked frames, its Start section had grown into building workspaces, and Figma's MCP server can't duplicate files or copy frames between files. Hence the split into `design-os-design-setup` plus the `design-setup` and `design-workspace-review` agents.
- `skills/design-os-design-impact/references/routes.md` line 11 points at `design-os-design-setup`'s `references/handoff.md`. The plan said to leave routes.md alone, but the file moved, so the old link was broken. A grep for `references/handoff.md` inside impact still matches that line; that's expected, not a stale reference.
- 1.7.0 ([#7](https://github.com/brodowski-hiive/clarity-design-os/pull/7), merge `267819a`) was opened as 1.4.0 and sat in conflict while #8, #9, #10 and #11 merged. Resolved by merging main into it: the 1.6.0 tidy pass and the version-stamped port both stay, and the port note doubles as the tidy pass's section header so a port gets one header, not two. The prototype return-path eval was renumbered from 9 to 13 because main had added its own eval 9.

## Known loose ends

- **The Design guidelines log is new** (Notion, under Alloy Design System, created Oct 21). Watch the first few Make a call runs: whether recommendations cite precedent, and whether the review levels match how the working council actually works.
- **Stale org-managed copies compete with plugin skills** in Cowork: `anthropic-skills:design-os-audit-design-system` (no `references/`), `anthropic-skills:design-os-prototype` and its twin `design-prototype` (pre-1.4, ship a dark-token file), `anthropic-skills:design-os-prototype-to-figma` (pre-1.7) and `anthropic-skills:design-ping` (broader description). Ask an org admin to remove them. `design-os-system-map` and `system-map-placement` are two org copies of one skill; keep `design-os-system-map`.
- **Planned skills still unowned:** `design-os-review-design-work` and `design-os-create-mocks` are planned (scope notes in Sessions, Oct 23). Until review-design-work ships, "critique this mock" has no owner, and the audit's `Not for` says "not covered yet". Nothing covers auditing the Alloy library itself (the old `alloy-figma-audit` pointer was dropped). `routes.md` still names `design-os-create-mocks` "once it ships".

- **No Figma path from 1.6.0 or 1.7.0 has run against a real file.** Setup's cloned working page, the review agent's organize pass, the port's version stamp and saved plugin data, superseding an old port, the audit's superseded guard, and the return path to code are all untested. The first real run of each should be watched.
- **Descriptions near the 500-character cap:** prototype-to-figma, research-patterns, design-setup, prep-eng-handoff and design-impact are within 12 characters. Adding a trigger phrase means cutting one.
- **`routes.md`'s "Hands to" column** in impact now describes what setup does for each route. Consider retitling it.
