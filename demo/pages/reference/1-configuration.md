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

## Output formats

To enable the Markdown version of the pages and the `llms.txt` file:

```yaml
output:
  pagetypeformats:
    page: [html, markdown]
    section: [html, markdown]
    homepage: [html, llms]
```
