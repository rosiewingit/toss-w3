import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'coffee-game-template',
  web: {
    host: 'localhost',
    port: 3000,
    commands: {
      dev: 'vite',
      build: 'vite build',
    },
  },
  permissions: [],
  outdir: 'dist',
  brand: {
    displayName: '커피값 내기 게임',
    icon: 'https://static.toss.im/appsintoss/73/10550764-5ac1-44e2-9ff3-ad78d8d2e71a.png',
    primaryColor: '#8B4513',
    // bridgeColorMode는 2024년 12월 18일 SDK v1.6.2부터 제거됨 (브릿지뷰 기능 제거)
  },
  webViewProps: {
    type: 'partner',
  },
});
