import './GameResult.css';

interface GameResultProps {
  winner: string | null;
  players: string[];
  onRestart: () => void;
}

export function GameResult({ winner, players, onRestart }: GameResultProps) {
  return (
    <div className="result-screen">
      <div className="result-card">
        <div className="coffee-icon">☕</div>
        {winner ? (
          <>
            <h2 className="result-title">축하합니다! 🎉</h2>
            <div className="winner-section">
              <p className="winner-label">승자</p>
              <p className="winner-name">{winner}</p>
            </div>
            <div className="coffee-message">
              <p className="message-text">
                오늘의 커피값은 <strong>{winner}</strong>님이 쏩니다!
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="result-title">무승부</h2>
            <div className="coffee-message">
              <p className="message-text">
                다시 한 번 도전해보세요!
              </p>
            </div>
          </>
        )}
        <div className="players-list">
          <p className="players-label">참가자</p>
          <div className="players-tags">
            {players.map((player) => (
              <span
                key={player}
                className={`player-tag ${player === winner ? 'winner' : ''}`}
              >
                {player}
              </span>
            ))}
          </div>
        </div>
        <button className="restart-button" onClick={onRestart}>
          다시 하기
        </button>
      </div>
    </div>
  );
}
