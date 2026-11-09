/**
 * Client screenshots are stored in up to three widths: a phone size
 * (`name-480.webp`), the standard size (`name.webp`, 900px wide) and, for the
 * large image on a case study page, a sharp size (`name-1920.webp`). This builds
 * the `srcSet` so each screen downloads only the size it needs.
 */

/** Screenshots that have a 1920px version. Add a name here once its file exists. */
const SHARP = new Set(['jaymocivil', 'centurion', 'prabhakarprocessors']);

export function screenshotSrcSet(url: string): string | undefined {
  const match = /^\/screenshots\/([\w-]+)\.webp$/.exec(url);
  if (!match) return undefined;
  const sizes = [`${url.replace(/\.webp$/, '-480.webp')} 480w`, `${url} 900w`];
  if (SHARP.has(match[1])) sizes.push(`${url.replace(/\.webp$/, '-1920.webp')} 1920w`);
  return sizes.join(', ');
}
