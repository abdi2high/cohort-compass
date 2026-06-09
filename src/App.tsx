import React, { useState } from 'react';
import { useStudyData } from '@/hooks/use-study-data';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { Groups } from '@/components/Groups';
import { StudyTimer } from '@/components/StudyTimer';
import { Quiz } from '@/components/Quiz';
import { Profile } from '@/components/Profile';
import { Landing } from '@/components/Landing';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

function App() {
  const { user, groups, sessions, login, logout, addSession, createGroup, joinGroup } = useStudyData();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!user) {
    return (
      <ThemeProvider defaultTheme="light" attribute="class">
        <Landing onLogin={login} />
        <Toaster position="top-center" />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={logout} 
        />
        
        <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden">
          <div className="max-w-7xl mx-auto p-4 md:p-8">
            {activeTab === 'dashboard' && (
              <Dashboard 
                user={user} 
                sessions={sessions} 
                setActiveTab={setActiveTab} 
              />
            )}
            
            {activeTab === 'groups' && (
              <Groups 
                groups={groups} 
                onCreateGroup={createGroup} 
                onJoinGroup={joinGroup} 
              />
            )}
            
            {activeTab === 'timer' && (
              <StudyTimer 
                onSessionComplete={(minutes) => addSession({ duration: minutes, startTime: new Date().toISOString() })} 
              />
            )}
            
            {activeTab === 'quizzes' && (
              <Quiz />
            )}
            
            {activeTab === 'leaderboard' && (
              <Quiz /> // Reuse Quiz for now as it has leaderboard
            )}
            
            {activeTab === 'profile' && (
              <Profile user={user} />
            )}
          </div>
        </main>
        
        <Toaster position="top-right" richColors />
      </div>
    </ThemeProvider>
  );
}

export default App;
