---
name: "design-os-write-skill"
description: "Write or revise a Clarity design skill so it changes what an agent does: decide where the rule belongs, turn a designer's notes into steps with reasons, cut what doesn't change behavior, and test it on a real file. Use for \"turn this into a skill\", \"write a design-os skill\", \"add this rule to the skill\", \"my skill isn't working\", \"package how I work\". Not for: logging one design call (design-os-design-decisions), non-design skills (skill-creator), or repo format checks alone (CONTRIBUTING.md)."
---

# Design OS: write a skill

An agent asked the same thing twice gives two different answers. A skill can't make the output identical, and shouldn't: every screen and brief is different. What it can fix is the process, so the agent reasons the way the designer would, every run. Write it the way you'd brief a fast, junior designer who has never seen the team's files.

The core principles are adapted from Emil Kowalski's guidance on writing skills (emilkowal.ski). The design-specific rules come from what goes wrong when agents write skills for Clarity designers.

## Rules

1. **Never invent a value.** Every number, name, colour, variant or rule in the skill comes from the designer, from a source you opened (the Alloy library, the file, the code), or from a question you asked. Before writing, tag each value *said*, *read* or *guess*, and resolve every *guess* by step 2. Why: in a design skill a made-up 80px gap becomes the team's standard, and nobody can tell it was a guess.
2. **Verify Figma and Alloy facts live.** Before writing a component, variant, property, style or API behaviour into a skill, look it up in the Alloy library or the file and use its exact name. Why: a wrong variant name fails on every run, and the agent following the skill trusts it over what it sees.
3. **Every check needs a way to check it.** For each "compare", "make sure" or "check that", name what the agent reads to answer it: a node property, saved plugin data, a screenshot, a Linear status. If nothing records the answer, add a step that records it, or cut the check. Why: "compare with what you built last time" can't run when nothing saved what was built.
4. **Confirm before writes, follow CONTRIBUTING for the rest.** Any skill that writes to Figma, Linear, Notion or Slack asks first. Format, naming, evals and versioning follow the repo's `CONTRIBUTING.md`; don't restate them in the skill.

## 1. Decide where it goes

Most new rules belong in a skill that already exists. Walk this before writing anything:

```
Is it one design call (this heading style, this badge colour)?
├── Yes → log it with design-os-design-decisions. Stop.
└── No
    Does an existing skill already do the task the rule is about?
    (list skills/ and read the descriptions)
    ├── Yes
    │   ├── A step that skill runs → add a rule or step to its SKILL.md
    │   ├── Depth, a gotcha, a lookup table → add it to that skill's references/
    │   └── A correction from one run → a Lessons logged line in that skill
    └── No
        Does it have its own trigger (a phrase a designer would say)?
        ├── Yes → new skill
        └── No → it's a rule for another skill; go back up
```

Tell the designer where it's going and why before you write. Why: a new skill that overlaps an existing one splits the rules in two, and the agent picks whichever triggers first.

## 2. Sort the designer's notes

Designers' notes mix rules, reasons, stories and values. Sort every line into one of four:

- **Rule:** what the agent does. Becomes a step or a numbered rule.
- **Reason:** why. Attach it to its rule as `Why:`.
- **Story:** what went wrong once. Keep only the reason it gives; the story itself goes in Lessons logged at most, never in the body too.
- **Value:** a number, name or setting. Tag it said, read or guess (rule 1).

Resolve every *guess* in this order, and stop at the first that answers it:

1. **Read what the designer already wrote down:** their standards docs, notes, agent memory, `design-os-design-decisions`, and the files the skill will run on (measure an existing card's gap rather than asking for it). A value found there is *read*.
2. **Test it yourself** if it's a question about what Figma or Alloy allows (can an annotation sit on a nested instance?). Run it read-only on a test page.
3. **Ask the designer** about what's left, in one message. Ask only about values that change what the agent builds. Give each a recommended default and its source, so the designer can answer "yes to all". Put questions that block the build first.

Why: a skill that needs twenty answers before it's written won't get written; most of the answers already exist.

## 3. Write it

Six principles. Each one is a test to run on every line you write.

### Process, not outcome

Give a procedure the agent can walk the same way every run, not a description of the result. Use a decision tree where a choice branches, numbered steps where it doesn't.

```md
<!-- Outcome: the agent guesses -->
Put doc cards somewhere sensible near the screen.

<!-- Process: every run walks the same path -->
Place the [Doc] card right of the screen, top edges aligned, 160px gap.
If that space is taken, place it right of whatever is there, same top.
```

### Every rule carries its why

A bare rule gets applied where it doesn't fit. A rule with its reason lets the agent extend it to cases you didn't write down. Put the reason on the same line as the rule, after `Why:`, in one sentence.

### Strict words

Hedges give the agent nothing to act on, so it falls back on its defaults. Cut these on sight: *reasonably, appropriate, sensible, tasteful, near, roughly, if possible, try to, consider, where relevant, if you aren't sure*. Replace them with a number, a name, or *always* / *never*.

```md
<!-- Hedged -->
Look for a text box near the icon, on or just off the screen.

<!-- Strict -->
Look for a text node whose bounds start within 200px of the icon,
inside the screen frame or its parent section.
```

### Every line earns its place

Read the skill line by line and ask: does this change what the agent does? Delete it if not. In design skills, cut:

- Explanations of Figma, Alloy or UI basics the agent already knows.
- The same point in the intro, a rule's reason, and Lessons logged. Say it once, where it acts.
- Background on how the decision was reached. That's for the designer, not the agent.

### One skill, one job

A skill covers one task a designer would name. Splitting a skill loses nothing: skills link to each other. A skill that does everything spreads the agent's attention across all of it.

### Test it by running it

A skill is a guess until it has run. See step 4.

## 4. Test it

1. **Baseline first.** Give an agent the task without the skill (or without the new lines) and save what it does. If it already does it right, the lines aren't needed; stop.
2. **Run it with the skill** on a real Figma page made for testing, never an approved page. Compare the two outputs. A line that changes nothing gets cut.
3. **Turn the failures into evals.** Each failure you saw in the baseline becomes an expectation in `evals/evals.json`; near-miss phrases from neighbouring skills go in `evals/trigger-evals.json` as should-nots.
4. **Run it twice.** If the two runs reach different answers at the same decision, the wording there isn't binding yet. Tighten it into a step or tree.

Show the designer the baseline and the with-skill output side by side before calling it done.

## Checklist

- [ ] Placed by step 1, and the designer agreed where.
- [ ] No *guess* values left; every Figma and Alloy name verified live.
- [ ] Every check names what the agent reads to answer it.
- [ ] Steps or a tree, not a described outcome.
- [ ] Every rule has its `Why:` on the same line.
- [ ] No hedge words.
- [ ] Nothing said twice; no basics explained.
- [ ] Baseline and with-skill runs compared; evals written from the failures.
- [ ] `CONTRIBUTING.md` section 9 checks pass.

## Reference files

None.

## Lessons logged

- **Oct 22, 2026 (new):** Baseline agents writing design-os skills from designer notes invented spacing values and an Alloy variant name, wrote checks with no way to run them, told each incident three times, and never tested → rules 1 to 3 and step 4.
- **Oct 22, 2026 (first test):** With rule 1 alone, the agent sent the designer 20 questions, several already answered in the designer's file standard or testable in Figma → resolve guesses by reading, then testing, then asking, with recommended defaults (step 2).
