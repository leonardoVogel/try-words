import React, { Dispatch, SetStateAction } from 'react';

export interface IWordLineProps {
  line: string,
  word: string[],
  setWord: Dispatch<React.SetStateAction<string[]>>
  isActive: boolean;
  currentFocus: number;
  setCurrentFocus: Dispatch<React.SetStateAction<number>>;
}

export interface ILineList {
  id: string,
  status: string,
  isActive: boolean,
}

export interface ITryObject {
  letter: string,
  state: string,
}

export interface IGameObject {
  lineList: ILineList[],
  tries: ITryObject[][],
  wrongLetters: string[],
  gameResult: string,
}

export interface TryWordContext {
  validateTry: () => void;
  gameInfo: IGameObject;
  setGameInfo: Dispatch<SetStateAction<IGameObject>>;
  currentTry: string[];
  setCurrentTry: Dispatch<SetStateAction<string[]>>;
  setRandomSolution: () => void;
  currentRound: number;
  handlePressKeyDown: (event: KeyboardEvent) => void;
}
