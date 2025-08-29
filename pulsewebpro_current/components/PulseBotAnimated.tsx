import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function PulseBotAnimated(){
  const [mood, setMood] = useState<'idle'|'thinking'|'excited'>('idle');
      const [tilt, setTilt] = useState(0);
      const [parallax, setParallax] = useState(0);
  const [tilt, setTilt] = useState(0);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
  const onNudge = () => {
    setTilt(8);
    setTimeout(() => setTilt(0), 400);
  };
  const onScroll = () => {
    const y = typeof window !== 'undefined' ? window.scrollY : 0;
    setParallax(Math.min(10, y * 0.04)); // up to 10px
  };

    const onState = (e: Event) => {
      const ce = e as CustomEvent;
      const m = ce.detail?.mood;
      if (m === 'idle' || m === 'thinking' || m === 'excited') setMood(m);
      if (m === 'excited') {
        // micro tilt reaction
        setTilt(8);
        setTimeout(() => setTilt(0), 600);
      }
    };
    const onScroll = () => {
      if (typeof window !== 'undefined') {
          window.addEventListener('pulse:nudge', onNudge as EventListener);
          window.addEventListener('scroll', onScroll, { passive: true });
        const y = window.scrollY || 0;
        setParallax((y % 100) / 5); // small oscillation
      }
    };
    if (typeof window !== 'undefined') {
          window.addEventListener('pulse:nudge', onNudge as EventListener);
          window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('pulse:state', onState as EventListener);
      window.addEventListener('scroll', onScroll);
    }
    return () => {
          window.removeEventListener('pulse:nudge', onNudge as EventListener);
          window.removeEventListener('scroll', onScroll);
      if (typeof window !== 'undefined') {
          window.addEventListener('pulse:nudge', onNudge as EventListener);
          window.addEventListener('scroll', onScroll, { passive: true });
        window.removeEventListener('pulse:state', onState as EventListener);
        window.removeEventListener('scroll', onScroll);
      }
    };
  }, []);

  return (
    <div className="relative mx-auto w-[260px] h-[260px] md:w-[320px] md:h-[320px] select-none"
      style={{ transform:`rotate(${tilt}deg) translateY(${parallax}px)`, transition:'transform 0.4s ease' }}
    >
      {/* Glow reacts to mood */}
      <div className={`absolute inset-0 rounded-full blur-2xl ${mood==='excited' ? 'glow-strong' : mood==='thinking' ? 'glow-medium' : 'glow-soft'}`} aria-hidden/>
      {/* Floating bot */}
      <div className="absolute inset-0 animate-float will-change-transform">
        <Image
          src="/pulse-bot.png"
          alt="Pulse bot"
          fill
          className="object-contain drop-shadow-[0_0_30px_rgba(56,189,248,0.5)]"
          priority
        />
      </div>

      {/* Eyes overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="eyes">
          <span className="eye eye-left"/>
          <span className="eye eye-right"/>
        </div>
      </div>

      {/* Coffee steam */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-10 w-10 pointer-events-none">
        <div className="steam steam-1" />
        <div className="steam steam-2" />
        <div className="steam steam-3" />
      </div>
      <div className="sr-only">Animación decorativa</div>
    </div>
  );
}
