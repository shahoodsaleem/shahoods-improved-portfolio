import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Facebook, Palette } from 'lucide-react';


gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const revealItems = contentRef.current?.querySelectorAll('.reveal-item');
      if (revealItems) {
        gsap.fromTo(
          revealItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-24 md:py-32 bg-white text-black"
    >
      <div ref={contentRef} className="w-full px-6 md:px-12 lg:px-20 xl:px-32">
        {/* Large Heading */}
        <div className="reveal-item mb-20 md:mb-32">
          <h2 className="text-[12vw] md:text-[10vw] font-bold tracking-tighter leading-[0.8] text-black">
            Contact me
          </h2>
        </div>

        {/* Form and Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 mb-32">
          {/* Left Side: Info */}
          <div className="reveal-item space-y-12">
            <div>
              <p className="text-sm font-bold mb-1">Manhattan, New York</p>
              <p className="text-xs text-black/60 font-mono">2023</p>
            </div>

            <div>
              <p className="text-sm font-bold mb-1">Office hours</p>
              <p className="text-xs text-black/60">Monday - Friday</p>
              <p className="text-xs text-black/60">11 AM - 2 PM</p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="reveal-item">
            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              {/* Name Row */}
              <div className="space-y-4">
                <label className="text-sm font-bold block">Name (required)</label>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full bg-transparent border-b border-black/20 py-2 focus:border-black transition-colors outline-none text-sm placeholder:text-black/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full bg-transparent border-b border-black/20 py-2 focus:border-black transition-colors outline-none text-sm placeholder:text-black/30"
                    />
                  </div>
                </div>
              </div>

              {/* Service Selection */}
              <div className="space-y-4">
                <label className="text-sm font-bold block">Service</label>
                <div className="relative">
                  <select className="w-full bg-transparent border-b border-black/20 py-2 focus:border-black transition-colors outline-none text-sm appearance-none cursor-pointer">
                    <option value="">Select a service</option>
                    <option value="manufacturing">Manufacturing Optimization</option>
                    <option value="utilities">Utilities Analysis</option>
                    <option value="product">Product Development</option>
                    <option value="ai">AI Integration</option>
                  </select>
                  <div className="absolute right-0 bottom-3 pointer-events-none">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1L5 5L9 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-4">
                <label className="text-sm font-bold block">Email (required)</label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b border-black/20 py-2 focus:border-black transition-colors outline-none text-sm"
                />
              </div>

              {/* Newsletter Checkbox */}
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-4 h-4 border border-black/30 rounded-full flex items-center justify-center transition-colors group-hover:border-black">
                  <div className="w-1.5 h-1.5 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-xs text-black/60 group-hover:text-black transition-colors">Sign up for news and updates</span>
              </div>

              {/* Project Description */}
              <div className="space-y-4">
                <label className="text-sm font-bold block">Project description</label>
                <textarea
                  className="w-full bg-transparent border-b border-black/20 py-2 focus:border-black transition-colors outline-none text-sm resize-none h-24"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-black text-white px-12 py-3 rounded-full text-xs font-bold hover:bg-editorial-red transition-colors duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Large Contact Info Area */}
        <div className="reveal-item grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-black/10 pt-16 pb-24">
          <div className="group overflow-hidden">
            <a href="mailto:shahoodsaleem123@gmail.com" className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight hover:text-editorial-red transition-colors duration-500 block truncate">
              shahoodsaleem123@gmail.com
            </a>
          </div>
          <div className="md:text-right">
            <p className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
              (+92) 336 3791538
            </p>
          </div>
        </div>

        {/* Bottom Bar Footer */}
        <div className="reveal-item flex flex-col md:grid md:grid-cols-4 gap-8 pt-12 border-t border-black/10">
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest">Karachi, Pakistan</p>
            <p className="text-[10px] text-black/40 font-mono">2026</p>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest">Office hours</p>
            <p className="text-[10px] text-black/40">Monday - Friday 11 AM - 2 PM</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold uppercase tracking-widest">Say hello</p>
            <a href="#" className="text-[10px] text-black/60 hover:text-black underline underline-offset-4">Work with us</a>
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <div className="flex items-center gap-6">
              <a href="#" className="text-black/40 hover:text-black transition-colors"><Palette size={16} /></a>
              <a href="#" className="text-black/40 hover:text-black transition-colors"><Instagram size={16} /></a>
              <a href="#" className="text-black/40 hover:text-black transition-colors"><Facebook size={16} /></a>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-[10px] text-black/40 hover:text-black transition-colors uppercase tracking-widest">Privacy Policy</a>
              <p className="text-[10px] text-black/40 uppercase tracking-widest">© 2023 Template by Pradulis Studio</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Contact);
