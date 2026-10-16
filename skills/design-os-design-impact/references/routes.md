Picking one design route for the whole brief. Read at step 5, after every affected screen is classified Fix, Compose, or Extend.

## The routes

| Route | When | Hands to |
|---|---|---|
| No design | Every screen is Fix | A ticket (`pm-os-ticket-brief`) |
| Coded wires | A flow or interaction question, an early concept, or a scope review with a brief only | `design-os-prototype`, From a brief, at wires fidelity |
| Coded hi-fi | Compose on existing screens, and a Design Spec exists | `design-os-prototype`, From a brief |
| Figma | A layout or visual-direction question; the owning team designs in Figma first; or another team's screen changes | `design-os-create-mocks` if installed, else the Figma skills on the person's copy |
| Designer | Any Extend; Controlled work with new UI; placement confidence low; a contested cross-team change; a money moment; a non-web channel (WhatsApp) | A handoff package to the owning team's Design lead (`design-os-design-setup`'s `references/handoff.md`) |

## How to choose

Go from the strictest route down and take the first one whose signals are present. The strictest route that applies wins, because a lighter route on work that needs a designer costs more in rework than it saves.

1. **Designer** if any of these hold:
   - Any screen is **Extend**: a new pattern, an Alloy gap, a new section, or a non-web channel. These need someone to design the pattern itself, not just arrange existing ones.
   - The work is **Controlled** (from its risk tier, or `pm-os-triage-lane`) and adds or changes visible UI.
   - **Placement confidence is low**, or a page has no current reference: nobody can design against a screen you couldn't find.
   - A cross-team change is **contested**: the owning team hasn't agreed, or `pm-os-clarity-context` shows split or unclear ownership.
   - It touches a **money moment**: a screen where someone commits money or sees what they'll pay or receive (placing or confirming an order, fees, settlement amounts, payment details).
   - It reaches a **non-web channel** (WhatsApp, email, SMS), where Alloy doesn't apply.
2. **Figma** if any of these hold:
   - The open question is about layout or visual direction (where things sit, how dense, which treatment), which is faster to explore side by side in Figma.
   - The owning team designs in Figma before code (check its team file, or ask).
   - Another team's screen changes, uncontested. Their designers review in Figma, so the change should be there.
3. **Coded hi-fi** if every non-Fix screen is Compose and a Design Spec exists. The spec settles the states and data, so a coded build from real Alloy components answers more than a mock would.
4. **Coded wires** if the question is about flow or interaction, the concept is early, or it's a scope review with a brief only. Wires keep the reaction on the steps, not the look.
5. **No design** if every screen is Fix.

If Compose with no Design Spec doesn't fit wires (the question is visual, not flow), choose Figma.

## Confidence

- **High:** every page has a current reference at medium or high confidence, placement is high, and only one route's signals are present.
- **Medium:** one page is inferred or low confidence, or the signals for two routes are both present and you picked the stricter one.
- **Low:** placement is low, several pages have no reference, or the brief is too thin to say what changes. Low confidence is itself a Designer signal.

Say what would change the answer: "If the owning team's Design lead confirms the floor row is an existing pattern, this drops to Coded hi-fi." Use roles and teams from the readout, never people.

## Cross-team and Controlled

- **Another team's screen:** on every route, mark each change to it "needs <team> sign-off" in the readout's Change column, in the plan the next skill builds from, and in the handoff. A coded or Figma build of their screen starts as it ships, with the change applied on top.
- **Controlled:** a prototype is fine at any tier, but it's never production code (`design-os-prototype`, Controlled work). Controlled work with new UI goes to a designer; Controlled work that's all Fix goes to a ticket as usual.

## Explaining the route

In the readout, give the route, then the two or three signals that decided it, each tied to a screen ("Company page is Extend: a new floor price pattern Alloy lacks"). If a stricter or lighter route was close, name it. Keep it to a few lines; the screens table carries the detail.
