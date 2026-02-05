import React from 'react';
import { motion } from 'framer-motion';

export const ProgressRing = ({ value, max = 100, size = 200, strokeWidth = 16, color = '#6366F1', isFrozen = false }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const percentage = Math.min(100, (value / max) * 100);
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#E5E7EB"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Gradient definition */}
                <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#667eea" />
                        <stop offset="50%" stopColor="#764ba2" />
                        <stop offset="100%" stopColor="#f093fb" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {/* Progress circle with gradient */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={isFrozen ? '#9CA3AF' : 'url(#progressGradient)'}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className={isFrozen ? 'opacity-50' : ''}
                    filter={!isFrozen ? 'url(#glow)' : ''}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                    key={value}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', duration: 0.8 }}
                    className={`text-5xl font-black ${isFrozen ? 'text-gray-400' : 'gradient-text'}`}
                >
                    {value}%
                </motion.div>
                {isFrozen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-gray-500 mt-2 font-medium"
                    >
                        🔒 Frozen
                    </motion.div>
                )}
            </div>
            {!isFrozen && (
                <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                        boxShadow: [
                            '0 0 20px rgba(102, 126, 234, 0.3)',
                            '0 0 40px rgba(102, 126, 234, 0.5)',
                            '0 0 20px rgba(102, 126, 234, 0.3)',
                        ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            )}
        </div>
    );
};
