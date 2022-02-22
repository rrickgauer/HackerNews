#!/bin/bash

IP_ADDRESS='104.225.208.163'

#---------------------------------------
# Start up the API
#---------------------------------------
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
