// Prefix an internal absolute path (e.g. "/about", "/img/foo.svg") with the
// configured Astro `base` so links/assets resolve when the site is served from
// a subpath (ssebs.github.io/miranda-morton-site/). No-op when base is "/".
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export function withBase(path: string): string {
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
