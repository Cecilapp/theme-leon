---
title: Configuration
description: Toutes les options de Léon, avec leurs valeurs par défaut.
---
Les options de Léon sont regroupées sous `leon` :

```yaml
leon:
  accent: ''         # couleur d'accent (ex. '#2563eb'), argile par défaut
  accent_dark: ''    # couleur d'accent en mode sombre, dérivée de `accent` par défaut
  fonts:
    bundled: true    # charge les polices embarquées
    sans: ''
    serif: ''
    mono: ''
  header:
    cta: {}          # ex. {name: Commencer, url: /docs/}
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
  footer: ''
```

## Formats de sortie

Pour activer la version Markdown des pages et le fichier `llms.txt` :

```yaml
output:
  pagetypeformats:
    page: [html, markdown]
    section: [html, markdown]
    homepage: [html, llms]
```
