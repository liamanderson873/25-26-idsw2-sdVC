$files = Get-ChildItem -Path "RUP/02-diseno/casos-uso/*/README.md"
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $folderName = $file.Directory.Name
    $parts = $folderName -split "-"
    $cuNumber = $parts[0] + "-" + $parts[1]
    
    $newUrl = "https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/liamanderson873/25-26-idsw2-sdVC/develop/RUP/02-diseno/casos-uso/$folderName/secuencia.puml"
    $newString = "![$cuNumber]($newUrl)"
    
    $content = [regex]::Replace($content, "!\[.*?\]\(.*?\)", $newString)
    
    [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
    Write-Host "Updated (Fixed Encoding): $folderName"
}
