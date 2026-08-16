# Publishes docs/ to the gh-pages branch (site root) for GitHub Pages.
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$docs = Join-Path $root 'docs'

if (-not (Test-Path (Join-Path $docs 'index.html'))) {
  throw "docs/index.html not found. Run: node scripts/publish-dashboards.mjs"
}

Push-Location $root
try {
  git worktree remove .gh-pages-publish -f 2>$null | Out-Null
  git worktree add --orphan -B gh-pages .gh-pages-publish 2>$null | Out-Null
  if ($LASTEXITCODE -ne 0) {
    git branch -D gh-pages 2>$null | Out-Null
    git worktree add --orphan -B gh-pages .gh-pages-publish | Out-Null
  }

  Get-ChildItem -Force (Join-Path $root '.gh-pages-publish') |
    Where-Object { $_.Name -ne '.git' } |
    Remove-Item -Recurse -Force

  Copy-Item (Join-Path $docs '*') (Join-Path $root '.gh-pages-publish') -Recurse -Force

  Push-Location (Join-Path $root '.gh-pages-publish')
  git add -A
  git commit -m "Publish dashboard previews to GitHub Pages"
  git push origin gh-pages --force
  Pop-Location

  git worktree remove .gh-pages-publish -f | Out-Null
} finally {
  Pop-Location
}

Write-Host "gh-pages branch published."
