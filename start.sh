echo "Starting the server under the supervisor."
clafer -V
claferIG -V
java ~/bin/claferchocoig.jar --version
echo "Autorestarting on source code changes."
echo "Polling for source code changes every minute."
cd ..
for file in *.js
do
	echo $file
	nohup supervisor -w -p60000 $file &
	break
done
