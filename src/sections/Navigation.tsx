import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router';

// Dark-background sections on the home page (by element id)
const DARK_SECTION_IDS = ['about', 'experience'];

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnDark, setIsOnDark] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // ── Scroll-aware logic ────────────────────────────────────────────────────
  useEffect(() => {
    const checkPosition = () => {
      setIsScrolled(window.scrollY > 100);

      // Only run colour-inversion logic on the home page
      if (!isHome) {
        setIsOnDark(false);
        return;
      }

      const navEl = headerRef.current;
      if (!navEl) return;
      const navBottom = navEl.getBoundingClientRect().bottom;

      const overDark = DARK_SECTION_IDS.some((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const { top, bottom } = el.getBoundingClientRect();
        return navBottom >= top && navBottom <= bottom;
      });

      setIsOnDark(overDark);
    };

    window.addEventListener('scroll', checkPosition, { passive: true });
    checkPosition();
    return () => window.removeEventListener('scroll', checkPosition);
  }, [isHome]);

  // ── Smooth-scroll helper (home page only) ──────────────────────────────────
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!isHome) return; // let router handle non-home links
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // ── Derived style tokens ──────────────────────────────────────────────────
  // On dark sections → white text; otherwise → black
  const textColor = isOnDark ? '#F3F3F0' : '#0A0A0A';
  const bgBlur =
    isScrolled
      ? isOnDark
        ? 'bg-[#0A0A0A]/80 backdrop-blur-md py-4'
        : 'bg-[#EAEAEA]/80 backdrop-blur-md py-4'
      : 'bg-transparent py-6 md:py-8';

  return (
    <motion.header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${bgBlur}`}
      style={{ color: textColor, transition: 'color 0.5s ease, background 0.7s ease' }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between font-medium text-xs md:text-sm">
        {/* Left: Name */}
        <div className="flex-1 text-left">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <span className="text-[10px]">&copy;</span>
            <span>Shahood Saleem</span>
          </Link>
        </div>

        {/* Center: Navigation */}
        <nav className="flex-1 flex justify-center gap-8 md:gap-12">
          {[
            { label: 'Projects', href: '#projects', to: null },
            { label: 'About', href: '#about', to: null },
            { label: 'Experience', href: '#experience', to: null },
          ].map((item, index) => (
            <motion.a
              key={item.label}
              href={isHome ? item.href : `/${item.href}`}
              onClick={(e) => item.href && handleNavClick(e, item.href)}
              className="hover:opacity-60 transition-opacity duration-300"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.4 + index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {item.label}
            </motion.a>
          ))}

          {/* All Work — routes to /projects page */}
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.64, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/projects"
              className="hover:opacity-60 transition-opacity duration-300"
            >
              All Work
            </Link>
          </motion.span>
        </nav>

        {/* Right: Contact */}
        <div className="flex-1 text-right">
          <motion.a
            href={isHome ? '#contact' : '/#contact'}
            onClick={(e) => isHome && handleNavClick(e, '#contact')}
            className="hover:opacity-60 transition-opacity duration-300"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Contact
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
};

export default React.memo(Navigation);
