@echo off
chcp 65001 > nul
echo ========================================================
echo   🚀 BatteryLab Research Hub - GitHub 자동 Push 실행
echo ========================================================
echo.

set "GIT_EXE=C:\Users\jiwoo\.gemini\antigravity\scratch\mingit\cmd\git.exe"
if not exist "%GIT_EXE%" (
    set "GIT_EXE=git"
)

echo [1/4] Git 저장소 상태 확인...
"%GIT_EXE%" add -A

echo [2/4] 커밋 생성...
"%GIT_EXE%" commit -m "feat: 배터리 연구실 개인 연구관리 웹앱 완성 (BatteryLab Research Hub)" 2>nul

echo [3/4] 원격 저장소 연결 확인...
"%GIT_EXE%" remote remove origin 2>nul
"%GIT_EXE%" remote add origin https://github.com/jiwoo030633-crypto/research-note.git
"%GIT_EXE%" branch -M main

echo [4/4] GitHub로 Push 중... (로그인 창이 뜨면 GitHub 로그인을 진행해주세요)
"%GIT_EXE%" push -u origin main --force

echo.
if %ERRORLEVEL% equ 0 (
    echo ========================================================
    echo   🎉 GitHub Push 성공! 
    echo   Vercel 대시보드에서 Deploy를 진행해주세요!
    echo ========================================================
) else (
    echo [안내] GitHub 로그인 인증이 필요할 수 있습니다.
)

pause
