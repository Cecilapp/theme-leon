---
title: Démarrage rapide
description: Créez un site de documentation avec Cecil et Léon, de zéro, en quelques étapes.
---
Ce guide vous accompagne dans la création d'un site de documentation.

:::steps
#### Créer un site
Téléchargez Cecil et créez un nouveau site :

```bash
curl -LO https://cecil.app/cecil.phar
php cecil.phar new:site
```

#### Installer le thème
```bash
composer require cecil/theme-leon
```

#### Activer les thèmes
Ajoutez Léon et ses composants à `cecil.yml` :

```yaml
theme:
  - leon
  - flexsearch
  - darkmodetoggle
```

#### Prévisualiser
```bash
php cecil.phar serve
```

Ouvrez <http://localhost:8000> et commencez à écrire.
:::

:::tip
Organisez vos pages en dossiers : chaque dossier de premier niveau devient un onglet, et chaque sous-dossier un groupe de la barre latérale.
:::
