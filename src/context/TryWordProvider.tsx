import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { IGameObject } from '../utils/types';
import tryWordContext from './tryWordContext';
import { game } from '../utils/constants';
import { WORD_LIST } from '../utils/wordList';

export function TryWordProvider({ children }: { children: React.ReactNode }) {
  const [gameInfo, setGameInfo] = useState<IGameObject>(game);
  const [currentTry, setCurrentTry] = useState<string[]>([]);
  const [solution, setSolution] = useState<string>('');
  const [currentRound, setCurrentRound] = useState<number>(0);

  // const resetGame = () => {
  //   setGameInfo(game);
  //   setCurrentTry([]);
  //   setSolution('');
  //   setCurrentRound(0);
  // };

  const gameWin = () => {
    // toast.success('You win!');
    setGameInfo({ ...gameInfo, gameResult: 'win' });
  };

  const gameLose = () => {
    toast.error(`You lose! Correct answer: ${solution}`);
  };

  const nextRound = () => {
    setCurrentRound((prevRound) => prevRound + 1);
    setCurrentTry([]);
  };

  const setRandomSolution = () => {
    const randomSolutionIndex = Math.floor(Math.random() * WORD_LIST.length);
    setSolution(WORD_LIST[randomSolutionIndex]);
  };

  const checkTry = () => {
    console.log(solution);
    const solutionArray = solution.split('');

    const newTry = currentTry.map((letter, index) => {
      const feedbackReturn = { letter, state: '' };
      const letterUp = letter.toUpperCase();

      if (letterUp === solutionArray[index]) {
        feedbackReturn.state = 'right';
      } else if (solutionArray.includes(letterUp)) {
        feedbackReturn.state = 'displaced';
      } else {
        feedbackReturn.state = 'wrong';
      }
      return feedbackReturn;
    });

    setGameInfo({ ...gameInfo, tries: [...gameInfo.tries, newTry] });
    if (newTry.some(({ state }) => state !== 'right') && gameInfo.tries.length < 6) {
      nextRound();
    }
  };

  const setNewTry = () => {
    console.log(currentTry);
    if (currentTry.length !== 5 || currentTry.includes('')) {
      toast.error('Apenas palavras com 5 caracteres');
      return;
    }
    if (!WORD_LIST.includes(currentTry.join('').toUpperCase())) {
      toast.error('Tente alguma palavra válida');
      return;
    }

    checkTry();
  };

  useEffect(() => {
    const lastTry = gameInfo.tries.at(-1);
    const isCorrect = lastTry?.every(({ state }) => state === 'right');

    if (isCorrect) gameWin();
    if (gameInfo.tries.length === 6) gameLose();
  }, [gameInfo.tries]);

  useEffect(() => {
    const newRoundLineList = gameInfo.lineList.map(({ id, status, isActive }) => {
      const newLine = {
        id, status, isActive, word: ['', '', '', '', ''],
      };
      if (+id < currentRound) {
        newLine.status = 'answered';
        newLine.isActive = false;
      }
      if (+id === currentRound) {
        newLine.status = 'active';
        newLine.isActive = true;
      }
      return newLine;
    });
    setGameInfo({ ...gameInfo, lineList: newRoundLineList });
  }, [currentRound]);

  const handlePressKeyDown = ({ key }: { key: string }) => {
    if (key === 'Enter') setNewTry();
  };

  const handleKeyboardClick = ({ target }: any) => {
    console.log(target.value);
  };

  const value = React.useMemo(() => ({
    setNewTry,
    gameInfo,
    setGameInfo,
    currentTry,
    setCurrentTry,
    setRandomSolution,
    currentRound,
    handlePressKeyDown,
    handleKeyboardClick,
  }), [
    solution,
    setNewTry,
    gameInfo,
    setGameInfo,
    currentTry,
    setCurrentTry,
    setRandomSolution,
    currentRound,
    handlePressKeyDown,
    handleKeyboardClick,
  ]);

  return (
    <tryWordContext.Provider
      value={value}
    >
      {children}
    </tryWordContext.Provider>
  );
}
