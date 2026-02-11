# 커피값 내기 게임 템플릿 ☕

직장인들의 점심 커피값 내기를 위한 미니 게임 시리즈 템플릿입니다.  
이 템플릿을 기반으로 매주 새로운 게임을 만들어보세요!

## 📋 목차

- [템플릿 구조](#템플릿-구조)
- [시작하기](#시작하기)
- [주차별 게임 아이디어](#주차별-게임-아이디어)
- [개발 가이드](#개발-가이드)

## 🏗️ 템플릿 구조

```
toss-w1/
├── package.json
├── tsconfig.json
├── granite.config.ts
├── index.html
├── .gitignore
├── README.md
└── src/
    ├── index.tsx          # 진입점
    ├── App.tsx            # 메인 앱 컴포넌트
    ├── index.css          # 전역 스타일
    ├── components/        # 재사용 가능한 컴포넌트
    │   ├── GameResult.tsx      # 게임 결과 표시
    │   ├── PlayerInput.tsx     # 참가자 입력
    │   └── DeviceViewport.tsx  # 디바이스 뷰포트 설정
    ├── hooks/             # 커스텀 훅
    │   └── useGameState.ts     # 게임 상태 관리
    ├── utils/             # 유틸리티 함수
    │   └── gameUtils.ts        # 게임 로직 유틸
    └── types/             # TypeScript 타입 정의
        └── game.ts
```

## 🚀 시작하기

### 1. 패키지 설치

```bash
yarn install
```

### 2. 개발 서버 실행

```bash
yarn dev
```

개발 서버가 실행되면 브라우저에서 `http://localhost:3000`으로 접속할 수 있습니다.

### 3. 빌드

```bash
yarn build
```

### 4. 배포

```bash
yarn deploy
```

## 🎮 주차별 게임 아이디어

### 1주차: 가위바위보 (Rock Paper Scissors) ✂️✋✊

**게임 설명**
- 간단한 가위바위보 게임
- 3판 2선승제 또는 1판 승부
- 승자/패자 결과 화면

**구현 포인트**
- 각 플레이어가 가위/바위/보 중 선택
- 컴퓨터 또는 다른 플레이어와 대전
- 승부 결과에 따라 승자 결정

**컴포넌트 예시**
```tsx
// src/components/RockPaperScissors.tsx
// 가위바위보 선택 버튼, 결과 표시
```

---

### 2주차: 룰렛 돌리기 (Coffee Roulette) 🎡

**게임 설명**
- 룰렛을 돌려서 당첨자 선택
- 참가자 이름 입력 기능
- 애니메이션 효과

**구현 포인트**
- 원형 룰렛 UI
- 회전 애니메이션
- 랜덤으로 당첨자 선택

**컴포넌트 예시**
```tsx
// src/components/Roulette.tsx
// 룰렛 회전 애니메이션, 당첨자 표시
```

---

### 3주차: 숫자 맞추기 (Number Guessing) 🔢

**게임 설명**
- 1-100 사이 숫자 맞추기
- 가장 가까운 사람이 승리
- 또는 정확히 맞춘 사람이 승리

**구현 포인트**
- 랜덤 숫자 생성
- 각 플레이어의 추측 입력
- 가장 가까운 값 비교

**컴포넌트 예시**
```tsx
// src/components/NumberGuessing.tsx
// 숫자 입력, 힌트 표시, 결과 비교
```

---

### 4주차: 타이핑 게임 (Typing Speed) ⌨️

**게임 설명**
- 주어진 문장을 빠르게 타이핑
- 가장 빠른 사람이 승리
- 오타율도 고려

**구현 포인트**
- 랜덤 문장 생성
- 타이핑 속도 측정
- 정확도 계산

**컴포넌트 예시**
```tsx
// src/components/TypingGame.tsx
// 문장 표시, 입력 필드, 타이머, 정확도 표시
```

---

### 5주차: 리액션 게임 (Reaction Time) ⚡

**게임 설명**
- 화면이 변할 때 빠르게 터치
- 평균 반응속도 측정
- 가장 빠른 사람이 승리

**구현 포인트**
- 랜덤 타이밍에 화면 색상 변경
- 터치 시간 측정
- 평균 반응속도 계산

**컴포넌트 예시**
```tsx
// src/components/ReactionGame.tsx
// 화면 색상 변경, 타이머, 반응속도 표시
```

---

### 6주차: 메모리 게임 (Memory Match) 🧠

**게임 설명**
- 카드 뒤집기 게임
- 짝 맞추기
- 가장 적은 시도로 완료한 사람이 승리

**구현 포인트**
- 카드 그리드 생성
- 카드 뒤집기 애니메이션
- 시도 횟수 카운트

**컴포넌트 예시**
```tsx
// src/components/MemoryGame.tsx
// 카드 그리드, 카드 뒤집기, 매칭 로직
```

---

### 7주차: 퀴즈 게임 (Quick Quiz) ❓

**게임 설명**
- 간단한 퀴즈 문제
- 가장 많이 맞춘 사람이 승리
- 시간 제한

**구현 포인트**
- 퀴즈 문제 데이터
- 정답 선택
- 점수 집계

**컴포넌트 예시**
```tsx
// src/components/QuizGame.tsx
// 문제 표시, 선택지, 타이머, 점수 표시
```

---

### 8주차: 밸런스 게임 (Balance Challenge) ⚖️

**게임 설명**
- 화면을 기울여서 공을 목표에 도달
- 가장 빠르게 완료한 사람이 승리

**구현 포인트**
- 디바이스 기울기 감지 (DeviceMotion API)
- 공 물리 시뮬레이션
- 목표 도달 시간 측정

**컴포넌트 예시**
```tsx
// src/components/BalanceGame.tsx
// 기울기 감지, 공 애니메이션, 목표 표시
```

## 📖 개발 가이드

### 게임 추가하기

1. **새 게임 컴포넌트 생성**
   ```tsx
   // src/components/YourGame.tsx
   import { useGameState } from '../hooks/useGameState';
   
   export function YourGame() {
     const gameState = useGameState();
     // 게임 로직 구현
   }
   ```

2. **App.tsx에 게임 통합**
   ```tsx
   import { YourGame } from './components/YourGame';
   
   // playing 상태일 때 YourGame 컴포넌트 렌더링
   ```

3. **게임 결과 처리**
   ```tsx
   // 게임 종료 시 승자 설정
   gameState.setWinner('승자 이름');
   // 또는 점수 기반으로 승자 결정
   const winner = determineWinner(players, scores);
   gameState.setWinner(winner);
   ```

### 상태 관리

`useGameState` 훅을 사용하여 게임 상태를 관리합니다:

```tsx
const {
  players,        // 참가자 목록
  winner,         // 승자
  scores,         // 점수 기록
  addPlayer,      // 참가자 추가
  removePlayer,   // 참가자 제거
  startGame,      // 게임 시작
  setWinner,      // 승자 설정
  setScore,       // 점수 설정
  resetGame,      // 게임 리셋
} = useGameState();
```

### 유틸리티 함수 활용

`src/utils/gameUtils.ts`에 있는 유틸리티 함수들을 활용하세요:

```tsx
import { randomInt, shuffle, determineWinner } from '../utils/gameUtils';

// 랜덤 숫자 생성
const randomNumber = randomInt(1, 100);

// 배열 셔플
const shuffledPlayers = shuffle(players);

// 승자 결정
const winner = determineWinner(players, scores);
```

### 스타일링

커피 테마 색상을 CSS 변수로 정의해두었습니다:

```css
--color-coffee-dark: #3E2723;
--color-coffee: #8B4513;
--color-coffee-light: #A0522D;
--color-cream: #F5E6D3;
--color-cream-light: #FFF8F0;
--color-milk: #FFFBF5;
```

## 📌 참고사항

- [WebView 개발하기](https://developers-apps-in-toss.toss.im/tutorials/webview.html)
- [apps-in-toss-examples](https://github.com/toss/apps-in-toss-examples) 참고
- 각 주차별 게임은 독립적으로 개발 가능합니다
- 공통 컴포넌트(`GameResult`, `PlayerInput`)는 재사용 가능합니다

## ✅ 배포 전 체크리스트

배포 전 반드시 다음 체크리스트를 확인하세요:

### 1. 자동 검증 실행

```bash
yarn check:guidelines
# 또는
npm run check:guidelines
```

### 2. 수동 체크리스트 확인

자동 검증 후, 다음 문서를 열어 수동으로 확인해야 하는 항목들을 체크하세요:

- **[README_CHECKLIST.md](./README_CHECKLIST.md)**: 배포 전 체크리스트 가이드
- **[TOSS_UI_UX_CHECKLIST.md](./TOSS_UI_UX_CHECKLIST.md)**: UI/UX 가이드라인 체크리스트
- **[APPS_IN_TOSS_NON_GAME_POLICY.md](./APPS_IN_TOSS_NON_GAME_POLICY.md)**: 비게임 출시 정책
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**: 배포 가이드

### 3. 주요 확인 사항

- ✅ TDS (Toss Design System) 사용 여부
- ✅ UX 라이팅 (해요체, 능동형 문장, 긍정적 표현)
- ✅ 접근성 (색상 대비, 포커스, 스크린리더)
- ✅ 모바일 최적화 (viewport, 터치 영역, 반응형)
- ✅ 샌드박스 앱을 통한 테스트 완료

**중요**: 모든 체크리스트를 통과하지 않으면 배포가 거부될 수 있습니다.

## 📦 배포

자세한 배포 방법은 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)를 참고하세요.

### 간단한 배포 절차

1. **빌드**
   ```bash
   yarn build
   ```

2. **콘솔에서 업로드**
   - [앱인토스 콘솔](https://apps-in-toss.toss.im/) 접속
   - 앱 출시 → 앱 번들 업로드
   - `.ait` 파일 업로드

3. **테스트 및 검토 요청**
   - QR 코드로 테스트 (최소 1회)
   - 검토 요청

4. **출시**
   - 검수 승인 후 출시

## 🎨 디자인 가이드

- **커피 테마**: 브라운, 베이지 계열 색상 사용
- **모바일 최적화**: 터치 친화적인 UI/UX
- **간단하고 직관적**: 복잡한 규칙보다는 즉시 이해 가능한 게임
- **재미있는 애니메이션**: 게임의 재미를 높이는 부드러운 애니메이션

## 📝 라이선스

이 템플릿은 apps-in-toss-examples를 참고하여 제작되었습니다.
