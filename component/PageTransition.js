import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.2, 0.65, 0.3, 0.9],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.55, 0, 1, 0.45],
    },
  },
};

export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ minHeight: '100vh' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function SectionTransition({ children, delay = 0 }) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 30 },
        enter: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay,
            ease: [0.2, 0.65, 0.3, 0.9],
          },
        },
      }}
      initial="initial"
      animate="enter"
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, staggerDelay = 0.08, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={{
        initial: {},
        enter: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
      initial="initial"
      animate="enter"
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={{
        initial: { opacity: 0, y: 20 },
        enter: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.2, 0.65, 0.3, 0.9],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}