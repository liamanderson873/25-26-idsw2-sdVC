$rupPath = "C:\Users\flany\Jorgestor\RUP"

# Character codes for corrupted UTF-8 sequences (C3 XX)
$C3 = [char]195
$map = @{
    ($C3 + [char]161) = "á";
    ($C3 + [char]169) = "é";
    ($C3 + [char]173) = "í";
    ($C3 + [char]179) = "ó";
    ($C3 + [char]186) = "ú";
    ($C3 + [char]177) = "ñ";
    ($C3 + [char]137) = "É";
    ($C3 + [char]145) = "Ñ";
    ($C3 + [char]141) = "Í";
    ($C3 + [char]153) = "Ú";
    ($C3 + [char]147) = "Ó";
    ($C3 + [char]129) = "Á";
    ($C3 + [char]144) = "Ð"; # Not used
    ($C3 + [char]152) = "Ø"; # Not used
    ($C3 + [char]182) = "ö";
    ($C3 + [char]171) = "ë"
}

Get-ChildItem -Path $rupPath -Filter "*.md" -Recurse | ForEach-Object {
    $path = $_.FullName
    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    
    foreach ($key in $map.Keys) {
        $content = $content.Replace($key, $map[$key])
    }
    
    # Fix icons and symbols
    $content = $content.Replace("ðŸ ï¸", "🏠️")
    $content = $content.Replace("ðŸ“Š", "📊")
    $content = $content.Replace("â†’", "→")

    [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
}
