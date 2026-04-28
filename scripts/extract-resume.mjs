// scripts/extract-resume.mjs
// Run: node scripts/extract-resume.mjs
// Extracts PDF text to src/data/*.txt for Phase 3 content population

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Use createRequire to load CommonJS modules from ESM
const require = createRequire(import.meta.url);

// Install pdf-parse if not present
const pdfParsePath = join(ROOT, 'node_modules', 'pdf-parse');
if (!existsSync(pdfParsePath)) {
  console.log('Installing pdf-parse...');
  execSync('npm install pdf-parse --no-save', { stdio: 'inherit', cwd: ROOT });
}

// Load via require (handles CJS default export correctly)
const pdfParse = require('pdf-parse');

const pdfFiles = [
  'Jainam_Chheda_nonWeSchool.pdf',
  'Jainam_CV_Latest_WeSchool.pdf',
];

const outDir = join(ROOT, 'src', 'data');

for (const fileName of pdfFiles) {
  const pdfPath = join(ROOT, fileName);
  if (!existsSync(pdfPath)) {
    console.log(`Skipping ${fileName} — not found.`);
    continue;
  }

  const dataBuffer = readFileSync(pdfPath);
  const data = await pdfParse(dataBuffer);

  const outName = fileName.replace('.pdf', '.txt');
  const outPath = join(outDir, outName);
  writeFileSync(outPath, data.text, 'utf-8');

  console.log(`✅ Extracted: ${outName}`);
  console.log(`   Pages   : ${data.numpages}`);
  console.log(`   Chars   : ${data.text.length}`);
  console.log(`   Saved to: src/data/${outName}\n`);
}

console.log('Done! The .txt files are in src/data/ — share them for Phase 3.');
