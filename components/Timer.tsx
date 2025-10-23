import React from 'react';

interface TimerProps {
  timeLeft: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  const isLowTime = timeLeft <= 60;

  return (
    <div className={`fixed top-4 right-4 bg-white p-3 rounded-lg shadow-md border-2 z-10 ${isLowTime ? 'border-red-500' : 'border-slate-200'}`}>
      <span className="text-sm text-slate-500">الوقت المتبقي</span>
      <p className={`text-2xl font-bold text-center ${isLowTime ? 'text-red-600 animate-pulse' : 'text-slate-800'}`}>
        {formattedTime}
      </p>
    </div>
  );
};

export default Timer;
