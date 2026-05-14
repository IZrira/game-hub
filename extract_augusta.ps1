$logPath = "C:\Users\User\.gemini\antigravity\brain\ef6d4954-1d90-4f36-aa9a-e27c3b317355\.system_generated\logs\overview.txt"
$logContent = Get-Content $logPath
foreach ($line in $logContent) {
    if ($line -match '"step_index":122') {
        $json = $line | ConvertFrom-Json
        $json.content | Out-File -FilePath "augusta_full_info.txt" -Encoding utf8
        break
    }
}
