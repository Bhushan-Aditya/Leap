import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { Button } from '../components/shared/Button';

export default function Onboarding() {
    const navigate = useNavigate();
    const { completeOnboarding } = useApp();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        examDate: '',
        targetBand: 7.0,
        weeklyCommitment: {
            days: 5,
            hours: 10
        }
    });

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            completeOnboarding(formData);
            navigate('/home');
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const isStepValid = () => {
        if (step === 1) return formData.examDate !== '';
        if (step === 2) return formData.targetBand >= 4.0;
        if (step === 3) return formData.weeklyCommitment.days > 0;
        return false;
    };

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);
    const minDateString = minDate.toISOString().split('T')[0];

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 bg-[length:400%_400%] animate-gradient-xy flex items-center justify-center p-4 relative overflow-hidden">
            {/* Floating Particles Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.5, 0.2],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-3xl relative z-10"
            >
                {/* Progress indicator */}
                <div className="mb-8">
                    <div className="flex justify-between mb-3">
                        {[1, 2, 3].map((s) => (
                            <motion.div
                                key={s}
                                className={`flex-1 h-3 rounded-full mx-1 transition-all duration-500 relative overflow-hidden ${s <= step ? 'bg-white shadow-glow' : 'bg-white/20'
                                    }`}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.5, delay: s * 0.1 }}
                            >
                                {s <= step && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                        animate={{ x: ['-100%', '200%'] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                    <p className="text-center text-white/90 text-sm font-medium backdrop-blur-sm">
                        Step {step} of 3 - {step === 1 ? 'Exam Date' : step === 2 ? 'Target Band' : 'Commitment'}
                    </p>
                </div>

                <motion.div
                    className="glass-card rounded-3xl p-8 md:p-12 shadow-depth"
                    layout
                >
                    <AnimatePresence mode="wait">
                        {/* Step 1: Exam Date */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="text-center mb-8">
                                    <motion.div
                                        className="text-7xl mb-4"
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        📅
                                    </motion.div>
                                    <h1 className="text-4xl md:text-5xl font-bold mb-3">
                                        <span className="gradient-text">When's your</span>
                                        <br />
                                        <span className="text-gray-800">IELTS exam?</span>
                                    </h1>
                                    <p className="text-gray-600 text-lg">
                                        We'll create a personalized preparation roadmap
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Select Your Exam Date
                                    </label>
                                    <input
                                        type="date"
                                        min={minDateString}
                                        value={formData.examDate}
                                        onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary focus:outline-none text-lg font-medium transition-all shadow-sm hover:shadow-md"
                                    />
                                </div>

                                {formData.examDate && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="glass-card-dark text-white p-4 rounded-xl text-center mb-6"
                                    >
                                        <p className="text-sm opacity-90">Time to prepare</p>
                                        <p className="text-2xl font-bold mt-1">
                                            {Math.ceil((new Date(formData.examDate) - new Date()) / (1000 * 60 * 60 * 24))} days
                                        </p>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}

                        {/* Step 2: Target Band */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="text-center mb-8">
                                    <motion.div
                                        className="text-7xl mb-4"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        🎯
                                    </motion.div>
                                    <h1 className="text-4xl md:text-5xl font-bold mb-3">
                                        <span className="gradient-text">What's your</span>
                                        <br />
                                        <span className="text-gray-800">target band?</span>
                                    </h1>
                                    <p className="text-gray-600 text-lg">
                                        This helps us tailor your preparation intensity
                                    </p>
                                </div>

                                <div className="mb-10">
                                    <div className="text-center mb-8">
                                        <motion.div
                                            className="inline-block relative"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-3xl blur-2xl opacity-50 animate-pulse-glow"></div>
                                            <div className="relative glass-card px-12 py-10 rounded-3xl">
                                                <motion.div
                                                    key={formData.targetBand}
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    className="text-7xl md:text-8xl font-black gradient-text"
                                                >
                                                    {formData.targetBand.toFixed(1)}
                                                </motion.div>
                                                <div className="text-sm font-medium text-gray-500 mt-2">Target Band Score</div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    <input
                                        type="range"
                                        min="4.0"
                                        max="9.0"
                                        step="0.5"
                                        value={formData.targetBand}
                                        onChange={(e) => setFormData({ ...formData, targetBand: parseFloat(e.target.value) })}
                                        className="w-full cursor-pointer"
                                    />

                                    <div className="flex justify-between text-sm text-gray-500 mt-3 font-medium">
                                        <span>4.0 - Beginner</span>
                                        <span>9.0 - Expert</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Weekly Commitment */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="text-center mb-8">
                                    <motion.div
                                        className="text-7xl mb-4"
                                        animate={{ rotate: [0, -10, 10, 0] }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        💪
                                    </motion.div>
                                    <h1 className="text-4xl md:text-5xl font-bold mb-3">
                                        <span className="gradient-text">Your weekly</span>
                                        <br />
                                        <span className="text-gray-800">commitment</span>
                                    </h1>
                                    <p className="text-gray-600 text-lg">
                                        Consistency matters more than intensity
                                    </p>
                                </div>

                                <div className="space-y-8 mb-8">
                                    <div className="glass-card p-6 rounded-2xl">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700">
                                                    Prep days per week
                                                </label>
                                                <p className="text-xs text-gray-500 mt-1">How many days will you practice?</p>
                                            </div>
                                            <motion.div
                                                key={formData.weeklyCommitment.days}
                                                initial={{ scale: 1.2 }}
                                                animate={{ scale: 1 }}
                                                className="text-4xl font-black gradient-text"
                                            >
                                                {formData.weeklyCommitment.days}
                                            </motion.div>
                                        </div>
                                        <input
                                            type="range"
                                            min="1"
                                            max="7"
                                            value={formData.weeklyCommitment.days}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                weeklyCommitment: { ...formData.weeklyCommitment, days: parseInt(e.target.value) }
                                            })}
                                            className="w-full cursor-pointer"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                                            <span>1 day</span>
                                            <span>7 days</span>
                                        </div>
                                    </div>

                                    <div className="glass-card p-6 rounded-2xl">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700">
                                                    Total hours per week
                                                </label>
                                                <p className="text-xs text-gray-500 mt-1">Your weekly study time goal</p>
                                            </div>
                                            <motion.div
                                                key={formData.weeklyCommitment.hours}
                                                initial={{ scale: 1.2 }}
                                                animate={{ scale: 1 }}
                                                className="text-4xl font-black gradient-text-warm"
                                            >
                                                {formData.weeklyCommitment.hours}
                                            </motion.div>
                                        </div>
                                        <input
                                            type="range"
                                            min="2"
                                            max="20"
                                            value={formData.weeklyCommitment.hours}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                weeklyCommitment: { ...formData.weeklyCommitment, hours: parseInt(e.target.value) }
                                            })}
                                            className="w-full cursor-pointer"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                                            <span>2 hrs</span>
                                            <span>20 hrs</span>
                                        </div>
                                    </div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20 rounded-2xl p-5"
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">💡</span>
                                        <div>
                                            <p className="font-semibold text-gray-800 mb-1">Pro tip</p>
                                            <p className="text-sm text-gray-600">
                                                Start with a commitment you're confident about. Build consistency first, intensity later.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation buttons */}
                    <div className="flex gap-4 mt-10">
                        {step > 1 && (
                            <Button variant="secondary" onClick={handleBack} className="px-8">
                                ← Back
                            </Button>
                        )}
                        <Button
                            variant="primary"
                            onClick={handleNext}
                            disabled={!isStepValid()}
                            className="flex-1 btn-gradient-warm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {step === 3 ? (
                                <>
                                    <span>Start My Journey</span> 🚀
                                </>
                            ) : (
                                <>
                                    Continue <span className="ml-1">→</span>
                                </>
                            )}
                        </Button>
                    </div>
                </motion.div>

                {step === 1 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center text-white/90 text-sm mt-8 backdrop-blur-sm px-4 py-2 rounded-full inline-block mx-auto block"
                    >
                        ✨ Join thousands of students preparing smarter with CBPL
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
}
