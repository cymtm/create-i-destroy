#!/usr/bin/env node

/**
 * Build script for deploying CREATE.I.DESTROY to Itch.io
 * Creates a clean dist directory with all necessary files
 * 
 * Security note: All paths are hardcoded and do not accept user input
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Safe: Uses __dirname (script location), not user input
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log('🚀 Building CREATE.I.DESTROY for deployment...\n');

// Clean dist directory
if (fs.existsSync(distDir)) {
  console.log('🧹 Cleaning old build...');
  fs.rmSync(distDir, { recursive: true, force: true });
}

// Create dist directory
fs.mkdirSync(distDir, { recursive: true });
console.log('✅ Created dist directory\n');

// Copy files (hardcoded list, no user input)
const filesToCopy = [
  { src: 'index.html', dest: 'index.html' },
  { src: 'styles.css', dest: 'styles.css' },
  { src: 'favicon.svg', dest: 'favicon.svg' },
  { src: 'README.md', dest: 'README.md' },
  { src: 'LICENSE', dest: 'LICENSE' },
];

console.log('📦 Copying files...');
filesToCopy.forEach(({ src, dest }) => {
  // Safe: src and dest are from hardcoded array above
  const srcPath = path.normalize(path.join(rootDir, src));
  const destPath = path.normalize(path.join(distDir, dest));
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`  ✓ ${src}`);
  } else {
    console.warn(`  ⚠ ${src} not found, skipping`);
  }
});

// Copy directories recursively (hardcoded list, no user input)
const dirsToCopy = [
  { src: 'files', dest: 'files' },
];

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    // Safe: entry.name comes from fs.readdirSync of a controlled directory
    const srcPath = path.normalize(path.join(src, entry.name));
    const destPath = path.normalize(path.join(dest, entry.name));

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('\n📂 Copying directories...');
dirsToCopy.forEach(({ src, dest }) => {
  // Safe: src and dest are from hardcoded array above
  const srcPath = path.normalize(path.join(rootDir, src));
  const destPath = path.normalize(path.join(distDir, dest));
  
  if (fs.existsSync(srcPath)) {
    copyDir(srcPath, destPath);
    console.log(`  ✓ ${src}/`);
  } else {
    console.warn(`  ⚠ ${src}/ not found, skipping`);
  }
});

// Create a build info file
const buildInfo = {
  name: 'CREATE.I.DESTROY',
  version: '1.0.0',
  buildDate: new Date().toISOString(),
  platform: 'Itch.io Web',
  description: 'Mystical choice-based game for browser',
};

fs.writeFileSync(
  path.join(distDir, 'build-info.json'),
  JSON.stringify(buildInfo, null, 2)
);
console.log('\n📝 Created build-info.json');

// Calculate size
function getDirSize(dirPath) {
  let size = 0;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      size += getDirSize(fullPath);
    } else {
      size += fs.statSync(fullPath).size;
    }
  }

  return size;
}

const totalSize = getDirSize(distDir);
const sizeMB = (totalSize / (1024 * 1024)).toFixed(2);

console.log('\n✨ Build complete!');
console.log(`📊 Total size: ${sizeMB} MB`);
console.log(`📁 Output directory: ${distDir}`);
console.log('\n💡 Next steps:');
console.log('  1. Run "pnpm run deploy:package" to create a ZIP file');
console.log('  2. Upload the ZIP to Itch.io');
console.log('  3. See ITCH_DEPLOYMENT.md for detailed instructions\n');
