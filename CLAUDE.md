# Léon theme (cecil/theme-leon)

Documentation theme for [Cecil](https://cecil.app), visually inspired by <https://code.claude.com/docs/> (Mintlify + Anthropic custom CSS). Not affiliated with Anthropic: never use Anthropic fonts, logo or name in the theme.

The maintainer speaks French: answer in French, and ask questions as decisions come up rather than deciding alone.

## Decisions taken

- Name **Léon**: package `cecil/theme-leon`, `extra.name: leon`, options under `leon:`, assets/partials namespaced `leon` (`partials/leon/*`, `.leon-*` classes, `--leon-*` custom properties).
- Built from scratch (not a fork of `theme-docs`), reusing its sidebar / prev-next logic.
- **Tailwind CSS v4**, compiled to `assets/leon.css` (committed). Sources in `assets/css/` (`tailwind.css` = tokens + `@theme inline`, then `base`, `layout`, `content`, `blocks`, `highlight`, `flexsearch`).
- Design tokens: light `--leon-page #fdfdf7`, dark `#09090b`; accent clay `#D97757` (light) / kraft `#D4A27F` (dark), overridable with `leon.accent` / `leon.accent_dark` (dark derived with `color-mix` if only `accent` is set). Deliberate deviation from the original: in light mode the eyebrow and link underlines use the accent.
- Fonts bundled in `static/fonts/` (OFL): Hanken Grotesk (sans), Newsreader opsz (serif headings).
- Navigation: top level sections = **tabs**; sidebar = the current tab's tree (level 1 sub-sections as group titles, deeper ones as collapsible `<details>`).
- Required component themes: `flexsearch` (search) and `darkmodetoggle`; `pwa` pre-wired with `ignore_missing`. Built-in `partials/metatags.html.twig` for SEO.
- Mermaid diagrams: optional component theme [`pele`](https://github.com/Cecilapp/theme-pele) (Cecil 9.18+, Composer `suggest`), included in the `<head>` with `ignore_missing` (the former Mermaid.js integration and the `leon.mermaid` option are removed). Léon keeps the graph paper look on `.pele-diagram` and maps the `--pele-*` colors to its tokens, in an unlayered rule (the Pele `<style>` is unlayered) set on the diagram itself (Pele dark defaults are on `:root`). `leon.js` skips the copy button of Mermaid blocks only when `window.cecilPele` exists: without Pele they are plain code blocks.
- Content components use the native Cecil note syntax `:::type … :::`: callouts (`note`, `info`, `tip`, `warning`, `danger`/`caution`, `important`, `check`) are rendered `<aside class="note note-type">` and styled in CSS; `tabs`, `code-group`, `steps`, `accordion`, `cards` are rendered `<div class="note note-type">` in HTML at build time by `layouts/partials/notes/<type>.html.twig` (Cecil 9.12 note templates, [Cecil#2510](https://github.com/Cecilapp/Cecil/pull/2510): `note.items` split on `####` headings, list entries or code blocks). `assets/js/leon.js` only makes tabs interactive (`[data-leon-tabs]`); without JS, panels are stacked under their title. An inline script adds `leon-js` on `<html>` before the first paint so the CSS shows the tab list and the first panel without layout shift. Since Cecil 9.13.0 ([Cecil#2513](https://github.com/Cecilapp/Cecil/pull/2513)) blocks can be nested with a longer outer fence (`::::steps` … `::::`): the templates and `leon.js` (`:scope >` selectors) support it, demo section "Nesting" of the writing content guide.
- Language selector (`partials/leon/language.html.twig`): a `<details>` menu of `<a hreflang>` links, so it works without JS (a `<select>` needed JS to navigate); `leon.js` only closes it on outside click / Escape and stores the choice. `up: true` opens it upwards (footer).
- Browser language (`leon.language.suggest`, opt-in): no redirect, a bottom banner (`partials/leon/language-banner.html.twig`, one per translation, written in the target language with `trans(…, locale)`) suggests the translation matching `navigator.languages`; displayed until the visitor follows it or closes it, or uses the language selector (`leon-language` in localStorage; storing it on display was too fragile: a livereload consumed it).
- "Copy page" menu: copy Markdown (fetches the page `.md` output, falls back to the article text), view as Markdown, open in Claude / ChatGPT / Perplexity.
- Léon requires **Cecil 9.18.0+** (layered configuration, [Cecil#2531](https://github.com/Cecilapp/Cecil/pull/2531)): the theme `config.yml` sets `pages.sortby: weight`, `pages.pagination.enabled: false`, and adds the `markdown` (page, section) and `llms` (homepage) output formats with maps of booleans (a list would replace the defaults); the site no longer needs to set them.
- Syntax highlighting: `assets/css/highlight.css` styles both engines, highlight.php (`.hljs`, `hljs-*`) and tempest/highlight (`pages.body.highlight.engine: tempest`, Cecil 9.17: `<code class="language-x hl">`, `hl-*`), with the same `--hl-*` palette. Tempest leaves unknown languages (bash, powershell, markdown) plain.
- The demo workflow runs `doctor:links --include-generated` before the build (internal links only).

## Cecil gotchas learned

- Configuration priority since Cecil 9.18: Cecil defaults < themes < site < env/CLI. Maps merge key by key; a list of values replaces the lower one (theme + site lists are combined); a map of booleans adds/removes values of a list. `cecil show:config --key=<key>` shows the effective value. Overriding a nested key with an env variable (`CECIL_PAGES_BODY_HIGHLIGHT_ENGINE`) failed ("cannot be indexed into"): use an extra file with `--config=cecil.yml,extra.yml`.
- With pagination enabled, `/docs/page/2/` is also a top level `section` page (a clone with id `docs/page/2`, `paginated: true`): tabs filter out `p.paginated`, and the root (active tab, sidebar) of a paginated page is its first page, found with `page.paginator.links.first`. The theme renders no pager (cards list every child), hence pagination disabled by the theme config.
- Cecil adds top level sections to `menus.main`: the header filters out entries already shown as tabs (`menu_links` in `page.html.twig`). Those entries have the page id **without language** (`docs`, while the French page id is `fr/docs`): compare with `idWithoutLang`.
- `site.pages` is already scoped to the current language.
- The Twig `url()` function prefixes a string path with the current language (`url('fonts/x.woff2')` → `/fr/fonts/x.woff2` on French pages): link static files with `url(asset('…'))`.
- A theme can't change the Markdown parser: no code block titles (use `####` in a code group).
- A note template is rendered during Markdown conversion: only `note` and translations are available, not `page` or `site`.
- Before Cecil 9.11.1, a `:::` block was closed by the first line *containing* `:::` (even in inline code), and that line was dropped ([Cecil#2507](https://github.com/Cecilapp/Cecil/pull/2507)): now only a line made of `:::` closes a block; the overview demo page keeps a `` `:::` `` inside an accordion as a regression check.
- The `MarkdownLink` post processor rewrites every `href="….md"` of the whole HTML output (templates included) to the HTML page URL: link to the Markdown version with `url(page, {format: 'markdown', canonical: true})` (an absolute URL is not matched), and check `'markdown' in page.output`.
- The FlexSearch stylesheet (bundled before `leon.css`, the bundle is inlined in a `<style>` with the `inline` asset filter) is not in a CSS layer: Léon rules overriding it must be unlayered too (`assets/css/flexsearch.css`), a layered rule always loses. The home search box uses the `full` trigger through the `trigger` include variable (theme-flexsearch 1.1+).
- Per language config (`languages[].config`): since Cecil 9.18 a key such as `leon` is merged key by key with the global one (the demo's French config only sets `header.cta.name` and `footer`), but `menus` are still read without fallback (a language without its own `menus` has no config menu entries): repeat them.
- The skip link targets `#content` (the `<article>`, also used by `leon.js`); templates without an article set `skip_link_target` (`main`) before `extends`: the 404 always, the home when its content is empty (found by `doctor:links`).
- `llms.txt` lists a section twice when pagination is enabled (Cecil template, not the theme).

## Develop and test

```bash
# CSS (theme-docs ships the tailwind-builder binary; or `composer install` then `composer css:build`)
../theme-docs/vendor/bin/tailwind-builder ./assets/css/tailwind.css --output=./assets/leon.css --minify
# demo: links themes/leon (+ sibling theme-flexsearch / theme-darkmodetoggle, or git clone)
php demo/link.php
cd demo && cecil build --output=_build && php -S localhost:8000 -t _build
```

- `cecil serve` does not pick up changes made through the `demo/themes/leon` junction: rebuild instead. Translations are cached: since Cecil 9.12.1 ([Cecil#2512](https://github.com/Cecilapp/Cecil/pull/2512)) an edited translation file is picked up on rebuild, but a new one (new locale) still needs `--clear-cache`. `demo/_site` may be locked by VS Code on Windows, hence `_build`.
- Check visually with `playwright-cli` (light/dark via `window.colorScheme.set('dark')`, mobile 390×844).
- Conventions: 2-space indent, LF, Twig files without trailing newline, every UI string in `{% trans %}` + `translations/messages.fr.yml`.

## Open items

- Dropdown menus under tabs (groups of each tab), as on Claude Code Docs: proposed, not decided.
- Repository: <https://github.com/Cecilapp/theme-leon> (public, `main`); the demo is deployed on <https://cecilapp.github.io/theme-leon/> by `.github/workflows/demo.yml` on each push to `main`.
- On Packagist as `cecil/theme-leon` (auto-updated by the GitHub webhook). Latest release: `1.7.0`.

## Release

Tags without prefix (`1.0.0`), and a GitHub release with a `leon.zip` asset (the README and the demo link to `releases/latest/download/leon.zip`), built with `git archive --format=zip -o leon.zip <tag>` (respects the `export-ignore` of `.gitattributes`, files at the root of the archive). The Packagist web page may lag behind: `composer show -a cecil/theme-leon` tells what Composer sees.
