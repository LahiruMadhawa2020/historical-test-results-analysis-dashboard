# Smoke verification — build library, import one UI + one API report, generate dashboards
$ErrorActionPreference = 'Stop'
$Root = Resolve-Path (Join-Path $PSScriptRoot '..')
$Lib = Join-Path $Root 'historical-analytics-dashboard'
$Wk = Join-Path $Root 'wk-all-in-one-framework'
$Mgmt = Join-Path $Root 'dashboard-for-management'

function Ensure-Link($ProjectPath) {
  $link = Join-Path $ProjectPath 'node_modules\historical-analytics-dashboard'
  if (-not (Test-Path $link)) {
    New-Item -ItemType Directory -Path (Join-Path $ProjectPath 'node_modules') -Force | Out-Null
    New-Item -ItemType Junction -Path $link -Target $Lib -Force | Out-Null
  }
}

Write-Host '==> Building historical-analytics-dashboard'
Push-Location $Lib
npm install --ignore-scripts
npm run build
Pop-Location

Ensure-Link $Wk
Ensure-Link $Mgmt

Write-Host '==> Import all smoke tool reports (WK)'
Push-Location $Wk
node scripts/smoke-import-all.mjs
Pop-Location

Write-Host '==> Generate management dashboard'
Push-Location $Mgmt
node scripts/generate-dashboard.mjs
Pop-Location

Write-Host 'Smoke verification complete.'
