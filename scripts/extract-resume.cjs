// scripts/extract-resume.cjs
const { readFileSync, writeFileSync, existsSync } = require('fs');
const { join } = require('path');
const { execSync } = require('child_process');

const ROOT = join(__dirname, '..');
const outDir = join(ROOT, 'src', 'data');

// Ensure pdf-parse is installed
const pdfParsePath = join(ROOT, 'node_modules', 'pdf-parse');
if (!existsSync(pdfParsePath)) {
  console.log('Installing pdf-parse...');
  execSync('npm install pdf-parse --no-save', { stdio: 'inherit', cwd: ROOT });
}

// Defensive require — handle any export shape
const raw = require('pdf-parse');
const pdfParse = typeof raw === 'function' ? raw : (raw.default ?? raw.parse ?? null);

if (typeof pdfParse !== 'function') {
  console.error('pdf-parse loaded but is not callable. Module shape:', Object.keys(raw));
  console.error('Trying alternate approach...');

  // Fallback: raw text extraction from PDF binary (no deps)
  extractRaw();
  process.exit(0);
}

const pdfFiles = [
  'Jainam_Chheda_nonWeSchool.pdf',
  'Jainam_CV_Latest_WeSchool.pdf',
];

async function main() {
  for (const fileName of pdfFiles) {
    const pdfPath = join(ROOT, fileName);
    if (!existsSync(pdfPath)) {
      console.log(`Skipping ${fileName} — file not found.`);
      continue;
    }

    console.log(`Reading ${fileName}...`);
    const buffer = readFileSync(pdfPath);
    const data = await pdfParse(buffer);

    const outName = fileName.replace('.pdf', '.txt');
    writeFileSync(join(outDir, outName), data.text, 'utf-8');

    console.log(`✅ ${outName} — ${data.numpages} pages, ${data.text.length} chars`);
    console.log(`   Saved to: src/data/${outName}\n`);
  }
  console.log('Done! Share the .txt files for Phase 3.');
}

// Fallback: naive PDF text extraction (no library needed)
function extractRaw() {
  for (const fileName of pdfFiles) {
    const pdfPath = join(ROOT, fileName);
    if (!existsSync(pdfPath)) continue;

    console.log(`Raw-extracting ${fileName}...`);
    const buf = readFileSync(pdfPath);
    const str = buf.toString('latin1');

    // Extract text between BT...ET blocks and parentheses
    const chunks = [];
    const btEt = str.match(/BT[\s\S]*?ET/g) || [];
    for (const block of btEt) {
      const parts = block.match(/\(([^)]+)\)/g) || [];
      for (const p of parts) {
        const text = p.slice(1, -1).replace(/\\(\d{3})/g, (_, oct) =>
          String.fromCharCode(parseInt(oct, 8))
        );
        if (text.trim().length > 1) chunks.push(text);
      }
    }

    const out = chunks.join(' ').replace(/\s+/g, ' ').trim();
    const outName = fileName.replace('.pdf', '.txt');
    writeFileSync(join(outDir, outName), out, 'utf-8');
    console.log(`✅ Raw extracted: src/data/${outName} (${out.length} chars)`);
    console.log('   Note: Raw extraction may miss some characters. Share the file and we\'ll clean it up.\n');
  }
}

main().catch((err) => {
  console.error('Error in main:', err.message);
  console.log('Falling back to raw extraction...');
  extractRaw();
});
