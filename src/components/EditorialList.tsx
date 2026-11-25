import { useEffect, useRef, type ReactNode } from 'react';

export interface EditorialItem {
  title: string;
  desc: string;
  /** Optional extra at the bottom of the item, such as a "Learn more" link. */
  footer?: ReactNode;
}

interface EditorialListProps {
  items: EditorialItem[];
  /** Light for off-white sections, dark for ink sections. */
  tone?: 'light' | 'dark';
  /** Columns on wide screens. Two columns put the number beside the text. */
  cols?: 2 | 4;
  as?: 'ul' | 'ol';
  className?: string;
}

/**
 * A numbered editorial list: a rule above each point, a large outlined number,
 * a big headline and a short line of copy. On hover a yellow line draws across
 * the rule and the number fills in. Items rise in one after another the first
 * time the list scrolls into view (only when motion is welcome; the text is in
 * the HTML and visible without JavaScript).
 */
export default function EditorialList({ items, tone = 'light', cols = 4, as = 'ol', className = '' }: EditorialListProps) {
  const ref = useRef<HTMLOListElement & HTMLUListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) return;
    // Hide the items only once this script is in charge of showing them again.
    el.dataset.armed = '';
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.seen = '';
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const List = as;
  return (
    <List ref={ref} className={`ed-list ed-${tone} ed-cols-${cols} ${className}`}>
      {items.map((item, idx) => (
        <li key={item.title} className="ed-item" style={{ ['--i' as string]: idx }}>
          <span className="ed-num" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
          <div className="ed-text">
            <h3 className="ed-title">{item.title}</h3>
            <p className="ed-desc">{item.desc}</p>
            {item.footer && <div className="ed-footer">{item.footer}</div>}
          </div>
        </li>
      ))}
    </List>
  );
}
