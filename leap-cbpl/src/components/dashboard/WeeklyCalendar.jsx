import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../shared/Card';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const WeeklyCalendar = ({ currentWeek, user }) => {
    if (!user) return null;

    const { weekStart, sessions } = currentWeek;
    const { weeklyCommitment } = user;

    const getWeekDays = () => {
        const start = new Date(weekStart);
        const days = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(start);
            date.setDate(date.getDate() + i);
            days.push(date);
        }
        return days;
    };

    const weekDays = getWeekDays();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const hasSessionOnDate = (date) => {
        return sessions.some(session => {
            const sessionDate = new Date(session.timestamp);
            sessionDate.setHours(0, 0, 0, 0);
            return sessionDate.getTime() === date.getTime();
        });
    };

    const getDayStatus = (date) => {
        const dateTime = date.getTime();
        const todayTime = today.getTime();

        if (hasSessionOnDate(date)) return 'completed';
        if (dateTime === todayTime) return 'today';
        if (dateTime < todayTime) return 'missed';
        return 'upcoming';
    };

    const getDateNumber = (index) => {
        return weekDays[index].getDate();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-3xl p-8 shadow-depth border-2 border-primary/10"
        >
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                        <svg className="w-7 h-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">This Week</h3>
                </div>
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                    {weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
            </div>

            <div className="grid grid-cols-7 gap-3">
                {DAYS.map((day, index) => {
                    const status = getDayStatus(weekDays[index]);
                    const dateNum = getDateNumber(index);

                    return (
                        <motion.div
                            key={day}
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.05 * index, type: 'spring', damping: 15 }}
                            whileHover={{ scale: 1.08, y: -4 }}
                            className="relative group"
                        >
                            <div
                                className={`
                  relative aspect-square rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer
                  ${status === 'completed'
                                        ? 'bg-gradient-to-br from-success to-green-400 text-white shadow-glow-success'
                                        : status === 'today'
                                            ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-glow ring-2 ring-primary/30'
                                            : status === 'missed'
                                                ? 'bg-gray-100 text-gray-400'
                                                : 'bg-gray-50 text-gray-600 border-2 border-dashed border-gray-200 hover:border-gray-300'
                                    }
                `}
                            >
                                <div className="text-xs font-bold opacity-80 uppercase tracking-wide">{day}</div>
                                <div className="text-2xl font-black">{dateNum}</div>

                                {status === 'completed' && (
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: 'spring', delay: 0.1 * index, damping: 10 }}
                                        className="absolute -top-2 -right-2 bg-white text-success w-7 h-7 rounded-full flex items-center justify-center shadow-lg ring-2 ring-success/20"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </motion.div>
                                )}

                                {status === 'today' && (
                                    <>
                                        <motion.div
                                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg"
                                            animate={{ y: [0, -6, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                        />
                                        <motion.div
                                            className="absolute inset-0 rounded-2xl"
                                            animate={{
                                                boxShadow: [
                                                    '0 0 0 0 rgba(99, 102, 241, 0.4)',
                                                    '0 0 0 8px rgba(99, 102, 241, 0)',
                                                ]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </>
                                )}

                                {/* Hover tooltip */}
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <div className="px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap shadow-lg">
                                        {status === 'completed' ? 'Completed' : status === 'today' ? 'Today' : status === 'missed' ? 'Missed' : 'Upcoming'}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex items-center justify-center gap-6 text-xs"
            >
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gradient-to-br from-success to-green-400 shadow-sm"></div>
                    <span className="text-gray-600 font-medium">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gradient-to-br from-primary to-secondary shadow-sm"></div>
                    <span className="text-gray-600 font-medium">Today</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gray-100 border-2 border-dashed border-gray-300"></div>
                    <span className="text-gray-600 font-medium">Upcoming</span>
                </div>
            </motion.div>
        </motion.div>
    );
};
