The coded workspace, for the Coded wires and Coded hi-fi routes. Read at step 4 when the route is coded. Needs a shell and the ai-prototypes repo; without them, say so and offer the Notion workspace instead.

1. **Rebuild each affected screen as it ships** in ai-prototypes with `design-os-prototype`: From Figma when the readout has a frame, otherwise from the reference it recorded (screenshot, existing app). If the prior-work search found an earlier coded app, start from that instead.
2. **Commit that as-is baseline before applying any of the brief,** so the diff and history show exactly what changed.
3. **Add a playground Design choice, "Version", with Today and Proposed** (`design-os-prototype` `references/playground.md`), so reviewers can flip between the shipped screen and the change.
4. **Leave notes where designers and reviewers will see them:** a `NOTES.md` in the app listing keep, change, drop, open questions and links per screen (the same content Figma stickies would carry), and the open questions in the app's `prototype.json` description.
5. **Hand off** to `design-os-prototype` From a brief to apply the change, at wires fidelity for the wires route.

Another team's screen: rebuild it as it ships, and mark every change to it "needs <team> sign-off" in `NOTES.md` and the readout.
