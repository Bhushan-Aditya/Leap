import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    // User profile state
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('cbpl_user');
        return saved ? JSON.parse(saved) : null;
    });

    // Progress state
    const [progress, setProgress] = useState(() => {
        const saved = localStorage.getItem('cbpl_progress');
        return saved ? JSON.parse(saved) : {
            readinessScore: 0,
            bandPrediction: 0,
            skills: {
                reading: 0,
                writing: 0,
                listening: 0,
                speaking: 0
            },
            isFrozen: false,
            lastUnlock: null
        };
    });

    // Current week sessions
    const [currentWeek, setCurrentWeek] = useState(() => {
        const saved = localStorage.getItem('cbpl_current_week');
        return saved ? JSON.parse(saved) : {
            weekStart: getWeekStart(),
            sessions: [],
            daysCompleted: 0,
            hoursCompleted: 0
        };
    });

    // Save to localStorage whenever state changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('cbpl_user', JSON.stringify(user));
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem('cbpl_progress', JSON.stringify(progress));
    }, [progress]);

    useEffect(() => {
        localStorage.setItem('cbpl_current_week', JSON.stringify(currentWeek));
    }, [currentWeek]);

    // Helper function to get week start (Monday)
    function getWeekStart() {
        const now = new Date();
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1);
        const monday = new Date(now.setDate(diff));
        monday.setHours(0, 0, 0, 0);
        return monday.toISOString();
    }

    // Check if we need to reset the week
    useEffect(() => {
        const weekStart = new Date(currentWeek.weekStart);
        const now = new Date();
        const daysSinceWeekStart = Math.floor((now - weekStart) / (1000 * 60 * 60 * 24));

        if (daysSinceWeekStart >= 7) {
            // New week, reset
            setCurrentWeek({
                weekStart: getWeekStart(),
                sessions: [],
                daysCompleted: 0,
                hoursCompleted: 0
            });
        }
    }, [currentWeek.weekStart]);

    const completeOnboarding = (userData) => {
        const newUser = {
            ...userData,
            currentBand: 5.0, // Starting band
            createdAt: new Date().toISOString()
        };
        setUser(newUser);

        // Initialize progress
        setProgress({
            readinessScore: 20,
            bandPrediction: 5.0,
            skills: {
                reading: 25,
                writing: 15,
                listening: 20,
                speaking: 15
            },
            isFrozen: false,
            lastUnlock: new Date().toISOString()
        });
    };

    const completeSession = (sessionData) => {
        const today = new Date().toISOString().split('T')[0];
        const existingSessionToday = currentWeek.sessions.find(s =>
            s.date.split('T')[0] === today
        );

        let newSessions = [...currentWeek.sessions];
        let newDaysCompleted = currentWeek.daysCompleted;

        if (!existingSessionToday) {
            newDaysCompleted += 1;
        }

        newSessions.push({
            ...sessionData,
            date: new Date().toISOString()
        });

        const newHoursCompleted = currentWeek.hoursCompleted + (sessionData.duration / 60);

        setCurrentWeek({
            ...currentWeek,
            sessions: newSessions,
            daysCompleted: newDaysCompleted,
            hoursCompleted: parseFloat(newHoursCompleted.toFixed(2))
        });

        // Unlock progress
        if (progress.isFrozen) {
            setProgress({
                ...progress,
                isFrozen: false,
                lastUnlock: new Date().toISOString()
            });
        } else {
            // Increase progress
            updateProgress(sessionData.type);
        }
    };

    const updateProgress = (skillType) => {
        const increment = Math.floor(Math.random() * 3) + 2; // 2-4 points

        setProgress(prev => {
            const newSkills = { ...prev.skills };
            newSkills[skillType] = Math.min(100, newSkills[skillType] + increment);

            const avgSkill = Object.values(newSkills).reduce((a, b) => a + b, 0) / 4;
            const newReadiness = Math.min(100, Math.floor(avgSkill * 0.8 + prev.readinessScore * 0.2));
            const newBandPrediction = Math.min(9.0, 4.0 + (avgSkill / 100) * 5);

            return {
                ...prev,
                skills: newSkills,
                readinessScore: newReadiness,
                bandPrediction: parseFloat(newBandPrediction.toFixed(1)),
                lastUnlock: new Date().toISOString()
            };
        });
    };

    const freezeProgress = () => {
        setProgress(prev => ({
            ...prev,
            isFrozen: true
        }));
    };

    const resetApp = () => {
        localStorage.removeItem('cbpl_user');
        localStorage.removeItem('cbpl_progress');
        localStorage.removeItem('cbpl_current_week');
        setUser(null);
        setProgress({
            readinessScore: 0,
            bandPrediction: 0,
            skills: { reading: 0, writing: 0, listening: 0, speaking: 0 },
            isFrozen: false,
            lastUnlock: null
        });
        setCurrentWeek({
            weekStart: getWeekStart(),
            sessions: [],
            daysCompleted: 0,
            hoursCompleted: 0
        });
    };

    const value = {
        user,
        progress,
        currentWeek,
        completeOnboarding,
        completeSession,
        freezeProgress,
        resetApp
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
