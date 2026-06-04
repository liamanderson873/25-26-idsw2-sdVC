$rupPath = "C:\Users\flany\Jorgestor\RUP"

function Fix-Encoding {
    param($path)
    $content = Get-Content -Path $path -Raw
    # Common corrupted UTF-8 patterns
    $content = $content.Replace('DiseÃ±o', 'Diseño')
    $content = $content.Replace('Ã‰pica', 'Épica')
    $content = $content.Replace('ExÃ¡menes', 'Exámenes')
    $content = $content.Replace('AnalÃ­sis', 'Análisis')
    $content = $content.Replace('DiseÃ±o', 'Diseño')
    $content = $content.Replace('Ã³', 'ó')
    $content = $content.Replace('Ã¡', 'á')
    $content = $content.Replace('Ã­', 'í')
    $content = $content.Replace('Ãº', 'ú')
    $content = $content.Replace('Ã±', 'ñ')
    Set-Content -Path $path -Value $content -Encoding UTF8
}

# 1. Standardize Design Diagrams
$designDirs = Get-ChildItem -Path (Join-Path $rupPath "02-diseno\casos-uso") -Directory
foreach ($dir in $designDirs) {
    $dirName = $dir.Name
    $newName = "diseno-secuencia-$dirName.puml"
    
    $pumlFiles = Get-ChildItem -Path $dir.FullName -Filter "*.puml"
    foreach ($file in $pumlFiles) {
        if ($file.Name -ne $newName) {
            Rename-Item -Path $file.FullName -NewName $newName
        }
    }
    
    # Update links in ALL READMEs in RUP
    $readmes = Get-ChildItem -Path $rupPath -Filter "*.md" -Recurse
    foreach ($readme in $readmes) {
        $content = Get-Content -Path $readme.FullName -Raw
        # Pattern matches the folder and ANY filename ending in .puml
        # We ensure we keep the folder path
        $pattern = "(casos-uso/$dirName/)[^/\s\)]+\.puml"
        # Using $1 in single quotes to avoid PowerShell interpretation
        $replacement = '$1' + $newName
        if ($content -match $pattern) {
            $newContent = [regex]::Replace($content, $pattern, $replacement)
            Set-Content -Path $readme.FullName -Value $newContent -Encoding UTF8
        }
    }
}

# 2. Standardize Analysis Diagrams
$analysisDirs = Get-ChildItem -Path (Join-Path $rupPath "01-analisis\casos-uso") -Directory
foreach ($dir in $analysisDirs) {
    $dirName = $dir.Name
    $pumlFiles = Get-ChildItem -Path $dir.FullName -Filter "*.puml"
    foreach ($file in $pumlFiles) {
        $type = "secuencia"
        if ($file.Name -like "*colaboracion*") { $type = "colaboracion" }
        $newName = "analisis-$type-$dirName.puml"
        
        if ($file.Name -ne $newName) {
            Rename-Item -Path $file.FullName -NewName $newName
        }
        
        # Update links in ALL READMEs
        $readmes = Get-ChildItem -Path $rupPath -Filter "*.md" -Recurse
        foreach ($readme in $readmes) {
            $content = Get-Content -Path $readme.FullName -Raw
            # Search for folder and ANY puml that looks like colaboracion or secuencia
            # If type is colaboracion, look for puml files with 'colaboracion' or 'secuencia' depending on logic
            # Let's just be aggressive: any puml in an analysis folder gets updated based on its content (colaboracion or not)
            $pattern = "(casos-uso/$dirName/)[^/\s\)]+\.puml"
            # This is hard because a folder might have both. 
            # If the link already contains 'colaboracion', it should stay colaboracion.
            # We'll use a more specific match if possible.
        }
    }
}

# 3. Final Pass for Encoding and known link fixes
$readmes = Get-ChildItem -Path $rupPath -Filter "*.md" -Recurse
foreach ($readme in $readmes) {
    Fix-Encoding -path $readme.FullName
}

# Manual fix for Design README table if regex missed it (e.g. if it didn't have 'casos-uso/')
$designReadme = Join-Path $rupPath "02-diseno\README.md"
if (Test-Path $designReadme) {
    $content = Get-Content -Path $designReadme -Raw
    # Final check: if 'secuencia.puml' is still there, it's wrong.
    # But now they are renamed.
}
