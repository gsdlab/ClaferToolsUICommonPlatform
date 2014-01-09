echo "Starting the server under the supervisor."
echo "Autorestarting on source code changes."
echo "Polling for source code changes every minute."
cd ..
nohup supervisor -w -p60000 server.js & 