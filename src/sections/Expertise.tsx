'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExpertiseItem {
  number: string;
  title: string;
  description: string;
  skills: { name: string; index: string }[];
}

const expertiseData: ExpertiseItem[] = [
  {
    number: '01',
    title: 'Manufacturing & Engineering',
    description: 'Applying industrial engineering principles to optimize production. Focused on advanced manufacturing processes, process analysis, and robust industrial systems thinking.',
    skills: [
      { name: 'Industrial Systems Thinking', index: '01' },
      { name: 'Manufacturing Knowledge', index: '02' },
      { name: 'Process Understanding', index: '03' },
      { name: 'Production Analysis', index: '04' },
    ],
  },
  {
    number: '02',
    title: 'Utilities & Plant Engineering',
    description: 'Analyzing utilities departments and managing plant operations. Specializing in hazard analysis, safety awareness, and comprehensive engineering documentation.',
    skills: [
      { name: 'Safety Awareness', index: '05' },
      { name: 'Technical Documentation', index: '06' },
      { name: 'Plant Operation Management', index: '07' },
      { name: 'Hazard Analysis', index: '08' },
    ],
  },
  {
    number: '03',
    title: 'Product Development',
    description: 'Bridging the gap between engineering and functional design. Developing prototypes, analyzing packaging functionality, and exploring product engineering concepts.',
    skills: [
      { name: 'Prototype Development', index: '09' },
      { name: 'Problem-Solving Capability', index: '10' },
      { name: 'Functional Design', index: '11' },
      { name: 'Structured Analysis', index: '12' },
    ],
  },
  {
    number: '04',
    title: 'Digital & Technical Systems',
    description: 'Exploring emerging technologies and technical workflows. Integrating local AI experimentation, network troubleshooting, and modern digital presentation methods.',
    skills: [
      { name: 'Technical Adaptability', index: '13' },
      { name: 'Rapid Learning Ability', index: '14' },
      { name: 'AI Experimentation', index: '15' },
      { name: 'Workflow Optimization', index: '16' },
    ],
  },
];

const Expertise: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Each expertise item
      itemRefs.current.forEach((item) => {
        if (!item) return;

        const number = item.querySelector('.outlined-number');
        const title = item.querySelector('.expertise-title');
        const desc = item.querySelector('.expertise-desc');
        const rows = item.querySelectorAll('.expertise-row');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        tl.fromTo(
          number,
          { opacity: 0, scale: 0.8 },
          { opacity: 0.35, scale: 1, duration: 1.2, ease: 'power2.out' }
        )
          .fromTo(
            title,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
            '-=0.8'
          )
          .fromTo(
            desc,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
            '-=0.5'
          )
          .fromTo(
            rows,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: 'power2.out',
            },
            '-=0.4'
          );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full py-24 md:py-32 lg:py-40"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 md:mb-24">
          <div className="flex items-center gap-6 mb-6">
            <span className="text-editorial-red text-xs font-medium tracking-widest uppercase">
              {'//'} Expertise
            </span>
            <span className="text-editorial-cream/40 text-xs font-medium tracking-widest uppercase">
              {'//'} Capabilities
            </span>
          </div>
          <div className="hairline" style={{ color: '#F3F3F0' }} />
        </div>

        {/* Expertise Items */}
        <div className="flex flex-col gap-24 md:gap-32 lg:gap-40">
          {expertiseData.map((item, idx) => (
            <div
              key={item.number}
              ref={(el) => { itemRefs.current[idx] = el; }}
              className="relative"
            >
              {/* Number + Title Row */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-16 mb-8">
                {/* Outlined Number */}
                <div className="lg:w-1/3 flex-shrink-0">
                  <div className="outlined-number text-editorial-white select-none">
                    {item.number}
                  </div>
                </div>

                {/* Title + Description */}
                <div className="lg:w-2/3">
                  <h3 className="expertise-title text-3xl md:text-4xl lg:text-5xl font-bold text-editorial-white tracking-tight mb-4">
                    {item.title}
                  </h3>
                  <p className="expertise-desc text-editorial-gray/60 text-sm md:text-base leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Skills List */}
              <div className="lg:ml-[33.333%] lg:pl-16">
                {item.skills.map((skill) => (
                  <div key={skill.index} className="expertise-row group">
                    <span className="text-editorial-white/90 text-sm md:text-base font-medium tracking-wide group-hover:text-editorial-white transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-editorial-mouse/50 text-xs font-light tabular-nums">
                      {skill.index}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 hairline" style={{ color: '#F3F3F0' }} />
    </section>
  );
};

export default React.memo(Expertise);
