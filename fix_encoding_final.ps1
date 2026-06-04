$rupPath = "C:\Users\flany\Jorgestor\RUP"

Get-ChildItem -Path $rupPath -Filter "*.md" -Recurse | ForEach-Object {
    $filePath = $_.FullName
    # Read as ISO-8859-1 (which interprets the corrupted bytes individually)
    $content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::GetEncoding("iso-8859-1"))
    
    # Check if it contains the characteristic pattern of double-encoded UTF-8
    if ($content -match "Ã[±³¡­©º±³¡­©º]") {
        # Convert back to bytes using ISO-8859-1 and read as UTF-8
        $bytes = [System.Text.Encoding]::GetEncoding("iso-8859-1").GetBytes($content)
        $fixedContent = [System.Text.Encoding]::UTF8.GetString($bytes)
        
        # Write back as clean UTF-8
        [System.IO.File]::WriteAllText($filePath, $fixedContent, [System.Text.Encoding]::UTF8)
    }
}
