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
var os = require("os");
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

// The maximum number of sessions; each can run the compiler and an instance generator.
var MAX_SESSIONS = config.maxSessions || 50;

// Whether a new session can be added for the given key (an existing session is replaced).
var canAddProcess = function (key)
{
    return processes.length < MAX_SESSIONS || getProcess(key) != null;
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
        logNormal("Killing the process with PID = " + pid);

        if (!pid)
            return;

        // the tool's children first (e.g., the Alloy JVM started by claferIG), then the tool
        var killer = os.platform() == "win32"
            ? spawn("taskkill", ["/F", "/T", "/PID", String(pid)])
            : spawn("pkill", ["-KILL", "-P", String(pid)]);

        killer.on('error', function(err){
            logNormal("Cannot terminate the child processes of " + pid);
        });

        try
        {
            tool.kill("SIGKILL");
        }
        catch (e)
        {
            logNormal("Cannot terminate the process " + pid);
        }
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

// Whether an optional numeric value from a request (a scope, an integer range, etc.) is
// absent or an integer.
var isOptionalInteger = function (value) {
        return value === undefined || value === "" || (typeof value === "string" && /^-?[0-9]{1,9}$/.test(value));
    };

// Whether a value from a request can be inserted into a command for an instance generator:
// no line breaks or other control characters, which would inject further commands.
var isCommandValue = function (value) {
        return typeof value === "string" && value.length <= 1000 && !/[\x00-\x1f\x7f]/.test(value);
    };

// Removes a session's folder with its contents.
var cleanupOldFiles = function (dir) {
        if (!dir)
            return;

        fs.rm(dir, { recursive: true, force: true }, function (err) {
            if (err)
                logNormal("Could not delete the session folder: " + dir);
            else
                logNormal("Deleted the session folder: " + dir);
        });
    };

// Removes everything from the uploads folder: sessions do not survive a restart.
var cleanupUploads = function (dir) {
        fs.readdirSync(dir).forEach(function (file) {
            if (file != ".gitignore")
                fs.rmSync(dir + "/" + file, { recursive: true, force: true });
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
module.exports.canAddProcess = canAddProcess;
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
module.exports.cleanupUploads = cleanupUploads;
module.exports.isOptionalInteger = isOptionalInteger;
module.exports.isCommandValue = isCommandValue;
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
