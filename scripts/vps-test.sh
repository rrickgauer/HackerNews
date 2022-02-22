#!/bin/bash

IP_ADDRESS='104.225.208.163'

echo 'Starting up TESTING server...'

cd /var/www/HackerNews/src

mod_wsgi-express start-server \
--user www-data  \
--group www-data  \
--server-name hackernews.ryanrickgauer.com  \
--port 3010   \
--access-log  \
--log-level info   \
--host $IP_ADDRESS \
--log-to-terminal \
--document-root /var/www/HackerNews/src/hackernews/static \
hackernews.wsgi