#!/usr/bin/env node

/**
 * Package script for CREATE.I.DESTROY
 * Creates a ZIP file ready for Itch.io upload
 * 
 * Security note: All paths are hardcoded and do not accept user input
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Safe: Uses __dirname (script location), not user input
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const outputZip = path.join(rootDir, 'create-i-destroy-itch.zip');

console.log('📦 Packaging CREATE.I.DESTROY for Itch.io...\n');

// Check if dist exists
if (!fs.existsSync(distDir)) {
  console.error('❌ Error: dist directory not found!');
  console.log('💡 Run "pnpm run deploy:build" first\n');
  process.exit(1);
}

// Remove old ZIP if it exists
if (fs.existsSync(outputZip)) {
  console.log('🧹 Removing old ZIP file...');
  fs.unlinkSync(outputZip);
}

// Create ZIP file
console.log('🗜️  Creating ZIP file...');
try {
  // Change to dist directory and create ZIP
  process.chdir(distDir);
  
  // Try using zip command (Unix/Linux/Mac)
  try {
    execSync('zip -r ../create-i-destroy-itch.zip .', { stdio: 'inherit' });
    console.log('✅ ZIP created using zip command\n');
  } catch {
    // If zip command fails, try using Node.js (cross-platform)
    console.log('⚠️  zip command not found, using alternative method...');
    
    // Import archiver dynamically if available
    try {
      const archiver = await import('archiver');
      const archive = archiver.default('zip', { zlib: { level: 9 } });
      const output = fs.createWriteStream(outputZip);
      
      await new Promise((resolve, reject) => {
        output.on('close', resolve);
        archive.on('error', reject);
        archive.pipe(output);
        archive.directory(distDir, false);
        archive.finalize();
      });
      
      console.log('✅ ZIP created using archiver\n');
    } catch {
      console.error('❌ Error: Could not create ZIP file');
      console.log('💡 Please install zip command or archiver package:');
      console.log('   - Linux/Mac: zip should be pre-installed');
      console.log('   - Windows: install 7-Zip or use WSL');
      console.log('   - Or run: pnpm add -D archiver\n');
      process.exit(1);
    }
  }
  
  // Go back to root directory
  process.chdir(rootDir);
  
  // Check file size
  const stats = fs.statSync(outputZip);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  
  console.log('✨ Package complete!');
  console.log(`📊 ZIP size: ${sizeMB} MB`);
  console.log(`📁 Output file: create-i-destroy-itch.zip`);
  console.log('\n💡 Next steps:');
  console.log('  1. Go to your Itch.io dashboard');
  console.log('  2. Create a new project or edit existing one');
  console.log('  3. Upload create-i-destroy-itch.zip');
  console.log('  4. Set as "This file will be played in the browser"');
  console.log('  5. See ITCH_DEPLOYMENT.md for detailed instructions\n');
  
} catch (error) {
  console.error('❌ Error creating package:', error.message);
  process.exit(1);
}
