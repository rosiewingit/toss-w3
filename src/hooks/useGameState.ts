import { useState, useCallback } from 'react';
import type { GameResult } from '../types/game';

interface UseGameStateReturn {
  players: string[];
  winner: string | null;
  scores: Record<string, number>;
  addPlayer: (name: string) => void;
  removePlayer: (name: string) => void;
  startGame: () => void;
  setWinner: (winner: string | null) => void;
  setScore: (player: string, score: number) => void;
  resetGame: () => void;
}

/**
 * 게임 상태 관리 훅
 * 참가자 관리, 점수 관리, 승자 결정 등의 기능을 제공합니다.
 */
export function useGameState(): UseGameStateReturn {
  const [players, setPlayers] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});

  const addPlayer = useCallback((name: string) => {
    setPlayers((prev) => {
      const trimmedName = name.trim();
      if (trimmedName && !prev.includes(trimmedName)) {
        return [...prev, trimmedName];
      }
      return prev;
    });
  }, []);

  const removePlayer = useCallback((name: string) => {
    setPlayers((prev) => prev.filter((p) => p !== name));
    setScores((prev) => {
      const newScores = { ...prev };
      delete newScores[name];
      return newScores;
    });
  }, []);

  const startGame = useCallback(() => {
    // 게임 시작 시 점수 초기화
    setScores({});
    setWinner(null);
  }, []);

  const setScore = useCallback((player: string, score: number) => {
    setScores((prev) => ({
      ...prev,
      [player]: score,
    }));
  }, []);

  const resetGame = useCallback(() => {
    setPlayers([]);
    setWinner(null);
    setScores({});
  }, []);

  return {
    players,
    winner,
    scores,
    addPlayer,
    removePlayer,
    startGame,
    setWinner,
    setScore,
    resetGame,
  };
}
