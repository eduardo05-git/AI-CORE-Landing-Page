# Requires Windows with Edge or Chrome installed
# Usage: powershell -ExecutionPolicy Bypass -File tools/generate-previews.ps1

param(
  [string]$Url = "index.html",
  [string]$OutDir = "assets/images/previews",
  [ValidateSet('auto','edge','chrome')]
  [string]$Browser = "auto"  # options: auto | edge | chrome
)

function Ensure-Directory($path) {
  if (-not (Test-Path $path)) {
    New-Item -ItemType Directory -Force -Path $path | Out-Null
  }
}

function Resolve-Url($url) {
  if ($url -match '^(http|https)://') { return $url }
  $full = Resolve-Path $url
  return "file:///$($full -replace '\\','/')"
}

# Standard sizes
$sizes = @(
  @{ name = 'desktop-1920x1080'; w = 1920; h = 1080 },
  @{ name = 'tablet-768x1024';    w = 768;  h = 1024 },
  @{ name = 'mobile-375x667';     w = 375;  h = 667 },
  @{ name = 'og-1200x630';        w = 1200; h = 630 }
)

Ensure-Directory $OutDir
$absUrl = Resolve-Url $Url

Write-Host "Generating previews from $absUrl into $OutDir using $Browser..." -ForegroundColor Cyan

function Get-First-ExistingPath([string[]]$paths) {
  foreach ($p in $paths) { if (Test-Path $p) { return $p } }
  return $null
}

function Find-EdgePath() {
  $candidates = @(
    "msedge",
    "msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  )
  foreach ($c in $candidates) {
    if (Get-Command $c -ErrorAction SilentlyContinue) { return (Get-Command $c).Source }
    if (Test-Path $c) { return $c }
  }
  return $null
}

function Find-ChromePath() {
  $candidates = @(
    "chrome",
    "chrome.exe",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
  )
  foreach ($c in $candidates) {
    if (Get-Command $c -ErrorAction SilentlyContinue) { return (Get-Command $c).Source }
    if (Test-Path $c) { return $c }
  }
  return $null
}

function Capture-With-Browser($browserPath, $url, $file, $w, $h) {
  if (-not $browserPath) { throw "Browser executable not found." }
  $args = @(
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--window-size=$w,$h",
    "--screenshot=$file",
    $url
  )
  Start-Process -FilePath $browserPath -ArgumentList $args -NoNewWindow -Wait
}

if ($Browser -eq 'auto') {
  $edgePath = Find-EdgePath
  $chromePath = Find-ChromePath
  $chosen = $edgePath
  if (-not $chosen) { $chosen = $chromePath }
  if (-not $chosen) { throw "Neither Edge nor Chrome was found. Please install one of them or pass -Browser edge|chrome with a valid PATH." }
  Write-Host "Using browser: $chosen" -ForegroundColor Yellow
  foreach ($s in $sizes) {
    $outfile = Join-Path $OutDir ("ai-core-" + $s.name + ".png")
    Capture-With-Browser $chosen $absUrl $outfile $($s.w) $($s.h)
    Write-Host "Saved: $outfile" -ForegroundColor Green
  }
} elseif ($Browser -eq 'edge') {
  $edgePath = Find-EdgePath
  if (-not $edgePath) { throw "Edge not found. Try -Browser chrome or -Browser auto." }
  foreach ($s in $sizes) {
    $outfile = Join-Path $OutDir ("ai-core-" + $s.name + ".png")
    Capture-With-Browser $edgePath $absUrl $outfile $($s.w) $($s.h)
    Write-Host "Saved: $outfile" -ForegroundColor Green
  }
} else {
  $chromePath = Find-ChromePath
  if (-not $chromePath) { throw "Chrome not found. Try -Browser edge or -Browser auto." }
  foreach ($s in $sizes) {
    $outfile = Join-Path $OutDir ("ai-core-" + $s.name + ".png")
    Capture-With-Browser $chromePath $absUrl $outfile $($s.w) $($s.h)
    Write-Host "Saved: $outfile" -ForegroundColor Green
  }
}

Write-Host "Done." -ForegroundColor Green
