# run-jorgestor.ps1
# Script REFORZADO para arrancar la app sin errores de puerto

$port = 9090
Write-Host "--- Limpiando puerto $port ---" -ForegroundColor Cyan

# Buscamos todos los procesos que usen el puerto y los matamos uno a uno
$connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
if ($connections) {
    foreach ($c in $connections) {
        $p = $c.OwningProcess
        if ($p -gt 0) {
            Write-Host "Cerrando proceso $p..." -ForegroundColor Yellow
            Stop-Process -Id $p -Force -ErrorAction SilentlyContinue
        }
    }
    Start-Sleep -Seconds 1 # Damos un respiro al SO para liberar el socket
}

Write-Host "Lanzando Jorgestor en el puerto $port..." -ForegroundColor Green
C:\Users\flany\maven\apache-maven-3.9.16\bin\mvn.cmd spring-boot:run
