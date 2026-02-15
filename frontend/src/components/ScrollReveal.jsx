import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : String(children);
    return text.split(/(\s+)/).map((word, index) => (
      <span className="word inline-block" key={index}>
        {word}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const wordElements = el.querySelectorAll('.word');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordElements,
        {
          opacity: baseOpacity,
          filter: enableBlur ? 'blur(4px)' : 'none',
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.02,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 65%',
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [baseOpacity, baseRotation, enableBlur]);

  return (
    <h2
      ref={containerRef}
      className="scroll-reveal-text font-playfair text-xl md:text-2xl text-center leading-relaxed text-rose-gold/80 italic"
    >
      {splitText}
    </h2>
  );
};

export default ScrollReveal;
