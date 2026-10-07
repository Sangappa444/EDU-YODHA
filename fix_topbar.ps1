
# Fix privacy-policy.html topbar - using regex for flexibility
$filePath = 'D:\EDU YODHA\privacy-policy.html'
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# Use regex pattern matching to replace the topbar block
$pattern = '(?s)(<div class="topbar">)\s*<div class="topbar-badge">Legal</div>\s*<span>EDU YODHA Privacy Policy.*?</div>\s*(</div>)'

$replacement = @'
<div class="topbar">
    <div class="container topbar-inner">
      <div class="topbar-content">
        <span class="topbar-badge">Legal</span>
        <span class="topbar-text">EDU YODHA Privacy Policy &amp; Data Protection Standards</span>
      </div>
      <div class="topbar-links">
        <a href="contact.html" class="topbar-link">Contact Privacy Officer &#8599;</a>
      </div>
    </div>
  </div>
'@

$newContent = [regex]::Replace($content, $pattern, $replacement)

if ($newContent -ne $content) {
    [System.IO.File]::WriteAllText($filePath, $newContent, [System.Text.Encoding]::UTF8)
    Write-Host "SUCCESS: Topbar fixed in privacy-policy.html"
} else {
    Write-Host "FAILED: Pattern not matched. Dumping raw topbar lines:"
    $idx = $content.IndexOf('<div class="topbar">')
    Write-Host "Topbar starts at char: $idx"
    Write-Host $content.Substring($idx, 300)
}
