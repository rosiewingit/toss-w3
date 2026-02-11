# Toss 템플릿 체크리스트 가이드

이 프로젝트는 Apps-in-Toss 플랫폼에서 미니앱을 출시하기 위한 템플릿입니다. 배포 전 반드시 모든 체크리스트를 통과해야 합니다.

## 📋 필수 체크리스트

### 1. 자동 검증 실행

프로젝트 루트에서 다음 명령어를 실행하여 자동 검증을 수행하세요:

```bash
npm run check:guidelines
# 또는
yarn check:guidelines
```

### 2. 수동 체크리스트 확인

자동 검증 후, 다음 문서를 열어 수동으로 확인해야 하는 항목들을 체크하세요:

- **[TOSS_UI_UX_CHECKLIST.md](./TOSS_UI_UX_CHECKLIST.md)**: UI/UX 가이드라인 체크리스트
- **[APPS_IN_TOSS_NON_GAME_POLICY.md](./APPS_IN_TOSS_NON_GAME_POLICY.md)**: 비게임 출시 정책
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**: 배포 가이드

## ✅ 배포 전 확인 사항

### 필수 항목 (모두 통과해야 함)

1. **자동 검증 통과**
   - `npm run check:guidelines` 실행 시 모든 필수 항목 통과

2. **TDS 사용**
   - `@toss/tds-mobile` 패키지 설치 확인
   - 실제 TDS 컴포넌트 사용 확인
   - 샌드박스 앱에서 테스트 완료

3. **UX 라이팅**
   - 모든 문구가 해요체로 작성
   - 능동형 문장 사용
   - 긍정적 표현 사용

4. **접근성**
   - 색상 대비 WCAG 2.0 AA 준수
   - 포커스 가능한 요소 확인
   - 스크린리더 대응

5. **모바일 최적화**
   - viewport 설정 확인
   - 터치 영역 최소 44x44px
   - 반응형 디자인 확인

6. **테스트**
   - 샌드박스 앱에서 모든 기능 테스트
   - 다양한 디바이스에서 테스트

## 🚀 배포 프로세스

1. **개발 완료**
   ```bash
   npm run build
   ```

2. **체크리스트 검증**
   ```bash
   npm run check:guidelines
   ```

3. **수동 체크리스트 확인**
   - TOSS_UI_UX_CHECKLIST.md 파일 열기
   - 모든 항목 체크

4. **배포**
   ```bash
   npm run deploy
   ```

## 📚 참고 자료

- [앱인토스 개발자센터](https://developers-apps-in-toss.toss.im/)
- [TDS Mobile 가이드](https://tossmini-docs.toss.im/tds-mobile/)
- [UX 라이팅 가이드](https://developers-apps-in-toss.toss.im/design/ux-writing.html)
- [배포 가이드](./DEPLOYMENT_GUIDE.md)

---

**중요**: 모든 체크리스트를 통과하지 않으면 배포가 거부될 수 있습니다.
