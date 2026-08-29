# Check for port 17493
$port = 17493
$netstat = netstat -ano | Select-String ":$port "

if ($netstat) {
    echo "$(Get-Date): Port $port is listening." >> status_log.txt
} else {
    echo "$(Get-Date): Port $port is NOT listening. Taking action." >> status_log.txt
    
    # Identify Python processes
    $pythonProcs = tasklist /FI "imagename eq python.exe" /NH
    
    if ($pythonProcs -match "python.exe") {
        echo "$(Get-Date): Killing Python processes." >> status_log.txt
        taskkill /F /IM python.exe /T >> status_log.txt 2>&1
    }

    # Placeholder for restart command (assuming standard Uvicorn command)
    echo "$(Get-Date): Restarting Uvicorn backend..." >> status_log.txt
    # Example: Start-Process python -ArgumentList "-m uvicorn main:app --port $port"
    # User will need to configure this once they verify the path/command.
}
