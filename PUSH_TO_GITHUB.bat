@echo off
echo ========================================
echo   PUSHING ATTENDANCE MANAGEMENT TO GITHUB
echo ========================================
echo.
git push -u origin Attendance-Management
echo.
if %errorlevel% neq 0 (
    echo PUSH FAILED. Please ensure you are logged into the correct GitHub account.
) else (
    echo PUSH SUCCESSFUL! Check your GitHub repository now.
)
pause
