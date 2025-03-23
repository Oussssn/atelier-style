import React from 'react';
import { motion } from 'framer-motion';
import { Feather } from 'lucide-react';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white/50 backdrop-blur-md border-b elegant-border"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div 
          className="flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.div
            animate={{ 
              y: [0, -2, 2, 0],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <Feather className="h-6 w-6 text-mauve-700" />
          </motion.div>
          <span className="ml-3 text-2xl font-playfair font-medium tracking-wide premium-text-gradient">
            Atelier Style
          </span>
        </motion.div>
      </div>
    </motion.header>
  );
}