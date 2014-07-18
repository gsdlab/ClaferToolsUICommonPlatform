echo "Starting the server under the supervisor."
clafer -V
claferIG -V
echo "Autorestarting on source code changes."
echo "Polling for source code changes every minute."
cd ..
for file in *.js 
do 
	echo $file
	nohup supervisor -w -p60000 $file &
	break
done