import { useState } from 'react';
import './PlayerInput.css';

interface PlayerInputProps {
  players: string[];
  onAddPlayer: (name: string) => void;
  onRemovePlayer: (name: string) => void;
}

export function PlayerInput({
  players,
  onAddPlayer,
  onRemovePlayer,
}: PlayerInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAddPlayer = () => {
    const trimmedName = inputValue.trim();
    if (trimmedName && !players.includes(trimmedName)) {
      onAddPlayer(trimmedName);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddPlayer();
    }
  };

  return (
    <div className="player-input-container">
      <div className="input-section">
        <input
          type="text"
          className="player-input"
          placeholder="참가자 이름 입력"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          maxLength={10}
        />
        <button
          className="add-button"
          onClick={handleAddPlayer}
          disabled={!inputValue.trim() || players.includes(inputValue.trim())}
        >
          추가
        </button>
      </div>
      <div className="players-section">
        <p className="players-count">
          참가자 ({players.length}명)
        </p>
        {players.length > 0 && (
          <div className="players-list">
            {players.map((player) => (
              <div key={player} className="player-item">
                <span className="player-name">{player}</span>
                <button
                  className="remove-button"
                  onClick={() => onRemovePlayer(player)}
                  aria-label={`${player} 제거`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        {players.length === 0 && (
          <p className="empty-message">참가자를 추가해주세요 (최소 2명)</p>
        )}
      </div>
    </div>
  );
}
