import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? 'bg-[#EAEAEA]/80 backdrop-blur-md py-4'
          : 'bg-transparent py-6 md:py-8'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between font-medium text-xs md:text-sm text-editorial-black">
        {/* Left: Name */}
        <div className="flex-1 text-left">
          <a href="#" className="flex items-center gap-2 group hover:opacity-70 transition-opacity">
            <span className="text-[10px]">&copy;</span>
            <span>Shahood Saleem</span>
          </a>
        </div>

        {/* Center: Navigation */}
        <nav className="flex-1 flex justify-center gap-8 md:gap-12">
          {navItems.filter(item => item.label !== 'Contact').map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
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
        </nav>

        {/* Right: Contact */}
        <div className="flex-1 text-right">
          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hover:opacity-60 transition-opacity duration-300"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Contact
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
};

export default React.memo(Navigation);
