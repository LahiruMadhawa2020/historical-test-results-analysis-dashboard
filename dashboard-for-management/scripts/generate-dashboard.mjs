import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadManagementConfig, ManagementDashboardGenerator } from 'historical-analytics-dashboard';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

async function main() {
  const { config } = loadManagementConfig({
    configPath: path.join(root, 'dashboard.config.ts'),
    cwd: root
  });

  const generator = new ManagementDashboardGenerator({
    config,
    cwd: root,
    packageVersion: '0.2.0'
  });

  const outputPath = await generator.generate();
  console.log(`Management dashboard generated at ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
