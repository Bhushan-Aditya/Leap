import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { Button } from '../components/shared/Button';
import { ProgressRing } from '../components/dashboard/ProgressRing';
import { CommitmentCard } from '../components/dashboard/CommitmentCard';
import { ReadinessScore } from '../components/dashboard/ReadinessScore';
import { WeeklyCalendar } from '../components/dashboard/WeeklyCalendar';
import { SkillsProgress } from '../components/dashboard/SkillsProgress';

export default function Home() {
    const navigate = useNavigate();
    const { user, progress, currentWeek, freezeProgress } = useApp();
    const [showRecovery, setShowRecovery] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/onboarding');
        }
    }, [user, navigate]);

    useEffect(() => {
        // Check if user should see recovery prompt
        if (user && currentWeek) {
            const today = new Date();
            const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

            // Check if it's midweek (Wed/Thu) and user is behind
            if ((dayOfWeek === 3 || dayOfWeek === 4) && currentWeek.daysCompleted < 2) {
                setShowRecovery(true);
                freezeProgress();
            }
        }
    }, [user, currentWeek]);

    if (!user) return null;

    const hasSessionToday = currentWeek.sessions.some(s => {
        const sessionDate = new Date(s.date).toISOString().split('T')[0];
        const today = new Date().toISOString().split('T')[0];
        return sessionDate === today;
    });

    const canStartSession = !hasSessionToday || currentWeek.daysCompleted < user.weeklyCommitment.days;

    const getDaysUntilExam = () => {
        const examDate = new Date(user.examDate);
        const today = new Date();
        const diffTime = examDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const daysUntilExam = getDaysUntilExam();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50/30 to-secondary-50/30 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: Math.random() * 6 + 2,
                            height: Math.random() * 6 + 2,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            background: `rgba(${99 + Math.random() * 50}, ${102 + Math.random() * 50}, ${241}, ${0.1 + Math.random() * 0.2})`,
                        }}
                        animate={{
                            y: [0, -60, 0],
                            x: [0, Math.random() * 40 - 20, 0],
                            opacity: [0.1, 0.4, 0.1],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Header */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass-card border-b-2 border-primary/10 sticky top-0 z-40 backdrop-blur-xl"
            >
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h1 className="text-5xl font-black mb-3 tracking-tight">
                                <span className="gradient-text">Welcome back</span>
                            </h1>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-warning/20 via-warning/10 to-orange-400/20 border-2 border-warning/30 rounded-2xl"
                            >
                                <svg className="w-5 h-5 text-warning-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm font-bold text-warning-700">
                                    {daysUntilExam} days until your exam
                                </p>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <button
                                onClick={() => navigate('/session')}
                                disabled={!canStartSession}
                                className="group relative btn-gradient-warm px-10 py-5 rounded-2xl font-bold text-lg shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                <svg className="w-6 h-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="relative z-10">{hasSessionToday ? 'Add Session' : 'Start Session'}</span>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Progress */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Recovery Prompt */}
                        {showRecovery && progress.isFrozen && (
                            <motion.div
                                initial={{ opacity: 0, y: -30, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ type: "spring", damping: 20 }}
                                className="glass-card bg-gradient-to-r from-warning/10 via-orange-400/10 to-warning/10 border-2 border-warning/40 rounded-3xl p-8 shadow-glow-warning relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-warning/5 to-orange-400/5 animate-gradient-x"></div>
                                <div className="relative z-10 flex items-start gap-6">
                                    <motion.div
                                        animate={{
                                            rotate: [0, -5, 5, -5, 0],
                                        }}
                                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                                        className="flex-shrink-0"
                                    >
                                        <svg className="w-14 h-14 text-warning-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </motion.div>
                                    <div className="flex-1">
                                        <h3 className="text-3xl font-black text-warning-700 mb-3">
                                            Progress Frozen
                                        </h3>
                                        <p className="text-gray-700 mb-5 text-base leading-relaxed">
                                            You're falling behind on your weekly commitment. Start a quick recovery session
                                            to get back on track—it only takes 5 minutes!
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => navigate('/session?recovery=true')}
                                            className="btn-gradient-warm px-8 py-3.5 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Start Recovery Session
                                        </motion.button>
                                    </div>
                                    <button
                                        onClick={() => setShowRecovery(false)}
                                        className="text-gray-400 hover:text-gray-700 text-3xl p-2 hover:bg-white/50 rounded-xl transition-all"
                                    >
                                        ×
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Readiness Score */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <ReadinessScore progress={progress} user={user} />
                        </motion.div>

                        {/* Weekly Calendar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <WeeklyCalendar currentWeek={currentWeek} user={user} />
                        </motion.div>

                        {/* Skills Progress */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <SkillsProgress progress={progress} />
                        </motion.div>
                    </div>

                    {/* Right Column - Commitment & Score */}
                    <div className="space-y-8">
                        {/* Progress Ring */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.15, type: "spring", damping: 20 }}
                            className="glass-card rounded-3xl p-8 text-center shadow-depth border-2 border-primary/10 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-center gap-3 mb-8">
                                    <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    <h3 className="text-xl font-bold text-gray-800">Overall Progress</h3>
                                </div>
                                <motion.div
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3, type: "spring" }}
                                    className="flex justify-center mb-8"
                                >
                                    <ProgressRing
                                        value={progress.readinessScore}
                                        size={220}
                                        strokeWidth={18}
                                        isFrozen={progress.isFrozen}
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className={`text-sm font-medium px-5 py-3 rounded-full inline-flex items-center gap-2 ${progress.isFrozen
                                            ? 'bg-gray-100 text-gray-600'
                                            : 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary-700'
                                        }`}
                                >
                                    {progress.isFrozen ? (
                                        <>
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            Complete a session to unlock
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                            </svg>
                                            Keep up the great work!
                                        </>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Commitment Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                        >
                            <CommitmentCard user={user} currentWeek={currentWeek} />
                        </motion.div>

                        {/* Quick Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                            className="glass-card rounded-3xl p-7 shadow-depth"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <h3 className="text-xl font-bold text-gray-800">Quick Stats</h3>
                            </div>
                            <div className="space-y-4">
                                {[
                                    {
                                        label: 'Total Sessions',
                                        value: currentWeek.sessions.length,
                                        gradient: 'from-primary to-secondary',
                                        icon: (
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                            </svg>
                                        )
                                    },
                                    {
                                        label: 'This Week',
                                        value: `${currentWeek.daysCompleted} days`,
                                        gradient: 'from-success to-green-400',
                                        icon: (
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        label: 'Total Hours',
                                        value: `${currentWeek.hoursCompleted.toFixed(1)}h`,
                                        gradient: 'from-accent-400 to-orange-400',
                                        icon: (
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )
                                    },
                                ].map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.45 + (index * 0.08) }}
                                        whileHover={{ x: 4, transition: { duration: 0.2 } }}
                                        className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-transparent hover:from-gray-100 transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-xl bg-gradient-to-br ${stat.gradient} bg-opacity-10 text-gray-700 group-hover:scale-110 transition-transform`}>
                                                {stat.icon}
                                            </div>
                                            <span className="text-gray-600 font-medium text-sm">{stat.label}</span>
                                        </div>
                                        <span className={`font-black text-2xl bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                                            {stat.value}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
