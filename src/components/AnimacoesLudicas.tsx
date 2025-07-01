import React from 'react';
import { motion } from 'framer-motion';

const AnimacoesLudicas: React.FC = () => (
  <div className="flex justify-center gap-12 py-8">
    {/* Boneca */}
    <motion.svg
      width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
      initial={{ y: 0 }}
      animate={{ y: [0, -20, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="w-16 h-16"
    >
      <circle cx="32" cy="32" r="30" fill="#FBBF24" />
      <ellipse cx="32" cy="40" rx="12" ry="16" fill="#FDE68A" />
      <circle cx="32" cy="28" r="8" fill="#F59E42" />
      <rect x="28" y="48" width="8" height="10" rx="4" fill="#F59E42" />
    </motion.svg>
    {/* Carrinho */}
    <motion.svg
      width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
      initial={{ x: 0 }}
      animate={{ x: [0, 20, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="w-16 h-16"
    >
      <rect x="12" y="32" width="40" height="16" rx="4" fill="#60A5FA" />
      <rect x="20" y="24" width="24" height="12" rx="3" fill="#3B82F6" />
      <circle cx="20" cy="52" r="6" fill="#1E40AF" />
      <circle cx="44" cy="52" r="6" fill="#1E40AF" />
    </motion.svg>
    {/* Bola */}
    <motion.svg
      width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="w-16 h-16"
    >
      <circle cx="32" cy="32" r="20" fill="#34D399" />
      <path d="M32 12 A20 20 0 0 1 52 32" stroke="#10B981" strokeWidth="4" />
      <path d="M32 52 A20 20 0 0 1 12 32" stroke="#10B981" strokeWidth="4" />
    </motion.svg>
  </div>
);

export default AnimacoesLudicas; 