import fs from 'fs';
import path from 'path';

const [toolId, className] = process.argv.slice(2);

if (!toolId || !className) {
  console.error('Usage: node scripts/copy-junit.mjs <toolId> <SurefireClassName>');
  process.exit(1);
}

const surefireDir = path.join(process.cwd(), 'target', 'surefire-reports');
const outputDir = path.join(process.cwd(), 'reports', 'junit');
const sourceFile = path.join(surefireDir, `TEST-${className}.xml`);
const targetFile = path.join(outputDir, `${toolId}.xml`);

if (!fs.existsSync(sourceFile)) {
  const fallback = fs.readdirSync(surefireDir).find((name) => name.startsWith('TEST-') && name.endsWith('.xml'));
  if (!fallback) {
    console.error(`JUnit report not found: ${sourceFile}`);
    process.exit(1);
  }
  fs.mkdirSync(outputDir, { recursive: true });
  fs.copyFileSync(path.join(surefireDir, fallback), targetFile);
  console.log(`Copied ${fallback} -> ${targetFile}`);
  process.exit(0);
}

fs.mkdirSync(outputDir, { recursive: true });
fs.copyFileSync(sourceFile, targetFile);
console.log(`Copied ${sourceFile} -> ${targetFile}`);
