import { createRoot, hydrateRoot } from 'react-dom/client';
import App, { preloadPageForPath } from './App.tsx';
// Brand fonts are bundled with the site (no third-party font request).
// Latin only: the site is written in English, and the full files also declare
// Devanagari and extended-Latin faces that tripled the size of the font CSS.
import '@fontsource/poppins/latin-300.css';
import '@fontsource/poppins/latin-400.css';
import '@fontsource/poppins/latin-400-italic.css';
import '@fontsource/poppins/latin-500.css';
import '@fontsource/poppins/latin-600.css';
import '@fontsource/poppins/latin-700.css';
import '@fontsource/poppins/latin-800.css';
import '@fontsource/jetbrains-mono/latin-500.css';
import '@fontsource/jetbrains-mono/latin-700.css';
import './index.css';

const container = document.getElementById('root')!;

const currentPath =
  window.location.pathname.length > 1
    ? window.location.pathname.replace(/\/+$/, '')
    : window.location.pathname;

// Production pages ship with their content already in the HTML (see
// scripts/prerender-seo.ts), marked with the path it was rendered for. When that
// matches the address bar, React attaches to the existing markup instead of
// rebuilding it; the page's code is fetched first so the whole page becomes
// interactive in one step.
//
// When it does not match (an unknown URL, or a blog post published since the last build, both of which the host
// answers with the homepage file) or the container is empty (local dev), render
// from scratch so the visitor gets the right page.
if (container.dataset.prerenderedPath === currentPath) {
  preloadPageForPath(currentPath)
    .catch(() => undefined)
    .then(() => hydrateRoot(container, <App />));
} else {
  container.replaceChildren();
  createRoot(container).render(<App />);
}
