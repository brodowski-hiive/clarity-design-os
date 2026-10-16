# From a brief

Build a prototype from a Product Brief, with or without a Design Spec. Turn what the brief and spec say into a screen plan, get it confirmed, then build it. The prototype has to show what the documents say, and it has to show clearly where you had to fill in a gap yourself.

Two moments call for this:

- **Scope review (brief only).** A PM brings a clickable prototype to the M or L scope review, before a Design Spec exists. The brief is the only source, so you derive the states yourself and mark them as derived. When the review's question is about flow rather than visual design, build at wires fidelity (`references/wires.md`).
- **Design (brief + Design Spec).** After the spec is written, a designer or PM builds against its scenario matrix. The spec decides the states, data and reuse; the brief supplies the why.

If there's also a Figma frame for any screen, run `references/from-figma.md` for those screens and use this file for everything else.

## 1. Gather the sources

- **Brief:** a Notion link (fetch it with the Notion MCP server), a Linear project or issue (follow its Resources to the brief), or pasted text. Note its Doc Stage and last-edited date, since the receipt cites the version you built from.
- **Design Spec:** look for `Design Spec: <Feature>` linked from the brief's Resources or the initiative record. If none exists, say so: this is a scope-review build.
- **Initiative record:** if one exists (`pm-os-initiative-record`), read its Decisions and Artifacts. Decisions there override the brief when they're newer.
- **Existing prototype:** check the initiative record's Artifacts, the Clarity Design directory (or `apps/` in ai-prototypes) and the owning team's Figma space (from `pm-os-clarity-context`). If a prototype for this work exists, revise that app on a new branch instead of starting a rival one.

If a link won't open, ask for the content instead. Never build from a title alone.

## 2. Name the question

A prototype exists to answer something. Find the question it answers:

- With a spec: its **What we're testing** section.
- Brief only: the brief's Open items and leading uncertainties, plus whatever the scope review has to decide.

Write it as one sentence ("Do sellers understand that a floor auto-accepts offers above it?"). If neither document gives you one, ask. If there truly isn't one, say the work needs more brief before a prototype, because a prototype with nothing to test is scope creep. The question goes in `prototype.json`'s description and the receipt.

## 3. Start from what ships today

People react to the change, so everything around it has to look like the current product.

- **With a spec:** use its **Where this lives** screens. Build Unchanged screens as they are, apply the described edit to Needs-edit screens, and build Superseded ones new.
- **Brief only:** find the current screen in the owning team's Figma space or the brief's Appendix screenshots. If you can't find a real reference, say so in the plan. Don't present a remembered layout as the current one.
- **Key interactions stay where they are.** A screen's primary action (placing a buy or sell indication first among them) keeps its place in every state. New content goes around it. Moving it is a product decision for the brief, not a prototype choice.
- **Another team's screen:** build it as it ships, and mark any change to it in the plan as needing that team's sign-off.

## 4. Draft the plan

Turn the documents into the plan below. Every row cites where it came from (spec section, brief capability number, or "derived"), so a reader can see what's decided and what you guessed.

**Screens and flow.** One entry per screen, in flow order, from the spec's core flow or the brief's numbered capabilities. If several personas are touched, list each persona's path and where the paths cross ("seller sets a floor → buyer's offer above it shows as accepted"). Choose separate routes or a stepper, the same way as in From Figma.

**States.** Walk the spec's scenario matrix row by row:

| Classification | What you build |
|---|---|
| Must-demonstrate | A real, reachable state: its own route, a state toggle, or a playground preset |
| Must-specify | The standard Alloy treatment, no extra design; list the rule in the receipt |
| Explicitly deferred | Nothing. Carry it into the receipt unchanged, with its reason |

Brief only: derive states from each capability's behavior and the brief's experience states and failure modes. Mark every one **derived** and classify it yourself, defaulting to Must-specify unless it's central to the question. Offer `design-os-stress-test-design` when the screen has lists, numbers or forms and the brief doesn't name its edge cases.

**Personas and roles.** If personas see different things, add a persona or role switch (the playground's Access group) instead of separate apps.

**Components.** Map the spec's Reuse vs. new table to Alloy components from `COMPONENTS.md`. Brief only: pick from the Quick Decision Guide. Anything the spec calls a new pattern, or anything Alloy lacks, is a gap. Build it custom and token-based, then list it under New patterns in the receipt so design picks it up.

**Data.** Use the spec's **Content and data realism** figures, and reuse its one worked example (the same order, price and names) on every screen, so only the state changes between screens. Brief only: invent real-shaped data and say so. Put it in `src/data/`. Never use lorem ipsum, and never use round placeholder numbers where a threshold matters.

**Copy.** Take copy from the documents when they give it. Otherwise write plain Clarity copy and mark it draft. Client-facing copy about money, offers, prices or eligibility is regulated: mark it, and say it needs `compliance-review` before the prototype goes outside the team.

**Viewports.** Build the classes the spec requires. Brief only: desktop, plus the brief's stated mobile behavior if it has one.

**Assumed.** Everything the plan needs that neither document settles: a missing state, an unstated rule, a guessed label. Open items in the brief you had to guess at go here, quoting the item.

## 5. Confirm before building

Post the plan in one message, putting rows that need attention first: Assumed, derived and low-confidence rows, new patterns and other teams' screens. Keep it skimmable: the question, a flow map in the From Figma format, a states table with source and classification, and a short components table.

Ask the person to correct anything in plain language ("the buyer never sees the floor", "skip mobile"). Apply the corrections, then build. If they say "just build it", build your best guess and keep every unconfirmed row under **Assumed**.

## 6. Build and check coverage

Build with the main Build steps. Then walk the confirmed states list in the rendered prototype:

- Every Must-demonstrate state is reachable, and you can say how (route, toggle or preset).
- Every link in the flow works.
- The worked example's numbers match on every screen.
- Key interactions are in the same place in every state.

Fix anything that fails before calling it done.

## 7. Share and record

- **Where it lives:** build in ai-prototypes so the Clarity Design directory lists it once the PR merges (`references/listing.md`). This matters most for a scope-review build, since reviewers will look for it later.
- **Listing:** the description is what was built plus the question it tests. Set `team` to the owning pod from the directory's list. Add the brief under `links.docs` and the Linear project or issue under `links.linear`. Use full URLs only, and never invent one.
- **Initiative record:** offer to add the app, PR link and receipt to its Artifacts table through `pm-os-initiative-record`. Write only on a yes.
- **Next step:** offer `design-os-prototype-to-figma` when design will carry the work on in Figma.

## Controlled work

Prototypes are fine at any risk tier, but a prototype is never production code. If someone asks you to ship it, push it into the frontend repo, or wire it to real data, say no and explain that production code for Controlled work belongs to engineering. Keep every number and name fictional, and mark regulated copy as above.
