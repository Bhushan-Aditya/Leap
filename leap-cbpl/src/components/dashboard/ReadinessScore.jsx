import React from 'react';
import { motion } from 'framer-motion';

export const ReadinessScore = ({ progress, user }) => {
    if (!progress || !user) return null;

    const { readinessScore, predictedBand, isFrozen } = progress;

    const getScoreColor = (score) => {
        if (score >= 75) return 'success';
        if (score >= 50) return 'warning';
        return 'danger';
    };

    const scoreColor = getScoreColor(readinessScore);

    const getBandColor = (band) => {
        if (band >= 7.5) return 'from-success to-green-400';
        if (band >= 6.5) return 'from-warning to-yellow-400';
        return 'from-danger to-red-400';
    };

    const bandGradient = getBandColor(predictedBand);

    const isOnTrack = readinessScore >= 60 && predictedBand >= user.targetBand - 0.5;

    return (
        <div className="glass-card rounded-3xl p-8 shadow-depth border-2 border-primary/10 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50"></div>

            {/* Animated background orbs */}
            {!isFrozen && (
                <>
                    <motion.div
                        className="absolute w-64 h-64 rounded-full blur-3xl"
                        style={{
                            background: `radial-gradient(circle, ${scoreColor === 'success' ? 'rgba(16, 185, 129, 0.15)' : scoreColor === 'warning' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)'}, transparent)`,
                            top: '-50%',
                            right: '-20%',
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.div
                        className="absolute w-48 h-48 rounded-full blur-3xl"
                        style={{
                            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent)',
                            bottom: '-30%',
                            left: '-10%',
                        }}
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1,
                        }}
                    />
                </>
            )}

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                            <svg className="w-7 h-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">Exam Readiness</h3>
                    </div>

                    {isOnTrack && !isFrozen && (
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', delay: 0.3 }}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-success/20 to-green-400/20 border-2 border-success/30 rounded-full"
                        >
                            <svg className="w-5 h-5 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-bold text-success-700">On Track</span>
                        </motion.div>
                    )}
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Readiness Score */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="relative group"
                    >
                        <div className={`p-6 rounded-2xl bg-gradient-to-br ${scoreColor === 'success' ? 'from-success/10 to-green-400/10 border-success/20' :
                                scoreColor === 'warning' ? 'from-warning/10 to-yellow-400/10 border-warning/20' :
                                    'from-danger/10 to-red-400/10 border-danger/20'
                            } border-2 transition-all duration-500 group-hover:shadow-lg`}>
                            <div className="flex items-center gap-2 mb-3">
                                <svg className={`w-5 h-5 ${scoreColor === 'success' ? 'text-success-600' :
                                        scoreColor === 'warning' ? 'text-warning-600' :
                                            'text-danger-600'
                                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <span className="text-sm font-semibold text-gray-600">Readiness</span>
                            </div>
                            <motion.div
                                key={readinessScore}
                                initial={{ scale: 1.2, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className={`text-6xl font-black bg-gradient-to-r ${scoreColor === 'success' ? 'from-success to-green-400' :
                                        scoreColor === 'warning' ? 'from-warning to-yellow-400' :
                                            'from-danger to-red-400'
                                    } bg-clip-text text-transparent mb-1`}
                                style={{
                                    filter: isFrozen ? 'grayscale(100%)' : 'none',
                                }}
                            >
                                {readinessScore}%
                            </motion.div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span>Current score</span>
                            </div>

                            {!isFrozen && (
                                <motion.div
                                    className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${scoreColor === 'success' ? 'from-success/20 to-green-400/20' :
                                            scoreColor === 'warning' ? 'from-warning/20 to-yellow-400/20' :
                                                'from-danger/20 to-red-400/20'
                                        } blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10`}
                                />
                            )}
                        </div>
                    </motion.div>

                    {/* Predicted Band */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative group"
                    >
                        <div className={`p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 transition-all duration-500 group-hover:shadow-lg`}>
                            <div className="flex items-center gap-2 mb-3">
                                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                </svg>
                                <span className="text-sm font-semibold text-gray-600">Predicted Band</span>
                            </div>
                            <motion.div
                                key={predictedBand}
                                initial={{ scale: 1.2, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className={`text-6xl font-black bg-gradient-to-r ${bandGradient} bg-clip-text text-transparent mb-1`}
                                style={{
                                    filter: isFrozen ? 'grayscale(100%)' : 'none',
                                }}
                            >
                                {predictedBand}
                            </motion.div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Target: {user.targetBand}</span>
                            </div>

                            <motion.div
                                className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Frozen State Message */}
                {isFrozen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6 px-5 py-3 bg-gray-100 border-2 border-gray-200 rounded-xl flex items-center gap-3"
                    >
                        <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-600">
                            Complete your commitment to update these metrics
                        </span>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
