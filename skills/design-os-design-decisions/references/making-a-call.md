# Making a call

How to turn "which should we do here?" into a recommendation a designer can accept in one reply.

## 1. Frame it

Write the question in one line, with where it came up: "In the Add shareholder drawer, should the 4-company limit be explained above the input or in a menu footer?" If the question is really two questions, split it; each becomes its own entry.

## 2. Look for precedent, in this order

1. **The log.** An Active guideline that covers it answers the question: cite it and stop. If it covers the case but seems wrong here, say so, and propose an exception (a narrower entry) or a revision (a superseding entry). Never quietly ignore it.
2. **Alloy's docs.** Read the component's documentation: in code, the installed package's `dist/design/COMPONENTS.md`; in Figma, the component description (scoped to the Alloy library key in `design-os-audit-design-system`'s `references/alloy-library.md`). If Alloy already decides it, there's no call to make; link the doc.
3. **How Clarity does it today.** Look at shipped screens or the team's Figma files for the same situation. Consistency with what users already know is a strong reason in itself.
4. **Recent calls not yet logged.** The last few DS Changelog Key Decisions and DS LT sync notes. If the call was already made there, log it (Log mode) rather than making it again.
5. **The outside world, only if needed.** For a new pattern with no precedent, offer `design-os-research-patterns`, but don't run it unasked.

## 3. Recommend

Give one recommendation, then one or two alternatives, each with its main tradeoff. Weigh, roughly in this order:

- **Accessibility:** keyboard, screen reader, contrast, touch targets, reduced motion. A failing option is out, however good it looks.
- **Consistency:** with existing guidelines, Alloy's intent, and shipped Clarity screens.
- **Clarity for the user:** the task, the content, and the consequence of a mistake. Money and legal steps deserve the safer option.
- **Cost:** a call that needs a new Alloy component or variant is slower and needs the working council. Say so.
- **Reversibility:** prefer the option that's cheaper to undo when the evidence is thin.

Say how confident you are and what would change your mind. Back external claims with a documented source (WCAG, a public design system such as Carbon or Material, platform guidelines) and link it; the team treats agent suggestions as input to check, not requirements.

## 4. Pick the review level

| Level | When |
|---|---|
| Designer | Local to one feature, easy to reverse, no conflict with an existing guideline |
| Lead designer | Applies across surfaces, changes or makes an exception to an Active guideline, or touches brand or accessibility |
| Working council | Needs an Alloy change, a new component or variant, or engineering work in Alloy |
| DOPE council | A principle across teams, or a call the working council couldn't settle |

The lead designer has the final say when designers disagree. Who holds each role is in the Notion Product Team Directory; don't name people in the log's Review level.

If the designer can make the call at their level, a yes logs it `Active`. Otherwise a yes logs it `Proposed` at the level it needs, and it becomes Active once that level approves.

## 5. Ask

End with the decision as a short multiple-choice question (for example `AskUserQuestion` in Claude Code; otherwise numbered options in plain text): the recommendation first, then the alternatives, plus "not now". Then preview the entry as in `log.md`, Writing.
