$rupPath = "C:\Users\flany\Jorgestor\RUP"

function Fix-File {
    param($path)
    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    
    # Character by character fix to avoid script encoding issues
    # Design -> Diseño
    $content = $content.Replace('DiseÃ±o', 'Diseño')
    $content = $content.Replace('AnÃ¡lisis', 'Análisis')
    $content = $content.Replace('Ã‰pica', 'Épica')
    $content = $content.Replace('ExÃ¡menes', 'Exámenes')
    $content = $content.Replace('Ã³', 'ó')
    $content = $content.Replace('Ã¡', 'á')
    $content = $content.Replace('Ã­', 'í')
    $content = $content.Replace('Ãº', 'ú')
    $content = $content.Replace('Ã±', 'ñ')
    $content = $content.Replace('Ã©', 'é')
    $content = $content.Replace('Ã‰', 'É')
    
    [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
}

$files = Get-ChildItem -Path $rupPath -Filter "*.md" -Recurse
foreach ($f in $files) {
    Fix-File -path $f.FullName
}
