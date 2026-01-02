#!/usr/bin/env node

/**
 * Build script to optimize assets for GitHub Pages
 * Builds optimized files to dist/ folder for deployment
 * Run: node build.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DIST_DIR = 'dist';

console.log('🚀 Starting build optimization...\n');

// Check if dependencies are installed
if (!fs.existsSync('node_modules')) {
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
}

// Create dist directory and copy structure
console.log('📁 Creating build directory...');
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR, { recursive: true });
fs.mkdirSync(path.join(DIST_DIR, 'css'), { recursive: true });
fs.mkdirSync(path.join(DIST_DIR, 'img'), { recursive: true });
fs.mkdirSync(path.join(DIST_DIR, 'assets'), { recursive: true });

// Copy static assets
console.log('📋 Copying static assets...');
['img', 'assets'].forEach(dir => {
  if (fs.existsSync(dir)) {
    execSync(`cp -r ${dir}/* ${DIST_DIR}/${dir}/`, { stdio: 'inherit' });
  }
});

// Minify CSS files
console.log('\n📝 Minifying CSS files...');
const cssFiles = ['style.css', 'section1.css', 'section2.css', 'section3.css', 'footer.css'];
cssFiles.forEach(file => {
  const input = path.join('css', file);
  const output = path.join(DIST_DIR, 'css', file);
  if (fs.existsSync(input)) {
    try {
      execSync(`npx cleancss -o ${output} ${input}`, { stdio: 'inherit' });
      const stats = fs.statSync(output);
      console.log(`  ✓ ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
    } catch (error) {
      console.error(`  ✗ Failed to minify ${file}`);
    }
  }
});

// Minify JavaScript
console.log('\n📝 Minifying JavaScript...');
if (fs.existsSync('script.js')) {
  try {
    execSync(`npx terser script.js -o ${DIST_DIR}/script.js -c -m`, { stdio: 'inherit' });
    const stats = fs.statSync(path.join(DIST_DIR, 'script.js'));
    console.log(`  ✓ script.js (${(stats.size / 1024).toFixed(2)} KB)`);
  } catch (error) {
    console.error('  ✗ Failed to minify script.js');
  }
}

// Minify HTML
console.log('\n📝 Minifying HTML...');
if (fs.existsSync('index.html')) {
  try {
    execSync(`npx html-minifier-terser index.html -o ${DIST_DIR}/index.html --collapse-whitespace --remove-comments --minify-css --minify-js`, { stdio: 'inherit' });
    // Update HTML to reference minified CSS/JS
    let html = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');
    // HTML minifier already handles this, but ensure paths are correct
    fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html);
    const stats = fs.statSync(path.join(DIST_DIR, 'index.html'));
    console.log(`  ✓ index.html (${(stats.size / 1024).toFixed(2)} KB)`);
  } catch (error) {
    console.error('  ✗ Failed to minify index.html');
  }
}

console.log('\n✅ Build complete! Optimized files in dist/ folder.');
console.log('📋 Ready for deployment to GitHub Pages');

