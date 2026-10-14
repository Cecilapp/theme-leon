---
title: Customization
description: Override the design tokens, the templates and the styles of Léon.
---
## Design tokens

Every color is a CSS custom property, defined for the light and the dark color schemes:

```css
:root {
  --leon-accent: #2563eb;
}
.dark {
  --leon-page: #000;
}
```

## Templates

Copy any template of `themes/leon/layouts/` in the `layouts/` directory of your site to override it.
