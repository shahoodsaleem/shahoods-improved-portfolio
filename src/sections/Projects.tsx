import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  year: string;
}

const projects: Project[] = [
  {
    id: '01',
    title: 'Advanced Manufacturing Process Analysis',
    category: 'Industrial Engineering',
    description: 'Comprehensive analysis of turning operations and production workflows to optimize manufacturing efficiency and resource utilization.',
    year: '2024'
  },
  {
    id: '02',
    title: 'Plant Hazard & Safety Studies',
    category: 'Utilities Engineering',
    description: 'Detailed steam and hot surface hazard analysis within food manufacturing environments, establishing robust plant operation documentation.',
    year: '2023'
  },
  {
    id: '03',
    title: 'Pakistan Energy Infrastructure Report',
    category: 'Energy & Power',
    description: 'Extensive research on Karachi\'s energy infrastructure, analyzing power plant operations and energy demand/supply dynamics.',
    year: '2023'
  },
  {
    id: '04',
    title: 'Shampoo Bottle Prototype Development',
    category: 'Product Development',
    description: 'End-to-end product engineering exploration including packaging functionality analysis and leak testing concepts.',
    year: '2024'
  },
  {
    id: '05',
    title: 'Local AI & Technical Workflows',
    category: 'Digital Systems',
    description: 'Implementation of local AI experimentation and port forwarding configurations to streamline technical optimization workflows.',
    year: '2024'
  }
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
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

      // Project cards stagger reveal
      projectRefs.current.forEach((el) => {
        if (!el) return;
        
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full py-24 md:py-32 lg:py-40"
      style={{ backgroundColor: '#E5E5E5' }} // Inverted background for contrast section
    >
      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 md:mb-24">
          <div className="flex items-center gap-6 mb-6">
            <span className="text-editorial-black text-xs font-medium tracking-widest uppercase">
              // Selected Work
            </span>
            <span className="text-editorial-black/40 text-xs font-medium tracking-widest uppercase">
              // Technical Reports
            </span>
          </div>
          <div className="hairline" style={{ color: '#000000', opacity: 0.1 }} />
        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-16 md:gap-24 lg:gap-32">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              ref={(el) => { projectRefs.current[idx] = el; }}
              className="group cursor-pointer flex flex-col lg:flex-row gap-8 lg:gap-16 items-start"
            >
              {/* Image Placeholder */}
              <div className="w-full lg:w-1/2 aspect-[4/3] bg-black/5 relative overflow-hidden flex items-center justify-center border border-black/10 transition-transform duration-700 group-hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent z-10" />
                <span className="text-editorial-black/20 font-mono text-sm tracking-widest uppercase z-20">
                  Image Placeholder
                </span>
                {/* Reveal overlay on hover */}
                <div className="absolute inset-0 bg-editorial-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              </div>

              {/* Project Info */}
              <div className="w-full lg:w-1/2 flex flex-col pt-4 lg:pt-8">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-editorial-red text-xs font-medium tracking-widest uppercase">
                    {project.category}
                  </span>
                  <span className="text-editorial-black/40 text-xs font-mono">
                    {project.year}
                  </span>
                </div>
                
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-editorial-black tracking-tight mb-6 group-hover:text-editorial-red transition-colors duration-500">
                  {project.title}
                </h3>
                
                <p className="text-editorial-black/60 text-base md:text-lg leading-relaxed max-w-xl mb-8">
                  {project.description}
                </p>

                <div className="mt-auto flex items-center gap-4 text-editorial-black font-medium text-sm group-hover:text-editorial-red transition-colors duration-300">
                  <span>View Project</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transform group-hover:translate-x-2 transition-transform duration-300">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Projects);
