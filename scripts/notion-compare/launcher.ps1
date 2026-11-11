# RIRA 데이터 대조표 실행 메뉴. 바탕화면 바로가기에서 연다.
# Notion·공식 도감은 읽기만 하고, 프로젝트 데이터는 바꾸지 않는다.
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$Host.UI.RawUI.WindowTitle = 'RIRA 데이터 대조표'
$root = Resolve-Path (Join-Path $PSScriptRoot '..\..')
Set-Location $root
$reviewUrl = 'https://claude.ai/artifact/QzebC8KKRnVMtCoYz2pybe'
$localPage = Join-Path $root '.tmp\notion-compare\review.html'

function Run-Compare([string]$hub) {
    Write-Host ''
    if ($hub) { npm run compare:notion -- $hub } else { npm run compare:notion }
    if ($LASTEXITCODE -ne 0) {
        Write-Host ''
        Write-Host '대조에 실패했어요. 위 오류를 확인해 주세요.' -ForegroundColor Red
        return
    }
    Write-Host ''
    Write-Host '대조 결과를 .tmp\notion-compare 에 저장했어요.' -ForegroundColor Green
    Write-Host '대조표 사이트에 올리려면 Claude에게 "대조표 갱신해"라고 말해 주세요.'
}

while ($true) {
    Write-Host ''
    Write-Host '==== RIRA 데이터 대조표 ====' -ForegroundColor Cyan
    Write-Host ' 1. 대조표 열기 (선택·메모 저장되는 페이지)'
    Write-Host ' 2. 전체 대조 다시 실행 (스타레일·명조·이환·애니모, 몇 분 걸림)'
    Write-Host ' 3. 게임 하나만 대조'
    Write-Host ' 4. 마지막 대조 결과 미리보기 (이 PC 전용, 선택 저장 안 됨)'
    Write-Host ' 0. 닫기'
    $pick = Read-Host '번호'
    switch ($pick) {
        '1' { Start-Process $reviewUrl }
        '2' { Run-Compare '' }
        '3' {
            Write-Host ' h. 스타레일   w. 명조   n. 이환   a. 애니모'
            $map = @{ h = 'hsr'; w = 'ww'; n = 'nte'; a = 'aniimo' }
            $g = (Read-Host '게임').Trim().ToLower()
            if ($map.ContainsKey($g)) { Run-Compare $map[$g] } else { Write-Host '목록에 없는 게임이에요.' -ForegroundColor Yellow }
        }
        '4' {
            if (Test-Path $localPage) { Start-Process $localPage } else { Write-Host '아직 대조 결과가 없어요. 먼저 2번이나 3번을 실행해 주세요.' -ForegroundColor Yellow }
        }
        '0' { exit 0 }
        default { Write-Host '0~4 중에서 골라 주세요.' -ForegroundColor Yellow }
    }
}
