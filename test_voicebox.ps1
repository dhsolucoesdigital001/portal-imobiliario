# Script para testar endpoints do Voicebox (simplificado)
$endpoints = @(
    "http://localhost:8000/health",
    "http://localhost:8000/capture/readiness",
    "http://localhost:8000/status"
)

$logFile = "A:\OpenClawinstalação\.openclaw\.openclaw\workspace\voicebox_audit.log"
$resultFile = "A:\OpenClawinstalação\.openclaw\.openclaw\workspace\auditoria_voicebox.txt"

$content = "--- Auditoria Voicebox $(Get-Date) ---`n"

foreach ($url in $endpoints) {
    try {
        $response = Invoke-WebRequest -Uri $url -Method Get -UseBasicParsing -TimeoutSec 5
        $content += "$($url): OK (Code: $($response.StatusCode))`n"
    } catch {
        $content += "$($url): FAILED (Error: $($_.Exception.Message))`n"
    }
}

$content | Out-File -FilePath $resultFile -Append
$content | Out-File -FilePath $logFile -Append
