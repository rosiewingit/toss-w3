/**
 * 게임 상태 타입
 * - waiting: 게임 시작 전 (참가자 입력)
 * - playing: 게임 진행 중
 * - finished: 게임 종료 (결과 표시)
 */
export type GameStatus = 'waiting' | 'playing' | 'finished';

/**
 * 게임 결과 정보
 */
export interface GameResult {
  winner: string | null;
  scores?: Record<string, number>;
  timestamp: number;
}

/**
 * 플레이어 정보
 */
export interface Player {
  id: string;
  name: string;
  score?: number;
}

/**
 * 게임 설정
 */
export interface GameConfig {
  minPlayers: number;
  maxPlayers: number;
  gameType: string;
}
