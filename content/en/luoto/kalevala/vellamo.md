---
title: Vellamo
description: The surface of the lake, appearance and themes in Virtauma.
navigation:
  title: Vellamo
  icon: i-lucide-palette
author: Cat
avatar: /cat.png
tag: Lore
tagColor: primary
kind: lore
level: surface
time: 5min
likes: 0
replies: 0
publishedAt: 2026-05-25
tags: [lore, vellamo, theming, appearance, mythology, water]
---

Vellamo is the mistress of waters, the surface of the lake. She is not the depth, she is what you see when you look down. Same lake, different light. Päivätär brings the sun, Kuutar the moon. Vellamo reflects both.

Virtauma's appearance lives in the same rhythm. By day Päivätär rules, by night Kuutar. The lake remains the same.

### Colors

`lake` is Virtauma's heart, a Finnish lake, blue and deep. Finlandica is its voice.

```css
@theme static {
  --font-sans: 'Finlandica', sans-serif;

  --color-lake-50: #eef8ff;
  --color-lake-100: #d9f1ff;
  --color-lake-200: #bce5ff;
  --color-lake-300: #8ed4ff;
  --color-lake-400: #53b9ff;
  --color-lake-500: #1a9be0;
  --color-lake-600: #0d7bbf;
  --color-lake-700: #0b629a;
  --color-lake-800: #0f527c;
  --color-lake-900: #124467;
  --color-lake-950: #0c2c47;

  --color-aurora-50: #edfaf4;
  --color-aurora-100: #d0f5e6;
  --color-aurora-200: #a2eacf;
  --color-aurora-300: #65d9b2;
  --color-aurora-400: #2ec294;
  --color-aurora-500: #12a87c;
  --color-aurora-600: #0b8a64;
  --color-aurora-700: #097052;
  --color-aurora-800: #075942;
  --color-aurora-900: #054534;
  --color-aurora-950: #02291f;
}
```

### Configuration

```ts [app.config.ts]
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'lake',
      secondary: 'aurora',
      neutral: 'mist',
      success: 'teal',
      info: 'sky',
      warning: 'amber',
      error: 'rose'
    }
  }
})
```

### Päivätär

Bright, open, warm. The lake reflects the blue of the sky.

### Kuutar

Silent, deep, calm. The lake reflects the moonlight, darker, but just as beautiful.

> **Same lake, different light. Vellamo reflects both.**