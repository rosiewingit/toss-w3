# Apps-in-Toss 배포 가이드

이 문서는 Apps-in-Toss 플랫폼에 미니앱을 배포하는 전체 프로세스를 안내합니다.

## 📋 배포 전 체크리스트

### 1. 필수 검증 실행

```bash
# 체크리스트 자동 검증
npm run check:guidelines

# ESLint 검증
npm run lint

# 빌드 테스트
npm run build
```

### 2. 수동 체크리스트 확인

- [TOSS_UI_UX_CHECKLIST.md](./TOSS_UI_UX_CHECKLIST.md) 파일의 모든 필수 항목 체크
- [APPS_IN_TOSS_NON_GAME_POLICY.md](./APPS_IN_TOSS_NON_GAME_POLICY.md) 정책 준수 확인

### 3. 콘솔 설정 확인

- [ ] 앱인토스 콘솔에 앱이 등록되어 있는가?
- [ ] `granite.config.ts`의 `appName`이 콘솔에 등록한 앱 이름과 일치하는가?
- [ ] 고객센터와 홈페이지 링크가 등록되어 있는가?

---

## 🚀 배포 프로세스

### Step 1: 앱 번들 빌드

```bash
npm run build
# 또는
yarn build
```

**주의사항**:
- 앱 번들은 **압축 해제 기준 100MB 이하**만 업로드 가능
- 대용량 리소스(이미지, 사운드, 영상)는 외부 스토리지나 CDN 사용 권장
- 빌드 결과물은 `dist` 폴더에 생성됩니다

### Step 2: 앱 번들 업로드

#### 방법 1: 콘솔에서 업로드 (권장)

1. [앱인토스 콘솔](https://apps-in-toss.toss.im/) 접속
2. 워크스페이스 선택 → 앱 선택
3. 좌측 메뉴에서 **"앱 출시"** 선택
4. **"앱 번들 업로드"** 버튼 클릭
5. `.ait` 파일 선택하여 업로드

업로드 완료 후:
- 테스트용 QR 코드 자동 생성
- 앱 스킴 자동 생성 (`intoss-private://{appName}`)

#### 방법 2: CLI를 통한 배포

```bash
# API 키 발급 후 (콘솔에서 발급)
npx ait deploy --api-key {API 키}

# 또는 토큰 등록 후
npx ait token add
npx ait deploy
```

### Step 3: 테스트

**중요**: 검토 요청 전 반드시 테스트를 완료해야 합니다.

1. **QR 코드 테스트**
   - 콘솔에서 생성된 QR 코드를 스캔
   - 토스앱에서 정상 동작 확인

2. **스킴 테스트**
   - `intoss-private://{appName}` 스킴으로 테스트
   - 샌드박스 앱에서도 테스트 가능

3. **테스트 항목**
   - [ ] 모든 주요 기능 정상 동작
   - [ ] 에러 처리 확인
   - [ ] 로딩 상태 확인
   - [ ] 사용자 플로우 확인
   - [ ] 다양한 디바이스에서 테스트 (iOS, Android)

**⚠️ 테스트 환경과 실제 환경 차이**:
- CORS 정책 및 네트워크 동작이 다를 수 있음
- Origin 허용 목록에 다음 도메인 등록 필요:
  - 실제 서비스: `https://{appName}.apps.tossmini.com`
  - QR 테스트: `https://{appName}.private-apps.tossmini.com`

### Step 4: 검토 요청

1. 콘솔의 **"검토 요청하기"** 버튼 클릭
2. 검토는 **영업일 기준 최대 3일** 소요
3. **테스트를 1회 이상 완료한 경우에만** 검토 요청 버튼 활성화

**검토 가이드 확인**:
- [비게임 검수 가이드](https://developers-apps-in-toss.toss.im/checklist/app-nongame.html)
- [게임 검수 가이드](https://developers-apps-in-toss.toss.im/checklist/app-game.html)

### Step 5: 검토 결과 확인

#### 승인된 경우
- 검수 결과가 이메일로 안내됩니다
- 콘솔에서 **"출시하기"** 버튼 클릭하여 출시

#### 반려된 경우
1. **"반려사유 보기"** 버튼 클릭하여 사유 확인
2. 문제 해결 후 새로운 번들 업로드
3. 다시 검토 요청

문의: [채널톡](https://apps-in-toss.channel.io/workflows/787658)

### Step 6: 출시

1. 검수 승인 후 콘솔에서 **"출시하기"** 버튼 클릭
2. 출시 즉시 전체 사용자에게 반영됩니다
3. 충분히 테스트한 후 출시하세요

---

## 📦 업데이트 배포

### 새 버전 배포

1. 코드 수정 및 테스트 완료
2. `npm run build` 실행
3. 새로운 `.ait` 파일 업로드
4. 검토 요청 → 승인 → 출시

### 이전 버전으로 롤백

1. 콘솔의 **"앱 출시"** 메뉴에서 버전 목록 확인
2. 롤백할 버전 선택
3. **"출시하기"** 버튼 클릭

**⚠️ 주의**: 롤백도 즉시 사용자에게 반영됩니다.

---

## 🔍 출시 후 모니터링

출시 직후 다음 항목을 모니터링하세요:

- [ ] 주요 오류 로그 및 크래시 로그
- [ ] [Sentry 모니터링](https://developers-apps-in-toss.toss.im/learn-more/sentry-monitoring.html) 설정
- [ ] API 응답 지연/실패율
- [ ] 사용자 피드백 (내비게이션바의 '신고하기' 기능)
- [ ] 외부 리소스/CDN 로딩 지연 또는 실패

---

## 🆘 긴급 상황 대응

앱 실행에 심각한 오류가 발생한 경우:

1. **[채널톡](https://apps-in-toss.channel.io/workflows/787658)으로 즉시 문의**
2. 긴급 상황에서는 신속히 대응합니다
3. 필요 시 이전 버전으로 롤백

---

## 📚 참고 자료

- [앱인토스 개발자센터](https://developers-apps-in-toss.toss.im/)
- [미니앱 출시 가이드](https://developers-apps-in-toss.toss.im/development/deploy.html)
- [비게임 검수 가이드](https://developers-apps-in-toss.toss.im/checklist/app-nongame.html)
- [게임 검수 가이드](https://developers-apps-in-toss.toss.im/checklist/app-game.html)
- [콘솔 가이드](https://developers-apps-in-toss.toss.im/prepare/console-workspace.html)

---

## ✅ 배포 체크리스트 요약

### 배포 전
- [ ] `npm run check:guidelines` 통과
- [ ] `npm run lint` 통과
- [ ] `npm run build` 성공
- [ ] TOSS_UI_UX_CHECKLIST.md 모든 필수 항목 체크
- [ ] 콘솔에 앱 등록 완료
- [ ] `appName` 일치 확인

### 배포 중
- [ ] 앱 번들 업로드 완료
- [ ] QR 코드로 테스트 완료 (최소 1회)
- [ ] 검토 요청 완료

### 배포 후
- [ ] 검수 결과 확인
- [ ] 출시 완료
- [ ] 모니터링 설정

---

**마지막 업데이트**: 2025년 1월 27일
