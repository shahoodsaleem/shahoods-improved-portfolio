import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../sections/Navigation';
import { type Project, fetchAllProjects } from '../data/projects';

const ease = [0.16, 1, 0.3, 1] as const;

const ProjectAccordionItem: React.FC<{ 
  project: Project; 
  index: number;
  isOpen: boolean;
  toggle: () => void;
}> = ({ project, index, isOpen, toggle }) => {
  return (
    <div className="border-b border-black/10 overflow-hidden">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between py-8 text-left group transition-colors hover:bg-black/5 px-4 md:px-8"
      >
        <div className="flex items-center gap-6 md:gap-12 flex-1">
          <span className="text-[10px] font-mono text-editorial-black/30 w-6">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-editorial-black group-hover:text-editorial-red transition-colors">
            {project.title}
          </h2>
        </div>
        
        <div className="hidden md:flex items-center gap-12 text-editorial-black/40 text-xs font-mono tracking-widest uppercase">
          <span>{project.category}</span>
          <span className="w-12 text-right">{project.year}</span>
        </div>

        <div className="ml-8 flex-shrink-0">
          <motion.div
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease }}
            className="px-4 md:px-8 pb-12"
          >
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 pt-4">
              {/* Preview Image */}
              <div className="w-full lg:w-1/2 aspect-[16/9] bg-editorial-black/5 relative overflow-hidden group/img">
                 {project.images && project.images[0]?.src ? (
                   <img 
                    src={project.images[0].src} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-105"
                   />
                 ) : (
                    <div className="absolute inset-0 flex items-center justify-center border border-black/5">
                      <span className="text-editorial-black/10 font-mono text-xs tracking-widest uppercase">
                        Preview coming soon
                      </span>
                    </div>
                 )}
                 <div className="absolute inset-0 bg-editorial-red/5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Info Column */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="mb-6 lg:hidden flex justify-between text-editorial-black/40 text-[10px] font-mono tracking-widest uppercase">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
                
                <p className="text-xl md:text-2xl text-editorial-black/70 leading-relaxed tracking-tight max-w-xl mb-8">
                  {project.description}
                </p>

                <div className="flex items-center gap-8">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group/link flex items-center gap-4 text-editorial-black font-bold text-sm tracking-widest uppercase hover:text-editorial-red transition-colors"
                  >
                    <span>View Project</span>
                    <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center transition-all duration-300 group-hover/link:border-editorial-red group-hover/link:bg-editorial-red group-hover/link:text-editorial-white">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AllProjects: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getProjects = async () => {
      try {
        const data = await fetchAllProjects();
        setProjectList(data);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setIsLoading(false);
      }
    };
    getProjects();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F3F3F0' }}>
      <Navigation />

      {/* Page Header */}
      <div
        className="w-full px-6 md:px-12 lg:px-20 xl:px-32 pt-40 pb-20 md:pb-28"
        style={{ backgroundColor: '#0A0A0A' }}
      >
        {/* Breadcrumb */}
        <motion.div
          className="flex items-center gap-3 mb-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <Link
            to="/"
            className="text-editorial-cream/40 text-xs font-mono tracking-widest uppercase hover:text-editorial-cream/80 transition-colors"
          >
            Home
          </Link>
          <span className="text-editorial-cream/20 text-xs">/</span>
          <span className="text-editorial-red text-xs font-mono tracking-widest uppercase">
            All Work
          </span>
        </motion.div>

        <motion.h1
          className="text-[12vw] md:text-[10vw] lg:text-[9vw] font-bold tracking-tighter leading-[0.85] text-editorial-white"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease }}
        >
          All Work
        </motion.h1>

        <motion.div
          className="mt-8 flex items-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
        >
          <span className="text-editorial-cream/40 text-xs font-mono tracking-widest uppercase">
            {isLoading ? '...' : projectList.length} projects
          </span>
          <div className="flex-1 h-px bg-editorial-white/10" />
        </motion.div>
      </div>

      {/* Projects Accordion */}
      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 py-20 md:py-32">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <span className="text-editorial-black/20 font-mono text-sm tracking-widest uppercase animate-pulse">
              Loading Projects...
            </span>
          </div>
        ) : (
          <div className="border-t border-black/10">
            {projectList.length > 0 ? (
              projectList.map((project, idx) => (
                <ProjectAccordionItem
                  key={project._id}
                  project={project}
                  index={idx}
                  isOpen={openIndex === idx}
                  toggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                />
              ))
            ) : (
              <div className="py-20 text-center border-b border-black/10">
                <p className="text-editorial-black/40 font-mono text-sm tracking-widest uppercase">No projects found in the database.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer strip */}
      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 py-10 border-t border-black/10 flex items-center justify-between">
        <p className="text-editorial-black/30 text-[10px] font-mono tracking-widest uppercase">
          © 2026 Shahood Saleem
        </p>
        <Link
          to="/"
          className="text-editorial-black/40 text-[10px] font-mono tracking-widest uppercase hover:text-editorial-black transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AllProjects;
