echo "Starting the server under the supervisor."
echo "Running against ~/0.3.5/cabal-sandbox/bin"
export PATH=~/0.3.5/.cabal-sandbox/bin:$PATH
clafer -V
claferIG -V
echo "Autorestarting on source code changes."
echo "Polling for source code changes every minute."
cd ..
nohup supervisor -w -p60000 server.js &