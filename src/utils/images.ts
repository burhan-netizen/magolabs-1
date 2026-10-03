/**
 * Client screenshots are stored twice: full size (`name.webp`, 900px wide) and a
 * phone size (`name-480.webp`). This builds the `srcSet` that lets the browser
 * download the small one on a phone.
 */
export function screenshotSrcSet(url: string): string | undefined {
  if (!/^\/screenshots\/[\w-]+\.webp$/.test(url)) return undefined;
  return `${url.replace(/\.webp$/, '-480.webp')} 480w, ${url} 900w`;
}
