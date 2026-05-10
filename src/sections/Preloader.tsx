import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsComplete(true);
          setTimeout(onComplete, 100);
        },
      });

      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      )
        .to(textRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.8,
          ease: 'power2.in',
          delay: 0.8,
        })
        .to(
          containerRef.current,
          {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
          },
          '-=0.3'
        );
    });

    return () => ctx.revert();
  }, [onComplete]);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div
        ref={textRef}
        className="text-center opacity-0"
      >
        <div className="display-heading text-editorial-white text-2xl md:text-3xl tracking-tight">
          Shahood Saleem
        </div>
        <div className="mt-2 text-editorial-mouse text-sm font-light tracking-widest uppercase">
          Industrial Engineering
        </div>
      </div>
    </div>
  );
};

export default React.memo(Preloader);
