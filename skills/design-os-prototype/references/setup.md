Getting `@hiivemarkets/alloy` installed and wired up. Read when creating an app, adding Alloy to a project, or touching an ai-prototypes app.

## Swap an ai-prototypes app to Alloy

`mise run new` still scaffolds with `@hiivemarkets/ui`. On every new or touched app:

1. In the app's `package.json`, remove `@hiivemarkets/ui` and add `@hiivemarkets/alloy` (plus `@hiivemarkets/alloy-icons` if you need icons). Use the version the newest Alloy app in the repo uses, or the latest published one.
2. Replace the design-system block in `src/styles.css` with the setup below.
3. Set `data-theme="clarity"` on `<html>` in the worker's SSR shell, and give the shell a real `<title>` (for example `Offer approvals · Clarity`).
4. Change every `@hiivemarkets/ui/<x>` import to its Alloy equivalent, checking each against `COMPONENTS.md`, because names and props differ.
5. Install and rebuild, using the repo's own commands.
6. Fill in `prototype.json` (`references/listing.md`).

`apps/fund-offerings` has already made this swap. Compare against it if something renders unstyled.

## CSS setup (order matters)

```css
@import "tailwindcss";
@import "@hiivemarkets/alloy/styles";
@import "@hiivemarkets/alloy/theme";
@import "@hiivemarkets/alloy/themes/clarity";
@source "./"; /* the app's own files only */
```

- Don't add an `@source` pointing into Alloy. Alloy declares its own, and a hand-written path breaks silently when the package moves.
- Don't use `@theme inline`.
- If buttons render unstyled, the imports are missing or out of order.
- If text is in Inter instead of Roobert, `data-theme="clarity"` is missing from `<html>`.

## Plain HTML mocks

For a single HTML file with no build step, such as a quick share or a preview:

- **Tokens:** read the `--ds-*` custom properties from the installed package's `dist/themes/clarity.css` and `dist/variables.css`, and inline them in one `:root` block. Those files are plain CSS. `dist/theme.css` is Tailwind syntax, so don't link it.
- **Fonts:** previews can't load fonts by URL, so embed the Roobert faces you use as base64.
- **Components:** recreate each one with CSS that reads only `var(--ds-*)`, copying class values from the component source. Name classes after the component (`.btn--outline`, `.badge--amber`) so the mapping is obvious.
- **Receipt:** say components are approximated, and which ones.

## Where the docs are

The installed package ships its docs at `node_modules/@hiivemarkets/alloy/dist/design/COMPONENTS.md` and `TOKENS.md` (also exported as `@hiivemarkets/alloy/COMPONENTS.md` and `@hiivemarkets/alloy/TOKENS.md`). The package's `exports` field is the authoritative list of components: each subpath is one.
