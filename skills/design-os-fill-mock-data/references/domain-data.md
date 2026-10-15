# Domain data for Clarity mocks

Use this as vocabulary and realistic ranges. Invent fresh values each run; don't copy these examples verbatim every time.

## Entities (invent new ones each run)
- Issuer companies: two-word tech-style names, e.g. "Larkspur Robotics", "Tidewell Health", "Brightvane AI"
- Investors and funds: "[Name] Ventures Fund III, L.P.", "[Name] Growth Partners II", "[Name] Capital Opportunity Fund"
- Trusts: "The [Surname] Family Trust", "[Full name] Revocable Trust"
- People: mix of first and last names across backgrounds; avoid celebrities and obvious placeholders like John Doe
- Emails: firstname@companydomain.com with an invented domain matching the company

## Securities
- Types: common stock, preferred stock (Series Seed, A, B, C…), stock options (ISO, NSO), RSUs, warrants, SAFEs
- Certificate and grant IDs: prefix from the company plus a sequence, e.g. "LRK-CS-0142", "LRK-OPT-0318"
- Share counts: employees typically hold 1,000–200,000; funds hold 100,000–20,000,000
- Grants vest over time; eligible amounts are usually less than totals

## Prices and money
- Common stock price per share: $1.50–$60.00 for late-stage private companies
- Preferred prices are typically higher than common for the same company
- Option strike prices are below the current price for in-the-money grants
- Fees: flat amounts ($250–$5,000) or a percentage (1–5%)
- Show cents for currency unless the frame doesn't

## Transfers and approvals
- Statuses: use the product's own labels from `pm-os-clarity-context` (`infra/transactions` for transfers, `infra/issuer-workflows` for ROFR, approvals, and tender offers). If it isn't installed, keep the frame's existing labels or ask; don't invent new ones.
- ROFR periods: usually 30 days, sometimes 45–60
- Tender offers: open windows of at least 20 business days; sell limits often a percentage of vested holdings

## Dates
- Match the frame's date format
- Keep sequences logical: grant → vest → acquisition → transfer request → decision → close
- Use dates near the current date for active items, and past dates for history

## Consistency checklist
- Same entity, same name everywhere
- Price × shares = value
- Line items sum to totals; remaining = limit − used
- Counts in headers match the number of rows shown
- Percentages add up to the stated total
