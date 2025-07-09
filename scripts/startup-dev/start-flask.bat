cd C:\xampp\htdocs\files\HackerNews\src\.venv\Scripts
call activate.bat

cd C:\xampp\htdocs\files\HackerNews\src

set FLASK_ENV=development
set FLASK_APP=hackernews
@REM set FLASK_RUN_EXTRA_FILES=C:\xampp\htdocs\files\HackerNews\src\hackernews\templates\index.html
@REM set FLASK_RUN_EXTRA_FILES=C:\xampp\htdocs\files\HackerNews\src\hackernews\templates


flask run --with-threads --host 0.0.0.0 --port 6003 --debug --reload
