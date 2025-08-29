import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import PulseBotAnimated from './PulseBotAnimated';

import { useEffect, useState } from 'react';

export default function Hero({ onStart }: { onStart: () => void}){
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [bgOffset, setBgOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = typeof window !== 'undefined' ? window.innerHeight : 800;
      // progress: -1 (above) to 1 (below)
      const progress = (viewportH/2 - rect.top) / (viewportH);
      const offset = Math.max(-40, Math.min(40, progress * 40));
      setBgOffset(offset);
    };
    onScroll();
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      }
    };
  }, []);

  const [offsetY, setOffsetY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * 0.4);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { t } = useTranslation('common');
  return (
    <section className="relative overflow-hidden py-14">
      <div className="absolute inset-0 -z-10" style={{ transform:`translateY(${offsetY}px)` }}>
        <div className="h-full w-full bg-gradient-to-b from-cyan-900/30 to-transparent" />
      </div>
      <div className="container-narrow">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="rounded-xl px-3 py-1 border border-cyan-500/30 text-cyan-200/90">
            PULSE<span className="opacity-60">webpro</span>
          </div>
        </div>
        <LanguageSwitcher/>
      </div>

      {/* Parallax backdrop */}
<div
  className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
  style={{
    transform: `translateY(${bgOffset}px)`,
    background: `radial-gradient(800px 400px at 70% 10%, rgba(56,189,248,0.18), transparent 60%),
                 radial-gradient(600px 300px at 10% 60%, rgba(56,189,248,0.12), transparent 60%)`
  }}
/>
<div className="grid md:grid-cols-2 items-center gap-8">

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
          {t('hero_title')}
        </h1>
        <p className="text-sky-100/80 mt-4 max-w-2xl mx-auto">{t('hero_sub')}</p>
        <div className="mt-8">
          <button className="btn text-sky-100 border-sky-400/40" onClick={onStart}>
            ⚡ {t('cta_start')}
          </button>
        </div>
      </div>
        <div className="hidden md:block">
      <PulseBotAnimated/>
    </div>
  </div>
</div>
    </section>

  );
}
