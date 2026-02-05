import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../shared/Card';

const SKILLS = [
    {
        name: 'Reading',
        key: 'reading',
        gradient: 'from-blue-500 to-cyan-400',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        )
    },
    {
        name: 'Writing',
        key: 'writing',
        gradient: 'from-purple-500 to-pink-400',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        )
    },
    {
        name: 'Listening',
        key: 'listening',
        gradient: 'from-green-500 to-teal-400',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
        )
    },
    {
        name: 'Speaking',
        key: 'speaking',
        gradient: 'from-orange-500 to-red-400',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
        )
    },
];

export const SkillsProgress = ({ progress }) => {
    if (!progress || !progress.skills) return null;

    const { skills } = progress;
    const overallMastery = Math.round((skills.reading + skills.writing + skills.listening + skills.speaking) / 4);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-3xl p-8 shadow-depth border-2 border-primary/10"
        >
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                    <svg className="w-7 h-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Skills Breakdown</h3>
            </div>

            <div className="space-y-6">
                {SKILLS.map((skill, index) => {
                    const value = skills[skill.key] || 0;

                    return (
                        <motion.div
                            key={skill.key}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index, type: 'spring', damping: 20 }}
                            whileHover={{ x: 6 }}
                            className="group"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        whileHover={{ scale: 1.15, rotate: 5 }}
                                        className={`p-2 rounded-xl bg-gradient-to-br ${skill.gradient} bg-opacity-10 text-gray-700`}
                                    >
                                        {skill.icon}
                                    </motion.div>
                                    <span className="font-semibold text-gray-700 text-base">{skill.name}</span>
                                </div>
                                <motion.div
                                    key={value}
                                    initial={{ scale: 1.3, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="flex items-center gap-2"
                                >
                                    <span className={`text-xl font-black bg-gradient-to-r ${skill.gradient} bg-clip-text text-transparent`}>
                                        {value}%
                                    </span>
                                    {value >= 80 && (
                                        <motion.div
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: 'spring' }}
                                        >
                                            <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </div>

                            <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${value}%` }}
                                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 + (0.1 * index) }}
                                    className={`h-full bg-gradient-to-r ${skill.gradient} rounded-full relative group-hover:h-3.5 transition-all`}
                                    style={{
                                        boxShadow: `0 0 20px ${skill.key === 'reading' ? 'rgba(59, 130, 246, 0.4)' :
                                                skill.key === 'writing' ? 'rgba(168, 85, 247, 0.4)' :
                                                    skill.key === 'listening' ? 'rgba(34, 197, 94, 0.4)' :
                                                        'rgba(249, 115, 22, 0.4)'
                                            }`,
                                    }}
                                >
                                    {/* Shimmer effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                        animate={{ x: ['-100%', '200%'] }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: index * 0.3 }}
                                    />

                                    {/* Percentage indicator on hover */}
                                    {value > 20 && (
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-xs font-bold text-white drop-shadow-lg">{value}%</span>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-8 pt-8 border-t-2 border-gray-100"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>
                        <span className="text-base font-semibold text-gray-600">Overall Mastery</span>
                    </div>
                    <motion.span
                        key={overallMastery}
                        initial={{ scale: 1.3, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-4xl font-black gradient-text"
                    >
                        {overallMastery}%
                    </motion.span>
                </div>

                {/* Progress ring for overall mastery */}
                <div className="mt-4 relative h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${overallMastery}%` }}
                        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.9 }}
                        className="h-full bg-gradient-to-r from-primary via-secondary to-accent-400 rounded-full relative"
                        style={{
                            boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
                        }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        />
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};
