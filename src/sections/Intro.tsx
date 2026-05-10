import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const accentPhrases: Record<string, string> = {
  'technical precision': '#D84C3F',
  'systems thinking': '#E8D6BE',
  'manufacturing knowledge': '#D84C3F',
  'modern digital sophistication': '#E8D6BE',
  'immersive engineering experiences': '#D84C3F',
};

const Intro: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label fade in
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Heading words reveal
      const words = headingRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.04,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Paragraph fade in
      gsap.fromTo(
        paragraphRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // CTA fade in
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const renderHeading = () => {
    const text =
      "I am an Industrial & Manufacturing Engineer blending technical precision, systems thinking, manufacturing knowledge, and modern digital sophistication into immersive engineering experiences.";
    
    // Find all accent phrases and their positions
    const foundPhrases: { start: number; end: number; phrase: string; color: string }[] = [];
    
    for (const [phrase, color] of Object.entries(accentPhrases)) {
      const idx = text.toLowerCase().indexOf(phrase.toLowerCase());
      if (idx !== -1) {
        foundPhrases.push({ start: idx, end: idx + phrase.length, phrase: text.slice(idx, idx + phrase.length), color });
      }
    }
    
    // Sort by start position
    foundPhrases.sort((a, b) => a.start - b.start);
    
    // Build word elements
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    let keyCounter = 0;
    
    for (const fp of foundPhrases) {
      // Add text before this phrase
      if (fp.start > lastIndex) {
        const beforeText = text.slice(lastIndex, fp.start);
        const words = beforeText.split(' ');
        for (const word of words) {
          if (word) {
            elements.push(
              <span key={keyCounter++} className="word inline text-editorial-white">
                {word}{' '}
              </span>
            );
          }
        }
      }
      
      // Add the accent phrase
      const phraseWords = fp.phrase.split(' ');
      for (const word of phraseWords) {
        if (word) {
          elements.push(
            <span key={keyCounter++} className="word inline" style={{ color: fp.color }}>
              {word}{' '}
            </span>
          );
        }
      }
      
      lastIndex = fp.end;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex);
      const words = remainingText.split(' ');
      for (const word of words) {
        if (word) {
          elements.push(
            <span key={keyCounter++} className="word inline text-editorial-white">
              {word}{' '}
            </span>
          );
        }
      }
    }
    
    return elements;
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen py-24 md:py-32 lg:py-40"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32">
        {/* Two column layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left: Label */}
          <div ref={labelRef} className="lg:w-1/4 flex-shrink-0">
            <div className="flex flex-col gap-3">
              <span className="text-editorial-red text-xs font-medium tracking-widest uppercase">
                // Intro
              </span>
              <span className="text-editorial-cream/40 text-xs font-medium tracking-widest uppercase">
                // Philosophy
              </span>
              <span className="text-editorial-cream/40 text-xs font-medium tracking-widest uppercase">
                // Engineering Mindset
              </span>
            </div>
          </div>

          {/* Right: Main content */}
          <div className="lg:w-3/4">
            {/* Large statement */}
            <div
              ref={headingRef}
              className="mb-12 md:mb-16"
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight">
                {renderHeading()}
              </h2>
            </div>

            {/* Supporting paragraph */}
            <p
              ref={paragraphRef}
              className="text-editorial-gray/70 text-base md:text-lg leading-relaxed max-w-2xl ml-auto lg:ml-24 mb-12"
            >
              From manufacturing systems and industrial workflows to visual storytelling
              and digital experiences, my work combines technical discipline with cinematic
              presentation and modern creative direction.
            </p>

            {/* CTA Button */}
            <a
              ref={ctaRef}
              href="#experience"
              className="cta-button text-editorial-white border-editorial-white/30 hover:bg-editorial-white hover:text-editorial-black ml-auto lg:ml-24"
            >
              View Projects
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Thin divider line */}
      <div className="absolute bottom-0 left-0 right-0 hairline" style={{ color: '#F3F3F0' }} />
    </section>
  );
};

export default React.memo(Intro);
