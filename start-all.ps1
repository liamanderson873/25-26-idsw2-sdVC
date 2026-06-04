# start-all.ps1
# Script para arrancar Backend y Frontend de Jorgestor simultáneamente

$backendPort = 9090
$frontendDir = "C:\Users\flany\Jorgestor\frontend"

Write-Host "--- Preparando Entorno Jorgestor ---" -ForegroundColor Cyan

# 1. Limpieza de puerto Backend
Write-Host "Verificando puerto Backend ($backendPort)..." -ForegroundColor Gray
$connections = Get-NetTCPConnection -LocalPort $backendPort -ErrorAction SilentlyContinue
if ($connections) {
    foreach ($c in $connections) {
        $p = $c.OwningProcess
        if ($p -gt 0) {
            Write-Host "Cerrando proceso previo en puerto $backendPort (PID: $p)..." -ForegroundColor Yellow
            Stop-Process -Id $p -Force -ErrorAction SilentlyContinue
        }
    }
    Start-Sleep -Seconds 1
}

# 2. Arrancar Frontend en una ventana nueva
Write-Host "Lanzando Frontend en nueva terminal..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd $frontendDir; npm run dev"

# 3. Arrancar Backend en esta ventana
Write-Host "Lanzando Backend (Puerto $backendPort)..." -ForegroundColor Green
C:\Users\flany\maven\apache-maven-3.9.16\bin\mvn.cmd spring-boot:run
