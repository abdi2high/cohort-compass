import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Save, Timer as TimerIcon, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface StudyTimerProps {
  onSessionComplete: (minutes: number) => void;
}

export function StudyTimer({ onSessionComplete }: StudyTimerProps) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'study' | 'break'>('study');

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setIsActive(false);
          clearInterval(interval);
          handleFinish();
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const handleFinish = () => {
    const sessionMins = mode === 'study' ? 25 : 5;
    if (mode === 'study') {
      onSessionComplete(sessionMins);
      toast.success('Session Complete! You earned points.', {
        description: `You've completed a ${sessionMins} minute study session.`,
        icon: <Trophy className="w-4 h-4 text-yellow-500" />
      });
      setMode('break');
      setMinutes(5);
    } else {
      toast.info('Break Over! Time to focus.');
      setMode('study');
      setMinutes(25);
    }
    setSeconds(0);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(mode === 'study' ? 25 : 5);
    setSeconds(0);
  };

  const formatTime = (m: number, s: number) => {
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = ((mode === 'study' ? 25 : 5) * 60 - (minutes * 60 + seconds)) / ((mode === 'study' ? 25 : 5) * 60) * 100;

  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-700">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Focus Timer</h1>
        <p className="text-muted-foreground">Use the Pomodoro technique to study effectively.</p>
      </div>

      <Card className="w-full max-w-md overflow-hidden relative">
        <div 
          className="absolute top-0 left-0 h-1 bg-primary transition-all duration-1000" 
          style={{ width: `${progress}%` }} 
        />
        <CardHeader className="text-center border-b">
          <div className="flex justify-center gap-4 mb-2">
            <button 
              onClick={() => { setMode('study'); resetTimer(); }}
              className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${mode === 'study' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
            >
              STUDY
            </button>
            <button 
              onClick={() => { setMode('break'); resetTimer(); }}
              className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${mode === 'break' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
            >
              BREAK
            </button>
          </div>
          <CardTitle className="text-7xl font-mono tabular-nums tracking-tighter">
            {formatTime(minutes, seconds)}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex items-center justify-center gap-6">
            <Button 
              size="icon" 
              variant="outline" 
              className="w-16 h-16 rounded-full"
              onClick={resetTimer}
            >
              <RotateCcw className="w-6 h-6" />
            </Button>
            <Button 
              size="icon" 
              className="w-20 h-20 rounded-full shadow-lg shadow-primary/20"
              onClick={() => setIsActive(!isActive)}
            >
              {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </Button>
            <Button 
              size="icon" 
              variant="outline" 
              className="w-16 h-16 rounded-full"
              onClick={handleFinish}
            >
              <Save className="w-6 h-6" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600">
              <TimerIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Daily Streak</p>
              <p className="text-2xl font-bold">5 Days</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Total Focus Time</p>
              <p className="text-2xl font-bold">12h 45m</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-md text-center text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
        "The secret of getting ahead is getting started." — Mark Twain
      </div>
    </div>
  );
}
