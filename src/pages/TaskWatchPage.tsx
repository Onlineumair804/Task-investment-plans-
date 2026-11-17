import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, CheckSquare, Play, Pause, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

export const TaskWatchPage: React.FC = () => {
  const { currentUser, tasks, submitTask, setActiveRoute } = useApp();
  
  const assignedTasks = currentUser && currentUser.activeVipPlanId 
    ? tasks.filter(t => t.vipPlanId === currentUser.activeVipPlanId)
    : tasks.slice(0, 3); // fallback demo tasks

  const [selectedTask, setSelectedTask] = useState(assignedTasks[0] || tasks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const requiredTime = 30; // 30 seconds watch requirement
  const [isCompleted, setIsCompleted] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Watch timer effect with pause on unfocus / pause
  useEffect(() => {
    let interval: any = null;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPlaying(false);
        if (videoRef.current) videoRef.current.pause();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (isPlaying && !isCompleted) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev >= requiredTime) {
            setIsCompleted(true);
            setIsPlaying(false);
            return requiredTime;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying, isCompleted]);

  const handlePlayToggle = () => {
    if (isCompleted) return;
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (videoRef.current) {
      if (nextState) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleSubmitTaskReward = () => {
    if (!selectedTask) return;
    const res = submitTask(selectedTask.id, timerSeconds);
    setStatusMessage(res.message);
    if (res.success) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 py-12 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <button 
          onClick={() => setActiveRoute('my-tasks')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Tasks</span>
        </button>

        <div className="bg-[#111827] border border-slate-800 p-8 rounded-3xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">{selectedTask?.vipPlanId.toUpperCase()} Task System</span>
              <h1 className="text-2xl font-black text-white mt-1">{selectedTask?.title}</h1>
            </div>
            <div className="bg-[#070A12] border border-slate-800 px-4 py-2 rounded-xl text-right shrink-0">
              <span className="text-[10px] text-slate-400 block uppercase">Reward</span>
              <span className="font-mono font-bold text-emerald-400 text-base">+${selectedTask?.rewardAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Video Player & Timer Box */}
          <div className="space-y-4">
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
              <video 
                ref={videoRef}
                src={selectedTask?.mediaUrl}
                loop
                playsInline
                className="w-full h-full object-cover"
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
              />

              {!isPlaying && !isCompleted && (
                <button 
                  onClick={handlePlayToggle}
                  className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 group transition-all"
                >
                  <div className="w-16 h-16 rounded-full bg-amber-500 text-[#0B0F19] flex items-center justify-center shadow-xl shadow-amber-500/30 group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-[#0B0F19] ml-1" />
                  </div>
                  <span className="text-xs font-bold text-white tracking-widest uppercase">Click to Start Watch Timer</span>
                </button>
              )}
            </div>

            {/* Timer Progress Bar */}
            <div className="bg-[#070A12] border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold ${isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  {timerSeconds}s
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">Watch Progress ({timerSeconds} / {requiredTime}s)</span>
                  <span className="text-[11px] text-slate-400">Timer pauses automatically if video is paused or tab is switched.</span>
                </div>
              </div>

              <div className="w-full sm:w-48 bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-400 h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (timerSeconds / requiredTime) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-[#070A12] border border-slate-800 p-6 rounded-2xl space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider">Task Instructions</h4>
            <p className="text-slate-300 whitespace-pre-line">{selectedTask?.instructions}</p>
          </div>

          {statusMessage && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-400 text-center font-semibold">
              {statusMessage}
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button 
              disabled={!isCompleted}
              onClick={handleSubmitTaskReward}
              className={`px-8 py-3.5 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 ${isCompleted ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#0B0F19] hover:from-amber-300 shadow-amber-500/20 cursor-pointer' : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'}`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isCompleted ? 'Claim Task Reward' : `Complete ${requiredTime - timerSeconds}s More to Claim`}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
