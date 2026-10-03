/**
 * Renders a JSON-LD structured-data block as part of the page markup itself, so it
 * is present in the prerendered HTML (not injected by JavaScript after load).
 * "<" is escaped so a string value can never close the script tag early.
 */
export default function JsonLd({ data }: { data: unknown; key?: string | number }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
