import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../sections/Navigation';
import { type Project, type ProjectImage, fetchProjectBySlug } from '../data/projects';

const ease = [0.16, 1, 0.3, 1] as const;

// ─── Image Slideshow ──────────────────────────────────────────────────────────
interface SlideshowProps {
  images: ProjectImage[];
}

const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (next: number, dir: 1 | -1) => {
      setDirection(dir);
      setCurrent((next + images.length) % images.length);
    },
    [images.length]
  );

  const next = useCallback(() => go(current + 1, 1), [current, go]);
  const prev = useCallback(() => go(current - 1, -1), [current, go]);

  // Auto-advance every 4 s
  useEffect(() => {
    timerRef.current = setInterval(next, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 4000);
  };

  const handlePrev = () => { prev(); resetTimer(); };
  const handleNext = () => { next(); resetTimer(); };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[#111]">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {images && images[current]?.src ? (
            <img
              src={images[current].src!}
              alt={images[current].alt}
              className="w-full h-full object-cover"
            />
          ) : (
            /* Placeholder shown until real images are supplied */
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#111] select-none">
              <span className="text-white/10 font-mono text-6xl md:text-8xl font-bold tracking-tighter">
                {String(current + 1).padStart(2, '0')}
              </span>
              <span className="mt-4 text-white/20 font-mono text-xs tracking-[0.3em] uppercase">
                {images ? images[current]?.alt : 'Image'}
              </span>
              <span className="mt-2 text-white/10 font-mono text-[10px] tracking-widest uppercase">
                Image coming soon
              </span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next */}
      {images && images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/20 hover:border-white/60 hover:bg-white/10 transition-all duration-300 rounded-full"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/20 hover:border-white/60 hover:bg-white/10 transition-all duration-300 rounded-full"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {images && images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => { go(i, i > current ? 1 : -1); resetTimer(); }}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === current
                  ? 'w-6 h-1.5 bg-white'
                  : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                }`}
            />
          ))}
        </div>
      )}

      {/* Slide counter */}
      {images && images.length > 0 && (
        <div className="absolute top-5 right-5 z-20 font-mono text-[10px] text-white/40 tracking-widest">
          {String(current + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </div>
      )}
    </div>
  );
};

// ─── Body Section Block ───────────────────────────────────────────────────────
const Section: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex flex-col lg:flex-row gap-6 lg:gap-20 py-12 border-b border-black/8">
    <div className="lg:w-1/4 flex-shrink-0">
      <span className="text-editorial-red text-xs font-mono tracking-widest uppercase">
        // {label}
      </span>
    </div>
    <div className="lg:w-3/4">
      <p className="text-editorial-black/70 text-base md:text-lg leading-relaxed">
        {children}
      </p>
    </div>
  </div>
);

// ─── Project Detail Page ──────────────────────────────────────────────────────
const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getProject = async () => {
      if (!slug) return;
      setIsLoading(true);
      try {
        const data = await fetchProjectBySlug(slug);
        setProject(data);
      } catch (err) {
        console.error('Failed to fetch project:', err);
      } finally {
        setIsLoading(false);
      }
    };
    getProject();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#F3F3F0' }}>
        <Navigation />
        <span className="text-editorial-black/20 font-mono text-sm tracking-widest uppercase animate-pulse">Loading Project Details...</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#F3F3F0' }}>
        <Navigation />
        <p className="text-editorial-black/40 font-mono text-sm tracking-widest">Project not found.</p>
        <Link to="/projects" className="mt-4 text-editorial-red text-xs underline underline-offset-4">
          ← Back to All Work
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F3F3F0' }}>
      <Navigation />

      {/* ── Slideshow ── */}
      <div className="pt-16 md:pt-20">
        <Slideshow images={project.images} />
      </div>

      {/* ── Project Meta ── */}
      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 pt-14 pb-4">
        {/* Back link */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-editorial-black/40 text-xs font-mono tracking-widest uppercase hover:text-editorial-black transition-colors mb-10 group"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transform group-hover:-translate-x-1 transition-transform duration-300">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All Work
        </motion.button>

        {/* Category + Year */}
        <motion.div
          className="flex items-center gap-4 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          <span className="text-editorial-red text-xs font-medium tracking-widest uppercase">
            {project.category}
          </span>
          <span className="text-editorial-black/30 text-xs font-mono">—</span>
          <span className="text-editorial-black/40 text-xs font-mono">{project.year}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-editorial-black tracking-tight leading-[1.0] mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
        >
          {project.title}
        </motion.h1>

        {/* Short description */}
        <motion.p
          className="text-editorial-black/50 text-lg md:text-xl leading-relaxed max-w-2xl mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
        >
          {project.description}
        </motion.p>
      </div>

      {/* ── Divider ── */}
      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 mt-10">
        <div className="h-px bg-black/10" />
      </div>

      {/* ── Body Content ── */}
      <motion.div
        className="w-full px-6 md:px-12 lg:px-20 xl:px-32 pb-32"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease }}
      >
        <Section label="Overview">{project.body.overview}</Section>
        {project.body.methodology && (
          <Section label="Methodology">{project.body.methodology}</Section>
        )}
        {project.body.results && (
          <Section label="Results">{project.body.results}</Section>
        )}
        {project.body.conclusion && (
          <Section label="Conclusion">{project.body.conclusion}</Section>
        )}

        {/* Navigation to next/prev */}
        <div className="mt-20 flex items-center justify-between">
          <Link
            to="/projects"
            className="group flex items-center gap-3 text-editorial-black/50 text-xs font-mono tracking-widest uppercase hover:text-editorial-black transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transform group-hover:-translate-x-1.5 transition-transform duration-300">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All Work
          </Link>
          <p className="text-editorial-black/20 text-[10px] font-mono tracking-widest">
            © 2026 Shahood Saleem
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;
