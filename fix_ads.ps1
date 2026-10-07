
# Files to process for ad unit removal
$files = @(
    'D:\EDU YODHA\index.html',
    'D:\EDU YODHA\vtu.html',
    'D:\EDU YODHA\kcet.html',
    'D:\EDU YODHA\internships.html',
    'D:\EDU YODHA\articles.html',
    'D:\EDU YODHA\courses.html',
    'D:\EDU YODHA\career.html',
    'D:\EDU YODHA\about.html',
    'D:\EDU YODHA\contact.html',
    'D:\EDU YODHA\resources.html',
    'D:\EDU YODHA\vtu-updates.html',
    'D:\EDU YODHA\resource-detail.html',
    'D:\EDU YODHA\privacy-policy.html',
    'D:\EDU YODHA\terms-and-conditions.html',
    'D:\EDU YODHA\disclaimer.html',
    'D:\EDU YODHA\editorial-policy.html',
    'D:\EDU YODHA\cse-engineering-roadmap-guide.html',
    'D:\EDU YODHA\vtu-sgpa-cgpa-calculator-guide.html',
    'D:\EDU YODHA\vtu-revaluation-challenge-valuation-guide.html',
    'D:\EDU YODHA\vtu-grace-marks-backlog-rules-guide.html',
    'D:\EDU YODHA\kcet-option-entry-counseling-guide.html'
)

# Regex pattern to match ad unit container block (dotall via (?s))
$adPattern = '(?s)\s*<div class="ad-unit-container">\s*<div class="ad-unit-label">Advertisement</div>\s*<ins class="adsbygoogle"[^>]*></ins>\s*<script>\s*\(adsbygoogle = window\.adsbygoogle \|\| \[\]\)\.push\(\{\}\);\s*</script>\s*</div>'

$replacement = "`n  <!-- Ad space reserved - pending AdSense approval -->"

foreach ($filePath in $files) {
    if (Test-Path $filePath) {
        $content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
        $originalLen = $content.Length
        $newContent = [regex]::Replace($content, $adPattern, $replacement)
        if ($newContent.Length -ne $originalLen) {
            [System.IO.File]::WriteAllText($filePath, $newContent, [System.Text.Encoding]::UTF8)
            Write-Host "FIXED: $filePath"
        } else {
            Write-Host "NO CHANGE: $filePath"
        }
    } else {
        Write-Host "NOT FOUND: $filePath"
    }
}
Write-Host ""
Write-Host "Done processing all files."
