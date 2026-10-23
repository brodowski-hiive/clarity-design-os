# Sophisticated audience mode

Use this mode for screens and flows owned by the 3PF, Issuers, and Investing teams: fund investment
flows, fund bidding and partial bids, fund resales, eligibility and review communications,
issuer-facing tools, institutional onboarding and workflows, and related emails and notifications.

## Who the reader is

Institutional investors, accredited and qualified purchasers, issuers, and Clarity Investments fund
investors. Internally this group is called Sophisticated Users. They understand core secondaries
and capital markets concepts: bidding, pricing, review periods, settlement, eligibility review, and
cap table mechanics.

Some readers, particularly newer or wealth-channel investors in fund flows, know less about
secondary market mechanics even though they meet accreditation thresholds. Add context for them
only when the designer says that segment is the target.

## How this changes the copy

**Use as few words as possible.** Compress explanation even at transactional or trust-building
moments when this audience already knows the mechanic. Save added explanation for genuinely new
information. If one sentence implies the same thing as two, use one.

**Don't over-define.** Use common language over internal language, but don't define terms this
audience is expected to know.

**Error messages and empty states** assume the reader understands the mechanic. Don't re-teach it.
Empty states frame possibility per the style guide without extra explanation.

**Take audience variants.** Where the style guide offers a variant for ClarityConnect, Back Office,
issuers, or institutions, use it. The style guide ranks audience variants above its default rules.

**Keep touchpoints consistent.** A modal and an email covering the same event use the same framing
and terms. If the designer is working on one, note in the handoff if a matching surface likely
needs the same change.

**Issuer-centric framing.** For issuer-facing copy, lead with what the issuer can see, control, or
decide.

## Fund transaction rules

These apply to Clarity Investments fund flows and to resales of funds managed by a Clarity partner,
not to issuer or general institutional copy.

- **Approval framing.** Never imply Clarity must approve, accept, or advance a bid or order.
  Approvals are at Clarity's discretion. Use outcome-neutral language ("We'll let you know the
  outcome") unless approval is confirmed, and always acknowledge the case where it isn't approved.
- **Review reasons.** Don't list eligibility criteria. Say what happens next, not how the review
  works. When copy covers several review scenarios, use language that covers all of them without
  naming one: "If your bid is ineligible," not "If the fund can't accept new investors."
- **Technical accuracy.**
  - A bid on a fund is not a bid on the underlying company.
  - Partial bids and full-lot bids have different review implications. Don't conflate them.
  - Single-layer and dual-layer funds have different eligibility rules. Copy covering both must not
    imply either.
  - Investor capacity (seat count) is distinct from general fund eligibility.
  - A full resale can bring in a new investor. Only partial bids create the seat count issue.
- **Transaction states are distinct.** "Bid submitted," "bid under review," "bid accepted," and
  "order confirmed" are different states. Never blur them, especially in email subject lines,
  which must be specific about the state.
- **Interim notifications.** Where there's a known waiting period, flag in the handoff whether an
  interim notification might be needed. Leadership has flagged this as a recurring gap.
- **Fund naming.** "Clarity Investments funds" for the fund brand, "Clarity Investment Management
  funds" for the manager. Lowercase "funds" in both. Never "Clarity Fund," "Clarity Funds," or a
  capital F.
- **Contact email.** Use the inbox that matches the surface and desk, per the email addresses table
  in the style guide. If the right desk is unclear, ask or flag it.

## Issuer and institutional rules

- **Authority and discretion.** Be precise about what is Clarity's decision, what is the issuer's,
  and what needs a third party such as a transfer agent or counsel. Don't blur these to save words.
- **Multiple stakeholders.** The person reading a notification may not be the one who takes the next
  action. Allow for that without over-explaining.
- Both source documents cover issuer and institutional terms less thoroughly than trading and fund
  terms. Flag judgment calls in this area.

If it's unclear whether the fund rules or the issuer rules apply, ask rather than defaulting to the
fund rules.

## Draft copy from the designer

Keep what works. Copy that over-explains concepts this audience knows counts as not serving the
user and is a valid reason to rewrite it.

## When to switch modes

If the screen turns out to serve restricted sellers or users newer to secondaries, switch to
`general-audience.md` and say so in the handoff.
