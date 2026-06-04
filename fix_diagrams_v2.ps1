$rupPath = "C:\Users\flany\Jorgestor\RUP"

# 1. Standardize Design Diagrams
$designDirs = Get-ChildItem -Path (Join-Path $rupPath "02-diseno\casos-uso") -Directory
foreach ($dir in $designDirs) {
    $dirName = $dir.Name
    $newName = "diseno-secuencia-$dirName.puml"
    
    # Rename any .puml in this folder to the new name (assuming only one secuencia per folder)
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
        # Find path/to/CU-XX-Name/anything.puml and replace anything.puml with $newName
        $pattern = "(casos-uso/$dirName/)[^/\s\)]+\.puml"
        $replacement = "${1}$newName"
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
        
        $oldName = $file.Name
        if ($oldName -ne $newName) {
            Rename-Item -Path $file.FullName -NewName $newName
        }
        
        # Update links
        $readmes = Get-ChildItem -Path $rupPath -Filter "*.md" -Recurse
        foreach ($readme in $readmes) {
            $content = Get-Content -Path $readme.FullName -Raw
            # This is more specific to avoid replacing secuencia with colaboracion incorrectly
            # We look for the folder and the old filename or just the pattern
            # If we know the old name, it's safer.
            if ($content -like "*$dirName/$oldName*") {
                $newContent = $content.Replace("$dirName/$oldName", "$dirName/$newName")
                Set-Content -Path $readme.FullName -Value $newContent -Encoding UTF8
            }
        }
    }
}

# 3. Final Encoding pass to fix artifacts
Get-ChildItem -Path $rupPath -Filter "*.md" -Recurse | ForEach-Object {
    $content = Get-Content -Path $_.FullName -Raw
    Set-Content -Path $_.FullName -Value $content -Encoding UTF8
}
