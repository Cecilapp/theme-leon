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
- Content components use the native Cecil note syntax `:::type … :::` (rendered `<aside class="note note-type">`): callouts (`note`, `info`, `tip`, `warning`, `danger`/`caution`, `important`, `check`) styled in CSS; `tabs`, `code-group`, `steps`, `accordion`, `cards` enhanced by `assets/js/leon.js` (`####` headings split items). Blocks can't be nested.
- "Copy page" menu: copy Markdown (fetches the page `.md` output, falls back to the article text), view as Markdown, open in Claude / ChatGPT / Perplexity.

## Cecil gotchas learned

- Theme `config.yml` is imported with `IMPORT_PRESERVE` **after** Cecil defaults: it can't change existing keys (`output.pagetypeformats`, `pages.sortby`, `pages.pagination`…). The site must set them (documented in README).
- With pagination enabled, `/docs/page/2/` is also a `section` page: tabs filter out `p.paginated`.
- Cecil adds top level sections to `menus.main`: the header filters out entries already shown as tabs (`menu_links` in `page.html.twig`).
- `site.pages` is already scoped to the current language.
- The Twig `url()` function prefixes a string path with the current language (`url('fonts/x.woff2')` → `/fr/fonts/x.woff2` on French pages): link static files with `url(asset('…'))`.
- A theme can't change the Markdown parser: no code block titles (use `####` in a code group).
- Léon requires **Cecil 9.11.1+**: before it, a `:::` block was closed by the first line *containing* `:::` (even in inline code), and that line was dropped ([Cecil#2507](https://github.com/Cecilapp/Cecil/pull/2507)). Now only a line made of `:::` closes a block; the overview demo page keeps a `` `:::` `` inside an accordion as a regression check.
- The `MarkdownLink` post processor rewrites every `href="….md"` of the whole HTML output (templates included) to the HTML page URL: link to the Markdown version with `url(page, {format: 'markdown', canonical: true})` (an absolute URL is not matched), and check `'markdown' in page.output`.
- `llms.txt` lists a section twice when pagination is enabled (Cecil template, not the theme).

## Develop and test

```bash
# CSS (theme-docs ships the tailwind-builder binary; or `composer install` then `composer css:build`)
../theme-docs/vendor/bin/tailwind-builder ./assets/css/tailwind.css --output=./assets/leon.css --minify
# demo: links themes/leon (+ sibling theme-flexsearch / theme-darkmodetoggle, or git clone)
php demo/link.php
cd demo && cecil build --output=_build && php -S localhost:8000 -t _build
```

- `cecil serve` does not pick up changes made through the `demo/themes/leon` junction: rebuild instead. `demo/_site` may be locked by VS Code on Windows, hence `_build`.
- Check visually with `playwright-cli` (light/dark via `window.colorScheme.set('dark')`, mobile 390×844).
- Conventions: 2-space indent, LF, Twig files without trailing newline, every UI string in `{% trans %}` + `translations/messages.fr.yml`.

## Open items

- Dropdown menus under tabs (groups of each tab), as on Claude Code Docs: proposed, not decided.
- Git repository not initialized yet; GitHub Pages demo workflow in `.github/workflows/demo.yml` targets `Cecilapp/theme-leon`.
