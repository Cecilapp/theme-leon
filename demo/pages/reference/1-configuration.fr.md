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
    title: true      # titre du site à côté du logo
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
  social: {}         # liens sociaux du pied de page (ex. {github: …})
  footer: ''
```

## Logo

Le logo se définit avec la clé `logo` à la racine de la configuration du site (pas sous `leon`), avec un chemin relatif à `assets/` ou `static/`. Il est affiché avant le titre du site, dans l'en-tête et dans le pied de page :

```yaml
logo: images/logo.svg
```

Pour utiliser un fichier différent selon le mode de couleur :

```yaml
logo:
  light: images/logo.svg      # affiché sur le fond clair
  dark: images/logo-dark.svg  # affiché sur le fond sombre
```

:::tip
Si le logo contient déjà le nom du site, masquez le titre avec `leon.header.title: false`.
:::

## Formats de sortie

Pour activer la version Markdown des pages et le fichier `llms.txt` :

```yaml
output:
  pagetypeformats:
    page: [html, markdown]
    section: [html, markdown]
    homepage: [html, llms]
```
