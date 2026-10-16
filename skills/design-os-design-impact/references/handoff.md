The handoff package for the Designer route. Read when the route is Designer and the person has said yes.

The package gives the owning team's Design lead everything this skill found, so they can pick the work up without redoing the research. It's a starting point for their judgment, not a design decision.

## Find the Design lead

Use `pm-os-clarity-context` People lookup, fresh, on every run:

1. Resolve each affected surface to its owning team (`org/ownership`), then the team's file for its triad roles.
2. Fetch the Product Team Directory and read the current Design lead for that team.
3. If the directory can't be reached, fall back to Linear team leads and say that's the source. If its entry is blank, "(fill in)" or "(verify)", or the page was last reviewed more than 6 months ago, say so and raise it as an open item.
4. Cross-team work: name the Design lead of the team that owns the main home, and list the other teams' Design leads under the screens they own.

Name the person in the package you write, because it's for them. Never write a name into this skill's files, its evals, or anything saved for reuse.

## What goes in it

1. **The work:** the brief link (with Doc Stage and last-edited date), the Linear item, and one line on what it does.
2. **Why it needs a designer:** the signals from `references/routes.md` that decided it, each tied to a screen.
3. **Affected screens:** the readout table: page, owning team, change (Fix, Compose, or Extend, plus what changes), path, and the current reference with its link and source. Mark cross-team changes "needs <team> sign-off".
4. **Extend candidates and Alloy gaps:** each new pattern, Alloy gap, new section, or non-web channel, with the screen it's on and what Alloy has that comes closest. Word Alloy gaps so they can go straight to #support-alloy-design-system.
5. **Open questions:** the brief's Open items that touch design, quoted, plus anything you couldn't settle (a page with no reference, an inferred owner).
6. **Placement:** the FigJam board link if `design-os-system-map` made one, otherwise the readout's map version and the main home's card link.
7. **Suggested next skill:** what the designer would run once they pick it up, for example `design-os-create-mocks` for Figma mocks, `design-os-research-patterns` for an Extend pattern, or `design-os-prototype` for a coded build.

Keep it on one screen where you can. Link, don't paste: the brief, the frames, and the map card are all links.

## Where it goes

Offer both, and write only after a yes for the one the person picks:

- **A Linear comment** on the item, under the Linear write rule in `pm-os-clarity-context`. Show the exact comment first.
- **A Notion page** on the initiative record (`pm-os-initiative-record`), linked from its Artifacts. Show the page title and where it will sit first.

Return the link the tool gives back. Don't draft a Slack message; the Design lead gets it through Linear or Notion.
