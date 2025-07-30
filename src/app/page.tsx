'use client';

import FinishScreen from '@/components/finish-screen';
import GameScreen from '@/components/game/game-screen';
import StartScreen from '@/components/start-screen';
import useGameLogic from '@/hooks/useGameLogic';
import { useCallback, useMemo } from 'react';

enum GamePhase {
  START = 'start',
  PLAYING = 'playing',
  FINISHED = 'finished',
}

export default function Home() {
  const {
    gameState,
    resetGame,
    selectAnswer,
    getCurrentQuestion,
    startGame,
  } = useGameLogic();

  const gamePhase = useMemo((): GamePhase => {
    if (gameState.isGameWon || gameState.isGameOver) {
      return GamePhase.FINISHED;
    }

    if (gameState.isGameStarted) {
      return GamePhase.PLAYING;
    }

    return GamePhase.START;
  }, [gameState]);

  const handleStartGame = useCallback(() => {
    resetGame();
    startGame();
  }, [resetGame, startGame]);

  const renderStartScreen = () => (
    <StartScreen handleStartGame={handleStartGame} />
  );

  const renderGameScreen = () => (
    <GameScreen
      gameState={gameState}
      selectAnswer={selectAnswer}
      getCurrentQuestion={getCurrentQuestion}
    />
  );

  const renderFinishScreen = () => (
    <FinishScreen
      earnedMoney={gameState.score}
      handleStartGame={handleStartGame}
    />
  );

  switch (gamePhase) {
    case GamePhase.FINISHED:
      return renderFinishScreen();

    case GamePhase.PLAYING:
      return renderGameScreen();

    case GamePhase.START:
    default:
      return renderStartScreen();
  }
}
