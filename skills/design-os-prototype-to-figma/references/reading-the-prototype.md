How to read a coded prototype before porting it: get it running, find the screens and states, read the layout, and map the code to Alloy in Figma. Read in steps 1 and 2. Everything here is read-only on the prototype.

## Get it running

| Source | How |
|---|---|
| ai-prototypes app | Follow the repo's CLAUDE.md to run the app. Read `apps/<name>/prototype.json` for the name, description, and any `links.figma`. |
| Local project | Use its own dev script (`package.json`). Read its routes from the router config or `src/` folders. |
| Running URL | Open it in the browser as-is. You can only port what you can reach by clicking, so ask for the routes if there's no visible nav. |
| Plain HTML file | Open it directly. Expect fewer Alloy imports to map; components may be approximated with Alloy CSS (see `design-os-prototype`'s receipt). |

In ai-prototypes, installing needs a GitHub token with `read:packages`, because `@hiivemarkets/alloy` comes from GitHub Packages. A 403 on install means the designer has to run `gh auth refresh -s read:packages -h github.com` themselves (it opens a browser); then install with `GH_NPM_TOKEN="$(gh auth token)"`. If `pnpm` and `mise` aren't installed, `corepack pnpm` works.

Open each screen in the in-app browser (`preview_start`). If the app won't start, say what failed and stop. Don't port from source code alone, because the rendered layout is what the frames must match.

## Find screens and states

- **Screens:** one per route, or one per step in a stepper or wizard.
- **States:** state toggles, `?state=` params, and playground presets. Playground settings live in the URL, so load each preset by URL and screenshot it. Port only the states that change what's on screen: Default, Empty, Error, and Loading usually; skip presets that differ only in the count of an item that repeats.
- **Overlays:** dialogs, drawers, and toasts that open from a screen. Port each one as a frame showing the screen with the overlay open.
- Ignore the playground panel itself (add `?playground=off` before screenshotting) and anything listed as prototype-only demo controls. Older playgrounds (like `apps/fund-offerings`) ignore `?playground=off`; leave their launcher out of the port by hand.
- Playground options that switch between design alternatives (layout, density, hover style) aren't states. Port the default and offer the alternatives as extra frames on the plan.

## Screenshots

Take one screenshot per screen and state at 1440px wide, full page. If the designer wants mobile, also take each at 390px. Keep them for the per-screen comparison in step 4 of the build.

## Read the layout from the DOM

Use the browser's JavaScript tool for inspection only. For each container on a screen, read the computed style:

| CSS | Figma auto layout |
|---|---|
| `display: flex`, `flex-direction: row` / `column` | Horizontal / vertical auto layout |
| `gap`, `row-gap` | Item spacing |
| `padding-*` | Padding |
| `justify-content`, `align-items` | Primary and counter axis alignment |
| `flex: 1`, `width: 100%` | Fill container |
| Width from content | Hug contents |
| Fixed `width` / `max-width` | Fixed width (and max width) |
| `display: grid` | Auto layout grid if the columns are even; otherwise nested horizontal rows |
| `flex-wrap: wrap` | Wrap |
| `position: absolute` / `fixed` | Absolute position only for overlays that float on purpose |

`PageContainer`, `PageSection`, and `CenteredPageSection` set page padding, width, and rails. Read their computed values; don't guess.

Stop at Alloy component boundaries: you don't need the internals of a `Button`, only the props it was given.

## Map imports to Figma components

0. Check composite Alloy components first. Chrome the code builds from parts often exists whole in Figma: the dark nav (`NavTabs` + `Avatar` + `Badge` + search) is `Main Nav - Desktop`, with `Combobox / Inverse` as its search. Place the composite, not the parts.
1. List the Alloy imports used on each screen (`@hiivemarkets/alloy/...` subpaths and `@hiivemarkets/alloy-icons/<icon-slug>`), and the props set on each instance.
2. Find each component's entry in the installed `node_modules/@hiivemarkets/alloy/dist/design/COMPONENTS.md` for its name.
3. Search Figma for it, scoped to the Alloy library key, with a handful of queries per call (`design-os-audit-design-system`'s `references/alloy-library.md`). Keep the `componentSetKey` or `componentKey`.
4. Check Code Connect where it's set up: a mapping that points at the same import confirms the match and gives the prop-to-variant mapping.
5. Read the Figma description. If it names a different component for this use, follow it and note it on the plan.
6. Map props to variants by name (`variant="secondary"` → `Variant=Secondary`). A prop value with no variant goes on the plan as "no variant", and you'll use the closest one.
7. Icons: search the Alloy library by the icon's name.

Things that aren't Alloy imports (the prototype's own components, custom CSS, or anything its receipt lists as Custom) are expected gaps. Look inside them: a custom component often wraps Alloy pieces you can still place as instances.

## Map tokens

Alloy's Tailwind utilities name their tokens; `TOKENS.md` in the installed package lists which variable each one uses.

- **Colors:** find the `2. Clarity` variable with the same name. If the names differ, compare resolved values exactly (follow alias chains, include `colors/chart/*`).
- **Spacing and radius:** the matching `1. Primitives` variable by value. Variables whose description says "Internal scale · component construction only" (`spacing/0-5`, `1-5`, `2-5`, `3-5`) aren't for layout; treat their values as having no variable. Alloy has no 60px or 68px spacing. `search_design_system` returns the whole scale for most spacing queries, so read names from the results rather than trusting the top hit.
- **Text:** match family, size, weight, and line height to a `Responsive Type/*` style. Never use `DS team use only/*` styles.
- **No exact match:** note the closest on the plan, as "closest", so the designer sees it before you build.
