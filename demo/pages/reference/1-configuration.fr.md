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
  language:
    suggest: false   # suggère la traduction correspondant à la langue du navigateur
  toc:
    enabled: true
  copypage:
    enabled: true
    assistants: [claude, chatgpt] # et/ou perplexity
  github:
    repo: ''
    branch: main
    path: pages
  lastupdated: false
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

## Options de Cecil

Léon configure Cecil pour un site de documentation : votre configuration peut surcharger chacune de ces options.

```yaml
pages:
  sortby: weight     # le préfixe `1-` du nom de fichier, ou la variable `weight`
  pagination:
    enabled: false   # les cartes d'une section listent toutes ses pages
output:
  pagetypeformats:
    page:
      markdown: true # version Markdown des pages (« Copier la page »)
    section:
      markdown: true
    homepage:
      llms: true     # fichier `llms.txt`
```

Pour retirer un format de sortie, passez-le à `false` : un tableau de booléens ajoute ou retire un format sans remplacer les autres.

## Coloration syntaxique

Les blocs de code sont colorés par highlight.php par défaut. Léon met aussi en forme le résultat de tempest/highlight, plus rapide mais limité aux langages du web :

```yaml
pages:
  body:
    highlight:
      engine: tempest # `highlightjs` par défaut
```

:::note
Avec tempest/highlight, les langages qu'il ne connaît pas (Bash, PowerShell, Markdown…) sont affichés sans couleurs.
:::
