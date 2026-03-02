@echo off
setlocal
cd /d "%~dp0"
echo Adding all changes to Git...
git add .
echo Committing changes...
git commit -m "Auto update from TIME SAVE SERVICES"
echo Pushing to GitHub...
git push origin main
echo Done!
pause
