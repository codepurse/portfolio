import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function AnimatedProjectCard({
  name,
  desc,
  stack,
  year,
  href,
  index = 0
}) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <a
          href={href}
          className="project-card"
          style={{ transform: 'translateZ(30px)' }}
        >
          <div className="pc-header">
            <span className="pc-index">{String(index + 1).padStart(2, '0')}</span>
            <span className="pc-year">{year}</span>
          </div>
          <h3 className="pc-name">{name}</h3>
          <p className="pc-desc">{desc}</p>
          <div className="pc-stack">
            {stack.map((tech) => (
              <span key={tech} className="pc-tag">{tech}</span>
            ))}
          </div>
          <div className="pc-arrow">↗</div>
        </a>
      </motion.div>
    </motion.div>
  );
}