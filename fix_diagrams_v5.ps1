$rupPath = "C:\Users\flany\Jorgestor\RUP"

# 1. Standardize Design Diagrams
$designDirs = Get-ChildItem -Path (Join-Path $rupPath "02-diseno\casos-uso") -Directory
foreach ($dir in $designDirs) {
    $dirName = $dir.Name
    $newName = "diseno-secuencia-$dirName.puml"
    
    # Rename
    Get-ChildItem -Path $dir.FullName -Filter "*.puml" | ForEach-Object {
        if ($_.Name -ne $newName) { Rename-Item -Path $_.FullName -NewName $newName }
    }
    
    # Update links in ALL READMEs
    # We look for the folder name and ENSURE the full path is correct
    Get-ChildItem -Path $rupPath -Filter "*.md" -Recurse | ForEach-Object {
        $content = [System.IO.File]::ReadAllText($_.FullName, [System.Text.Encoding]::UTF8)
        
        # This pattern finds the CU folder and WHATEVER follows it that ends in .puml
        # It replaces it with the correct folder/file structure
        $pattern = "casos-uso/$dirName/[^/\s\)]+\.puml"
        $replacement = "casos-uso/$dirName/$newName"
        $content = [regex]::Replace($content, $pattern, $replacement)
        
        # Also fix the "lost folder" bug from previous run
        $bugPattern = "02-diseno/diseno-secuencia-$dirName\.puml"
        $bugReplacement = "02-diseno/casos-uso/$dirName/$newName"
        $content = [regex]::Replace($content, $bugPattern, $bugReplacement)

        [System.IO.File]::WriteAllText($_.FullName, $content, [System.Text.Encoding]::UTF8)
    }
}

# 2. Fix Encoding (Manually for common issues)
Get-ChildItem -Path $rupPath -Filter "*.md" -Recurse | ForEach-Object {
    $content = [System.IO.File]::ReadAllText($_.FullName, [System.Text.Encoding]::UTF8)
    $content = $content.Replace('DiseÃ±o', 'Diseño')
    $content = $content.Replace('Ã‰pica', 'Épica')
    $content = $content.Replace('ExÃ¡menes', 'Exámenes')
    $content = $content.Replace('AnalÃ­sis', 'Análisis')
    $content = $content.Replace('Ã³', 'ó')
    $content = $content.Replace('Ã¡', 'á')
    $content = $content.Replace('Ã­', 'í')
    $content = $content.Replace('Ãº', 'ú')
    $content = $content.Replace('Ã±', 'ñ')
    $content = $content.Replace('ðŸ ï¸', '🏠️')
    $content = $content.Replace('ðŸ“Š', '📊')
    $content = $content.Replace('â†’', '→')
    [System.IO.File]::WriteAllText($_.FullName, $content, [System.Text.Encoding]::UTF8)
}
