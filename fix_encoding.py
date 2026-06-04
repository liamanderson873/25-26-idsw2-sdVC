import os

rup_path = r'C:\Users\flany\Jorgestor\RUP'

replacements = {
    b'\xc3\xa1': 'á',
    b'\xc3\xa9': 'é',
    b'\xc3\xad': 'í',
    b'\xc3\xb3': 'ó',
    b'\xc3\xba': 'ú',
    b'\xc3\xb1': 'ñ',
    b'\xc3\x81': 'Á',
    b'\xc3\x89': 'É',
    b'\xc3\x8d': 'Í',
    b'\xc3\x93': 'Ó',
    b'\xc3\x9a': 'Ú',
    b'\xc3\x91': 'Ñ',
}

# Add word-based fixes for double corruption if needed
word_fixes = {
    "DiseÃ±o": "Diseño",
    "AnÃ¡lisis": "Análisis",
    "Ã‰pica": "Épica",
    "ExÃ¡menes": "Exámenes",
}

for root, dirs, files in os.walk(rup_path):
    for file in files:
        if file.endswith('.md'):
            path = os.path.join(root, file)
            try:
                with open(path, 'rb') as f:
                    content_bytes = f.read()
                
                # Try to decode as UTF-8
                try:
                    content = content_bytes.decode('utf-8')
                    # If it decoded, it might still have the "AnÃ¡lisis" pattern
                    # because it was double encoded.
                    for corrupted, fixed in word_fixes.items():
                        content = content.replace(corrupted, fixed)
                    
                    # Manual fixes for common patterns that survive decode
                    content = content.replace("Ã¡", "á")
                    content = content.replace("Ã©", "é")
                    content = content.replace("Ã­", "í")
                    content = content.replace("Ã³", "ó")
                    content = content.replace("Ãº", "ú")
                    content = content.replace("Ã±", "ñ")
                    content = content.replace("Ã‰", "É")
                    
                    # Icons
                    content = content.replace("ðŸ ï¸", "🏠️")
                    content = content.replace("ðŸ“Š", "📊")
                    content = content.replace("â†’", "→")
                    
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(content)
                        
                except UnicodeDecodeError:
                    # If it didn't decode as UTF-8, it's probably ISO-8859-1 or similar
                    content = content_bytes.decode('iso-8859-1')
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(content)
            except Exception as e:
                print(f"Error processing {path}: {e}")
