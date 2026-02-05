import React from 'react';

export const ProgressBar = ({ value, max = 100, color = 'primary', height = 'h-2', showLabel = false }) => {
    const percentage = Math.min(100, (value / max) * 100);

    const colorClasses = {
        primary: 'bg-primary',
        success: 'bg-success',
        warning: 'bg-warning',
        danger: 'bg-danger',
    };

    return (
        <div className="w-full">
            {showLabel && (
                <div className="flex justify-between mb-1 text-sm text-neutral-600">
                    <span>{value}</span>
                    <span>{max}</span>
                </div>
            )}
            <div className={`w-full bg-neutral-200 rounded-full overflow-hidden ${height}`}>
                <div
                    className={`${colorClasses[color]} ${height} rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};
