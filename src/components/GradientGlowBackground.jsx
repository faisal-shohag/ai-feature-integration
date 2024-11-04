import React from 'react';

const GradientGlowBackground = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-gray-950">
      {/* Light mode background effects */}
      <div className="absolute inset-0 dark:opacity-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-red-50 to-purple-100" />
        
        {/* Primary glowing orbs */}
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-40 blur-3xl animate-pulse" />
        <div className="absolute top-1/4 -right-40 h-[700px] w-[700px] rounded-full bg-gradient-to-l from-red-500 to-pink-500 opacity-40 blur-3xl animate-pulse delay-150" />
        <div className="absolute -bottom-40 left-1/3 h-[600px] w-[600px] rounded-full bg-gradient-to-t from-purple-500 to-pink-500 opacity-40 blur-3xl animate-pulse delay-300" />
        
        {/* Intense glow effects */}
        <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-pink-600 via-red-500 to-purple-600 opacity-30 blur-2xl animate-pulse delay-500" />
        <div className="absolute bottom-1/4 right-1/3 h-[500px] w-[500px] rounded-full bg-gradient-to-l from-purple-600 via-pink-500 to-red-600 opacity-30 blur-2xl animate-pulse delay-700" />
      </div>

      {/* Dark mode background effects */}
      <div className="absolute inset-0 opacity-0 dark:opacity-100">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />
        
        {/* Primary glowing orbs */}
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-pink-600/50 to-purple-600/50 blur-3xl animate-pulse" />
        <div className="absolute top-1/4 -right-40 h-[700px] w-[700px] rounded-full bg-gradient-to-l from-red-600/50 to-pink-600/50 blur-3xl animate-pulse delay-150" />
        <div className="absolute -bottom-40 left-1/3 h-[600px] w-[600px] rounded-full bg-gradient-to-t from-purple-600/50 to-pink-600/50 blur-3xl animate-pulse delay-300" />
        
        {/* Intense glow effects */}
        <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-pink-500/40 via-red-500/40 to-purple-500/40 blur-2xl animate-pulse delay-500" />
        <div className="absolute bottom-1/4 right-1/3 h-[500px] w-[500px] rounded-full bg-gradient-to-l from-purple-500/40 via-pink-500/40 to-red-500/40 blur-2xl animate-pulse delay-700" />

        {/* Additional ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 via-purple-900/20 to-transparent" />
        
        {/* Intense central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-gradient-to-r from-pink-600/20 via-red-600/20 to-purple-600/20 blur-3xl animate-pulse" />
      </div>

      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03]" />

      {/* Content container */}
      <div className="relative h-full z-10">
        {children}
      </div>
    </div>
  );
};

export default GradientGlowBackground;