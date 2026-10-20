---
title: Quickstart
description: Create a documentation site with Cecil and Léon, from scratch, in a few steps.
---
This guide walks you through the creation of a documentation site.

:::steps
#### Create a site
Download Cecil and create a new site:

```bash
curl -LO https://cecil.app/cecil.phar
php cecil.phar new:site
```

#### Install the theme
```bash
composer require cecil/theme-leon
```

#### Enable the themes
Add Léon and its components to `cecil.yml`:

```yaml
theme:
  - leon
  - flexsearch
  - darkmodetoggle
```

Nothing else to configure: Léon sorts the pages by weight and adds their Markdown version and the `llms.txt` file (see [Configuration](../../reference/1-configuration.md#cecil-options)).

#### Preview
```bash
php cecil.phar serve
```

Open <http://localhost:8000> and start writing.
:::

:::tip
Organize your pages in folders: each top level folder becomes a tab, and each sub-folder a group of the sidebar.
:::
