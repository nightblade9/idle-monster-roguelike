@echo off

set TEMP_DIR=..\GHPAGES
set SOURCE_DIR=space-marine-junaid

REM delete and recreate the temp dir
rd /s /q %TEMP_DIR%
cd my-app
rd /s /q build

REM seed it with .git
mkdir ..\%TEMP_DIR%
mkdir ..\%TEMP_DIR%\.git
xcopy /Y /s ..\.git ..\%TEMP_DIR%\.git

cd ..\%TEMP_DIR%
git checkout -f gh-pages
git pull

cd ..\%SOURCE_DIR%\my-app
cmd /c npm run build

cd ..\%TEMP_DIR%
echo git add -A .
echo git commit . -m "Publish latest version"
echo git push

cd ..\%SOURCE_DIR%
echo Pushed to gh-pages.