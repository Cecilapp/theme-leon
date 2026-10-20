---
title: Traductions
description: Léon est traduit en anglais et en français.
---
Ajoutez vos propres traductions dans `translations/messages.<locale>.yml`.

## Configuration multilingue

Traduisez les options dans la clé `config` de chaque langue. Le bloc `leon` est fusionné avec celui de la langue par défaut : ne définissez que les clés traduites.

```yaml
leon:
  header:
    cta:
      name: Get started
      url: /docs/getting-started/quickstart/
  footer: 'Released under the MIT license.'
languages:
  - code: en
    name: English
    locale: en_US
  - code: fr
    name: Français
    locale: fr_FR
    config:
      leon:
        header:
          cta:
            name: Commencer # l'`url` est héritée
        footer: 'Publié sous licence MIT.'
```

:::warning
Les menus ne sont pas hérités : répétez intégralement les `menus` du site dans la clé `config` de chaque langue.
:::

## Langue du navigateur

Avec `leon.language.suggest: true`, un bandeau suggère la traduction de la page correspondant à la langue du navigateur, rédigé dans cette langue. Il reste affiché jusqu'à ce que le visiteur le suive, le ferme ou choisisse une langue avec le sélecteur.
