# 대화 저장 스크립트 (PowerShell)

$config = Get-Content -Path "supabase-config.json" -Raw | ConvertFrom-Json
$url = $config.url + "/rest/v1/conversations"
$key = $config.serviceRoleKey

$jsonBody = @"
{
  "user_id": "chailkown",
  "question": "Test: Is system working?",
  "answer": "Yes! Supabase integration is complete and all conversations will be saved automatically.",
  "context": "{\"test\": true}"
}
"@

$headers = @{
    "apikey" = $key
    "Authorization" = "Bearer $key"
    "Content-Type" = "application/json"
    "Prefer" = "return=representation"
}

Write-Host "Testing conversation save..." -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $jsonBody
    
    Write-Host "SUCCESS! Conversation saved." -ForegroundColor Green
    Write-Host "Saved ID: $($response.id)" -ForegroundColor Yellow
    Write-Host "`nConversation save system is working!" -ForegroundColor Green
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Response: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
}
