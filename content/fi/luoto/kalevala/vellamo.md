---
title: Vellamo
description: Järven pinta, ulkoasu ja teemat Virtaumassa.
navigation:
  icon: i-lucide-palette
---

## Vellamo

Vellamo on vetten emäntä, järven pinta. Hän ei ole syvyys, hän on se, mitä näet kun katsot alas. 

Sama järvi, eri valo. Päivätär tuo auringon, Kuutar kuun. Vellamo heijastaa molemmat.

Virtauman ulkoasu elää samassa rytmissä. Päivällä Päivätär hallitsee, yöllä Kuutar. Järvi pysyy samana.

### Värit

`lake` on Virtauman sydän, suomalainen järvi, sininen ja syvä. Finlandica on sen ääni.

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

### Asetukset

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

Valoisa, auki, lämmin. Järvi heijastaa taivaan sinistä.

### Kuutar

Hiljainen, syvä ja rauhallinen. Järvi heijastaa kuun valon. Tummempi, mutta yhtä kaunis.

> **Sama järvi, eri valo. Vellamo heijastaa molemmat.**