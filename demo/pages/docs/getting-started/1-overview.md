---
title: Overview
description: Léon is a documentation theme for Cecil, inspired by modern product documentations, with a warm palette and an editorial typography.
---
Léon gives your documentation a calm, readable layout: a tabbed header, a sidebar per tab, a table of contents that follows your reading, and content components written in plain Markdown.

## Get started

Install the theme with Composer, then enable it in the configuration of your site.

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

Then [continue with the Quickstart →](../quickstart/)

:::info
Léon requires the [FlexSearch](https://github.com/Cecilapp/theme-flexsearch) and [Dark mode toggle](https://github.com/Cecilapp/theme-darkmodetoggle) component themes.
:::

## What you can do

:::accordion
#### Write rich content in Markdown
Callouts, tabs, code groups, steps, accordions and cards use the `:::` syntax of Cecil: no HTML, no shortcodes.

#### Let readers search everything
The search box is powered by FlexSearch: the index is generated at build time, and the search runs in the browser.

#### Feed your favorite AI assistant
The **Copy page** button copies the page as Markdown, and the `llms.txt` file lists all the pages of the site.
:::

## Next steps

:::cards
- [Quickstart](../quickstart/): create a documentation site from scratch
- [Writing content](../../guides/writing-content/): all the components, by example
- [Configuration](../../../reference/configuration/): every option of the theme
- [Front matter](../../../reference/front-matter/): per page variables
:::
