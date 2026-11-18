/**
 * All homepage motion in one place. Loaded after the page is interactive, so the
 * first paint never waits for it. Everything is skipped for visitors who ask
 * their device for less motion: they get the finished, still layout.
 */
export async function initStudioMotion(root: HTMLElement): Promise<() => void> {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('lenis'),
  ]);
  gsap.registerPlugin(ScrollTrigger);

  // Smooth scroll, driven by GSAP's clock so scroll animations stay in sync.
  const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -80 } });
  lenis.on('scroll', ScrollTrigger.update);
  const raf = (t: number) => lenis.raf(t * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  const timers: number[] = [];
  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();
    const q = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T>(sel));

    /* ---- Hero tiles: build in, follow the pointer, flip, then scatter on scroll ---- */
    const tiles = q('.tile-slot');
    const grid = root.querySelector<HTMLElement>('.st-tiles');
    if (grid && tiles.length) {
      gsap.from(tiles, {
        rotateX: -95, y: 80, z: -120, opacity: 0,
        duration: 1.1, ease: 'expo.out',
        stagger: { each: 0.035, from: 'random' }, delay: 0.15,
        clearProps: 'transform,opacity',
      });

      mm.add('(min-width: 961px) and (hover: hover)', () => {
        const rx = gsap.quickTo(grid, 'rotateX', { duration: 0.9, ease: 'power3' });
        const ry = gsap.quickTo(grid, 'rotateY', { duration: 0.9, ease: 'power3' });
        const move = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          ry(-14 + nx * 18);
          rx(8 - ny * 14);
        };
        window.addEventListener('pointermove', move, { passive: true });
        return () => window.removeEventListener('pointermove', move);
      });

      // Every so often a tile turns over to show a real client site, then back.
      const flippable = q('.tile').filter((t) => t.dataset.back);
      let i = 0;
      timers.push(window.setInterval(() => {
        if (document.hidden || !flippable.length) return;
        const t = flippable[i % flippable.length];
        t.classList.toggle('flipped');
        i += 1;
      }, 1700));

      // Scrolling past the hero sends the tiles drifting apart.
      tiles.forEach((t) => {
        gsap.to(t, {
          y: gsap.utils.random(-260, 160),
          x: gsap.utils.random(-120, 120),
          rotate: gsap.utils.random(-40, 40),
          scale: gsap.utils.random(0.7, 1.1),
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: { trigger: '.st-hero', start: 'top top', end: 'bottom top', scrub: 0.6 },
        });
      });
    }

    /* ---- Marquee band: endless, and it speeds up with your scroll ---- */
    q('.st-band-row').forEach((row, idx) => {
      const dir = idx % 2 === 0 ? -1 : 1;
      const tween = gsap.fromTo(row, { xPercent: dir < 0 ? 0 : -50 }, { xPercent: dir < 0 ? -50 : 0, duration: 38, ease: 'none', repeat: -1 });
      ScrollTrigger.create({
        trigger: row,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 6);
          gsap.to(tween, { timeScale: boost, duration: 0.2, overwrite: true });
          gsap.to(tween, { timeScale: 1, duration: 1.2, delay: 0.2, overwrite: false });
        },
      });
    });

    /* ---- Problem: pin the section and slide the cards sideways (desktop) ---- */
    mm.add('(min-width: 861px)', () => {
      const track = root.querySelector<HTMLElement>('.st-prob-track');
      const sec = root.querySelector<HTMLElement>('.st-prob');
      if (!track || !sec) return;
      const dist = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 },
      });
      q('.st-pcard .shape-zone').forEach((s) => {
        gsap.to(s, { rotate: 120, ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: () => `+=${dist()}`, scrub: 1 } });
      });
    });

    /* ---- Work: each card shrinks back as the next one stacks over it ---- */
    mm.add('(min-width: 861px)', () => {
      const cards = q('.st-wcard');
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.9 + i * 0.012, filter: 'brightness(0.55)', ease: 'none',
          scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 96px', scrub: true },
        });
      });
    });

    /* ---- Results: shapes turn and drift with the scroll ---- */
    q('.st-res .shape-zone').forEach((s, i) => {
      gsap.fromTo(s, { rotate: -30 + i * 20, y: 40 }, { rotate: 90 + i * 30, y: -40, ease: 'none', scrollTrigger: { trigger: s.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 } });
    });

    /* ---- Process: the line draws itself as you read down ---- */
    const bar = root.querySelector('.st-steps .bar');
    if (bar) {
      gsap.fromTo(bar, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.st-steps', start: 'top 70%', end: 'bottom 60%', scrub: 0.5 } });
    }

    /* ---- Footer: floating shapes drift at different speeds ---- */
    q('.st-float').forEach((f, i) => {
      gsap.fromTo(f, { y: 120 + i * 40 }, { y: -120 - i * 60, rotate: i % 2 ? 60 : -60, ease: 'none', scrollTrigger: { trigger: '.st-final', start: 'top bottom', end: 'bottom bottom', scrub: 1 } });
    });

    /* ---- Small magnetic pull on primary buttons (desktop pointers only) ---- */
    mm.add('(hover: hover) and (min-width: 961px)', () => {
      const btns = q('.st-btn-primary');
      const offs = btns.map((b) => {
        const xTo = gsap.quickTo(b, 'x', { duration: 0.5, ease: 'power3' });
        const yTo = gsap.quickTo(b, 'y', { duration: 0.5, ease: 'power3' });
        const mv = (e: PointerEvent) => {
          const r = b.getBoundingClientRect();
          xTo((e.clientX - r.left - r.width / 2) * 0.18);
          yTo((e.clientY - r.top - r.height / 2) * 0.28);
        };
        const out = () => { xTo(0); yTo(0); };
        b.addEventListener('pointermove', mv);
        b.addEventListener('pointerleave', out);
        return () => { b.removeEventListener('pointermove', mv); b.removeEventListener('pointerleave', out); };
      });
      return () => offs.forEach((f) => f());
    });
  }, root);

  // Fonts and images change heights; measure again once they have loaded.
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh);
  document.fonts?.ready.then(refresh).catch(() => undefined);

  return () => {
    timers.forEach((t) => window.clearInterval(t));
    window.removeEventListener('load', refresh);
    ctx.revert();
    gsap.ticker.remove(raf);
    lenis.destroy();
  };
}
