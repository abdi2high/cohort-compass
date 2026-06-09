import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Timer, Trophy } from 'lucide-react';

interface LandingProps {
  onLogin: (name: string) => void;
}

export function Landing({ onLogin }: LandingProps) {
  const [name, setName] = React.useState('');

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full text-center space-y-12"
      >
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Study Smarter, <span className="text-primary">Together.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The ultimate collaborative study platform. Join groups, share notes, track progress, and gamify your learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Users, title: 'Study Groups', desc: 'Find partners for any subject.' },
            { icon: Timer, title: 'Session Tracking', desc: 'Monitor your study hours.' },
            { icon: Trophy, title: 'Achievements', desc: 'Earn points and unlock badges.' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (i + 1) }}
              className="p-6 bg-card rounded-xl border shadow-sm"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-card p-8 rounded-2xl border shadow-xl max-w-md mx-auto space-y-4">
          <h2 className="text-2xl font-bold">Ready to start?</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-md border bg-background focus:ring-2 focus:ring-primary outline-none"
            />
            <Button 
              className="w-full h-12 text-lg" 
              disabled={!name.trim()}
              onClick={() => onLogin(name)}
            >
              Join the Community
            </Button>
          </div>
        </div>

        <div className="pt-8">
           <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/023fbf4f-9cdf-45c8-bcf0-75197d2238f0/hero-image-a4e808e6-1780919488358.webp" 
            alt="StudySmarter Hero" 
            className="rounded-2xl shadow-2xl border mx-auto max-w-full h-auto"
            style={{ maxHeight: '400px' }}
          />
        </div>
      </motion.div>
    </div>
  );
}
