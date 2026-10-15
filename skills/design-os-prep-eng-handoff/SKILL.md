---
name: "design-os-prep-eng-handoff"
description: "Prepare a Clarity design for engineering handoff: the questions engineers will ask, what's costly to build, and the backend, permission, and data implications, as a short checklist. Use for \"ready for eng?\", \"handoff checklist\", \"what will eng ask\", \"eng review\", \"backend implications of this design\". Not for: the Engineering Spec (pm-os-write-spec), handoff completeness gates (pm-os-artifact-handoff-contracts), or edge-case stress tests (design-os-stress-test-design)."
---

# Prep eng handoff

Help a product designer get ahead of engineering before handoff: surface what's hard to build, the questions engineers will ask, and the backend work implied by the design. The user designs Clarity, the issuer-facing portal. They know the product and the design system (Alloy), so don't explain basics. The goal is a smoother kickoff, not a spec engineers would write themselves.

## 1. Get the design

- **Figma link**: use the Figma connector. `get_screenshot` for the frames, `get_design_context` / `get_metadata` for structure, components, and annotations. Check whether elements are Alloy instances or custom; custom components are a common cost driver.
- **Description or screenshots**: work from those. State assumptions in one line.

If the scope is unclear (one screen vs. a whole flow), ask one short question. Otherwise proceed.

## 2. Read what's already decided

When the work has an initiative or Linear issue (named by the user or linked from the Figma file) and `clarity-pm-os` is installed, read before analyzing, so the checklist asks only what's still open:

- **Initiative record:** read it with `pm-os-initiative-record` (Decisions, Numbers of record, Artifacts, including the brief and Design Spec). Skip questions the record already answers. A design that contradicts a recorded decision is the first question.
- **Architecture:** for backend items, read the `pm-os-clarity-context` node for the surface (for example `infra/issuer-workflows` for ROFR and approvals, `infra/transactions` for transfers) and cite its live doc. Where the node is Partial or a Placeholder, say so and keep the item as a question for eng.

Read only; this skill doesn't write to the record or Linear. If neither source is available, work from the design and say so in one line.

## 3. Analyze

Think like a senior full-stack engineer seeing this for the first time. Look across:

- **UI build cost**: custom components vs. existing design-system ones, complex interactions (drag and drop, inline editing, virtualized tables, rich text), responsive behavior, animation.
- **Data and backend**: new or changed data model fields, new endpoints, data that must be computed or aggregated, pagination/sorting/filtering at scale, real-time or polling needs, long-running or async operations, background jobs.
- **Permissions**: who can see and do what, role checks, external parties (buyers, counsel, investors), field-level visibility.
- **Workflow and state**: status machines, approvals and multi-party sign-off, time windows and deadlines, what happens on partial completion or cancellation, idempotency (double submits).
- **Side effects**: emails and notifications, document generation or e-signature, audit logs, webhooks, syncs with other systems (e.g. cap table data).
- **Validation and errors**: client vs. server validation, conflict handling when data changed underneath the user, failure recovery.
- **Migration and rollout**: existing data that needs backfilling, feature flags, behavior for records created before the change.
- **Unspecified states**: loading, empty, error, partial, permission-restricted. For a deep pass on edge cases and content stress tests, point to the `design-os-stress-test-design` skill rather than duplicating it.

Don't invent facts about Clarity's backend. When something depends on how the existing system works and the architecture doc doesn't settle it, phrase it as a question for eng.

## 4. Check the numbers

If the design shows calculations (totals, fees, breakdowns, counts), check that the mock values reconcile. Mismatched placeholder math hides real questions about formulas, so list each mismatch as a question about the formula. Don't propose corrected values; fixing the mock belongs to `design-os-fill-mock-data`, so point there once.

## 5. Output format

A short checklist, not tables. Don't include a "what's hard to build" section; turn each difficulty into a question the designer needs answered. Use this structure:

```
**Eng handoff**

Questions to answer before handoff
- [ ] One question per line, most impactful first. Append the mock mismatch or detail that prompted it when useful

Backend to confirm with eng
- [ ] Data model, endpoints, permissions, async work, audit, migration items, as short phrases
```

Rules:
- One line per item. Be concrete: name the element, field, or interaction.
- Merge overlapping items; don't repeat a point across sections.
- Don't invent facts about Clarity's backend; phrase them as items to confirm.
- Skip a section if it has nothing meaningful.

If the `design-os-stress-test-design` skill also runs, put any cleanup items (placeholder text, leftover layers, client-facing copy for `compliance-review`) in its Cleanup section rather than duplicating them.

End with one line offering to turn the open questions into a message for the PM or eng lead, or, when an Engineering Spec is next, to carry them into `pm-os-write-spec` as its open questions.

## Reference files

None.

## Lessons logged

- **Oct 15, 2026 (migration):** Moved from personal `design-eng-handoff` into clarity-design-os as `design-os-prep-eng-handoff` → uninstall personal copies so the two don't compete to trigger.
