import { useState } from 'react';
import { DeviceViewport } from './components/DeviceViewport';
import { GameResult } from './components/GameResult';
import { PlayerInput } from './components/PlayerInput';
import { useGameState } from './hooks/useGameState';
import type { GameStatus } from './types/game';

function App() {
  const [gameStatus, setGameStatus] = useState<GameStatus>('waiting');
  const gameState = useGameState();

  const handleStartGame = () => {
    setGameStatus('playing');
    gameState.startGame();
  };

  const handleEndGame = (winner: string | null) => {
    setGameStatus('finished');
    gameState.setWinner(winner);
  };

  const handleRestart = () => {
    setGameStatus('waiting');
    gameState.resetGame();
  };

  return (
    <>
      <DeviceViewport />
      <div className="app-container">
        {gameStatus === 'waiting' && (
          <div className="start-screen">
            <h1 className="title">☕ 커피값 내기 게임</h1>
            <p className="subtitle">게임을 시작하고 승자를 결정하세요!</p>
            <PlayerInput
              players={gameState.players}
              onAddPlayer={gameState.addPlayer}
              onRemovePlayer={gameState.removePlayer}
            />
            <button
              className="start-button"
              onClick={handleStartGame}
              disabled={gameState.players.length < 2}
            >
              게임 시작
            </button>
          </div>
        )}

        {gameStatus === 'playing' && (
          <div className="game-screen">
            <h2 className="game-title">게임 진행 중...</h2>
            <p className="game-instruction">
              여기에 각 주차별 게임 로직을 구현하세요!
            </p>
            <button
              className="end-button"
              onClick={() => handleEndGame('승자 이름')}
            >
              게임 종료 (테스트용)
            </button>
          </div>
        )}

        {gameStatus === 'finished' && (
          <GameResult
            winner={gameState.winner}
            players={gameState.players}
            onRestart={handleRestart}
          />
        )}
      </div>
    </>
  );
}

export default App;
