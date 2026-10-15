---
name: "design-os-stress-test-design"
description: "Stress-test a Clarity design for edge cases: find where layouts break with long text, high volume, extreme numbers, and unusual states, and build a permutation matrix of realistic data to design and test against. Use for \"stress test this screen\", \"find edge cases\", \"what breaks\", \"cover all states\", \"generate permutations\". Not for: typical mock data (design-os-fill-mock-data), eng handoff questions (design-os-prep-eng-handoff), or Alloy coverage (design-os-audit-design-system)."
---

# Stress-test a design

Find where a design breaks under real-world content and data, and produce the permutations worth designing for. The user designs Clarity, the issuer-facing portal: cap tables, transfers, approvals, documents, stakeholders. Their data is unusually prone to extremes (long legal entity names, huge share counts, many decimal places, multi-party workflows), so lean into those.

## 1. Get the design

- **Figma link**: use the Figma connector. `get_screenshot` to see it, `get_design_context` / `get_metadata` to identify every dynamic element (text fields, numbers, lists, badges, avatars, tables, dates).
- **Description or screenshot**: work from that.

List the dynamic elements first. Static UI copy is out of scope unless it's localizable or user-editable.

## 2. Stress test

For each dynamic element, check the categories below. Use realistic values from `references/stress-data.md` rather than lorem ipsum or "AAAAAAA", because realistic extremes reveal realistic breakage.

- **Length**: shortest (1 char, single-name person), typical, longest realistic, unbroken strings (emails, URLs, IDs with no spaces).
- **Volume**: 0, 1, a few, many, way too many (tables with 10,000 rows, 40 badges, 200 stakeholders).
- **Numbers**: 0, negative where possible, tiny decimals, very large values, many digits after the decimal, currency and percent formatting, rounding that changes meaning.
- **Dates and time**: today, far past, far future, expired, time zones, relative vs. absolute display.
- **States**: loading, empty (first-use vs. no-results vs. no-permission), error, partial data, stale data, pending/approved/rejected/expired, mid-workflow cancellation.
- **People and roles**: viewer vs. admin vs. external party, user with no name or avatar, many collaborators, the current user appearing in lists.
- **Layout**: narrowest supported width, browser zoom at 200%, truncation vs. wrapping behavior, alignment of numeric columns.

## 3. Build permutations

1. Identify the variables (e.g. holder type, share class count, status, document count).
2. Give each variable its meaningful values, focusing on boundaries: min, typical, max, empty, invalid.
3. If the full combination count is small (under ~30), list them all. If it explodes, use pairwise coverage (every pair of values appears together at least once), and say so. Always add the riskiest combinations explicitly, such as max length + max volume + narrowest width.
4. Mark which permutations are worth designing as frames vs. only testing in build.

## 4. Output format

A short checklist, not tables. Use this structure:

```
**Edge cases to design**

High
- [ ] Case (example value or detail)

Medium
- [ ] ...

Low
- [ ] ...

Cleanup
- [ ] Mock numbers that don't reconcile (name them; fix with `design-os-fill-mock-data`), leftover placeholders, hidden layers, client-facing copy to check with `compliance-review`
```

Rules:
- One line per item, with a short example in parentheses where it helps.
- Severity: High = broken or misleading, Medium = ugly or awkward, Low = minor polish.
- Mark cases the design doesn't show as needing a design, not as passing.
- Check that mock values reconcile (totals, fees, calculations) and list mismatches under Cleanup. Don't propose replacement values; `design-os-fill-mock-data` owns the fix, so one finding doesn't turn into three.
- Keep the permutation matrix out of the default output. Offer it instead; when asked, give it as a table and note the method (full matrix or pairwise).

## 5. Data files, Figma, and prototypes (on request)

If the user wants the data itself, create a CSV or JSON file of the permutations with realistic values and present it, so it can be pasted into Figma (e.g. with a data-populating plugin) or used by eng as fixtures.

If the user wants stress-test variants built in Figma, use the Figma connector's `use_figma` tool, following the Figma connector's own skill guidance first. Confirm before writing, because Figma edits land in a shared file. Duplicate the frame and populate each variant rather than editing the original.

If the screen is a coded prototype, or the designer is about to build one, offer the permutations as playground controls instead of a file. Map each variable to a control (a count becomes a range, a long-text or missing-data case a toggle, a status a select) and the riskiest combinations to presets, following `design-os-prototype` `references/playground.md`. Hand the plan to `design-os-prototype` to install; don't write prototype code from this skill.

End with one line offering the permutation matrix, a CSV/JSON of the data, Figma variants, or (for a coded prototype) playground controls.

## Reference files

- `references/stress-data.md`: realistic extreme values (names, IDs, numbers, volumes, dates, statuses). Read in step 2.

## Lessons logged

- **Oct 15, 2026 (migration):** Moved from personal `design-edge-cases` into clarity-design-os as `design-os-stress-test-design` → uninstall personal copies so the two don't compete to trigger.
