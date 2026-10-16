How to audit the ported screens with `design-os-audit-design-system` and fix the findings in place. Read before step 6.

## Why in place

The audit normally never writes to the audited frame, because that frame is the designer's work. Ported frames aren't: this skill just built them, and they carry `designos` / `kind` = `prototype-port`. So fixes go straight into them, with no `· Alloy fixes` copy. The audit skill allows this only for frames with that marker.

## Run it

1. Load `design-os-audit-design-system` and follow its steps for each ported frame, default states first.
2. Skip its "ask before adding a report card" question: the plan approval already covered it. Still follow everything else, including the scoped library searches, the saved findings data, the gaps callout, and the placement beside each frame.
3. On the report card, the reply line reads "Reply in chat: fix A1, A4 · fix all". Replace "Fixes go into a copy of this frame" with "These screens were ported from code, so fixes are made directly in them."
4. Each report card also records `fixMode` = `in-place` in its saved data.

## Fix

Fix every Open finding that has an exact match, using the audit's fix notes (`references/findings.md` in that skill). Then:

- **Statuses:** `Fixed` (linked to the fixed layer), `Needs designer` with the choice to make, or `Couldn't fix` with the reason. Never mark a finding fixed that isn't.
- **Needs designer, not guessed:** a color or text style with no exact match, a variant that doesn't exist, or a swap that would visibly change the layout. Leave these for the designer.
- **Fix the cause, not the frame:** if the same finding shows up in every frame (for example the shared header has unbound padding), fix the shared local component once.
- **Gaps:** anything Alloy doesn't have goes in the gaps callout with its finding IDs. Custom parts the plan already listed are gaps, not findings against the build.
- **Closest styles from the plan:** the audit compares against Alloy, not the code, so it can't see where you used a closest text style instead of the code's own. Add each one to the gaps callout ("No 30px Regular title style; Section Title used"), so the difference isn't lost.
- **Nothing to fix is a normal result.** If every finding needs a choice, say so in the receipt rather than forcing a closest value.

## Re-run

After fixing, run the audit once more on each frame so the card shows the final coverage, `Resolved` for findings that are gone, and only the open ones as open. Don't loop: one fix pass and one re-run.

If coverage on a frame is still under 80% after the re-run, say so in the receipt and name the biggest causes (usually gaps), rather than trying again.

## Later runs

Frames in a superseded section carry `prototype-port-superseded`, not `prototype-port`, so the audit treats them as the designer's work and fixes go into a copy. Don't fix a superseded frame: point the designer to the current section instead.

If the designer edits a ported frame and asks for a re-audit, the frame still carries the marker, but it's now partly their work. Ask once whether to keep fixing in place or switch to a fix copy, and record the answer as `fixMode` on the card.
