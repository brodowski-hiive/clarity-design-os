Finding the current screen for each affected page, and any earlier design of this feature. Read at step 3, once the work is placed and you have its pages and owning teams.

The goal is one current reference per page: the screen as it ships today, from a source someone else can open. Work down the sources in order and stop at the first one that gives you the page. Try the next source only when a better one gives nothing.

## Sources, best first

1. **The Design Spec's "Where this lives" links.** A spec names the screens it changes and marks each Unchanged, Needs edit, or Superseded. These are the strongest source, because the spec's author already matched them to the work. Confidence: high.
2. **Screenshots in the brief's Appendix.** Fetch the brief's images and say which page each one shows. Check the date if the brief gives one, because an old screenshot can show a screen that has since moved. Confidence: high if dated in the last three months, otherwise medium.
3. **The owning team's Figma files.** The team file in `pm-os-clarity-context` (via `org/ownership` and `org/teams`) has the team's Figma space. Also follow Figma links in the team's Linear issues for this surface, and the Design team's Linear projects for the feature. In each candidate file:
   - **List every page and its top-level sections first.** `get_metadata` with no node ID may show only the first page, so use a read-only `use_figma` script that walks the pages and returns names and IDs (keep the return small). Names usually carry the milestone, audience and status.
   - **Don't trust a linked node ID alone.** Embeds in Linear go stale when frames are deleted or moved. If a link 404s, find the frame by name in the page list.
   - Match frame and page names to the map page names from step 2 ("Company page", "Sell indication"). Map names and Figma names differ, so try the map's wording, the brief's wording, and the screen's visible title.
   - Prefer pages marked shipped, live, or ready for dev (also "Dev ready", "Handoff", "Final", a ✅ or green dot) over explorations, archives, or dated drafts. If the only match is an exploration, use it, but say so and set confidence to low. A Graveyard page can still hold the only frame in current styling; say where it came from.
   - Take a screenshot of the frame you pick (`get_screenshot`) so the readout shows what you matched.
   - Confidence: high for a ready-for-dev frame whose title matches, medium for a name match you inferred, low for an exploration.
4. **An existing ai-prototypes app.** Check the Clarity Design directory, or `apps/` in ai-prototypes and each app's `prototype.json`, for an app that already rebuilt this screen. A prototype can drift from production, so it's medium confidence at best, and it's a reference, not the screen itself. If the GitHub MCP server can't read the repo, say "not checked".
5. **A production screenshot,** where a browser is available, the site isn't blocked, and the person is already signed in to Clarity. Navigate to the page and take a screenshot; never sign in for them or change anything. Confidence: high for what it shows, but note the user type you saw it as, because other user types may see a different screen.
6. **None.** Say "no current reference found" for that page and list what you checked. Don't fill the gap from memory. A missing reference lowers the route's confidence (`references/routes.md`).

## Earlier design work

While you're in the team's files, note any earlier design of this same feature: a previous milestone, an exploration, a version built for a decision the brief has since changed. It isn't the current screen, but it's often the best starting point, and setup builds the workspace from it. Record the file, page or section link, status (shipped, ready for dev, exploration, superseded, graveyard) and what changed since. It goes in the readout's Earlier design work line.

## Recording it

For each page, record:

- the reference (a Figma frame link, a screenshot, an app URL, or "none"),
- its source (one of the six above),
- confidence (high, medium, or low) and why, in a few words ("ready-for-dev page, title matches").

When a team's Figma space isn't reachable, say so, mark that source "not checked", and carry on with the others.

## Map suggestions

System map cards don't link to their canonical frames, so every run that matches a frame helps the next one. For each page where you found a team Figma frame, end the readout with one line for the design lead, ready to paste:

`Map suggestion: link <page> card to <frame link>.`

Add one only for frames at medium or high confidence. Never edit the System Map file yourself.
