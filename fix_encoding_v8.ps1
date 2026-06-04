$rupPath = "C:\Users\flany\Jorgestor\RUP"

Get-ChildItem -Path $rupPath -Filter "*.md" -Recurse | ForEach-Object {
    $filePath = $_.FullName
    
    # Character replacement for the specifically broken patterns we see
    $content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
    
    # This is "Análisis" in double-encoded UTF-8
    $content = $content.Replace("AnÃ¡lisis", "Análisis")
    $content = $content.Replace("DiseÃ±o", "Diseño")
    $content = $content.Replace("Ã‰pica", "Épica")
    $content = $content.Replace("ExÃ¡menes", "Exámenes")
    $content = $content.Replace("Ã³", "ó")
    $content = $content.Replace("Ã¡", "á")
    $content = $content.Replace("Ã­", "í")
    $content = $content.Replace("Ãº", "ú")
    $content = $content.Replace("Ã±", "ñ")
    $content = $content.Replace("Ã©", "é")
    $content = $content.Replace("Ã‰", "É")
    $content = $content.Replace("Ã¡", "á")
    $content = $content.Replace("Ã³", "ó")
    $content = $content.Replace("Ã³", "ó")
    $content = $content.Replace("Ã­", "í")
    
    [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
}
