/**
 * A code-split page component, like React.lazy, with one difference that matters
 * for speed: once the page's code has been downloaded (see `preload`), the page
 * renders immediately. React.lazy always shows its loading state for a moment on
 * first use, even when the code is already in memory, which made every first
 * visit to a page feel slow.
 */
export interface LazyPage {
  (props: any): any;
  /** Starts downloading the page's code (safe to call more than once). */
  preload: () => Promise<void>;
}

export function lazyPage(loader: () => Promise<{ default: (props: any) => any }>): LazyPage {
  let Loaded: ((props: any) => any) | null = null;
  let pending: Promise<void> | null = null;

  const preload = () => {
    if (!pending) {
      pending = loader().then((mod) => {
        Loaded = mod.default;
      });
    }
    return pending;
  };

  const Page = ((props: any) => {
    // Not downloaded yet: hand React the download to wait on. The nearest
    // <Suspense> boundary shows its fallback until it finishes.
    if (!Loaded) throw preload();
    const Component = Loaded;
    return <Component {...props} />;
  }) as LazyPage;

  Page.preload = preload;
  return Page;
}
