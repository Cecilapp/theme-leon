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
  language:
    suggest: false   # suggests the translation matching the browser language
  toc:
    enabled: true
  copypage:
    enabled: true
    assistants: [claude, chatgpt] # and/or perplexity
  github:
    repo: ''
    branch: main
    path: pages
  lastupdated: false
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

## Cecil options

Léon configures Cecil for a documentation site: your configuration can override each of these options.

```yaml
pages:
  sortby: weight     # the `1-` prefix of the file name, or the `weight` variable
  pagination:
    enabled: false   # cards of a section list every child page
output:
  pagetypeformats:
    page:
      markdown: true # Markdown version of the pages ("Copy page")
    section:
      markdown: true
    homepage:
      llms: true     # `llms.txt` file
```

To remove an output format, set it to `false`: a map of booleans adds or removes a format without replacing the others.

## Syntax highlighting

Code blocks are highlighted by highlight.php by default. Léon also styles the output of tempest/highlight, faster but limited to the languages of the web:

```yaml
pages:
  body:
    highlight:
      engine: tempest # `highlightjs` by default
```

:::note
With tempest/highlight, the languages it doesn't know (Bash, PowerShell, Markdown…) are displayed without colors.
:::
