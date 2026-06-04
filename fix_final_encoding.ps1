$rupPath = "C:\Users\flany\Jorgestor\RUP"

function Fix-File {
    param($path)
    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    
    $map = @{
        "Ã¡" = "á";
        "Ã©" = "é";
        "Ã­" = "í";
        "Ã³" = "ó";
        "Ãº" = "ú";
        "Ã±" = "ñ";
        "Ã‰" = "É";
        "Ã¡" = "á";
        "Ã³" = "ó"
    }
    
    foreach ($key in $map.Keys) {
        $content = $content.Replace($key, $map[$key])
    }
    
    # Common words
    $content = $content.Replace("DiseÃ±o", "Diseño")
    $content = $content.Replace("AnÃ¡lisis", "Análisis")
    $content = $content.Replace("Ã‰pica", "Épica")
    $content = $content.Replace("ExÃ¡menes", "Exámenes")
    $content = $content.Replace("ðŸ ï¸", "🏠️")
    $content = $content.Replace("ðŸ“Š", "📊")
    $content = $content.Replace("Log_de_conversaciÃ³n", "Log_de_conversación")

    [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
}

Get-ChildItem -Path $rupPath -Filter "*.md" -Recurse | ForEach-Object {
    Fix-File -path $_.FullName
}
