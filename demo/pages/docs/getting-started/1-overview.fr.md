---
title: Vue d'ensemble
description: Léon est un thème de documentation pour Cecil, inspiré des documentations produit modernes, avec une palette chaleureuse et une typographie éditoriale.
---
Léon offre à votre documentation une mise en page calme et lisible : un en-tête à onglets, une barre latérale par onglet, une table des matières qui suit votre lecture, et des composants de contenu écrits en Markdown pur.

## Démarrer

Installez le thème avec Composer, puis activez-le dans la configuration de votre site.

:::code-group
#### Composer
```bash
composer require cecil/theme-leon
```
#### Archive
```bash
curl -LO https://github.com/Cecilapp/theme-leon/releases/latest/download/leon.zip
unzip leon.zip -d themes/leon
```
:::

Puis [continuez avec le Démarrage rapide →](../quickstart/)

:::info
Léon nécessite les thèmes composants [FlexSearch](https://github.com/Cecilapp/theme-flexsearch) et [Dark mode toggle](https://github.com/Cecilapp/theme-darkmodetoggle).
:::

## Ce que vous pouvez faire

:::accordion
#### Rédiger du contenu riche en Markdown
Encadrés, onglets, groupes de code, étapes, accordéons et cartes utilisent la syntaxe `:::` de Cecil : ni HTML, ni shortcodes.

#### Permettre aux lecteurs de tout rechercher
La recherche repose sur FlexSearch : l'index est généré au build, et la recherche s'exécute dans le navigateur.

#### Nourrir votre assistant IA préféré
Le bouton **Copier la page** copie la page en Markdown, et le fichier `llms.txt` liste toutes les pages du site.
:::

## Pour aller plus loin

:::cards
- [Démarrage rapide](../quickstart/) : créer un site de documentation de zéro
- [Rédiger du contenu](../../guides/writing-content/) : tous les composants, par l'exemple
- [Configuration](../../../reference/configuration/) : toutes les options du thème
- [Front matter](../../../reference/front-matter/) : les variables par page
:::
