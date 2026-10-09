Adding a playground panel to a prototype: the plan, the stress-test settings to suggest, and how to install it. Read when the designer asks for a playground, tweaks, or test controls, or when offering one after a build.

## What it is

A small onyx, monospace panel in Clarity colors that opens from a "Playground" launcher in the bottom-right. Testers use it to stress the prototype (empty, many, long text, errors, loading) and to flip between design options. Settings live in the URL, so "Copy link" gives anyone the exact same state (a pop-up explains this to the tester). `?playground=off` hides it for demos and screenshots; the tilde key (~) opens and closes it, as the title bar says.

It's prototype tooling, not design: it never uses Alloy components, and it always looks the same, in every prototype.

## 1. Propose a plan first

Read the prototype's screens and data, then suggest settings in a short table and ask the designer to confirm, cut, or add:

| Control | Type | Values | Why |
|---|---|---|---|
| Fund offerings | Range | 0–50, default 6 | Empty state, one row, and a long scrolling list |
| Long names | Toggle | off | Truncation in rows and the rail |
| Load error | Toggle | off | Shows the Alloy Alert |

Suggest only what this prototype can show. Every control must change something visible; a toggle that does nothing is worse than none.

## 2. What to suggest

Always offer the **baseline presets** that apply: Default, Empty, One, Many, Long text, Error, Loading.

Then pick from this catalog based on what's on screen:

- **Lists and tables:** item count (0 to well past one screen); one item; exactly one page and one over (pagination); all items in one status; sorting or filters returning nothing.
- **Text:** long names (90+ characters), long words with no spaces, missing optional fields (no logo, no description), names with accents and symbols.
- **Numbers and money:** zero, very large (billions), negative or down moves, many decimal places, fractional shares, price unavailable.
- **Dates and time:** today, long ago, far future, missing, expiring soon.
- **Forms:** prefilled vs empty, validation errors on every field, submitting, server error after submit, success.
- **Loading and network:** loading skeleton, slow load (a few seconds), load error, partial failure (one section fails).
- **People and access:** role (viewer, admin), new user vs power user, account not verified, feature not available.
- **Clarity specifics:** stale or delayed price, listing closed or expired, no activity yet.
- **Design options:** layout, density, or visual variants the designer is choosing between, as Design choices. Lock a choice when the screen forces it ("Small screens always use condensed rows").

States should render real Alloy states: `EmptyState` for empty, `Skeleton` for loading, `Alert` for errors, `Toast` for action results. If Alloy has no component for a state, list it as a gap.

## 3. Install

1. Copy the four files from this skill's `assets/playground/` into the prototype at `src/playground/`, unchanged: `engine.ts`, `provider.tsx`, `panel.tsx`, `playground.css`. If they already exist, compare and update to the skill's version.
2. Write `src/playground/config.ts` from the approved plan, using `assets/playground/config.example.ts` as the pattern. Groups, in this order: Data, States, Content, Design, Access. Use the designer's words for labels.
3. Import `./playground/playground.css` from the app's CSS entry, after the Alloy imports.
4. Wrap the app in `client.tsx`: `<PlaygroundProvider config={playground}><App /></PlaygroundProvider>`.
5. Read settings where they matter: `const s = usePlayground(playground);`. Put fake-data generation in `src/data/` driven by those settings (`makeFunds({ count: s.items, longText: s.longText })`), not scattered through components.
6. Verify in the browser: the launcher shows, each control visibly changes the page, presets apply, Copy link reproduces the state in a new tab, and `?playground=off` hides it.

Prototypes that aren't React (plain HTML) don't get the playground; say so and offer to move the prototype to React.

## Existing playgrounds

`apps/fund-offerings` has an older retro-style playground. Don't convert existing ones unless asked; new playgrounds always use these files.
