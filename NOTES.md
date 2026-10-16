# Notes

Working notes for whoever picks this repo up next. What shipped in each release is in README.md, What's new; this file keeps the reasons behind it and anything left unfinished.

## Sessions

**Oct 16, 2026: 1.6.0 and 1.7.0**
- 1.6.0 ([#11](https://github.com/brodowski-hiive/clarity-design-os/pull/11), `fe0b3c4`) applied a change set prepared in a Cowork session that ran `design-os-design-impact` on the Canadian Suitability Refresh PRD. That run found impact only opened Linear-linked frames, its Start section had grown into building workspaces, and Figma's MCP server can't duplicate files or copy frames between files. Hence the split into `design-os-design-setup` plus the `design-setup` and `design-workspace-review` agents.
- `skills/design-os-design-impact/references/routes.md` line 11 points at `design-os-design-setup`'s `references/handoff.md`. The plan said to leave routes.md alone, but the file moved, so the old link was broken. A grep for `references/handoff.md` inside impact still matches that line; that's expected, not a stale reference.
- 1.7.0 ([#7](https://github.com/brodowski-hiive/clarity-design-os/pull/7), merge `267819a`) was opened as 1.4.0 and sat in conflict while #8, #9, #10 and #11 merged. Resolved by merging main into it: the 1.6.0 tidy pass and the version-stamped port both stay, and the port note doubles as the tidy pass's section header so a port gets one header, not two. The prototype return-path eval was renumbered from 9 to 13 because main had added its own eval 9.

## Known loose ends

- **No Figma path from 1.6.0 or 1.7.0 has run against a real file.** Setup's cloned working page, the review agent's organize pass, the port's version stamp and saved plugin data, superseding an old port, the audit's superseded guard, and the return path to code are all untested. The first real run of each should be watched.
- **Tidy mode may add a second header on a ported section.** `design-os-prototype-to-figma` step 7 says to use the port note as the header, but `design-os-design-setup`'s `references/organize.md` (which the `design-workspace-review` agent follows) says to add a header on each section and doesn't mention port notes. Add a line there, or check the first tidy run.
- **`design-os-prototype` has 13 evals** against CONTRIBUTING's 3 to 5. Consolidate them, or change the guideline.
- **`routes.md`'s "Hands to" column** in impact now describes what setup does for each route. Consider retitling it.
