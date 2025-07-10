#!/bin/bash


echo 'Compiling js...'
cd /var/www/HackerNews/src/hackernews/static/js
node --max-old-space-size=8192 /usr/bin/rollup -c rollup.config.js --bundleConfigAsCjs


echo ''
echo ''
echo ''
echo 'Compiling css...'
cd /var/www/HackerNews/src/hackernews/static/css
sass --quiet style.scss:style.css 


IP_ADDRESS='104.225.208.103'

#---------------------------------------
# Start up the API
#---------------------------------------
echo ''
echo ''
echo ''
echo 'Starting up server...'

cd /var/www/HackerNews/src

mod_wsgi-express setup-server \
--user www-data  \
--group www-data  \
--server-name hackernews.ryanrickgauer.com  \
--port 3010   \
--access-log  \
--log-level info   \
--server-root /etc/hackernews.ryanrickgauer.com \
--host $IP_ADDRESS \
--setup-only \
--document-root /var/www/HackerNews/src/hackernews/static \
hackernews.wsgi

# restart the server
/etc/hackernews.ryanrickgauer.com/apachectl restart
