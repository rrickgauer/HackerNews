@echo off

cd C:\xampp\htdocs\files\HackerNews\src

echo Setting up virtual environment...
python -m venv .venv


echo.
echo Installing modules from requirements.txt file...
C:\xampp\htdocs\files\HackerNews\src\.venv\Scripts\pip.exe install -U -r C:\xampp\htdocs\files\HackerNews\src\requirements.txt

pause


