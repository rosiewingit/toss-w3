# Apps-in-Toss 비게임 출시 정책 (System Prompt)

이 문서는 Toss의 Apps-in-Toss 플랫폼에서 비게임 미니앱을 출시하기 위해 반드시 준수해야 하는 정책과 가이드라인을 정리한 것입니다. 개발 시 이 정책을 엄격히 준수해야 합니다.

## 1. 필수 요구사항

### 1.1 TDS (Toss Design System) 사용 필수

**모든 비게임 WebView 미니앱은 TDS 사용이 필수이며, 이는 검수 승인 기준에 포함됩니다.**

#### 패키지 설치

- `@apps-in-toss/web-framework` 버전에 따라 다른 패키지를 사용해야 합니다:
  - **버전 < 1.0.0**: `@toss-design-system/mobile`
  - **버전 >= 1.0.0**: `@toss/tds-mobile` (현재 권장)

#### 설치 방법

```bash
# npm 사용 시
npm install @toss/tds-mobile

# yarn 사용 시
yarn add @toss/tds-mobile
```

#### 참고 자료

- TDS 상세 가이드: https://tossmini-docs.toss.im/tds-mobile/
- WebView TDS 문서: https://developers-apps-in-toss.toss.im/tutorials/webview.html

#### 테스트 주의사항

- **로컬 브라우저에서는 TDS가 동작하지 않습니다.**
- 반드시 **샌드박스 앱을 통한 테스트**가 필수입니다.
- 샌드박스 앱 설치: https://developers-apps-in-toss.toss.im/development/test/sandbox.html

### 1.2 WebView 설정

#### granite.config.ts 설정

비게임 미니앱의 경우 `webViewProps.type`을 `"partner"`로 설정해야 합니다:

```typescript
import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  appName: "your-app-name",
  webViewProps: {
    type: "partner", // 비게임 미니앱은 "partner" 사용
  },
  // ... 기타 설정
});
```

**참고**: 
- `"partner"`: 파트너사 콘텐츠에 사용하는 기본 웹뷰 (비게임 기본값)
- `"game"`: 전체 화면을 사용하는 게임 콘텐츠용

### 1.3 브릿지뷰 설정 (Deprecated)

**주의**: 브릿지뷰 기능은 2024년 12월 18일 SDK v1.6.2부터 제거되었습니다.

- `bridgeColorMode` 설정은 더 이상 사용되지 않습니다.
- 기존 코드에서 `bridgeColorMode` 설정이 있다면 제거해야 합니다.

## 2. 출시 가능한 비게임 서비스

다음과 같은 카테고리의 비게임 서비스 출시가 가능합니다:

- 스포츠
- 생산성 도구
- 날씨
- 쇼핑
- 일정 관리
- 웹툰
- 습관 만들기
- 용돈 관리
- 식물 키우기
- 반려동물 관련 서비스
- 기타 비금융 서비스

## 3. 출시 제한 서비스 (금지)

다음 서비스들은 현재 출시가 **불가능**합니다:

### 3.1 금융 관련 서비스
- **금융상품 중개·판매·광고 서비스**
- **투자자문, 리딩방, 유료정보제공 서비스**

### 3.2 불법/부정행위 관련
- **디지털자산 및 가상자산 관련 서비스**
- **자금세탁 가능성이 있는 서비스**
- **불법 또는 부정행위를 조장하는 서비스**

### 3.3 사행성 관련
- **사행성 및 복권/베팅성 콘텐츠 포함 서비스**

### 3.4 소셜/만남 관련
- **소셜·만남·데이팅 플랫폼 서비스**

### 3.5 기타
- **이외 내부정책상 승인 불가 서비스**

## 4. 사업자등록증 관련 정책

### 4.1 사업자등록증 없이 출시 가능 (2024년 12월 1일부터)

**사업자등록증 없이도 미니앱을 출시할 수 있습니다.**

#### 제한사항

다만, 다음 기능들은 사업자등록증 및 관련 약관 동의가 필요합니다:
- **수익화 기능** (인앱결제, 광고 등)
- **토스 로그인 기능**

#### 출시 가능한 기능

사업자등록증 없이도 다음 기능들은 사용 가능합니다:
- 기본 미니앱 기능
- 공유 리워드 (2024년 11월 17일부터 비게임도 사용 가능)
- 기타 기본 기능

## 5. 공유 리워드 기능 (비게임 지원)

### 5.1 비게임 공유 리워드 확장 (2024년 11월 17일)

**공유 리워드 기능이 게임뿐만 아니라 비게임도 사용 가능하도록 확장되었습니다.**

이를 통해 모든 미니앱이 **초대 → 신규 유입 → 재공유**로 이어지는 바이럴 구조를 쉽게 구축할 수 있습니다.

### 5.2 참고 자료

- 공유 리워드 가이드: https://developers-apps-in-toss.toss.im/reward/intro.html

## 6. 검수 승인 기준

### 6.1 필수 검수 항목

1. **TDS 사용 여부**: 모든 비게임 WebView 미니앱은 TDS를 사용해야 합니다.
2. **WebView 타입 설정**: `webViewProps.type`이 올바르게 설정되어 있는지 확인
3. **금지 서비스 여부**: 출시 제한 서비스에 해당하지 않는지 확인
4. **기능별 약관 동의**: 수익화 기능 사용 시 관련 약관 동의 완료 여부

### 6.2 샌드박스 테스트 필수

- 로컬 브라우저에서는 TDS가 동작하지 않으므로 반드시 샌드박스 앱을 통한 테스트가 필요합니다.
- 샌드박스 앱: https://developers-apps-in-toss.toss.im/development/test/sandbox.html

## 7. 개발 가이드

### 7.1 프로젝트 설정 체크리스트

- [ ] `@toss/tds-mobile` 패키지 설치 완료
- [ ] `granite.config.ts`에서 `webViewProps.type: "partner"` 설정
- [ ] TDS 컴포넌트를 사용하여 UI 구성
- [ ] 샌드박스 앱을 통한 테스트 완료
- [ ] 금지 서비스에 해당하지 않는지 확인
- [ ] 수익화 기능 사용 시 사업자등록증 및 약관 동의 완료

### 7.2 참고 문서

- **앱인토스 개발자센터**: https://developers-apps-in-toss.toss.im/
- **WebView 개발 가이드**: https://developers-apps-in-toss.toss.im/tutorials/webview.html
- **TDS Mobile 가이드**: https://tossmini-docs.toss.im/tds-mobile/
- **릴리즈 노트**: https://developers-apps-in-toss.toss.im/release-note.html
- **콘솔 가이드**: https://developers-apps-in-toss.toss.im/prepare/console-workspace.html

## 8. 주요 변경 이력

### 2024년 12월 18일
- 브릿지뷰 기능 제거 (SDK v1.6.2)
- `bridgeColorMode` 설정 더 이상 사용 불가

### 2024년 12월 1일
- 사업자등록증 없이도 미니앱 출시 가능 (수익화 기능 제외)

### 2024년 11월 17일
- 공유 리워드 기능이 비게임에도 확장

## 9. 주의사항

1. **TDS 사용은 필수입니다**: 검수 승인 기준에 포함되므로 반드시 사용해야 합니다.
2. **로컬 브라우저 테스트 불가**: TDS는 샌드박스 앱에서만 동작합니다.
3. **WebView 타입 설정**: 비게임은 반드시 `"partner"` 타입을 사용해야 합니다.
4. **금지 서비스 확인**: 출시 전 반드시 금지 서비스 목록을 확인하세요.
5. **최신 문서 확인**: 정책은 변경될 수 있으므로 최신 문서를 확인하세요.

## 10. 문의 및 지원

- **개발자 커뮤니티**: https://techchat-apps-in-toss.toss.im/
- **앱인토스 블로그**: https://toss.im/apps-in-toss/blog
- **콘솔**: https://apps-in-toss.toss.im/

---

**마지막 업데이트**: 2025년 1월 27일  
**문서 버전**: 1.0.0
