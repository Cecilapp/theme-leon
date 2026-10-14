---
title: Personnalisation
description: Surchargez les design tokens, les templates et les styles de Léon.
---
## Design tokens

Chaque couleur est une propriété personnalisée CSS, définie pour les modes clair et sombre :

```css
:root {
  --leon-accent: #2563eb;
}
.dark {
  --leon-page: #000;
}
```

## Templates

Copiez n'importe quel template de `themes/leon/layouts/` dans le répertoire `layouts/` de votre site pour le surcharger.
