import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-sm shadow-lg hover:bg-white/20 transition-all"
    >
      {isDark ? (
        <Sun className="text-white" size={24} />
      ) : (
        <Moon className="text-gray-800" size={24} />
      )}
    </button>
  );
}