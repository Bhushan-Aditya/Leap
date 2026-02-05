import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { Button } from '../components/shared/Button';
import { Card } from '../components/shared/Card';

const SESSION_TYPES = [
    { key: 'reading', name: 'Reading', icon: '📖', gradient: 'from-blue-500 to-cyan-400' },
    { key: 'writing', name: 'Writing', icon: '✍️', gradient: 'from-purple-500 to-pink-400' },
    { key: 'listening', name: 'Listening', icon: '🎧', gradient: 'from-green-500 to-teal-400' },
    { key: 'speaking', name: 'Speaking', icon: '🗣️', gradient: 'from-orange-500 to-red-400' },
];

const TASKS = {
    reading: [
        'Read a passage about climate change and answer comprehension questions',
        'Practice skimming and scanning with a scientific article',
        'Identify main ideas in a business-related text',
    ],
    writing: [
        'Write a paragraph describing a graph or chart',
        'Practice thesis statement construction',
        'Improve vocabulary for academic writing',
    ],
    listening: [
        'Listen to a conversation and answer questions',
        'Practice note-taking while listening',
        'Identify key information in a lecture',
    ],
    speaking: [
        'Practice describing a familiar topic for 2 minutes',
        'Respond to opinion-based questions',
        'Improve fluency with timed practice',
    ],
};

export default function Session() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { progress, completeSession } = useApp();
    const [sessionState, setSessionState] = useState('select'); // select, active, complete
    const [selectedType, setSelectedType] = useState(null);
    const [task, setTask] = useState('');
    const [timeLeft, setTimeLeft] = useState(0);
    const [timerActive, setTimerActive] = useState(false);

    const isRecovery = searchParams.get('recovery') === 'true';
    const sessionDuration = isRecovery ? 5 : 15; // minutes

    useEffect(() => {
        if (timerActive && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [timerActive, timeLeft]);

    const handleSelectType = (type) => {
        setSelectedType(type);
        const tasks = TASKS[type];
        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        setTask(randomTask);
    };

    const handleStartSession = () => {
        setSessionState('active');
        setTimeLeft(sessionDuration * 60);
        setTimerActive(true);
    };

    const handleCompleteSession = () => {
        setTimerActive(false);

        const actualDuration = sessionDuration * 60 - timeLeft;
        completeSession({
            type: selectedType,
            duration: Math.ceil(actualDuration / 60),
            task: task,
            isRecovery: isRecovery
        });

        setSessionState('complete');
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getProgressPercentage = () => {
        return ((sessionDuration * 60 - timeLeft) / (sessionDuration * 60)) * 100;
    };

    const selectedSkill = SESSION_TYPES.find(t => t.key === selectedType);

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 bg-[length:400%_400%] animate-gradient-xy flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -50, 0],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="w-full max-w-4xl relative z-10">
                <AnimatePresence mode="wait">
                    {/* Type Selection */}
                    {sessionState === 'select' && !selectedType && (
                        <motion.div
                            key="select"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                        >
                            <div className="glass-card rounded-3xl p-10 shadow-depth relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h1 className="text-4xl font-black mb-2">
                                                {isRecovery ? (
                                                    <span className="gradient-text-warm">⚡ Quick Recovery</span>
                                                ) : (
                                                    <span className="gradient-text">🎯 Start Session</span>
                                                )}
                                            </h1>
                                            <p className="text-gray-700 text-lg">
                                                {isRecovery
                                                    ? `Just 5 minutes to unlock your progress`
                                                    : `Choose a skill to practice (${sessionDuration} minutes)`}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => navigate('/home')}
                                            className="text-gray-400 hover:text-gray-700 text-3xl p-2 hover:bg-white/50 rounded-lg transition-all"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {SESSION_TYPES.map((type, index) => (
                                            <motion.button
                                                key={type.key}
                                                onClick={() => handleSelectType(type.key)}
                                                className="glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-300 text-left group border-2 border-white/30 hover:border-white/60"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                whileHover={{ y: -5 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                <div className="relative">
                                                    <div className={`absolute -inset-4 bg-gradient-to-r ${type.gradient} rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity`}></div>
                                                    <div className="relative text-5xl mb-4 group-hover:scale-110 transition-transform">
                                                        {type.icon}
                                                    </div>
                                                </div>
                                                <div className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${type.gradient})` }}>
                                                    {type.name}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className={`h-2 flex-1 bg-gray-200 rounded-full overflow-hidden`}>
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${progress.skills[type.key]}%` }}
                                                            transition={{ duration: 1, delay: 0.3 + (index * 0.1) }}
                                                            className={`h-full bg-gradient-to-r ${type.gradient}`}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-bold text-gray-600">
                                                        {progress.skills[type.key]}%
                                                    </span>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Task Preview */}
                    {sessionState === 'select' && selectedType && (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <div className="glass-card rounded-3xl p-10 shadow-depth text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', duration: 0.6 }}
                                    className="text-8xl mb-6"
                                >
                                    {selectedSkill?.icon}
                                </motion.div>

                                <h2 className={`text-4xl font-black mb-4 bg-gradient-to-r ${selectedSkill?.gradient} bg-clip-text text-transparent`}>
                                    {selectedSkill?.name} Practice
                                </h2>

                                <div className="inline-block glass-card-dark text-white px-6 py-3 rounded-full font-bold mb-8">
                                    ⏱️ {sessionDuration} minutes
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="glass-card p-8 rounded-2xl mb-8 border-2 border-white/30"
                                >
                                    <h3 className="font-bold text-gray-700 mb-3 text-lg">Today's Task:</h3>
                                    <p className="text-xl text-gray-800 font-medium leading-relaxed">{task}</p>
                                </motion.div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setSelectedType(null)}
                                        className="btn-secondary px-8 py-4 rounded-2xl font-bold text-lg"
                                    >
                                        ← Back
                                    </button>
                                    <button
                                        onClick={handleStartSession}
                                        className="btn-gradient-warm flex-1 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl"
                                    >
                                        Start Session →
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Active Session */}
                    {sessionState === 'active' && (
                        <motion.div
                            key="active"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <div className="glass-card rounded-3xl p-10 shadow-depth text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>

                                <div className="relative z-10">
                                    <div className="mb-10">
                                        <div className="inline-block relative">
                                            <svg width="280" height="280" className="transform -rotate-90">
                                                <defs>
                                                    <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                        <stop offset="0%" stopColor="#667eea" />
                                                        <stop offset="50%" stopColor="#764ba2" />
                                                        <stop offset="100%" stopColor="#f093fb" />
                                                    </linearGradient>
                                                    <filter id="glowTimer">
                                                        <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                                                        <feMerge>
                                                            <feMergeNode in="coloredBlur" />
                                                            <feMergeNode in="SourceGraphic" />
                                                        </feMerge>
                                                    </filter>
                                                </defs>
                                                <circle
                                                    cx="140"
                                                    cy="140"
                                                    r="120"
                                                    stroke="#E5E7EB"
                                                    strokeWidth="20"
                                                    fill="none"
                                                />
                                                <motion.circle
                                                    cx="140"
                                                    cy="140"
                                                    r="120"
                                                    stroke="url(#timerGradient)"
                                                    strokeWidth="20"
                                                    fill="none"
                                                    strokeDasharray={754}
                                                    strokeDashoffset={754 - (754 * getProgressPercentage()) / 100}
                                                    strokeLinecap="round"
                                                    filter="url(#glowTimer)"
                                                    animate={{
                                                        strokeDashoffset: 754 - (754 * getProgressPercentage()) / 100,
                                                    }}
                                                    transition={{ duration: 1 }}
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <motion.div
                                                    key={timeLeft}
                                                    initial={{ scale: 1.1 }}
                                                    animate={{ scale: 1 }}
                                                    className="text-7xl font-black gradient-text mb-2"
                                                >
                                                    {formatTime(timeLeft)}
                                                </motion.div>
                                                <div className="text-sm text-gray-600 font-semibold">remaining</div>
                                            </div>
                                        </div>
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="glass-card p-6 rounded-2xl mb-8 border-2 border-white/30"
                                    >
                                        <h3 className="font-bold text-gray-700 mb-3 flex items-center justify-center gap-2">
                                            <span className="text-2xl">{selectedSkill?.icon}</span>
                                            <span>Focus on:</span>
                                        </h3>
                                        <p className="text-lg text-gray-800 font-medium">{task}</p>
                                    </motion.div>

                                    <button
                                        onClick={handleCompleteSession}
                                        className="btn-success w-full px-8 py-5 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all"
                                    >
                                        ✓ Mark as Complete
                                    </button>

                                    <p className="text-sm text-gray-600 mt-4 font-medium">
                                        Complete when you finish the task or time runs out
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Completion */}
                    {sessionState === 'complete' && (
                        <motion.div
                            key="complete"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <div className="glass-card rounded-3xl p-10 shadow-depth text-center overflow-hidden relative">
                                {/* Celebration particles */}
                                <div className="absolute inset-0 pointer-events-none">
                                    {[...Array(30)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute text-4xl"
                                            initial={{
                                                x: '50%',
                                                y: '50%',
                                                opacity: 1,
                                                scale: 0,
                                            }}
                                            animate={{
                                                x: `${Math.random() * 100}%`,
                                                y: `${Math.random() * 100}%`,
                                                opacity: 0,
                                                scale: 1.5,
                                                rotate: Math.random() * 360,
                                            }}
                                            transition={{
                                                duration: 2,
                                                delay: i * 0.03,
                                                ease: 'easeOut',
                                            }}
                                        >
                                            {['🎉', '⭐', '✨', '🎊', '🌟', '💫'][Math.floor(Math.random() * 6)]}
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: 'spring', duration: 0.8 }}
                                    className="text-9xl mb-8"
                                >
                                    🎉
                                </motion.div>

                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-5xl font-black mb-4 gradient-text"
                                >
                                    Session Complete!
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-xl text-gray-700 mb-10 font-medium"
                                >
                                    {isRecovery
                                        ? '🔓 Progress unlocked! You\'re back on track.'
                                        : '✨ Great work! Your progress has been updated.'}
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    className="glass-card p-8 rounded-2xl mb-8 border-2 border-success/30 bg-gradient-to-br from-success/10 to-green-400/10"
                                >
                                    <div className="grid grid-cols-2 gap-8">
                                        <div>
                                            <div className="text-sm text-gray-600 mb-2 font-semibold">Skill Practiced</div>
                                            <div className={`text-3xl font-black bg-gradient-to-r ${selectedSkill?.gradient} bg-clip-text text-transparent flex items-center justify-center gap-3`}>
                                                <span className="text-4xl">{selectedSkill?.icon}</span>
                                                <span>{selectedSkill?.name}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600 mb-2 font-semibold">Time Invested</div>
                                            <div className="text-4xl font-black gradient-text-warm">
                                                {Math.ceil((sessionDuration * 60 - timeLeft) / 60)} min
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.button
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.9 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate('/home')}
                                    className="btn-gradient-warm w-full px-8 py-5 rounded-2xl font-bold text-xl shadow-xl"
                                >
                                    🏠 Back to Dashboard
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
