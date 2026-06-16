// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
// Served from the GitHub Pages project subpath: ssebs.github.io/miranda-morton-site/
// Keep dev at the root for convenience; apply the subpath only for `build`/`preview`
// (which produce/serve the deployed output). `withBase()` adapts to either automatically.
// When moving to the real domain, set site: 'https://miranda-morton.com' and drop `base`.
// @ts-ignore -- `process` is a Node global available when the config is evaluated
const base = process.argv.includes('dev') ? '/' : '/miranda-morton-site';

export default defineConfig({
  site: 'https://ssebs.github.io',
  base,
  integrations: [icon()],
});
