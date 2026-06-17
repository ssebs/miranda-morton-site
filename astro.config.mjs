// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
// One codebase, two deploy targets that differ only in `base` (the path the
// site is served from). Every internal link/asset routes through withBase()
// (import.meta.env.BASE_URL), so flipping `base` is all that's needed:
//   - GitHub Pages project subpath (default): ssebs.github.io/miranda-morton-site/
//       -> npm run build
//   - Served at the domain root behind the LB (Docker image): BASE_PATH=/
//       -> npm run build:root
// Dev server stays at the root for convenience. No production domain is
// hardcoded: the only absolute URL we need (the contact form's redirect) is
// resolved against the live origin in the browser, so `site` is unnecessary.
// @ts-ignore -- `process` is a Node global available when the config is evaluated
const isDev = process.argv.includes('dev');
// @ts-ignore
const base = process.env.BASE_PATH ?? (isDev ? '/' : '/miranda-morton-site');

export default defineConfig({
  base,
  integrations: [icon()],
});
