$rupPath = "C:\Users\flany\Jorgestor\RUP"

function Fix-Encoding {
    param($path)
    $content = Get-Content -Path $path -Raw
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

# 1. Design Diagrams
$designDirs = Get-ChildItem -Path (Join-Path $rupPath "02-diseno\casos-uso") -Directory
foreach ($dir in $designDirs) {
    $dirName = $dir.Name
    $newName = "diseno-secuencia-$dirName.puml"
    Get-ChildItem -Path $dir.FullName -Filter "*.puml" | ForEach-Object {
        if ($_.Name -ne $newName) { Rename-Item -Path $_.FullName -NewName $newName }
    }
    
    Get-ChildItem -Path $rupPath -Filter "*.md" -Recurse | ForEach-Object {
        $content = Get-Content -Path $_.FullName -Raw
        $pattern = "(02-diseno/casos-uso/$dirName/)[^/\s\)]+\.puml"
        $replacement = '$1' + $newName
        if ($content -match $pattern) {
            $newContent = [regex]::Replace($content, $pattern, $replacement)
            Set-Content -Path $_.FullName -Value $newContent -Encoding UTF8
        }
    }
}

# 2. Analysis Diagrams
$analysisDirs = Get-ChildItem -Path (Join-Path $rupPath "01-analisis\casos-uso") -Directory
foreach ($dir in $analysisDirs) {
    $dirName = $dir.Name
    
    # Handle Colaboracion
    $colabNew = "analisis-colaboracion-$dirName.puml"
    Get-ChildItem -Path $dir.FullName -Filter "*colaboracion*.puml" | ForEach-Object {
        if ($_.Name -ne $colabNew) { Rename-Item -Path $_.FullName -NewName $colabNew }
    }
    
    # Handle Secuencia
    $seqNew = "analisis-secuencia-$dirName.puml"
    Get-ChildItem -Path $dir.FullName -Filter "*.puml" | ForEach-Object {
        if ($_.Name -ne $colabNew -and $_.Name -ne $seqNew) {
            Rename-Item -Path $_.FullName -NewName $seqNew
        }
    }
    
    # Update Links
    Get-ChildItem -Path $rupPath -Filter "*.md" -Recurse | ForEach-Object {
        $content = Get-Content -Path $_.FullName -Raw
        # Fix Colaboracion links
        $patternColab = "(01-analisis/casos-uso/$dirName/)[^/\s\)]*colaboracion[^/\s\)]*\.puml"
        $content = [regex]::Replace($content, $patternColab, ('$1' + $colabNew))
        
        # Fix Secuencia links
        $patternSeq = "(01-analisis/casos-uso/$dirName/)[^/\s\)]*secuencia[^/\s\)]*\.puml"
        $content = [regex]::Replace($content, $patternSeq, ('$1' + $seqNew))
        
        # If it was just 'secuencia.puml' before any rename
        $patternGeneric = "(01-analisis/casos-uso/$dirName/)secuencia\.puml"
        $content = [regex]::Replace($content, $patternGeneric, ('$1' + $seqNew))

        Set-Content -Path $_.FullName -Value $content -Encoding UTF8
    }
}

# 3. Final Pass for Encoding
Get-ChildItem -Path $rupPath -Filter "*.md" -Recurse | ForEach-Object {
    Fix-Encoding -path $_.FullName
}
