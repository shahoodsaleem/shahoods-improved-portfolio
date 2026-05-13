'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { type Project, fetchFeaturedProjects } from '../data/projects'


gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getFeatured = async () => {
      try {
        const data = await fetchFeaturedProjects();
        setFeaturedProjects(data);
      } catch (err) {
        console.error('Failed to fetch featured projects:', err);
      } finally {
        setIsLoading(false);
      }
    };
    getFeatured();
  }, []);

  useEffect(() => {
    if (isLoading || featuredProjects.length === 0) return;

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

      // Project rows reveal
      const rows = containerRef.current?.querySelectorAll('.project-row');
      if (rows) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, featuredProjects]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full py-24 md:py-32 lg:py-48"
      style={{ backgroundColor: '#E5E5E5' }}
    >
      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32">
        {/* Section Header */}
        <div ref={headerRef} className="mb-20 md:mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <span className="text-editorial-red text-xs font-mono tracking-[0.3em] uppercase block">
                {'//'} Selected Works
              </span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-editorial-black leading-[0.85]">
                Engineering <br /> Portfolio.
              </h2>
            </div>
            <p className="text-editorial-black/40 text-sm font-mono tracking-widest uppercase max-w-[200px]">
              A curated selection of industrial & manufacturing research.
            </p>
          </div>
        </div>

        {/* Featured Projects List */}
        <div ref={containerRef} className="space-y-0 border-t border-black/10 min-h-[400px]">
          {isLoading ? (
            <div className="py-20 flex items-center justify-center">
               <span className="text-editorial-black/20 font-mono text-xs tracking-widest uppercase animate-pulse">Loading Featured Work...</span>
            </div>
          ) : featuredProjects.length > 0 ? (
            featuredProjects.map((project) => (
              <Link
                key={project._id}
                href={`/projects/${project.slug}`}
                className="project-row group block relative py-12 md:py-16 border-b border-black/10 transition-colors hover:bg-black/[0.02]"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                  <div className="flex items-baseline gap-8 md:gap-16">
                    <span className="text-[10px] font-mono text-editorial-black/30 w-8">
                      {project.year}
                    </span>
                    <div className="space-y-2">
                      <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-editorial-black group-hover:text-editorial-red transition-colors duration-500">
                        {project.title}
                      </h3>
                      <span className="text-editorial-black/40 text-[10px] font-mono tracking-widest uppercase block">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 self-end md:self-center">
                    <div className="w-12 h-px bg-black/20 group-hover:w-20 group-hover:bg-editorial-red transition-all duration-500" />
                    <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:border-editorial-red group-hover:bg-editorial-red group-hover:text-white transition-all duration-500">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Hover Image Preview */}
                <div className="absolute right-[20%] top-1/2 -translate-y-1/2 w-48 aspect-[3/4] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none overflow-hidden hidden lg:block transform group-hover:scale-110 group-hover:-rotate-3">
                  {project.images && project.images[0]?.src ? (
                    <img src={project.images[0].src} className="w-full h-full object-cover grayscale" alt="" />
                  ) : (
                    <div className="w-full h-full bg-black/5 border border-black/10" />
                  )}
                </div>
              </Link>
            ))
          ) : (
            <div className="py-20 text-center border-b border-black/10">
               <p className="text-editorial-black/40 font-mono text-xs tracking-widest uppercase">No featured works available.</p>
            </div>
          )}
        </div>

        {/* View All CTA */}
        <div className="mt-20 flex justify-end">
          <Link
            href="/projects"
            className="group flex items-center gap-4 text-editorial-black font-bold text-sm tracking-[0.2em] uppercase hover:text-editorial-red transition-colors"
          >
            <span>View all work</span>
            <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center transition-all duration-300 group-hover:bg-editorial-black group-hover:text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Projects);
