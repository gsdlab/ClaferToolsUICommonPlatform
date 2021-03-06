/*
Copyright (C) 2012 - 2014 Alexander Murashkin, Neil Redman <http://gsd.uwaterloo.ca>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var fs = require("fs");
var config = require('./../config.json');
var backendConfig = require('./../Backends/backends.json');
var formatConfig = require('./../Formats/formats.json');
var packageConfig = require('./../package.json');

var spawn = require('child_process').spawn;    

var processes = []; // for storing sessions

var getProcess = function(key)
{
    for (var i = 0; i < processes.length; i++)
    {
        if (processes[i].windowKey == key)
        {
            return processes[i];
        }
    }

    return null;
};

var timeoutProcessSetPing = function (process)
{
    for (var i = 0; i < processes.length; i++)
    {
        if (processes[i].windowKey == process.windowKey)
        {
            processes[i].pingTimeoutObject = setTimeout(pingTimeoutFunc, config.pingTimeout, processes[i]);
            return;
        }
    }
};

var timeoutProcessClearPing = function (process)
{
    for (var i = 0; i < processes.length; i++)
    {
        if (processes[i].windowKey == process.windowKey)
        {
            clearTimeout(processes[i].pingTimeoutObject);
            return;
        }
    }
};

var timeoutProcessSetInactivity = function(process)
{
    for (var i = 0; i < processes.length; i++)
    {
        if (processes[i].windowKey == process.windowKey)
        {
            processes[i].inactivityTimeoutObject = setTimeout(inactivityTimeoutFunc, config.inactivityTimeout, processes[i]);
            return;
        }
    }
};

var timeoutProcessClearInactivity = function (process)
{
    for (var i = 0; i < processes.length; i++)
    {
        if (processes[i].windowKey == process.windowKey)
        {
            clearTimeout(processes[i].inactivityTimeoutObject);
            return;
        }
    }
};

var getBackend = function (backendId)
{
    for (var j = 0; j < backendConfig.backends.length; j++)
    {
        if (backendConfig.backends[j].id == backendId)
        {
            return backendConfig.backends[j]; 
        }
    }
    return null;
};

var getFormat = function (formatId)
{
    for (var j = 0; j < formatConfig.formats.length; j++)
    {
        if (formatConfig.formats[j].id == formatId)
        {
            return formatConfig.formats[j];
        }
    }

    return null;
};

processRemoveOlder = function (key)
{    
    for (var i = 0; i < processes.length; i++)
    {
        if (processes[i].windowKey == key)
        {
            processes[i].toKill = true;
            timeoutProcessClearPing(processes[i]);                
            processes[i].toRemoveCompletely = true;
            processes[i].windowKey = "none";
            break;
        }
    }
};

var defaultProcess = function (process)
{   
    process.toRemoveCompletely = false; 
    process.tool = null;
    process.freshData = ""; 
    process.scopes = "";
    process.clafer_compiler = null;
    process.mode = "compiler"; 
    process.freshError = "";
    return process;
};

var resetProcessToCompilerMode = function (process)
{   
    timeoutProcessClearPing(process); // we need to clear the timeout, because it will be replaced by compilation process' timeout
    process.toRemoveCompletely = false; 
//    process.tool = null;
//    process.freshData = ""; 
    process.scopes = "";
//    process.clafer_compiler = null;
    process.mode = "compiler"; 
//    process.freshError = "";
    return process;
};

var addProcess = function (process)
{   
    processRemoveOlder(process.windowKey);
    processes.push(defaultProcess(process));
    return getProcess(process.windowKey);
};

var pingTimeoutFunc = function (process)
{
    logSpecific("Error: Ping Timeout", process.windowKey);
    process.result = '{"message": "' + escapeJSON('Error: Ping Timeout. Please consider increasing timeout values in the "config.json" file. Currently it equals ' + config.pingTimeout + ' millisecond(s).') + '"}';
    process.toKill = true;   
    process.toRemoveCompletely = true;   
    cleanProcesses();
};

var inactivityTimeoutFunc = function (process)
{
    logSpecific("Error: Inactivity Timeout", process.windowKey);
    process.result = '{"message": "' + escapeJSON('Error: Inactivity Timeout. Please consider increasing timeout values in the "config.json" file. Currently it equals ' + config.inactivityTimeout + ' millisecond(s).') + '"}';
    process.toKill = true;   
    process.toRemoveCompletely = true;   
    cleanProcesses();
};

var cleanProcesses = function ()
{
    var i = 0;
    while (i < processes.length)
    {
        if (processes[i].toKill)
        {
            killProcessTree(processes[i]);
            processes[i].toKill = false;
        }

        if (processes[i].toRemoveCompletely)
        {
            clearTimeout(processes[i].pingTimeoutObject);
            clearTimeout(processes[i].inactivityTimeoutObject);
            setTimeout(cleanupOldFiles, config.cleaningTimeout, processes[i].folder);
            processes.splice(i, 1);
        }
        else
            i++;   
    }

    logSpecific("Cleaning complete. #Processes = " + processes.length, null);
};

var killProcessTree = function(process)
{
    process.killed = true;
    killProcessIfExists(process.tool);    
    process.tool = null;
    killProcessIfExists(process.clafer_compiler);    
    process.clafer_compiler = null;
    logSpecific("Killing the process tree...", process.windowKey);                
};

var dependencies = [];
var dependencyCount = 0;
var dependencyVersions = "";

var getDependencyVersionsText = function(callback)
{
    return dependencyVersions;
};

var addDependency = function(path, args, title, isVitallyImportant)
{
    dependencies.push({path : path, args : args, title : title, id: dependencies.length, tool_version: "", vitallyImportant: isVitallyImportant});
};

function checkDependency(dependency, callback)
{
    var tool  = spawn(dependency.path, dependency.args);

    tool.on('error', function (err){
        logNormal('ERROR: Cannot find "' + dependency.title + '". Please check whether it is installed and accessible.');
    });
    
    tool.stdout.on('data', function (data){ 
        dependency.tool_version += data;
    });
    
    tool.stderr.on('data', function (data){ 
        dependency.tool_version += data;
    });

    tool.on('close', function (code){
        dependency.tool_version = dependency.tool_version.trim();   
        logNormal(dependency.tool_version);
        if (code == 0)
        {
            dependency_ok(dependency, callback);
        }
        else
        {
            if (dependency.vitallyImportant)
            {
                logNormal('FATAL ERROR: Non-zero return code of "' + dependency.title + '": "' + code + '". Please check whether it is installed and accessible.');
            }
            else
            {
                logNormal('Warning: Non-zero return code of "' + dependency.title + '": "' + code + '". Please check whether it is installed and accessible. Proceeding anyway.');
                dependency_ok(dependency, callback);
            }
        }
    });
}

var runWithDependencyCheck = function(callback)
{
    var node_version = process.version + ", " + JSON.stringify(process.versions);
    logNormal("Node.JS: " + node_version);    
    dependencyCount = dependencies.length;

    for (var i = 0; i < dependencies.length; i++)
    {
        checkDependency(dependencies[i], callback);
    }
};

var dependency_ok = function(dependency, callback)
{
    dependencyCount--;
/*
    for (var i = 0; i < dependencies.length; i++)
    {
        if (dependencies[i].id == dependency.id)
        {
            dependencies[i].
        }
    }
*/
    if (dependencyCount == 0)
    {
        logNormal('Dependencies found successfully. Please review their versions manually');        

        dependencyVersions = "";

        for (var i = 0; i < dependencies.length; i++)
        {
            dependencyVersions += dependencies[i].tool_version + "\n";
        }

        callback();
    }
};

var killProcessIfExists = function(tool)
{
    if (tool)
    {
        var pid = tool.pid;
        tool.removeAllListeners();
        logNormal("Killing the process with Parent PID = " + pid);

        // first, try a Windows command
        var killer_win  = spawn("taskkill", ["/F", "/T", "/PID", pid]);

        killer_win.on('error', function (err){  // if error occurs, then we are on Linux
            var killer_linux = spawn("pkill", ["-TERM", "-P", pid]);                   

            killer_linux.on('error', function(err){
                logNormal("Cannot terminate the process.");
            });
        });                
    }
};

var logSpecific = function(message, key)
    {
        var date = new Date();
        var d = date.toUTCString();

        if (key != null)
        {
            console.log(d + " | " + key + " | " + message);
        }
        else 
            console.log(d + " | " + "GLOBAL" + " | " + message);
    };

var logNormal = function(message)
    {
        console.log(message);
    };

var cleanupOldFiles = function (dir) {
        logNormal("Cleaning temporary files...");                    
        //cleanup old files
        fs.readdir(dir, function(err, files){
            //if (err) throw err;
            if (err) 
            {
                logSpecific("Could not clear the folder: " + dir, null);
                return; // cannot get the folder
            }
            var results = "";
            var numFiles = files.length;
            logSpecific("#Files = " + numFiles, null);
            if (!numFiles){
                return finishCleanup(dir, results);
            } else {
                files.forEach(function(file){
                    deleteOld(dir + "/" + file);
                    results += file + "\n";
                }); 
                finishCleanup(dir, results);
            }
        });
    };

var deleteOld = function (path)
    {
        fs.exists(path, function(exists)
        {
            if (exists)
            {
                fs.unlink(path, function (err) 
                { 
                    if (err)
                    {
                        logNormal("Could not delete the file: " + path);              
                        logNormal(err);                 
                    }
                });
            }
        });
    }

var finishCleanup = function (dir, results)
    {
        fs.exists(dir, function(exists)
        {       
            if (exists)
            {
                fs.rmdir(dir, function (err) {
                    if (err) 
                    {
                        logNormal("Could not finish the cleanup: " + dir);
                        return;
                    }
                    logNormal("Successfully deleted " + dir + " along with contents:\n" + results);
                });
            }
        });
    };

var escapeJSON = function (unsafe) 
    {
        return unsafe.replace(/[\\]/g, '\\\\')
            .replace(/[\"]/g, '\\\"')
            .replace(/[\/]/g, '\\/')
            .replace(/[\b]/g, '\\b')
            .replace(/[\f]/g, '\\f')
            .replace(/[\n]/g, '\\n')
            .replace(/[\r]/g, '\\r')
            .replace(/[\t]/g, '\\t');
    };
    

var replaceTemplate = function (input_string, replacement_map)
    {
        var result = input_string;

        for (var j = 0; j < replacement_map.length; j++)
        {
            result = result.replace(replacement_map[j].needle, replacement_map[j].replacement);
        }

        return result;
    };

var replaceTemplateList = function(input_list, replacement_map)
    {
        var result = new Array();
        for (var i = 0; i < input_list.length; i++)
        {
            result.push(replaceTemplate(input_list[i], replacement_map));
        }
        
        return result;
    };                            

    // filter input command line arguments for safety purposes
var filterArgs = function (argString)
    {
        var args = argString.split(" ");
        var resultArgs = new Array();
        for (var i = 0; i < args.length; i++)
        {
            var arg = args[i].trim();

            if (arg.length == 0)
                continue;

            if (!arg.match(/-[A-Za-z-]+/))
                continue;

            resultArgs.push(arg);
        }

        return resultArgs;
    };

var getVersion = function()
    {
        return "v" + packageConfig.version + "." + packageConfig.release_date;
    };                            

var getTitle = function()
    {
        return packageConfig.name;
    };                         


var buildArg = function (args, config, value)
    {
        if (config && config.argument) 
        {
            var finalValue;

            if (value)
                finalValue = value;
            else if (config.off_value)
                finalValue = config.off_value;
            else
                return args;

            var replacement = [
                {
                    "needle": "$value$", 
                    "replacement": finalValue
                }
            ];

            var curArg = replaceTemplate(config.argument, replacement);
            args.push(curArg);
            return args;
        }
        else
            return args;

    };


module.exports.addProcess = addProcess;
module.exports.resetProcessToCompilerMode = resetProcessToCompilerMode;
module.exports.getProcess = getProcess;
module.exports.timeoutProcessSetPing = timeoutProcessSetPing;
module.exports.timeoutProcessClearPing = timeoutProcessClearPing;
module.exports.timeoutProcessSetInactivity = timeoutProcessSetInactivity;
module.exports.timeoutProcessClearInactivity = timeoutProcessClearInactivity;

module.exports.getBackend = getBackend;
module.exports.getFormat = getFormat;
module.exports.cleanProcesses = cleanProcesses;

module.exports.addDependency = addDependency;
module.exports.runWithDependencyCheck = runWithDependencyCheck;

module.exports.killProcessIfExists = killProcessIfExists;
module.exports.logSpecific = logSpecific;
module.exports.logNormal = logNormal;

module.exports.escapeJSON = escapeJSON;

module.exports.replaceTemplate = replaceTemplate;
module.exports.replaceTemplateList = replaceTemplateList;
module.exports.filterArgs = filterArgs;

module.exports.getTitle = getTitle;
module.exports.getVersion = getVersion;
module.exports.getDependencyVersionsText = getDependencyVersionsText;
module.exports.buildArg = buildArg;
