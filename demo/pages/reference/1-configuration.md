---
title: Configuration
description: All the options of Léon, with their default values.
---
Léon options are namespaced under `leon`:

```yaml
leon:
  accent: ''         # accent color (e.g. '#2563eb'), clay by default
  accent_dark: ''    # accent color in dark mode, derived from `accent` by default
  fonts:
    bundled: true    # loads the bundled fonts
    sans: ''
    serif: ''
    mono: ''
  header:
    title: true      # site title next to the logo
    cta: {}          # e.g. {name: Get started, url: /docs/}
  tabs:
    enabled: true
    sections: []
  sidebar:
    collapsed: false
  toc:
    enabled: true
  copypage:
    enabled: true
    assistants: [claude, chatgpt]
  github:
    repo: ''
    branch: main
    path: pages
  lastupdated: false
  social: {}         # social links in the footer (e.g. {github: …})
  footer: ''
```

## Logo

The logo is set by the `logo` key at the root of the site configuration (not under `leon`), with a path relative to `assets/` or `static/`. It is displayed before the site title, in the header and in the footer:

```yaml
logo: images/logo.svg
```

To use a different file in each color scheme:

```yaml
logo:
  light: images/logo.svg      # displayed on the light background
  dark: images/logo-dark.svg  # displayed on the dark background
```

:::tip
If the logo already contains the name of the site, hide the title with `leon.header.title: false`.
:::

## Output formats

To enable the Markdown version of the pages and the `llms.txt` file:

```yaml
output:
  pagetypeformats:
    page: [html, markdown]
    section: [html, markdown]
    homepage: [html, llms]
```
