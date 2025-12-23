import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { NameInput } from './components/NameInput';
import { HeaderGreeting } from './components/HeaderGreeting';
import { Quiz } from './components/Quiz';
import { ResultLoader } from './components/ResultLoader';
import { ResultScreen } from './components/ResultScreen';
import { WishForm } from './components/WishForm';
import { WishesWall } from './components/WishesWall';
import { Snowfall } from './components/Snowfall';
import { MusicToggle } from './components/MusicToggle';
import { ChristmasVibe } from './types';
import { vibeResults } from './data/quizData';

type AppScreen =
  | 'name-entry'
  | 'quiz'
  | 'loading'
  | 'result'
  | 'wish-form'
  | 'wishes-wall';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('name-entry');
  const [userName, setUserName] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<ChristmasVibe[]>([]);
  const [userVibe, setUserVibe] = useState<ChristmasVibe | null>(null);

  useEffect(() => {
    const savedName = localStorage.getItem('christmas-app-name');
    if (savedName) {
      setUserName(savedName);
      setCurrentScreen('quiz');
    }
  }, []);

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    localStorage.setItem('christmas-app-name', name);
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = (answers: ChristmasVibe[]) => {
    setQuizAnswers(answers);
    setCurrentScreen('loading');
  };

  const handleLoadingComplete = () => {
    const vibeCount: Record<ChristmasVibe, number> = {
      'Cozy Christmas': 0,
      'Party Christmas': 0,
      'Nostalgic Christmas': 0,
      'Quiet Christmas': 0,
    };

    quizAnswers.forEach((answer) => {
      vibeCount[answer]++;
    });

    const dominantVibe = (
      Object.entries(vibeCount) as [ChristmasVibe, number][]
    ).reduce((a, b) => (b[1] > a[1] ? b : a))[0];

    setUserVibe(dominantVibe);
    setCurrentScreen('result');
  };

  const handleMakeWish = () => {
    setCurrentScreen('wish-form');
  };

  const handleWishSubmit = () => {
    setCurrentScreen('wishes-wall');
  };

  const handleBackHome = () => {
    setCurrentScreen('quiz');
  };

  return (
    <>
      <Snowfall />
      <MusicToggle />

      {/* {userName && currentScreen !== 'name-entry' && (
        <HeaderGreeting name={userName} />
      )}

      <AnimatePresence mode="wait">
        {currentScreen === 'name-entry' && (
          <NameInput onSubmit={handleNameSubmit} />
        )}

        {currentScreen === 'quiz' && (
          <Quiz onComplete={handleQuizComplete} />
        )}

        {currentScreen === 'loading' && (
          <ResultLoader onComplete={handleLoadingComplete} />
        )}

        {currentScreen === 'result' && userVibe && (
          <ResultScreen
            result={vibeResults[userVibe]}
            onMakeWish={handleMakeWish}
          />
        )}

        {currentScreen === 'wish-form' && (
          <WishForm onSubmit={handleWishSubmit} />
        )}

        {currentScreen === 'wishes-wall' && (
          <WishesWall onBackHome={handleBackHome} />
        )}
      </AnimatePresence> */}
    </>
  );
}

export default App;
