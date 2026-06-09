import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckCircle, XCircle, Trophy, ArrowRight, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_QUIZZES = [
  {
    id: '1',
    title: 'Cell Biology Fundamentals',
    subject: 'Science',
    questions: [
      { question: 'What is the "powerhouse" of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi Apparatus'], correctAnswer: 1 },
      { question: 'Which part of the cell contains genetic material?', options: ['Cytoplasm', 'Cell Membrane', 'Nucleus', 'Vacuole'], correctAnswer: 2 },
    ]
  },
  {
    id: '2',
    title: 'Linear Algebra Review',
    subject: 'Math',
    questions: [
      { question: 'What is a matrix with only one column called?', options: ['Row vector', 'Column vector', 'Square matrix', 'Identity matrix'], correctAnswer: 1 },
    ]
  }
];

export function Quiz() {
  const [activeQuiz, setActiveQuiz] = useState<any | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleStartQuiz = (quiz: any) => {
    setActiveQuiz(quiz);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  const handleAnswer = (index: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(index);
    const correct = index === activeQuiz.questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (currentQuestion < activeQuiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-6 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
          <Trophy className="w-12 h-12 text-yellow-600" />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold">Quiz Completed!</h2>
          <p className="text-muted-foreground text-lg">You scored {score} out of {activeQuiz.questions.length}</p>
        </div>
        <Card className="w-full max-w-sm p-6 bg-primary/5 border-primary/20">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium text-muted-foreground">Points Earned</span>
            <span className="font-bold text-primary">+{score * 10} XP</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-muted-foreground">Accuracy</span>
            <span className="font-bold text-primary">{Math.round((score / activeQuiz.questions.length) * 100)}%</span>
          </div>
        </Card>
        <Button className="gap-2" onClick={() => setActiveQuiz(null)}>
          <RefreshCcw className="w-4 h-4" />
          Back to Quizzes
        </Button>
      </div>
    );
  }

  if (activeQuiz) {
    const question = activeQuiz.questions[currentQuestion];
    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setActiveQuiz(null)}>Cancel</Button>
          <div className="text-sm font-medium">Question {currentQuestion + 1} of {activeQuiz.questions.length}</div>
          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500" 
              style={{ width: `${((currentQuestion + 1) / activeQuiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 p-6">
            {question.options.map((option: string, i: number) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selectedOption !== null}
                className={`
                  p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden
                  ${selectedOption === i 
                    ? (isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20')
                    : 'border-muted hover:border-primary/50 hover:bg-accent'}
                  ${selectedOption !== null && i === question.correctAnswer && !isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''}
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {selectedOption === i && (
                    isCorrect ? <CheckCircle className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  {selectedOption !== null && i === question.correctAnswer && !isCorrect && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quizzes</h1>
          <p className="text-muted-foreground">Test your knowledge and compete with friends.</p>
        </div>
        <Button className="gap-2">
          <BookOpen className="w-4 h-4" />
          Create Quiz
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_QUIZZES.map((quiz) => (
          <Card key={quiz.id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary w-fit mb-2">
                {quiz.subject}
              </div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">{quiz.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  {quiz.questions.length} Questions
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  100 Points
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2" onClick={() => handleStartQuiz(quiz)}>
                Start Quiz
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-card rounded-2xl border p-8">
        <h3 className="text-xl font-bold mb-6">Global Leaderboard</h3>
        <div className="space-y-4">
          {[
            { rank: 1, name: 'Jordan Smith', points: 4250, avatar: 'JS' },
            { rank: 2, name: 'Maria Garcia', points: 3890, avatar: 'MG' },
            { rank: 3, name: 'Kevin Lee', points: 3650, avatar: 'KL' },
          ].map((user) => (
            <div key={user.rank} className="flex items-center gap-4 p-4 rounded-xl hover:bg-accent/50 transition-colors">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                user.rank === 1 ? 'bg-yellow-100 text-yellow-600' : 
                user.rank === 2 ? 'bg-slate-100 text-slate-600' : 
                'bg-orange-100 text-orange-600'
              }`}>
                {user.rank}
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                {user.avatar}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.points} Points earned</p>
              </div>
              <div className="text-sm font-bold">Level {Math.floor(user.points / 1000) + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
