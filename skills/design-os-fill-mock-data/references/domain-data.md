# Domain data for Clarity mocks

The one Clarity data reference for design-os skills. Each topic has **Typical** values (what `design-os-fill-mock-data` uses so a screen reads like a real issuer's account) and **Extremes** (what `design-os-stress-test-design` uses to find where layouts break). Invent fresh values each run; don't copy these examples verbatim every time. All names are fictional or generic.

## Entities and people

Typical (invent new ones each run):
- Issuer companies: two-word tech-style names, e.g. "Larkspur Robotics", "Tidewell Health", "Brightvane AI"
- Investors and funds: "[Name] Ventures Fund III, L.P.", "[Name] Growth Partners II", "[Name] Capital Opportunity Fund"
- Trusts: "The [Surname] Family Trust", "[Full name] Revocable Trust"
- People: mix of first and last names across backgrounds; avoid celebrities and obvious placeholders like John Doe

Extremes:
- Shortest person: "Li"; a mononym: "Teller"
- Long person: "Maria Guadalupe Hernández-Villanueva de la Cruz"
- Non-Latin: "王小明", "Иван Петров", "محمد عبدالله"
- Long entity: "Northwind Ventures Opportunity Fund IV, L.P., a Delaware limited partnership"
- Entity with symbols: "O'Brien & Sons Holdings (Cayman) Ltd."
- Trust: "The Jonathan A. Whitfield-Remington Revocable Living Trust dtd 03/14/2011"
- Missing: no name on record, show email only

## Emails, IDs and files

Typical:
- Emails: firstname@companydomain.com with an invented domain matching the company
- Certificate and grant IDs: prefix from the company plus a sequence, e.g. "LRK-CS-0142", "LRK-OPT-0318"

Extremes:
- Long email: "investor.relations.department@northwindventuresopportunityfund.com"
- Unbroken ID: "TXN-2026-000184736-ROFR-AMENDED"
- Long file name: "Series_C_Preferred_Stock_Purchase_Agreement_FINAL_executed_v7_signed_all_parties.pdf"

## Securities and shares

Typical:
- Types: common stock, preferred stock (Series Seed, A, B, C…), stock options (ISO, NSO), RSUs, warrants, SAFEs
- Share counts: employees typically hold 1,000–200,000; funds hold 100,000–20,000,000
- Grants vest over time; eligible amounts are usually less than totals

Extremes:
- Shares: 0, 1, 12, 1,250,000, 4,000,000,000
- Fractional shares: 1,234.5678

## Prices and money

Typical:
- Common stock price per share: $1.50–$60.00 for late-stage private companies
- Preferred prices are typically higher than common for the same company
- Option strike prices are below the current price for in-the-money grants
- Fees: flat amounts ($250–$5,000) or a percentage (1–5%)
- Show cents for currency unless the frame doesn't

Extremes:
- Price per share: $0.0001, $0.42, $1,234.56, $12,500.00
- Value: $0.00, $4.2B, $1,234,567,890.12
- Ownership: 0.0001%, 0.01%, 33.333...%, 100%
- Negative or reversal amounts where the UI allows them

## Volume

Typical: a few rows to one screen's worth; enough variety that no two rows match.

Extremes:
- Stakeholders: 0, 1, 7, 250, 12,000
- Share classes: 1, 3, 14
- Documents in a folder: 0, 1, 40, 2,000
- Approvers in a chain: 1, 3, 9
- Tags/badges on one row: 0, 1, 6, 25

## Transfers, approvals and statuses

- Statuses: use the product's own labels from `pm-os-clarity-context` (`infra/transactions` for transfers, `infra/issuer-workflows` for ROFR, approvals, and tender offers). If it isn't installed, keep the frame's existing labels or ask; don't invent new ones.
- ROFR periods: usually 30 days, sometimes 45–60
- Tender offers: open windows of at least 20 business days; sell limits often a percentage of vested holdings

Extremes: the statuses designs most often miss: expired, cancelled mid-workflow, partially completed, failed and needing a retry, and whichever label is longest.

## Dates and time

Typical:
- Match the frame's date format
- Keep sequences logical: grant → vest → acquisition → transfer request → decision → close
- Use dates near the current date for active items, and past dates for history

Extremes:
- Today, yesterday, 3 years ago, 2 years in the future
- Deadline expiring in 5 minutes
- Event across a time zone boundary (submitted 11:58 PM PT, which is the next day in ET)

## Consistency checklist

The one place the mock-math check is defined. Other skills check against it and hand fixes to `design-os-fill-mock-data`.

- Same entity, same name everywhere
- Price × shares = value
- Line items sum to totals; remaining = limit − used
- Counts in headers match the number of rows shown
- Percentages add up to the stated total
