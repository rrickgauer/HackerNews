:: ----------------------------------------
:: Start up the Babel.js compiler
:: ----------------------------------------
cd C:\xampp\htdocs\files\HackerNews
npx babel src/js/classes src/js/pages --out-file src/js/main.js --watch --minified --plugins=@babel/plugin-proposal-class-properties
pause

