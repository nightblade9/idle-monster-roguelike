@echo off

set TEMP_DIR=..\GHPAGES
set SOURCE_DIR=space-marine-junaid

REM clean out all files and make sure we're on origin/gh-pages
cd %TEMP_DIR%
git pull
git rm -rf .

REM delete and recreate the temp dir
cd ..\%SOURCE_DIR%\my-app
rd /s /q build
cmd /c npm run build

xcopy /Y /s build\* ..\%TEMP_DIR%
cd ..\%TEMP_DIR%

@echo on

git add -A .
git commit . -m "Publish latest version"
git push

cd ..\%SOURCE_DIR%
echo Pushed to gh-pages.