---
title: Translations
description: Léon is translated in English and French.
---
Add your own translations in `translations/messages.<locale>.yml`.

## Multilingual configuration

Translate the options in the `config` key of each language. The `leon` block is merged with the one of the default language: only set the translated keys.

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
            name: Commencer # the `url` is inherited
        footer: 'Publié sous licence MIT.'
```

:::warning
Menus are not inherited: repeat the `menus` of the site in full in the `config` key of each language.
:::

## Browser language

With `leon.language.suggest: true`, a banner suggests the translation of the page matching the browser language, written in that language. It stays displayed until the visitor follows it, closes it or chooses a language with the selector.
