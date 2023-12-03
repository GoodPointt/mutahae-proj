'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React from 'react';

const variants = {
  out: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const AnimatedMain = ({ children }) => {
  const path = usePathname();

  return (
    <motion.main
      style={{
        overflow: 'hidden',
      }}
      key={path}
      variants={variants}
      animate="in"
      initial="out"
      exit="out"
    >
      {children}
    </motion.main>
  );
};

export default AnimatedMain;
