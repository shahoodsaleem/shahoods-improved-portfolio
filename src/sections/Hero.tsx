'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ease = [0.16, 1, 0.3, 1] as const;

// ─── Update these URLs with your real profile links ───────────────────────────
const heroSocials = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/shahoodsaleem' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/shahoodsaleem' },
  { name: 'WhatsApp', icon: MessageCircle, href: 'https://wa.me/923363791538' },
];

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Portrait parallax on scroll
      gsap.to(portraitRef.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Title moves slower than portrait for depth
      gsap.to(titleRef.current, {
        y: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Subtitle stagger reveal on load
      const subtitleLines = subtitleRef.current?.querySelectorAll('.subtitle-line');
      if (subtitleLines) {
        gsap.fromTo(
          subtitleLines,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            delay: 1.2,
            ease: 'power2.out',
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-[100dvh] overflow-hidden"
      style={{ backgroundColor: '#E5E5E5' }}
    >
      {/* Portrait Container */}
      <div
        ref={portraitRef}
        className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-center pointer-events-none h-[75vh] md:h-[85vh] lg:h-[90vh]"
      >
        <Image
          src="/images/portrait_2.jpeg"
          alt="Shahood Saleem"
          width={800}
          height={1200}
          className="h-full w-auto object-contain object-bottom"
          style={{
            filter: 'grayscale(100%) contrast(1.1) brightness(0.95)',
          }}
          priority
        />
      </div>

      {/* Name — mix-blend-mode inversion effect */}
      <div
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none select-none"
        aria-hidden="true"
        style={{ mixBlendMode: 'difference' }}
      >
        <div ref={titleRef} className="w-full flex justify-center">
          <motion.h1
            className="font-semibold text-[15vw] md:text-[14vw] leading-[0.8] tracking-tighter whitespace-nowrap"
            style={{ color: '#E5E5E5', letterSpacing: '-0.06em' }}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.06, delayChildren: 3.0 },
              },
            }}
          >
            {"Shahood Saleem".split('').map((char, index) => (
              <motion.span
                key={index}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>
        </div>
      </div>

      {/* Social Links — Lower Left */}
      <div className="absolute bottom-12 md:bottom-16 left-6 md:left-12 lg:left-16 z-40 flex flex-col gap-3">
        {heroSocials.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-xs md:text-sm font-medium text-editorial-black hover:opacity-60 transition-opacity"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.5 + index * 0.1, ease }}
          >
            <div className="w-6 h-6 border border-editorial-black/20 rounded flex items-center justify-center">
              <social.icon size={12} strokeWidth={2} />
            </div>
            {social.name}
          </motion.a>
        ))}
      </div>

      {/* Subtitle — Lower Right */}
      <div
        ref={subtitleRef}
        className="absolute bottom-12 md:bottom-16 right-6 md:right-12 lg:right-16 z-40 text-right"
      >
        <div className="subtitle-line text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-black leading-[1.1]">
          <span className="text-editorial-black/40 mr-2 text-xl md:text-3xl">{'//'}</span>
          Industrial &amp;
        </div>
        <div className="subtitle-line text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-editorial-black leading-[1.1]">
          Manufacturing Engineer
        </div>
        <div className="subtitle-line mt-4 text-[10px] md:text-xs font-mono tracking-[0.2em] text-editorial-black/60 uppercase">
          NED University of Engineering &amp; Technology // Karachi, Pakistan
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
