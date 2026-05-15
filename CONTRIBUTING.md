# Contributing

## Found something broken

Open an issue. Be specific. What happened, what you expected, what you were trying to do.

## Want to change something

Fork it. If you think the change belongs in the template, open a pull request. Small focused changes over large rewrites.

## Replacing the auth layer

Everything auth-related lives in `composables/useAuth.ts`. 
Replace those without touching anything else. 
The rest of the app uses `useAuth()`, as long as that composable returns the same shape, nothing breaks.

Use your own auth in production.

## Languages

The app is in Finnish and English. If you add a language, add it completely. Partial translations cause more confusion than no translation.

## The water logic

The concepts, pisarat, haarat, lähde, pohja, are not decorative, more symbolic with translated keys.
If they're confusing, the documentation needs improving, not the names.