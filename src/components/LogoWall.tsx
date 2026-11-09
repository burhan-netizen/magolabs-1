import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import PageLink from './PageLink';
import { getWorkDetailPath } from '../utils/pageRoutes';

/**
 * Client logos as a still wall instead of a moving strip. At rest every logo sits
 * in one soft white tone, so very different logos read as one set. Pointing at a
 * logo opens a card from the cursor with the logo in its real colours and one line
 * on what changed, linking to the case study. Phones have no hover, so the row in
 * the middle of the screen lights up as the visitor scrolls past it.
 *
 * Logos come from public/logos/wall: transparent copies of the small logos, so the
 * white tone has no box behind it.
 */
interface WallLogo {
  caseId: string;
  name: string;
  file: string;
  width: number;
  height: number;
  /** One line on what changed, taken from the case study or the client's review. */
  proof: string;
  /** Display height in px on wide screens. Set per logo so every one covers about
   *  the same visual area (wide wordmarks shorter, square marks taller, thin or
   *  light logos a touch bigger), instead of one fixed height for all. */
  h: number;
  /** A logo drawn for a dark background opens onto a dark card instead of white. */
  dark?: boolean;
}

/** Bump when any wall image changes, so browsers and the CDN fetch the new file
 *  instead of a copy cached during an earlier deploy. */
const WALL_VERSION = 2;

const LOGOS: WallLogo[] = [
  { caseId: 'drmihirshah', name: 'Dr. Mihir Shah Smile Care Clinic', file: 'drmihirshah', width: 428, height: 113, h: 54, proof: '25 to 58 patients a day' },
  { caseId: 'darshangalani', name: 'Darshan Galani & Co.', file: 'darshangalani', width: 512, height: 90, h: 41, proof: '34 new clients in 3 months' },
  { caseId: 'jaymocivil', name: 'Jaymo Civil', file: 'jaymocivil', width: 481, height: 84, h: 34, proof: 'A Sydney civil crew, back online', dark: true },
  { caseId: 'santoshtimbers', name: 'Santosh Timbers', file: 'santoshtimbers', width: 182, height: 167, h: 76, proof: 'From no website to a full catalogue' },
  { caseId: 'prabhakarprocessors', name: 'Prabhakar Processors', file: 'prabhakarprocessors', width: 407, height: 103, h: 47, proof: 'Content managed in-house' },
  { caseId: 'centurion', name: 'Centurion Strategic Ventures', file: 'centurion', width: 217, height: 167, h: 76, proof: 'Separate paths for borrowers and partners' },
  { caseId: 'solway', name: 'SolWay Energies', file: 'solway', width: 376, height: 42, h: 25, proof: 'A website that backs up every sales call' },
  { caseId: 'astrabizz', name: 'Astrabizz Consultancy', file: 'astrabizz', width: 208, height: 167, h: 76, proof: 'Enquiries directly through the site' },
  { caseId: 'kdmayani', name: 'K.D. Mayani & Co.', file: 'kdmayani', width: 604, height: 91, h: 35, proof: 'A stronger first impression' },
  { caseId: 'jaymehta', name: 'Jay Mehta & Co.', file: 'jaymehta', width: 237, height: 198, h: 76, proof: 'Clear, professional, easy to trust' },
  { caseId: 'mnp', name: 'MNP & Co.', file: 'mnp', width: 516, height: 81, h: 27, proof: 'A real difference in how prospects respond' },
];

interface LogoWallProps {
  onOpenCaseStudy: (id: string) => void;
  onOpenContact: () => void;
}

export default function LogoWall({ onOpenCaseStudy, onOpenContact }: LogoWallProps) {
  const wallRef = useRef<HTMLDivElement>(null);

  // Mouse: each card opens as a circle from the point where the pointer came in.
  useEffect(() => {
    const wall = wallRef.current;
    if (!wall) return;
    const onOver = (e: PointerEvent) => {
      const cell = (e.target as Element).closest<HTMLElement>('.lw-cell');
      if (!cell || cell.contains(e.relatedTarget as Node | null)) return;
      const box = cell.getBoundingClientRect();
      cell.style.setProperty('--x', `${e.clientX - box.left}px`);
      cell.style.setProperty('--y', `${e.clientY - box.top}px`);
    };
    wall.addEventListener('pointerover', onOver);
    return () => wall.removeEventListener('pointerover', onOver);
  }, []);

  // Touch screens: light the cells crossing the middle of the screen.
  useEffect(() => {
    const wall = wallRef.current;
    if (!wall || window.matchMedia('(hover: hover)').matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle('is-lit', entry.isIntersecting)),
      { rootMargin: '-44% 0px -44% 0px' },
    );
    wall.querySelectorAll('.lw-cell').forEach((cell) => observer.observe(cell));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wallRef} className="lw-grid">
      {LOGOS.map((logo) => (
        <PageLink
          key={logo.caseId}
          href={getWorkDetailPath(logo.caseId)}
          onNavigate={() => onOpenCaseStudy(logo.caseId)}
          aria-label={`${logo.name}: ${logo.proof}. Read the case study`}
          className={`lw-cell group ${logo.dark ? 'lw-dark' : ''} ${logo.width / logo.height < 1.5 ? 'lw-square' : ''}`}
        >
          <span className="lw-paper" aria-hidden="true" />
          <span className="lw-logo" aria-hidden="true" style={{ ['--h' as string]: `${logo.h}px` }}>
            <img
              src={`/logos/wall/${logo.file}.webp?v=${WALL_VERSION}`}
              alt=""
              width={logo.width}
              height={logo.height}
              loading="lazy"
              decoding="async"
              className="lw-img lw-mono"
            />
            <img
              src={`/logos/wall/${logo.file}.webp?v=${WALL_VERSION}`}
              alt=""
              width={logo.width}
              height={logo.height}
              loading="lazy"
              decoding="async"
              className="lw-img lw-color"
            />
          </span>
          <span className="lw-proof" aria-hidden="true">
            <span className="lw-proof-text">{logo.proof}</span>
            <span className="lw-proof-link">
              Case study <ArrowRight className="h-3 w-3" />
            </span>
          </span>
        </PageLink>
      ))}

      {/* The twelfth cell squares the grid off and asks the obvious question. */}
      <PageLink page="contact" onNavigate={onOpenContact} className="lw-cell lw-cta group">
        <span className="lw-paper" aria-hidden="true" />
        <span className="lw-cta-text">
          <span className="lw-cta-title">Your business next?</span>
          <span className="lw-cta-link">
            Get a free website audit <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </span>
      </PageLink>
    </div>
  );
}

