/**
 * Deploy Next.js static export (out/) to the "pages" branch for GitHub Pages.
 * Run after: next build
 * Usage: node scripts/deploy-pages.cjs
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'out');
const deployDir = path.join(root, '.deploy-pages');

if (!fs.existsSync(outDir)) {
  console.error('Missing out/ folder. Run "npm run build" first.');
  process.exit(1);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const srcPath = path.join(src, name);
    const destPath = path.join(dest, name);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Get origin URL from parent repo
let originUrl;
try {
  originUrl = execSync('git config --get remote.origin.url', {
    cwd: root,
    encoding: 'utf8',
  }).trim();
} catch {
  console.error('Could not get git remote.origin.url');
  process.exit(1);
}

// Clean and copy
if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true });
}
copyDir(outDir, deployDir);

// Ensure .nojekyll so GitHub Pages serves _next directory
fs.writeFileSync(path.join(deployDir, '.nojekyll'), '');

// Init git and push to pages branch
execSync('git init', { cwd: deployDir });
execSync('git remote add origin ' + originUrl, { cwd: deployDir });
execSync('git add -A', { cwd: deployDir });
execSync('git commit -m "Deploy to GitHub Pages"', { cwd: deployDir });
execSync('git branch -M main', { cwd: deployDir });
execSync('git push -f origin main:pages', { cwd: deployDir });

console.log('Deployed to branch "pages". Configure GitHub: Settings → Pages → Source: Deploy from branch → Branch: pages.');
fs.rmSync(deployDir, { recursive: true, force: true });
