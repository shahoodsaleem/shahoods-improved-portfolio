import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, Github, Palette } from 'lucide-react';

const socials = [
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'Behance', icon: Palette, href: '#' },
];

const SocialLinks: React.FC = () => {
  return (
    <motion.div
      className="fixed left-6 md:left-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {socials.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.href}
          className="group relative flex items-center justify-center w-8 h-8 text-editorial-black opacity-40 hover:opacity-100 transition-opacity duration-500"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 0.4, x: 0 }}
          transition={{
            duration: 0.6,
            delay: 2.8 + index * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{ opacity: 1, scale: 1.1 }}
          aria-label={social.name}
        >
          <social.icon
            size={16}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover:-translate-y-0.5"
          />
          <span className="absolute left-full ml-3 text-[10px] font-medium tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            {social.name}
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default React.memo(SocialLinks);
