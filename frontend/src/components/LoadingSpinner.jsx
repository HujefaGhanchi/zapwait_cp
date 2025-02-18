import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'medium', color = 'text-blue-600' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex justify-center items-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`${sizeClasses[size]} ${color} border-2 border-current border-r-transparent rounded-full`}
      />
    </div>
  );
};

export default LoadingSpinner; 