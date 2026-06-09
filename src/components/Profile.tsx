import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Trophy, Settings, Mail, Bell, Shield, BookOpen } from 'lucide-react';
import { User as UserType } from '@/hooks/use-study-data';

interface ProfileProps {
  user: UserType;
}

export function Profile({ user }: ProfileProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-card p-8 rounded-2xl border shadow-sm">
        <div className="relative">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-32 h-32 rounded-2xl object-cover shadow-xl border-4 border-background" 
          />
          <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
            LVL {user.level}
          </div>
        </div>
        <div className="flex-1 text-center md:text-left space-y-2">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2">
            <Mail className="w-4 h-4" />
            {user.name.toLowerCase().replace(' ', '.')}@university.edu
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
            <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              Computer Science
            </div>
            <div className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 text-xs font-semibold flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              {user.points} Points
            </div>
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Settings className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Study Goals
          </h3>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Daily Goal (minutes)</label>
                <div className="flex gap-2">
                  <Input defaultValue={user.goals.daily} type="number" />
                  <Button variant="secondary">Update</Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Weekly Goal (minutes)</label>
                <div className="flex gap-2">
                  <Input defaultValue={user.goals.weekly} type="number" />
                  <Button variant="secondary">Update</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-xl font-bold flex items-center gap-2 pt-4">
            <Trophy className="w-5 h-5" />
            Unlocked Badges
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {['Early Bird', 'Consistency King', 'Night Owl', 'Social Butterfly'].map((badge, i) => (
              <Card key={i} className={`p-4 text-center border-2 ${i < 2 ? 'border-primary/20 bg-primary/5' : 'opacity-50 grayscale'}`}>
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                  <Trophy className={`w-6 h-6 ${i < 2 ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <p className="font-semibold text-sm">{badge}</p>
                <p className="text-[10px] text-muted-foreground">{i < 2 ? 'Earned on Feb 24' : 'Locked'}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications & Privacy
          </h3>
          <Card>
            <CardContent className="p-0">
              {[
                { label: 'Push Notifications', icon: Bell, default: true },
                { label: 'Public Profile', icon: User, default: true },
                { label: 'Share Progress', icon: Shield, default: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <div className={`w-10 h-5 rounded-full p-1 cursor-pointer transition-colors ${item.default ? 'bg-primary' : 'bg-muted'}`}>
                    <div className={`w-3 h-3 bg-white rounded-full transition-transform ${item.default ? 'translate-x-5' : 'translate-x-0'}`} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="bg-muted/30 p-6 rounded-2xl border border-dashed text-center space-y-2">
            <p className="font-semibold">Upgrade to Premium</p>
            <p className="text-xs text-muted-foreground">Unlock advanced analytics, unlimited groups, and ad-free experience.</p>
            <Button size="sm" className="mt-2 w-full">Learn More</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
