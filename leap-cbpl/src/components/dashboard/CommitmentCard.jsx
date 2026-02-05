import React from 'react';
import { motion } from 'framer-motion';

export const CommitmentCard = ({ user, currentWeek }) => {
    if (!user || !currentWeek) return null;

    const { weeklyCommitment } = user;
    const { daysCompleted, hoursCompleted } = currentWeek;

    const daysProgress = (daysCompleted / weeklyCommitment.days) * 100;
    const hoursProgress = (hoursCompleted / weeklyCommitment.hours) * 100;

    const isDaysComplete = daysCompleted >= weeklyCommitment.days;
    const isHoursComplete = hoursCompleted >= weeklyCommitment.hours;

    return (
        <div className="glass-card rounded-3xl p-8 shadow-depth border-2 border-primary/10 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5"></div>

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-secondary/10 to-primary/10">
                        <svg className="w-7 h-7 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Weekly Commitment</h3>
                </div>

                {/* Days Progress */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm font-semibold text-gray-700">Prep Days</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <motion.span
                                key={daysCompleted}
                                initial={{ scale: 1.3, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-lg font-black text-gray-800"
                            >
                                {daysCompleted}
                            </motion.span>
                            <span className="text-sm text-gray-500">/ {weeklyCommitment.days}</span>
                            {isDaysComplete && (
                                <motion.div
                                    initial={{ scale: 0, rotate: -90 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: 'spring' }}
                                >
                                    <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(daysProgress, 100)}%` }}
                            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                            className={`h-full rounded-full relative ${isDaysComplete
                                    ? 'bg-gradient-to-r from-success via-green-400 to-success'
                                    : 'bg-gradient-to-r from-primary via-secondary to-primary'
                                }`}
                            style={{
                                boxShadow: isDaysComplete
                                    ? '0 0 15px rgba(16, 185, 129, 0.5)'
                                    : '0 0 15px rgba(99, 102, 241, 0.4)',
                            }}
                        >
                            {/* Shimmer effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Hours Progress */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-semibold text-gray-700">Total Hours</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <motion.span
                                key={hoursCompleted}
                                initial={{ scale: 1.3, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-lg font-black text-gray-800"
                            >
                                {hoursCompleted.toFixed(1)}
                            </motion.span>
                            <span className="text-sm text-gray-500">/ {weeklyCommitment.hours}h</span>
                            {isHoursComplete && (
                                <motion.div
                                    initial={{ scale: 0, rotate: -90 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: 'spring' }}
                                >
                                    <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(hoursProgress, 100)}%` }}
                            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                            className={`h-full rounded-full relative ${isHoursComplete
                                    ? 'bg-gradient-to-r from-success via-green-400 to-success'
                                    : 'bg-gradient-to-r from-accent-400 via-orange-400 to-accent-400'
                                }`}
                            style={{
                                boxShadow: isHoursComplete
                                    ? '0 0 15px rgba(16, 185, 129, 0.5)'
                                    : '0 0 15px rgba(251, 146, 60, 0.4)',
                            }}
                        >
                            {/* Shimmer effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.5 }}
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* All Complete Banner */}
                {isDaysComplete && isHoursComplete && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.5, type: 'spring' }}
                        className="mt-6 px-5 py-3 bg-gradient-to-r from-success/20 via-green-400/20 to-success/20 border-2 border-success/40 rounded-xl flex items-center gap-3"
                    >
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        >
                            <svg className="w-5 h-5 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </motion.div>
                        <span className="text-sm font-bold text-success-700">
                            Amazing! You've completed this week's commitment!
                        </span>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
