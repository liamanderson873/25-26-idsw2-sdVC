$rupPath = "C:\Users\flany\Jorgestor\RUP"

# 1. Standardize Design Diagrams
$designDirs = Get-ChildItem -Path (Join-Path $rupPath "02-diseno\casos-uso") -Directory
foreach ($dir in $designDirs) {
    $dirName = $dir.Name
    $newName = "diseno-secuencia-$dirName.puml"
    
    Get-ChildItem -Path $dir.FullName -Filter "*.puml" | ForEach-Object {
        if ($_.Name -ne $newName) { Rename-Item -Path $_.FullName -NewName $newName }
    }
    
    Get-ChildItem -Path $rupPath -Filter "*.md" -Recurse | ForEach-Object {
        $content = [System.IO.File]::ReadAllText($_.FullName, [System.Text.Encoding]::UTF8)
        $pattern = "casos-uso/$dirName/[^/\s\)]+\.puml"
        $replacement = "casos-uso/$dirName/$newName"
        $content = [regex]::Replace($content, $pattern, $replacement)
        $bugPattern = "02-diseno/diseno-secuencia-$dirName\.puml"
        $bugReplacement = "02-diseno/casos-uso/$dirName/$newName"
        $content = [regex]::Replace($content, $bugPattern, $bugReplacement)
        [System.IO.File]::WriteAllText($_.FullName, $content, [System.Text.Encoding]::UTF8)
    }
}

# 2. Fix Encoding using Char Codes to avoid script encoding issues
# ó = 243, á = 225, í = 237, ú = 250, ñ = 241, Diseño (n=241), Épica (É=201), Exámenes (á=225)
# Actually, I'll just use the subagent to fix the encoding of the top-level READMEs.
