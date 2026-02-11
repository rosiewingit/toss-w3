#!/usr/bin/env node

/**
 * Toss UI/UX 가이드라인 체크리스트 자동 검증 스크립트
 * 
 * 사용법:
 *   node scripts/check-toss-guidelines.js
 *   또는
 *   npm run check:guidelines
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const CHECKLIST_FILE = path.join(PROJECT_ROOT, 'TOSS_UI_UX_CHECKLIST.md');

// 색상 코드
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const BOLD = '\x1b[1m';

// 검증 결과
const results = {
  passed: [],
  failed: [],
  warnings: [],
};

/**
 * 파일 존재 여부 확인
 */
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * 파일 내용 읽기
 */
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    return null;
  }
}

/**
 * JSON 파일 파싱
 */
function parseJSON(filePath) {
  const content = readFile(filePath);
  if (!content) return null;
  try {
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

/**
 * 패키지 확인
 */
function checkPackage(packageName, required = true) {
  const packageJson = parseJSON(path.join(PROJECT_ROOT, 'package.json'));
  if (!packageJson) {
    results.failed.push(`package.json을 읽을 수 없습니다.`);
    return false;
  }

  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const hasPackage = dependencies[packageName] !== undefined;

  if (required && !hasPackage) {
    results.failed.push(`필수 패키지 '${packageName}'가 설치되어 있지 않습니다.`);
    return false;
  } else if (!required && hasPackage) {
    results.passed.push(`패키지 '${packageName}'가 설치되어 있습니다.`);
    return true;
  } else if (hasPackage) {
    results.passed.push(`패키지 '${packageName}'가 설치되어 있습니다.`);
    return true;
  }

  return !required;
}

/**
 * granite.config.ts 확인
 */
function checkGraniteConfig() {
  const configPath = path.join(PROJECT_ROOT, 'granite.config.ts');
  if (!fileExists(configPath)) {
    results.failed.push('granite.config.ts 파일이 없습니다.');
    return false;
  }

  const content = readFile(configPath);
  if (!content) {
    results.failed.push('granite.config.ts 파일을 읽을 수 없습니다.');
    return false;
  }

  // webViewProps.type 확인
  if (content.includes('webViewProps:') && content.includes('type:')) {
    if (content.includes('type: "partner"') || content.includes('type: "game"')) {
      results.passed.push('webViewProps.type이 올바르게 설정되어 있습니다.');
    } else {
      results.failed.push('webViewProps.type이 "partner" 또는 "game"으로 설정되어야 합니다.');
    }
  } else {
    results.warnings.push('webViewProps.type 설정을 확인할 수 없습니다. (수동 확인 필요)');
  }

  // bridgeColorMode 제거 확인 (주석 제외)
  const bridgeColorModeRegex = /bridgeColorMode\s*:/;
  if (bridgeColorModeRegex.test(content)) {
    results.failed.push('bridgeColorMode는 deprecated되었습니다. 제거해주세요.');
  } else {
    results.passed.push('bridgeColorMode가 제거되어 있습니다.');
  }

  // appName 확인
  if (content.includes('appName:')) {
    results.passed.push('appName이 설정되어 있습니다.');
  } else {
    results.failed.push('appName이 설정되어 있지 않습니다.');
  }

  // brand 설정 확인
  if (content.includes('brand:')) {
    results.passed.push('brand 설정이 있습니다.');
  } else {
    results.warnings.push('brand 설정이 없습니다. (수동 확인 필요)');
  }

  return true;
}

/**
 * index.html 확인
 */
function checkIndexHtml() {
  const htmlPath = path.join(PROJECT_ROOT, 'index.html');
  if (!fileExists(htmlPath)) {
    results.failed.push('index.html 파일이 없습니다.');
    return false;
  }

  const content = readFile(htmlPath);
  if (!content) {
    results.failed.push('index.html 파일을 읽을 수 없습니다.');
    return false;
  }

  // viewport 확인
  const viewportRegex = /<meta\s+name=["']viewport["']\s+content=["'][^"']*["']\s*\/?>/i;
  if (viewportRegex.test(content)) {
    if (content.includes('user-scalable=no') && content.includes('viewport-fit=cover')) {
      results.passed.push('index.html의 viewport 설정이 올바릅니다.');
    } else {
      results.warnings.push('viewport에 user-scalable=no와 viewport-fit=cover가 포함되어 있는지 확인하세요.');
    }
  } else {
    results.failed.push('index.html에 viewport meta 태그가 없습니다.');
  }

  // lang 속성 확인
  if (content.includes('<html lang=')) {
    results.passed.push('HTML lang 속성이 설정되어 있습니다.');
  } else {
    results.warnings.push('HTML lang 속성을 설정하는 것을 권장합니다.');
  }

  return true;
}

/**
 * TDS 사용 확인 (기본적인 파일 검사)
 */
function checkTDSUsage() {
  const srcPath = path.join(PROJECT_ROOT, 'src');
  if (!fileExists(srcPath)) {
    results.failed.push('src 디렉토리가 없습니다.');
    return false;
  }

  // TDS import 패턴 검색
  const files = getAllFiles(srcPath, ['.tsx', '.ts', '.jsx', '.js']);
  let hasTDSImport = false;

  for (const file of files) {
    const content = readFile(file);
    if (content) {
      if (content.includes('@toss/tds-mobile') || content.includes('@toss-design-system/mobile')) {
        hasTDSImport = true;
        break;
      }
    }
  }

  if (hasTDSImport) {
    results.passed.push('TDS 패키지 import가 발견되었습니다.');
  } else {
    results.warnings.push('TDS 패키지 import가 발견되지 않았습니다. TDS 컴포넌트를 사용하고 있는지 확인하세요.');
  }

  return true;
}

/**
 * 디렉토리 내 모든 파일 가져오기
 */
function getAllFiles(dirPath, extensions = []) {
  let files = [];
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files = files.concat(getAllFiles(fullPath, extensions));
    } else if (stat.isFile()) {
      if (extensions.length === 0 || extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

/**
 * 체크리스트 파일 확인
 */
function checkChecklistFile() {
  if (!fileExists(CHECKLIST_FILE)) {
    results.warnings.push('TOSS_UI_UX_CHECKLIST.md 파일이 없습니다.');
    return false;
  }
  results.passed.push('TOSS_UI_UX_CHECKLIST.md 파일이 있습니다.');
  return true;
}

/**
 * 메인 검증 함수
 */
function runChecks() {
  console.log(`${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
  console.log(`${BOLD}${BLUE}  Toss UI/UX 가이드라인 자동 검증${RESET}`);
  console.log(`${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n`);

  // 1. 필수 패키지 확인
  console.log(`${BOLD}1. 필수 패키지 확인${RESET}`);
  const packageJson = parseJSON(path.join(PROJECT_ROOT, 'package.json'));
  if (packageJson) {
    const webFrameworkVersion = packageJson.dependencies?.['@apps-in-toss/web-framework'] || 
                                packageJson.devDependencies?.['@apps-in-toss/web-framework'];
    
    if (webFrameworkVersion) {
      const version = webFrameworkVersion.replace(/[\^~]/, '');
      const majorVersion = parseInt(version.split('.')[0]);
      
      if (majorVersion >= 1) {
        checkPackage('@toss/tds-mobile', true);
      } else {
        checkPackage('@toss-design-system/mobile', true);
      }
    } else {
      results.failed.push('@apps-in-toss/web-framework 패키지가 설치되어 있지 않습니다.');
    }
  }
  console.log('');

  // 2. granite.config.ts 확인
  console.log(`${BOLD}2. granite.config.ts 확인${RESET}`);
  checkGraniteConfig();
  console.log('');

  // 3. index.html 확인
  console.log(`${BOLD}3. index.html 확인${RESET}`);
  checkIndexHtml();
  console.log('');

  // 4. TDS 사용 확인
  console.log(`${BOLD}4. TDS 사용 확인${RESET}`);
  checkTDSUsage();
  console.log('');

  // 5. 체크리스트 파일 확인
  console.log(`${BOLD}5. 체크리스트 파일 확인${RESET}`);
  checkChecklistFile();
  console.log('');

  // 결과 출력
  console.log(`${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
  console.log(`${BOLD}검증 결과${RESET}\n`);

  if (results.passed.length > 0) {
    console.log(`${GREEN}✓ 통과 (${results.passed.length}개)${RESET}`);
    results.passed.forEach(item => {
      console.log(`  ${GREEN}✓${RESET} ${item}`);
    });
    console.log('');
  }

  if (results.warnings.length > 0) {
    console.log(`${YELLOW}⚠ 경고 (${results.warnings.length}개)${RESET}`);
    results.warnings.forEach(item => {
      console.log(`  ${YELLOW}⚠${RESET} ${item}`);
    });
    console.log('');
  }

  if (results.failed.length > 0) {
    console.log(`${RED}✗ 실패 (${results.failed.length}개)${RESET}`);
    results.failed.forEach(item => {
      console.log(`  ${RED}✗${RESET} ${item}`);
    });
    console.log('');
  }

  // 최종 결과
  console.log(`${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
  
  const totalChecks = results.passed.length + results.warnings.length + results.failed.length;
  const passRate = ((results.passed.length / totalChecks) * 100).toFixed(1);

  if (results.failed.length === 0) {
    console.log(`${GREEN}${BOLD}✓ 모든 필수 항목을 통과했습니다!${RESET}`);
    console.log(`통과율: ${GREEN}${passRate}%${RESET} (${results.passed.length}/${totalChecks})`);
    if (results.warnings.length > 0) {
      console.log(`${YELLOW}경고 항목은 수동으로 확인해주세요.${RESET}`);
    }
    process.exit(0);
  } else {
    console.log(`${RED}${BOLD}✗ 일부 필수 항목을 통과하지 못했습니다.${RESET}`);
    console.log(`통과율: ${RED}${passRate}%${RESET} (${results.passed.length}/${totalChecks})`);
    console.log(`\n${YELLOW}실패한 항목을 수정한 후 다시 검증해주세요.${RESET}`);
    console.log(`자세한 내용은 ${BLUE}TOSS_UI_UX_CHECKLIST.md${RESET} 파일을 참고하세요.`);
    process.exit(1);
  }
}

// 스크립트 실행
runChecks();
