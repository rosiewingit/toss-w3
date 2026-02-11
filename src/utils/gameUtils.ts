/**
 * 게임 유틸리티 함수들
 */

/**
 * 랜덤 숫자 생성 (min ~ max 포함)
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 배열에서 랜덤 요소 선택
 */
export function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * 배열 셔플 (Fisher-Yates 알고리즘)
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * 딜레이 함수 (ms)
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 점수 정렬 (내림차순)
 */
export function sortByScore(
  players: string[],
  scores: Record<string, number>
): string[] {
  return [...players].sort((a, b) => {
    const scoreA = scores[a] ?? 0;
    const scoreB = scores[b] ?? 0;
    return scoreB - scoreA;
  });
}

/**
 * 승자 결정 (가장 높은 점수)
 */
export function determineWinner(
  players: string[],
  scores: Record<string, number>
): string | null {
  if (players.length === 0) return null;

  const sorted = sortByScore(players, scores);
  const topScore = scores[sorted[0]] ?? 0;
  const winners = sorted.filter((p) => (scores[p] ?? 0) === topScore);

  // 동점자가 있으면 null 반환 (무승부)
  return winners.length === 1 ? winners[0] : null;
}

/**
 * 숫자 포맷팅 (천 단위 구분)
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('ko-KR');
}

/**
 * 시간 포맷팅 (초를 mm:ss 형식으로)
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * 퍼센트 계산
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}
