$rupPath = "C:\Users\flany\Jorgestor\RUP"

# Helper to update links in all READMEs
function Update-AllReadmes {
    param($oldName, $newName)
    $readmes = Get-ChildItem -Path $rupPath -Filter "*.md" -Recurse
    foreach ($readme in $readmes) {
        $content = Get-Content -Path $readme.FullName -Raw
        if ($content -like "*$oldName*") {
            $newContent = $content.Replace($oldName, $newName)
            Set-Content -Path $readme.FullName -Value $newContent -Encoding UTF8
        }
    }
}

# 1. Design Diagrams
$designDirs = Get-ChildItem -Path (Join-Path $rupPath "02-diseno\casos-uso") -Directory
foreach ($dir in $designDirs) {
    $pumlFiles = Get-ChildItem -Path $dir.FullName -Filter "*.puml"
    foreach ($file in $pumlFiles) {
        $targetName = "diseno-secuencia-" + $dir.Name + ".puml"
        if ($file.Name -ne $targetName) {
            $oldName = $file.Name
            Rename-Item -Path $file.FullName -NewName $targetName
            Update-AllReadmes -oldName $oldName -newName $targetName
        }
    }
}

# 2. Analysis Diagrams
$analysisDirs = Get-ChildItem -Path (Join-Path $rupPath "01-analisis\casos-uso") -Directory
foreach ($dir in $analysisDirs) {
    $pumlFiles = Get-ChildItem -Path $dir.FullName -Filter "*.puml"
    foreach ($file in $pumlFiles) {
        $type = "secuencia"
        if ($file.Name -like "*colaboracion*") { $type = "colaboracion" }
        $targetName = "analisis-" + $type + "-" + $dir.Name + ".puml"
        if ($file.Name -ne $targetName) {
            $oldName = $file.Name
            Rename-Item -Path $file.FullName -NewName $targetName
            Update-AllReadmes -oldName $oldName -newName $targetName
        }
    }
}

# 3. Final Encoding pass to fix any artifacts and ensure UTF-8 for ALL MD files in RUP
Get-ChildItem -Path $rupPath -Filter "*.md" -Recurse | ForEach-Object {
    $content = Get-Content -Path $_.FullName -Raw
    Set-Content -Path $_.FullName -Value $content -Encoding UTF8
}
