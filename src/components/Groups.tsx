import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Search, Plus, MessageSquare, Book, MoreVertical } from 'lucide-react';
import { Group } from '@/hooks/use-study-data';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';

interface GroupsProps {
  groups: Group[];
  onCreateGroup: (group: Omit<Group, 'id' | 'members'>) => void;
  onJoinGroup: (id: string) => void;
}

export function Groups({ groups, onCreateGroup, onJoinGroup }: GroupsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupSubject, setNewGroupSubject] = useState('Math');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const filteredGroups = groups.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    g.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study Groups</h1>
          <p className="text-muted-foreground">Join or create groups to study with others.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search groups..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Study Group</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Group Name</label>
                  <Input 
                    placeholder="e.g. Physics Midterm Study" 
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <select 
                    className="w-full border rounded-md px-3 py-2 bg-background"
                    value={newGroupSubject}
                    onChange={(e) => setNewGroupSubject(e.target.value)}
                  >
                    <option>Math</option>
                    <option>Science</option>
                    <option>English</option>
                    <option>History</option>
                    <option>Art</option>
                  </select>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => {
                    onCreateGroup({
                      name: newGroupName,
                      subject: newGroupSubject,
                      description: 'A new collaborative study group.',
                      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60'
                    });
                    setNewGroupName('');
                  }}
                  disabled={!newGroupName.trim()}
                >
                  Create Group
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="relative h-48 rounded-2xl overflow-hidden mb-8">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/023fbf4f-9cdf-45c8-bcf0-75197d2238f0/groups-banner-388a1b2b-1780919489489.webp" 
          alt="Groups Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center p-8">
          <div className="text-white">
            <h2 className="text-2xl font-bold">Find your community</h2>
            <p className="text-white/80 max-w-md">Collaborating with others is the best way to learn complex subjects faster.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="h-32 overflow-hidden relative">
              <img 
                src={group.image} 
                alt={group.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-white/90 text-black text-xs font-bold uppercase tracking-wider">
                {group.subject}
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{group.name}</CardTitle>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="w-3.5 h-3.5" />
                {group.members} members
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {group.description}
              </p>
            </CardContent>
            <CardFooter className="pt-2 gap-2">
              <Button className="flex-1 gap-2" variant="outline" onClick={() => setSelectedGroup(group)}>
                <MessageSquare className="w-4 h-4" />
                Discuss
              </Button>
              <Button className="flex-1 gap-2" onClick={() => onJoinGroup(group.id)}>
                Join Group
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedGroup && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl h-[80vh] flex flex-col">
            <CardHeader className="border-b flex flex-row items-center justify-between">
              <div>
                <CardTitle>{selectedGroup.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{selectedGroup.subject} • Study Chat</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedGroup(null)}>
                <Plus className="w-5 h-5 rotate-45" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/30">
              <div className="bg-card p-3 rounded-lg border shadow-sm max-w-[80%]">
                <p className="text-xs font-bold text-primary mb-1">Sarah Chen</p>
                <p className="text-sm">Does anyone have the notes from yesterday's lecture on organic synthesis?</p>
              </div>
              <div className="bg-card p-3 rounded-lg border shadow-sm max-w-[80%] self-end ml-auto bg-primary text-primary-foreground">
                <p className="text-xs font-bold mb-1">You</p>
                <p className="text-sm">I have them! Uploading now to the resources folder.</p>
              </div>
              <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg">
                <Book className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-blue-600 dark:text-blue-400">Notes_Lecture_12.pdf uploaded</span>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <div className="flex items-center gap-2 w-full">
                <Input placeholder="Type a message..." className="flex-1" />
                <Button size="icon"><Plus className="w-5 h-5" /></Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
