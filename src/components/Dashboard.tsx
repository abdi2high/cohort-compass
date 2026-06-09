import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Flame, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User, StudySession } from '@/hooks/use-study-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  user: User;
  sessions: StudySession[];
  setActiveTab: (tab: string) => void;
}

export function Dashboard({ user, sessions, setActiveTab }: DashboardProps) {
  // Calculate stats
  const totalMinutes = sessions.reduce((acc, s) => acc + s.duration, 0);
  const dailyProgress = Math.min((totalMinutes / user.goals.daily) * 100, 100);
  
  // Mock data for chart
  const chartData = [
    { name: 'Mon', hours: 2.5 },
    { name: 'Tue', hours: 3.2 },
    { name: 'Wed', hours: 1.8 },
    { name: 'Thu', hours: 4.5 },
    { name: 'Fri', hours: sessions.length > 0 ? (sessions[0].duration / 60).toFixed(1) : 0 },
    { name: 'Sat', hours: 0 },
    { name: 'Sun', hours: 0 },
  ];

  const stats = [
    { label: 'Total Points', value: user.points, icon: Trophy, color: 'text-yellow-500' },
    { label: 'Study Streak', value: `${user.streak} days`, icon: Flame, color: 'text-orange-500' },
    { label: 'Total Hours', value: (totalMinutes / 60).toFixed(1), icon: Clock, color: 'text-blue-500' },
    { label: 'Courses', value: '4', icon: BookOpen, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}! 👋</h1>
          <p className="text-muted-foreground text-lg">You've studied for {totalMinutes} minutes this week. Keep it up!</p>
        </div>
        <Button onClick={() => setActiveTab('timer')} className="gap-2">
          <Clock className="w-4 h-4" />
          Start Study Session
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Goal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{Math.round(dailyProgress)}%</span>
              </div>
              <Progress value={dailyProgress} className="h-3" />
            </div>
            <p className="text-sm text-muted-foreground">
              {totalMinutes >= user.goals.daily 
                ? "🎉 You've reached your daily goal! Great job." 
                : `Study for ${user.goals.daily - totalMinutes} more minutes to reach your goal.`}
            </p>
            
            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                Recent Badges
              </h4>
              <div className="flex flex-wrap gap-2">
                {user.badges.map((badge, i) => (
                  <div key={i} className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold">Upcoming Sessions</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('groups')} className="text-primary hover:text-primary underline">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: 'Today, 2:00 PM', title: 'Advanced Calculus', icon: BookOpen },
                { time: 'Tomorrow, 10:00 AM', title: 'Chemistry Review', icon: BookOpen },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                  <Button size="sm" variant="outline">Remind Me</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold">Recommended Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Sarah Chen', subject: 'Mathematics', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/023fbf4f-9cdf-45c8-bcf0-75197d2238f0/avatar-1-dda0c656-1780919488283.webp' },
                { name: 'Alex Rivera', subject: 'Physics', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/023fbf4f-9cdf-45c8-bcf0-75197d2238f0/avatar-2-a80ac662-1780919490019.webp' },
              ].map((partner, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <img src={partner.image} alt={partner.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{partner.name}</p>
                    <p className="text-xs text-muted-foreground">{partner.subject}</p>
                  </div>
                  <Button size="sm">Connect</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
